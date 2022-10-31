const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch')

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/user/movies', async (req, res) => {

  const client = await new Client({
    node: <ELASTICSEACH_URL>,
    auth: {
      apiKey: <API_KEY>
    }
  })

  const body = await client.search({
    index: "movies_embed",
    "query": { "terms": { "id": req.body.viewed_movies } },
    "_source": [
      "id",
      "description_vector.predicted_value"
    ]
  })

  const response = []
  const idToExcludes = []
  for (const movie of body.hits.hits) {
    idToExcludes.push(movie._source.id)
    const movie_reco = await client.search({
      index: "movies_embed",
      "size": 3,
      "query": {

        "bool": {
          "should": [{
            "rank_feature": {
              "field": "popularity",
              "boost": 0.6
            }
          }],
          "must_not": [
            {
              "terms": {
                "id": idToExcludes
              }
            }
          ]
        }

      },
      "knn": {
        "field": "description_vector.predicted_value",
        "query_vector": movie._source.description_vector.predicted_value,
        "k": 10,
        "num_candidates": 50,
        "boost": 0.1,
      },
      "_source": [
        "id",
        "title",
        "overview",
        "popularity",
        "poster_path"
      ]
    })
    idToExcludes.push(...movie_reco.hits.hits.map(x => x._source.id))
    response.push(...movie_reco.hits.hits)
  }
  res.status(200).json({ response })
});



app.listen(port, () => console.log(`Listening on port ${port}`));
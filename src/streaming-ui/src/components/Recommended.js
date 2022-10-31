import React, {useState, useEffect} from "react";


const fetchUserMoviesRecommendations = async (user) => {
    const response = await fetch('/api/user/movies', {
      method: 'POST',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user)
    })
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

function Recommended({user}) {

    const [results, setResults] = useState([])
    

    useEffect(() => {
        if (user) {
        fetchUserMoviesRecommendations(user).then(res => {
              setResults(res.response.map(x => x._source))
          })
            .catch(err => console.log(err));
        }
      }, [user]);

    return (

        <div className="row">
            <h2>Picked for you</h2>
            <div className="row__posters">
                {results.map(r => (
                    <img
                        key={r.id}
                        className="row__poster row__posterLarge"
                        src={`https://image.tmdb.org/t/p/original/${r.poster_path}`}
                        alt={r.title}
                    />
                ))}
            </div>
        </div>
    );
}

export default Recommended;
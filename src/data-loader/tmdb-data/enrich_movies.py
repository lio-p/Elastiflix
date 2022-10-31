import json 

moviesFile = open("movies.json", "r")
moviesJson = json.load(moviesFile)

movies = {}

for movie in moviesJson:
    movies[movie["id"]] = movie

results = []


moviesDetailsFile = open("movies_2000-2021_w_details.json", "r")
moviesDetailsJson = json.load(moviesDetailsFile)

for m in moviesDetailsJson:
    
    if str(m["id"]) in movies:
        # print(movies[str(m["id"])])
        m["keywords"] = movies[str(m["id"])]["keywords"]
        results.append(m)

jsonString = json.dumps(results)
jsonFile = open("movies_enriched.json", "w")
jsonFile.write(jsonString)
jsonFile.close()

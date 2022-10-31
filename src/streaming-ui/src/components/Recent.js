import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";
import { SearchProvider, WithSearch } from "@elastic/react-search-ui";

import ComingSoon from '../coming-soon.png'

function Recent(props) {

  const connector = new AppSearchAPIConnector({
    searchKey: window._env_.AS_SEARCH_API_KEY,
    engineName: window._env_.ENGINE_NAME,
    endpointBase: window._env_.AS_BASE_URL,
    cacheResponses: false
  })

  const config = {
    apiConnector: connector,
    alwaysSearchOnInitialLoad: true,
    initialState: { sortDirection: "desc", sortField: "release_date", resultsPerPage: 20 },
    trackUrlState: false,
    suggestions: {
      types: {
        // Limit query to only suggest based on "title" field
        documents: { fields: ["title"] }
      },
      // Limit the number of suggestions returned from the server
      size: 4
    }
  };

  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ searchTerm, setSearchTerm, results }) => ({ searchTerm, setSearchTerm, results })}>
        {({ searchTerm, setSearchTerm, results }) => (
          <div className="row">
            <h2>Recent movies</h2>
            <div className="row__posters">
              {

              results.filter(r => r.poster_path.raw !== null).map(r =>
                <img
                  key={r.id.raw}
                  className="row__poster row__posterLarge"
                  src={!r.poster_path.raw ? ComingSoon : `https://image.tmdb.org/t/p/original/${r.poster_path.raw}`}
                  alt={r.title.raw}
                />
              )}
            </div>
          </div>
        )}
      </WithSearch>
    </SearchProvider>
  );
}

export default Recent;

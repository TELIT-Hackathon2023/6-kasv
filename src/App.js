import {Navigation, UploadDocuments, Results, Graph, Score } from "./components";

const App = () => {
    return (

            <div className="App">
                <Navigation />
                <UploadDocuments/>
                <Score />
                <Graph />
                <Results />
            </div>
    );
}
export default App
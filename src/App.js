import {Navigation, UploadDocuments, Results, Graph, Score } from "./components";

const App = () => {
    return (

            <div className="App">
                <Navigation />
                <UploadDocuments/>
                <Graph />
                <Results />
                <Score />
            </div>
    );
}
export default App
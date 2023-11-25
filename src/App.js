import {Navigation, UploadDocuments, Results, Graph, Score } from "./components";

const App = () => {
    return (

            <div className="App">
                <Navigation />
                <UploadDocuments/>
                <Results />
                <Graph />
                <Score />
            </div>
    );
}
export default App
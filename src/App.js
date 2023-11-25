import {Navigation, UploadDocuments, Results, Graph } from "./components";

const App = () => {
    return (

            <div className="App">
                <Navigation />
                <UploadDocuments/>
                <Results />
                <Graph />
            </div>
    );
}
export default App
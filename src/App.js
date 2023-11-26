import {Navigation, UploadDocuments, Results, Graph, } from "./components";

const App = () => {
    return (

            <div className="App">
                <Navigation />
                <UploadDocuments/>
                <Graph />
                <Results />
            </div>
    );
}
export default App
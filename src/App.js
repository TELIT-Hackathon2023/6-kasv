import {Navigation, UploadDocuments, Results, Graph, } from "./components";

const App = () => {
    return (

            <div className="App">
                <Navigation />
                <div className="flex columns-2 justify-between px-16 py-10">
                    <UploadDocuments/>
                    <Graph />
                </div>
                <Results />
            </div>
    );
}
export default App
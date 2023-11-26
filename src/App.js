import {Navigation, UploadDocuments, Results, Graph, } from "./components";

const App = () => {
    return (

            <div className="App">
                <Navigation />
                <div className="grid grid-cols-2 gap-4 px-16 py-10">
                    <UploadDocuments />
                    <Graph />
                </div>
                <Results />
            </div>
    );
}
export default App
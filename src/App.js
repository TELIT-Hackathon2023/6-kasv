import {Navigation, UploadDocuments, Results, Graph } from "./components";

const testData = [
    {
        title: 'Výsledok 1',
        summary: 'Toto je zhrnutie výsledku 1.',
        criteria: [
            { name: 'Kritérium 1', score: '90' },
            { name: 'Kritérium 2', score: '85' },
        ],
    },
    {
        title: 'Výsledok 2',
        summary: 'Toto je zhrnutie výsledku 2.',
        criteria: [
            { name: 'Kritérium 3', score: '95' },
            { name: 'Kritérium 4', score: '80' },
        ],
    },
];
const App = () => {
    return (

            <div className="App">
                <Navigation />
                <UploadDocuments/>
                <Results results={testData} />
                <Graph />
            </div>
    );
}
export default App
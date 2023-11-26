import React from 'react'

const fakeData = [
    {
        problemStatement: 'Potrebujeme vytvoriť novú webovú aplikáciu pre správu našich interných zdrojov.',
        scopeOfWork: 'Vývoj plne funkčnej webovej aplikácie s autentifikáciou užívateľov, CRUD operáciami a pripojením na našu internú databázu.',
        requiredTechnologyStack: ['React', 'Node.js', 'Express', 'MongoDB'],
        pricingModel: 'T&M',
        serviceLevelAgreements: '99.9% dostupnosť servera, mesačné aktualizácie a údržba.',
        selectionCriteria: 'Skúsenosti s podobnými projekty, kvalita portfólia, cena a časový rámec.',
        timelines: 'Potrebujeme, aby bol projekt dokončený do 6 mesiacov od dátumu podpisu zmluvy.',
        contactDetails: {
            name: 'John Doe',
            address: '123 Main St, Anytown, USA',
            phone: '555-555-5555',
            email: 'johndoe@example.com'
        },
        penaltyClauses: 'Pokuta 1000 € za každý deň oneskorenia nad rámec dohodnutého termínu.',
        requiredOfferType: 'Záväzná'
    },
];
const Results = ({ results = fakeData }) => {
    if (!results) {
        return <div role="status">
            <svg aria-hidden="true" className="w-10 h-10 text-gray-200 animate-spin fill-tmagenta" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }
        return (
            <div className="py-10 mx-auto w-full">
                {fakeData.map((result, index) => (
                    <div className="flex flex-col px-16 text-center"
                         key={index}>
                        <h2 className="text-tmagenta">{result.title}</h2>
                        <p>{result.summary}</p>
                        <table className="table-fixed w-full">
                            <thead>
                            <tr className="relative align-top">
                                <th className="text-tmagenta">1<br/>PROBLEM STATEMENT</th>
                                <th className="text-tmagenta">2<br/>SCOPE OF THE WORK</th>
                                <th className="text-tmagenta">3<br/>REQ TECHNOLOGY STACK</th>
                                <th className="text-tmagenta">4<br/>PRICING MODEL</th>
                                <th className="text-tmagenta">5<br/>SERVICE LEVEL AGREEMENTS (SLAS)</th>
                                <th className="text-tmagenta">6<br/>SELECTION CRITERIA</th>
                                <th className="text-tmagenta">7<br/>TIMELINES</th>
                                <th className="text-tmagenta">8<br/>CONTACT DETAILS</th>
                                <th className="text-tmagenta">9<br/>PENALTY CLAUSES</th>
                                <th className="text-tmagenta">10<br/>REQUIRED OFFER TYPE (BINDING OR NON-BINDING)</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="relative align-bottom text-center">
                                <td>{result.problemStatement}</td>
                                <td>{result.scopeOfWork}</td>
                                <td>{result.requiredTechnologyStack.join(', ')}</td>
                                <td>{result.pricingModel}</td>
                                <td>{result.serviceLevelAgreements}</td>
                                <td>{result.selectionCriteria}</td>
                                <td>{result.timelines}</td>
                                <td>{result.contactDetails.name}, {result.contactDetails.address}, {result.contactDetails.phone}, {result.contactDetails.email}</td>
                                <td>{result.penaltyClauses}</td>
                                <td>{result.requiredOfferType}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        );
    };
export default Results

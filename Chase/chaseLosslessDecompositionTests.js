import { chaseLosslessDecomposition } from './chaseLosslessDecomposition.js';

let relation, C, relationSchemes;

// test case 1
relation = ['A1', 'A2', 'A3', 'A4'];
C = [];
relationSchemes = [
        ['A1', 'A2'],
        ['A2', 'A3'],
        ['A3', 'A4'],
];

// console.log(`Applying chaseLosslessDecomposition to relation ${relation} with C = ${C} and relationSchemes = ${relationSchemes}:`);
// console.log(chaseLosslessDecomposition(relation, C, relationSchemes));


// test case 2
relation = ['A', 'B', 'C', 'D'];
C = [
        {
                lhs: ['A'],
                rhs: ['D'],
        },
        {
                relationSchemes: [
                        ['A', 'B'],
                        ['B', 'C', 'D'],
                ]
        },
];
relationSchemes = [
        ['A', 'B'],
        ['B', 'C'],
        ['A', 'D'],
];

console.log(`Applying chaseLosslessDecomposition to relation ${relation} with C = ${C} and relationSchemes = ${relationSchemes}:`);
let result = chaseLosslessDecomposition(relation, C, relationSchemes);

// for each step in result.steps, create an element that has a paragraph with innerHTML = 'Step #{stepNumebr} :' + result.steps[i].description  and create table where the header is result.steps[i].tableau.columns and the rows are result.steps[i].tableau.rows
// render this elements inside div id="output"

for (let i = 0; i < result.steps.length; i++) {
        let stepNumber = i + 1;
        let stepDescription = result.steps[i].description;
        let stepTableau = result.steps[i].tableau;

        let stepElement = document.createElement('div');
        stepElement.innerHTML = `<p>Step ${stepNumber}: ${stepDescription}</p>`;
        let stepTableElement = document.createElement('table');
        let stepTableHeader = document.createElement('tr');
        for (let j = 0; j < stepTableau.columns.length; j++) {
                let stepTableHeaderCell = document.createElement('th');
                stepTableHeaderCell.innerHTML = stepTableau.columns[j];
                stepTableHeader.appendChild(stepTableHeaderCell);
        }
        stepTableElement.appendChild(stepTableHeader);
        for (let j = 0; j < stepTableau.rows.length; j++) {
                let stepTableRow = document.createElement('tr');
                for (let k = 0; k < stepTableau.rows[j].length; k++) {
                        let stepTableRowCell = document.createElement('td');
                        stepTableRowCell.innerHTML = stepTableau.rows[j][k];
                        stepTableRow.appendChild(stepTableRowCell);
                }
                stepTableElement.appendChild(stepTableRow);
        }
        stepElement.appendChild(stepTableElement);
        document.getElementById('output').appendChild(stepElement);
}

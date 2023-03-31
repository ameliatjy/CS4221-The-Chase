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

let resultElement = document.createElement('div');
resultElement.innerHTML = `<p>Is lossless? ${result.result ? 'Yes' : 'No'}</p>`;
let resultTableElement = document.createElement('table');
let resultTableHeader = document.createElement('tr');
for (let j = 0; j < result.finalTableau.columns.length; j++) {
        let resultTableHeaderCell = document.createElement('th');
        resultTableHeaderCell.innerHTML = result.finalTableau.columns[j];
        resultTableHeader.appendChild(resultTableHeaderCell);
}
resultTableElement.appendChild(resultTableHeader);
for (let j = 0; j < result.finalTableau.rows.length; j++) {
        let resultTableRow = document.createElement('tr');
        for (let k = 0; k < result.finalTableau.rows[j].length; k++) {
                let resultTableRowCell = document.createElement('td');
                resultTableRowCell.innerHTML = result.finalTableau.rows[j][k];
                if (result.finalTableau.rows[j][k].startsWith('a')) {
                        resultTableRowCell.style.backgroundColor = 'yellow';
                }
                resultTableRow.appendChild(resultTableRowCell);
        }
        resultTableElement.appendChild(resultTableRow);
}
resultElement.appendChild(resultTableElement);
document.getElementById('output').appendChild(resultElement);



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
C = [];
relationSchemes = [
        ['A', 'B'],
        ['B', 'C'],
        ['A', 'D'],
];

console.log(`Applying chaseLosslessDecomposition to relation ${relation} with C = ${C} and relationSchemes = ${relationSchemes}:`);
console.log(chaseLosslessDecomposition(relation, C, relationSchemes));
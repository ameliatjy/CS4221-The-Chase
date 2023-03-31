import { chaseEntailmentSimpleChaseFD, chaseEntailmentMVD } from './chaseEntailment.js';
import { prettyPrintResult } from './helpers.js';

let relation, C, FD, MVD, JD;
let outputElement, resultPhrase;

// test case 1
relation = ['A', 'B', 'C', 'D'];
C = [
        {
                lhs: ['A'],
                rhs: ['B', 'C'],
                mvd: true,
        },
        {
                lhs: ['D'],
                rhs: ['C']
        },
];
FD = {
        lhs: ['A'],
        rhs: ['C'],
        mvd: false,
};

outputElement = document.getElementById('output');
resultPhrase = `Relation ${relation} with C = ${C}. We are chasing FD = ${FD.lhs} -> ${FD.rhs}. So is it entailed? `;
prettyPrintResult(chaseEntailmentSimpleChaseFD(relation, C, FD), outputElement, resultPhrase);

// test case 2
relation = ['A', 'B', 'C', 'D'];
C = [
        {
                lhs: ['A'],
                rhs: ['B'],
                mvd: true,
        },
        {
                lhs: ['B'],
                rhs: ['C'],
                mvd: true,
        },
];
MVD = {
        lhs: ['A'],
        rhs: ['C'],
        mvd: true,
};

// resultPhrase = `Relation ${relation} with C = ${C}. We are chasing MVD = ${MVD.lhs} ->> ${MVD.rhs}. So is it entailed? `;
// prettyPrintResult(chaseEntailmentMVD(relation, C, MVD), outputElement, resultPhrase);

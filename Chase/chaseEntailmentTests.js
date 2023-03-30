import { chaseEntailmentFD, chaseEntailmentMVD } from './chaseEntailment.js';

let relation, C, FD, MVD, JD;

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

console.log(`Relation ${relation} with C = ${C}. We are chasing FD = ${FD.lhs} -> ${FD.rhs}:`);
console.log(chaseEntailmentFD(relation, C, FD));


// test case 2
relation = ['A', 'B', 'C', 'D'];
C = [];
MVD = {
        lhs: ['A'],
        rhs: ['C'],
        mvd: true,
};

// console.log(`Applying chaseEntailment to relation ${relation} with C = ${C} and MVD = ${MVD.lhs} ->> ${MVD.rhs}:`);
// console.log(chaseEntailmentMVD(relation, C, MVD));

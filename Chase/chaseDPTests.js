import { chaseDP } from './chaseDP.js';

let relation, C, relationSchemes, result;

relation = ['A', 'B', 'C', 'D', 'E'];
C = [
        {
                lhs: ['A'],
                rhs: ['B'],
                mvd: false
        },
        {
                lhs: ['B'],
                rhs: ['C'],
                mvd: false
        },
        {
                lhs: ['C', 'D'],
                rhs: ['E'],
                mvd: true
        }
]

relationSchemes= [
    ['A', 'B', 'C'],
    ['C', 'D', 'E']
];

result = chaseDP(relation, C, relationSchemes);
console.log(result);

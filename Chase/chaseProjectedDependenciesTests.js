import { TYPE_CHASE_WITH_DISTINGUISHED_VARIABLE, TYPE_SIMPLE_CHASE } from '../backend/global.js';
import { chaseProjectedDependencies } from './chaseProjectedDependencies.js';
import { prettyPrintResult, prettyPrintC } from './helpers.js';

let relation, C, projectedRelation, MVD, JD, resultPhrase;
let outputElement = document.getElementById('output');

// test case 1
relation = ['A', 'B', 'C', 'D'];
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
    rhs: ['A'],
    mvd: true
  }
]
projectedRelation = ['A', 'B', 'C']

resultPhrase = `Relation ${relation} with C = ${prettyPrintC(C)}. What are the FD/MVD for the projected relation ${projectedRelation}? `;
let result = chaseProjectedDependencies(relation, C, projectedRelation, TYPE_CHASE_WITH_DISTINGUISHED_VARIABLE);
prettyPrintResult(result, outputElement, resultPhrase);
console.log(result)
const textnode = document.createTextNode(result.result);
document.getElementById('result').appendChild(textnode);
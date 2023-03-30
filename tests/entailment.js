import { chase } from "../backend/chase";
import { ENTAILMENT } from "../backend/global";

const task = ENTAILMENT

/**
 * TEST CASE 1
 * Expected: True
 */
const relation1 = ['A', 'B', 'C', 'D'];
const fds1 = [
  {
    lhs: ['A'],
    rhs: ['B', 'C'],
    mvd: true
  },
  {
    lhs: ['D'],
    rhs: ['C'],
    mvd: false
  }
]
const otherInfo1 = {
  lhs: ['A'],
  rhs: ['C'],
  mvd: false 
}
chase(relation1, fds1, task, otherInfo1)

/**
 * TEST CASE 2
 * Expected: True
 */
const relation2 = ['A', 'B', 'C', 'D'];
const fds2 = [
  {
    lhs: ['A'],
    rhs: ['B'],
    mvd: true
  },
  {
    lhs: ['B'],
    rhs: ['C'],
    mvd: true
  }
]
const otherInfo2 = {
  lhs: ['A'],
  rhs: ['C'],
  mvd: true 
}
chase(relation2, fds2, task, otherInfo2)

/**
 * TEST CASE 3
 * Expected: False
 */
const relation3 = ['A', 'B', 'C', 'D'];
const fds3 = [
  {
    lhs: ['A'],
    rhs: ['B', 'C'],
    mvd: true
  },
  {
    lhs: ['C', 'D'],
    rhs: ['B'],
    mvd: false
  }
]
const otherInfo3 = {
  lhs: ['A'],
  rhs: ['B'],
  mvd: false 
}
chase(relation3, fds3, task, otherInfo3)

import { chase } from "../backend/chase";

const task = PROJECTED_DEPENDENCIES

/**
 * TEST CASE 1
 * Expected: A->B, B->C
 */
const relation1 = ['A', 'B', 'C', 'D'];
const fds1 = [
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
const otherInfo1 = {
  projection: ['A', 'B', 'C']
}
chase(relation1, fds1, task, otherInfo1)

/**
 * TEST CASE 2
 * Expected: A->B, B->C, CD->->A
 */
const relation2 = ['A', 'B', 'C', 'D', 'E'];
const fds2 = [
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
    lhs: ['D'],
    rhs: ['E'],
    mvd: false
  },
  {
    lhs: ['C', 'D'],
    rhs: ['A'],
    mvd: true
  }
]
const otherInfo2 = {
  projection: ['A', 'B', 'C']
}
chase(relation2, fds2, task, otherInfo2)

/**
 * TEST CASE 3
 * Expected: A->B, B->E
 */
const relation3 = ['A', 'B', 'C', 'D', 'E'];
const fds3 = [
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
  },
  {
    lhs: ['C'],
    rhs: ['E'],
    mvd: false
  }
]
const otherInfo3 = {
  projection: ['A', 'B', 'E']
}
chase(relation3, fds3, task, otherInfo3)

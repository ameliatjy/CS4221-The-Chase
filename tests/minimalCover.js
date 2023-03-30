import { chase } from "../backend/chase";
import { MINIMAL_COVER } from "../backend/global";

const task = MINIMAL_COVER
const otherInfo = null

/**
 * TEST CASE 1
 * Expected: True
 */
const relation1 = ['A', 'B', 'C', 'D', 'E'];
const fds1 = [
  {
    lhs: ['A', 'B'],
    rhs: ['C'],
    mvd: false
  },
  {
    lhs: ['C', 'D'],
    rhs: ['E'],
    mvd: false
  },
  {
    lhs: ['E'],
    rhs: ['A'],
    mvd: false
  }
]
chase(relation1, fds1, task, otherInfo)

/**
 * TEST CASE 2
 * Expected: False
 */
const relation2 = ['A', 'B', 'C', 'D'];
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
    lhs: ['C'],
    rhs: ['D'],
    mvd: false
  },
  {
    lhs: ['A', 'B'],
    rhs: ['C', 'D'],
    mvd: true
  }
]
chase(relation2, fds2, task, otherInfo)

/**
 * TEST CASE 3
 * Expected: True
 */
const relation3 = ['A', 'B', 'C', 'D'];
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
  }
]
chase(relation3, fds3, task, otherInfo)

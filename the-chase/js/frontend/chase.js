import { TASK_ENTAILMENT, TASK_LOSSLESS_DECOMPOSITION, TASK_PROJECTED_DEPENDENCIES, TASK_MINIMAL_COVER, TASK_TEST_DEPENDENCY_PRESERVATION } from "./global.js"

/**
 * This function runs the chase algorithm.
 * 
 * @param {Object} relation   Table relation.
 * @param {Object} fds        Array of functional dependencies.
 * @param {Number} task       Task to run chase algorithm for.
 * @param {Object} otherInfo  Additional information required for each task.
 *                            For task ENTAILMENT, dependency to chase for.
 *                            For task LOSSLESS_DECOMPOSITION, table decomposition schemas.
 *                            For task PROJECTED_DEPENDENCIES, subset of relation.
 *                            For task MINIMAL_COVER, list of functional dependencies.
 *                            For task TEST_DEPENDENCY_PRESERVATION, schemas of the decomposed fragments.
 * 
 * @return {Object} Result of chase and array of tableau state at each step of chase.
 */
export function chase(relation, fds, task, type, otherInfo) {
  switch (task) {
    case TASK_ENTAILMENT:
      chaseEntailment();
      break;
    case TASK_LOSSLESS_DECOMPOSITION:
      chaseLosslessDecomposition();
      break;
    case TASK_PROJECTED_DEPENDENCIES:
      chaseProjectedDependencies();
      break;
    case TASK_MINIMAL_COVER:
      chaseMinimalCover();
      break;
    case TASK_TEST_DEPENDENCY_PRESERVATION:
      chaseTestDependencyPreservation();
      break;
    default:
      break;
  }
}

function chaseEntailment() {

}

function chaseLosslessDecomposition() {

}

function chaseProjectedDependencies() {

}

function chaseMinimalCover() {

}

function chaseTestDependencyPreservation() {

}
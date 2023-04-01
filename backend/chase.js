import { TASK_ENTAILMENT, TASK_LOSSLESS_DECOMPOSITION, TASK_MINIMAL_COVER, TASK_PROJECTED_DEPENDENCIES, TASK_TEST_DEPENDENCY_PRESERVATION } from "./global";

/**
 * This function runs the chase algorithm.
 * 
 * @param {Object} relation   Table relation.
 * @param {Object} fds        Array of functional dependencies.
 * @param {Number} task       Task to run chase algorithm for.
 * @param {Number} type       Type of chase to run.
 * @param {Object} otherInfo  Additional information required for each task.
 *                            For task TASK_ENTAILMENT, dependency to chase for.
 *                            For task TASK_LOSSLESS_DECOMPOSITION, table decomposition schemas.
 *                            For task TASK_PROJECTED_DEPENDENCIES, subset of relation.
 *                            For task TASK_MINIMAL_COVER, null.
 *                            For task TASK_TEST_DEPENDENCY_PRESERVATION, schemas of the decomposed fragments.
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

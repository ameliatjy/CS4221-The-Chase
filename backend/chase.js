// constants for the different chase tasks
const ENTAILMENT = 1;
const LOSSLESS_DECOMPOSITION = 2;
const PROJECTED_DEPENDENCIES = 3;
const MINIMAL_COVER = 4;
const TEST_DEPENDENCY_PRESERVATION = 5;

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
 *                            For task MINIMAL_COVER, null.
 *                            For task TEST_DEPENDENCY_PRESERVATION, schemas of the decomposed fragments.
 * 
 * @return {Object} Result of chase and array of tableau state at each step of chase.
 */
function chase(relation, fds, task, otherInfo) {
  switch (task) {
    case ENTAILMENT:
      chaseEntailment();
      break;
    case LOSSLESS_DECOMPOSITION:
      chaseLosslessDecomposition();
      break;
    case PROJECTED_DEPENDENCIES:
      chaseProjectedDependencies();
      break;
    case MINIMAL_COVER:
      chaseMinimalCover();
      break;
    case TEST_DEPENDENCY_PRESERVATION:
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

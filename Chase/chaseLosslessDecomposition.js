import { setupTableauForRelationSchemes } from './setupTableau.js';

export function chaseLosslessDecomposition(relation, C, relationSchemes) {
        // step 1: setup the tableau for the relationSchemes based on the relation
        let tableau = setupTableauForRelationSchemes(relation, relationSchemes);

        console.log(`Relation: ${relation}`);
        console.log(`Relation Schemes: ${relationSchemes}`);
        console.log(`Tableau: `, tableau);
        // step 2: loop through C and apply F-rule for each FD in C
        // step 3: loop through C and apply J-rule for each JD in C
        // step 4: return the tableau
}

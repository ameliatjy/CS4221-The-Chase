import { convertMVDToFragments } from './helpers.js';

export function setupTableauForRelationSchemes(relation, relationSchemes) {
        // note that relation is an array of column names
        // set non-distinguished variable count to 1
        let nonDistinguishedVariableCount = 1;

        let tableau = {
                columns: relation,
                rows: [],
        };

        // for each relation scheme in relationSchemes, create a row in the tableau
                // for the columns in this relation scheme, add a distinguished variable to the corresponding index in the row (distingushed variable count should increment by 1 for each value placement)
                // for the columns that are not in the relation scheme, add a non-distinguished variable to the corresponding index in the row (non-distinguished variable count should increment by 1 for each value placement)
        for (let i = 0; i < relationSchemes.length; i++) {
                let currentRelationScheme = relationSchemes[i];
                let currentRow = [];
                for (let j = 0; j < relation.length; j++) {
                        let currentColumn = relation[j];
                        if (currentRelationScheme.includes(currentColumn)) {
                                currentRow.push(`a${j + 1}`);
                        } else {
                                currentRow.push(`b${nonDistinguishedVariableCount}`);
                                nonDistinguishedVariableCount++;
                        }

                }
                tableau.rows.push(currentRow);
        }

        // return the tableau
        return tableau;
}

// TODO: Looks like this is the setup for "Simple Chase" that Prof was talking about. Remember to create another setup, where the first row is distinguished
export function setupTableauForChasingFD(relation, FD) {
        // note that relation is an array of column names
        // set non-distinguished variable count to 1
        let nonDistinguishedVariableCount = 1;

        let tableau = {
                columns: relation,
                rows: [],
        };
        
        // create two rows in the tableau where the values in the columns of the LHS of the FD are distinguished variables
        for (let i = 0; i < 2; i++) {
                let currentRow = [];

                for (let j = 0; j < relation.length; j++) {
                        let currentColumn = relation[j];
                        if (FD.lhs.includes(currentColumn)) {
                                currentRow.push(`a1`);
                        } else {
                                currentRow.push(`b${nonDistinguishedVariableCount}`);
                                nonDistinguishedVariableCount++;
                        }
                }
                
                tableau.rows.push(currentRow);
        }

        // return the tableau
        return tableau;
}

export function setupTableauForChasingMVD(relation, MVD) {
        let fragments = convertMVDToFragments(relation, MVD);

        // use setupTableauForRelationSchemes to create a tableau for the JD
        return setupTableauForRelationSchemes(relation, fragments);
}

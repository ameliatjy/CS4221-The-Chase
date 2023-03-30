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

function setupTableauForRelationSchemes(relation, relationSchemes) {
        // note that relation is an array of column names
        // set distinguished variable count to 1
        let distinguishedVariableCount = 1;
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
                                currentRow.push(`a${distinguishedVariableCount}`);
                                distinguishedVariableCount++;
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

import { isTableauFormattedCorrectly, isJDFormattedCorrectly } from './helpers.js';

export function jRule(tableau, JD) {
        // step 0: check if the tableau and JD are in the correct format
        if (! isTableauFormattedCorrectly(tableau)) {
                throw new Error('The tableau is not in the correct format.');
        }

        if (! isJDFormattedCorrectly(JD)) {
                throw new Error('The JD is not in the correct format.');
        }

        // step 1: ensure that there are only two relation schemes in the JD
        // if there are more than two, see if we can join the first two and then recursively call jRule on the new JD and the original tableau
        if (JD.relationSchemes.length > 2) {
                let newJD = joinRelationSchemes(JD);
                return jRule(tableau, newJD);
        }


        // step 2: find the common attributes between the first two relation schemes. Once that is done, find rows in the tableau which have the same values in these common attributes. Store these pair of rows in an array.
        let commonAttributes = getCommonAttributes(JD.relationSchemes[0], JD.relationSchemes[1]);
        let rowsToJoin = getRowsToJoin(tableau, commonAttributes);

        // step 3: for each pair of rows, join them together and add the result to the tableau
        // to join the rows create an empty row. For each column in the first fragment, get the values from the first row and fill the empty row in the appropriate columns. For each column in the second fragement, get the values from the second row and fill the empty row in the appropriate column
        let newRow = [];
        for (let i = 0; i < tableau.columns.length; i++) {
                let currentColumn = tableau.columns[i];

                // is the current column common to both relation schemes? if yes take the value from either row of the rows to join
                // is the current column from the first relation scheme? if yes, take the value from the first row of the rows to join
                // is the current column from the second relation scheme? if yes, take the value from the second row of the rows to join

                if (commonAttributes.includes(currentColumn)) {
                        newRow.push(rowsToJoin[0][tableau.columns.indexOf(currentColumn)]);

                        continue;
                }

                if (JD.relationSchemes[0].includes(currentColumn)) {
                        newRow.push(rowsToJoin[0][tableau.columns.indexOf(currentColumn)]);

                        continue;
                }

                if (JD.relationSchemes[1].includes(currentColumn)) {
                        newRow.push(rowsToJoin[1][tableau.columns.indexOf(currentColumn)]);

                        continue;
                } 
        }


        // step 4: create a new tableau that has the new row added to it
        return {
                columns: tableau.columns,
                rows: [
                        ...tableau.rows,
                        newRow,
                ]
        };
        
}

function getRowsToJoin(tableau, commonAttributes) {
        // step 1: get the indexes of the common attributes in the tableau
        // step 2: for each row in the tableau, get the values of the common attributes
        // step 3: for each row in the tableau, check if the values of the common attributes match the values of the common attributes in the current row
        // if they do, add the pair of rows to the rowsToJoin array
        // step 4: return the rowsToJoin array

        let rowsToJoin = [];
        
        let indexesOfCommonAttributes = [];
        for (let i = 0; i < commonAttributes.length; i++) {
                indexesOfCommonAttributes.push(tableau.columns.indexOf(commonAttributes[i]));
        }

        for (let i = 0; i < tableau.rows.length; i++) {
                let currentRow = tableau.rows[i];
                let currentRowValues = [];
                for (let j = 0; j < indexesOfCommonAttributes.length; j++) {
                        currentRowValues.push(currentRow[indexesOfCommonAttributes[j]]);
                }

                for (let j = i + 1; j < tableau.rows.length; j++) {
                        let nextRow = tableau.rows[j];
                        let nextRowValues = [];
                        for (let k = 0; k < indexesOfCommonAttributes.length; k++) {
                                nextRowValues.push(nextRow[indexesOfCommonAttributes[k]]);
                        }

                        if (arraysAreEqual(currentRowValues, nextRowValues)) {
                                // NOTE: this may pose problems if more than one pair of rows are found to be joinable. Choosing to ignore this case.
                                rowsToJoin.push(currentRow);
                                rowsToJoin.push(nextRow);

                                break;
                        }

                }

        }

        return rowsToJoin;

}

function arraysAreEqual(array1, array2) {
        // step 1: check if the arrays are the same length
        // if they are not, return false
        // step 2: for each element in array1, check if the element is in array2
        // if it is not, return false
        // step 3: return true

        if (array1.length !== array2.length) {
                return false;
        }

        for (let i = 0; i < array1.length; i++) {
                if (! array2.includes(array1[i])) {
                        return false;
                }
        }

        return true;
}

function joinRelationSchemes(JD) {
        // check if there is at least one common attribute between the first two relation schemes
        // if there is a common attribute, join the two relation schemes to create a new relation scheme
        // return a new JD with the new relation scheme and the remaining relation schemes
        
        // step 1: get the first two relation schemes
        // step 2: check if there is at least one common attribute between the first two relation schemes
        // if there is no common attribute, throw an error
        // step 3: join the two relation schemes to create a new relation scheme
        // step 4: return a new JD with the new relation scheme and the remaining relation schemes

        let newJD = {
                relationSchemes: [],
        };

        let relationSchemes = JD.relationSchemes;
        let firstRelationScheme = relationSchemes[0];
        let secondRelationScheme = relationSchemes[1];

        let commonAttributes = getCommonAttributes(firstRelationScheme, secondRelationScheme);

        if (commonAttributes.length === 0) {
                throw new Error('There are no common attributes between the first two relation schemes.');
        }

        let newRelationScheme = joinRelationScheme(firstRelationScheme, secondRelationScheme);

        newJD.relationSchemes.push(newRelationScheme);

        for (let i = 2; i < relationSchemes.length; i++) {
                newJD.relationSchemes.push(relationSchemes[i]);
        }

        return newJD;
}


function getCommonAttributes(firstRelationScheme, secondRelationScheme) {
        // step 1: get the attributes of the first relation scheme
        // step 2: get the attributes of the second relation scheme
        // step 3: return the intersection of the two arrays
        
        let firstAttributes = firstRelationScheme;
        let secondAttributes = secondRelationScheme;

        let commonAttributes = firstAttributes.filter(attribute => secondAttributes.includes(attribute));

        return commonAttributes;
}

function joinRelationScheme(firstRelationScheme, secondRelationScheme) {
        // step 1: get the attributes of the first relation scheme
        // step 2: get the attributes of the second relation scheme
        // step 3: get the common attributes
        // step 4: get the attributes of the first relation scheme that are not common attributes
        // step 5: get the attributes of the second relation scheme that are not common attributes
        // step 6: create a new relation scheme with the attributes of the first relation scheme that are not common attributes, the common attributes, and the attributes of the second relation scheme that are not common attributes

        let firstAttributes = firstRelationScheme;
        let secondAttributes = secondRelationScheme;

        let commonAttributes = getCommonAttributes(firstRelationScheme, secondRelationScheme);

        let firstAttributesNotCommon = firstAttributes.filter(attribute => !commonAttributes.includes(attribute));
        let secondAttributesNotCommon = secondAttributes.filter(attribute => !commonAttributes.includes(attribute));
        
        let newRelationScheme = firstAttributesNotCommon.concat(commonAttributes, secondAttributesNotCommon);

        return newRelationScheme;
}


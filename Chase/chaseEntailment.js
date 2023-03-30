import { setupTableauForChasingFD, setupTableauForChasingMVD } from './setupTableau.js';
import { convertMVDToFragments, isFD, isJD, prettyPrintJD } from './helpers.js';
import { fRule } from './fRule.js';
import { jRule } from './jRule.js';

export function chaseEntailmentFD(relation, C, FD) {
        // step 1: setup the tableau for the relation based on the FD
        let tableau = setupTableauForChasingFD(relation, FD);
        
        let processedC = convertMVDsToJDs(relation, C);
 
        // step 2: loop through C and apply F-rule for each FD in C
        for (let i = 0; i < processedC.length; i++) {
                let currentFD = processedC[i];
                if (isFD(currentFD)) {
                        tableau = fRule(tableau, currentFD);
                }

                if (isJD(currentFD)) {
                        tableau = jRule(tableau, currentFD);
                }
        }

        // step 4: return the tableau
        return tableau;
}

export function chaseEntailmentMVD(relation, C, MVD) {
        // step 1: setup the tableau for the relation based on the MVD
        let tableau = setupTableauForChasingMVD(relation, MVD);

        console.log(`Relation: ${relation}`);
        console.log(`MVD: ${MVD}`);
        console.log(`Tableau: `, tableau);

        // step 2: loop through C and apply F-rule for each FD in C
        // step 3: loop through C and apply J-rule for each JD in C
        // step 4: return the tableau
        // return tableau;
}


function convertMVDsToJDs(relation, C) {
        let processedC = [];

        for (let i = 0; i < C.length; i++) {
                let FD = C[i];
                if (FD.mvd) {
                        let JD = {
                                relationSchemes: convertMVDToFragments(relation, FD),
                        }

                        processedC.push(JD);
                } else {
                        processedC.push(FD);
                }
        }

        return processedC;
}



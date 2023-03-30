import { setupTableauForChasingFD, setupTableauForChasingMVD } from './setupTableau.js';

export function chaseEntailmentFD(relation, C, FD) {
        // step 1: setup the tableau for the relation based on the FD
        let tableau = setupTableauForChasingFD(relation, FD);

        console.log(`Relation: ${relation}`);
        console.log(`FD: ${FD}`);
        console.log(`Tableau: `, tableau);
        // step 2: loop through C and apply F-rule for each FD in C
        // step 3: loop through C and apply J-rule for each JD in C
        // step 4: return the tableau
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


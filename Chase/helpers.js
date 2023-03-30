export function isTableauFormattedCorrectly(tableau) {
        if (!tableau.columns || !tableau.rows) {
                return false;
        }

        if (tableau.columns.length !== tableau.rows[0].length) {
                return false;
        }

        return true;
}

export function isFDFormattedCorrectly(FD) {
        if (!FD.lhs || !FD.rhs) {
                return false;
        }

        if (FD.mvd) {
                return false;
        }

        return true;
}

export function isJDFormattedCorrectly(JD) {
        if (!JD.relationSchemes || !JD.relationSchemes.length) {
                return false;
        }
        
        // NOTE: We are only allowing up to 3 relation schemes per JD for now
        if (JD.relationSchemes.length > 3) {
                return false;
        }

        return true;
}

export function convertMVDToFragments(relation, MVD) { 
        // convert the MVD to a JD
        // let X be MVD.lhs
        // let Y be MVD.rhs
        // let Z be the columns in relation that are not in X or Y
        // let the JD be *[[X,Y], [X,Z]]
        // Create an array of fragments and put XY and XZ in it

        let X = MVD.lhs;
        let Y = MVD.rhs;
        let Z = [];
        for (let i = 0; i < relation.length; i++) {
                let currentColumn = relation[i];
                if (!X.includes(currentColumn) && !Y.includes(currentColumn)) {
                        Z.push(currentColumn);
                }
        }

        return [[...X, ...Y], [...X, ...Z]];
}

export function isFD(dependency) {
        if (dependency.relationSchemes) {
                return false;
        }

        return true;
}

export function isJD(dependency) {
        if (dependency.lhs) {
                return false;
        }

        if (! dependency.relationSchemes) {
                return false;
        }

        return true;
}

export function prettyPrintJD(JD) {
        // take in an object that has relationSchemes as a property with an array of arrays where each array reprsents a fragment
        // return a string that looks like *[fragment1, fragment2, ...]

        let JDString = '*[';
        for (let i = 0; i < JD.relationSchemes.length; i++) {
                JDString += '[';
                for (let j = 0; j < JD.relationSchemes[i].length; j++) {
                        JDString += JD.relationSchemes[i][j];
                        if (j < JD.relationSchemes[i].length - 1) {
                                JDString += ', ';
                        }
                }
                JDString += ']';
                if (i < JD.relationSchemes.length - 1) {
                        JDString += ', ';
                }
        }

        JDString += ']';

        return JDString;
}

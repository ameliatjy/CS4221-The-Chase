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


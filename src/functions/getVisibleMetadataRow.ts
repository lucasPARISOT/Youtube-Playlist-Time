/*
 * ============================================================
 * METADATA ROW
 * ============================================================
 */

import isElementVisible from "./isElementVisible.js";

function getVisibleMetadataRow(
    metadataHost: Element
) {
    if (!metadataHost) {
        return null;
    } 

    const rows =
        Array.from(
            metadataHost.querySelectorAll(
                ".ytContentMetadataViewModelMetadataRow"
            )
        );

    /*
     * IMPORTANT:
     *
     * We want the LAST visible row.
     */
    for (
        let i = rows.length - 1;
        i >= 0;
        i--
    ) {
        const row =
            rows[i];

        if (
            isElementVisible(row)
        ) {
            return row;
        }
    }

    return null;
}

export default getVisibleMetadataRow
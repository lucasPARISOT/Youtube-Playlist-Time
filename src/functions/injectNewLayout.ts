/*
 * ============================================================
 * NEW LAYOUT
 * ============================================================
 */

import { CUSTOM_DELIMITER_ID, CUSTOM_DURATION_ID } from "./config.ts";
import getVisibleMetadataHost from "./getVisibleMetadataHost.ts";
import getVisibleMetadataRow from "./getVisibleMetadataRow.ts";

function injectNewLayout() {
    const metadataHost =
        getVisibleMetadataHost(); 

    if (!metadataHost) {
        return null;
    }

    const targetRow =
        getVisibleMetadataRow(
            metadataHost
        );

    if (!targetRow) {
        return null;
    }

    let customText: HTMLElement | null =
        targetRow.querySelector(
            `#${CUSTOM_DURATION_ID}`
        );

    let delimiter: HTMLElement | null =
        targetRow.querySelector(
            `#${CUSTOM_DELIMITER_ID}`
        );

    /*
     * Already exists in the correct row.
     */
    if (
        customText &&
        customText.isConnected
    ) {
        return {
            customText,
            delimiter
        };
    }

    /*
     * Create delimiter.
     */
    delimiter =
        document.createElement(
            "span"
        );

    delimiter.id =
        CUSTOM_DELIMITER_ID;

    delimiter.setAttribute(
        "aria-hidden",
        "true"
    );

    delimiter.className =
        "ytContentMetadataViewModelDelimiter";

    delimiter.textContent =
        "•";

    delimiter.style.marginLeft =
        "4px";

    delimiter.style.marginRight =
        "4px";

    /*
     * Create duration.
     */
    customText =
        document.createElement(
            "span"
        );

    customText.id =
        CUSTOM_DURATION_ID;

    customText.className =
        "ytAttributedStringHost " +
        "ytContentMetadataViewModelMetadataText " +
        "ytAttributedStringWhiteSpacePreWrap " +
        "ytAttributedStringLinkInheritColor";

    customText.setAttribute(
        "dir",
        "auto"
    );

    customText.setAttribute(
        "role",
        "text"
    );

    customText.style.color =
        "rgba(255,255,255,0.7)";

    /*
     * Append to LAST visible row.
     */
    targetRow.appendChild(
        delimiter
    );

    targetRow.appendChild(
        customText
    );

    return {
        customText,
        delimiter
    };
}

export default injectNewLayout
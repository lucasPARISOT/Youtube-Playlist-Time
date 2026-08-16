/*
 * ============================================================
 * METADATA HOST
 * ============================================================
 */

import isElementVisible from "./isElementVisible.js";

function getVisibleMetadataHost() {
    const hosts =
        document.querySelectorAll(
            "yt-page-header-renderer yt-content-metadata-view-model, " +
            "yt-content-metadata-view-model"
        );
 
    for (const host of hosts) {

        if (
            isElementVisible(host)
        ) {
            return host;
        }
    }

    return null;
}

export default getVisibleMetadataHost;
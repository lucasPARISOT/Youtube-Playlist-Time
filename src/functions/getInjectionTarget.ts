/*
 * ============================================================
 * GET / CREATE TARGET
 * ============================================================
 */

import injectNewLayout from "./injectNewLayout.js";
import injectOldLayout from "./injectOldLayout.js";
import isElementVisible from "./isElementVisible.js";

function getInjectionTarget() {

    // Only change the DOM when on a playlist page with a `list` query param
    // i.e. https://www.youtube.com/playlist?list=*
    try {
        const url = new URL(window.location.href);
        const isYouTubeOrigin = url.origin === 'https://www.youtube.com';
        const isPlaylistPath = url.pathname === '/playlist';
        const hasListParam = url.searchParams.has('list');

        if (!(isYouTubeOrigin && isPlaylistPath && hasListParam)) {
            // Not a playlist page — do not inject or start observers
            return;
        }
    } catch (e) {
        // If URL parsing fails for any reason, be conservative and do nothing
        return;
    }

    /* 
     * Old YouTube layout.
     */
    const playlistByline =
        document.querySelector(
            "ytd-playlist-byline-renderer"
        );

    if (
        playlistByline &&
        isElementVisible(
            playlistByline
        )
    ) {
        return injectOldLayout();
    }

    /*
     * New YouTube layout.
     */
    return injectNewLayout();
}

export default getInjectionTarget
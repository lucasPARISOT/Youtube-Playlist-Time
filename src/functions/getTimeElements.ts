/*
 * ============================================================
 * TIME ELEMENTS
 * ============================================================
 */

function getTimeElements() {
    return document.querySelectorAll(
        "ytd-playlist-video-renderer .badge-shape-wiz__text, " +
        "ytd-playlist-video-renderer .ytBadgeShapeText, " +
        "ytd-playlist-video-renderer ytd-thumbnail-overlay-time-status-renderer, " +
        "ytd-playlist-video-renderer .thumbnail-overlay-time-status span, " +
        "yt-lockup-view-model yt-thumbnail-badge-view-model badge-shape div:nth-child(2), " +
        "yt-lockup-view-model .badge-shape-wiz__text"
    );
}

export default getTimeElements;
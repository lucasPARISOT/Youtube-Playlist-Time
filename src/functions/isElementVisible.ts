/*
 * ============================================================
 * VISIBILITY
 * ============================================================
 */

function isElementVisible(element: Element) {
    if (!element) {
        return false;
    } 

    const rect =
        element.getBoundingClientRect();

    return (
        rect.width > 0 &&
        rect.height > 0 &&
        element.getClientRects().length > 0
    );
}

export default isElementVisible;
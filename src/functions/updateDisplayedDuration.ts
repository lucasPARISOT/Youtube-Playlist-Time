/*
 * ============================================================
 * UPDATE DISPLAY
 * ============================================================
 */

import calculateTotalDuration from "./calculateTotalDuration.ts";
import formatDuration from "./formatDuration.ts";
import getInjectionTarget from "./getInjectionTarget.ts";

function updateDisplayedDuration() {
 
    const {
        totalSeconds,
        count
    } =
        calculateTotalDuration();

    /*
     * No durations yet.
     */
    if (
        count === 0 ||
        totalSeconds === 0
    ) {
        return;
    }

    const target =
        getInjectionTarget();

    if (
        !target ||
        !target.customText
    ) {
        return;
    }

    const formatted =
        formatDuration(
            totalSeconds
        );

    /*
     * Don't touch the DOM if the value
     * hasn't changed.
     */
    if (
        target.customText.textContent !==
        formatted
    ) {
        target.customText.textContent =
            formatted;
    }

    if (target.delimiter) {
        target.delimiter.style.display =
            "";
    }
}

export default updateDisplayedDuration
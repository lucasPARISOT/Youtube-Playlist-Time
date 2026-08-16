/*
 * ============================================================
 * DOM STABILITY TRACKER
 * ============================================================
 *
 * This is NOT used to permanently stop observing.
 *
 * It is only used to avoid displaying a premature result
 * while YouTube is currently injecting many videos.
 */

import calculateTotalDuration from "./calculateTotalDuration.ts";
import scheduleUpdate from "./scheduleUpdate.ts";
import updateDisplayedDuration from "./updateDisplayedDuration.ts";

/*
 * Quand le nombre de vidéos reste identique pendant
 * cette durée, on considère le DOM actuellement stable.
 */
const STABLE_DELAY = 1000;

let stableTimer: string | number | NodeJS.Timeout | undefined
let lastVideoCount = 0;

function resetStableDOMTracking() {
    lastVideoCount = 0;
}

function waitForStableDOM() {

    clearTimeout(
        stableTimer
    );

    const {
        count
    } =
        calculateTotalDuration();

    /*
     * Number of durations changed.
     *
     * Reset stability timer.
     */
    if (
        count !== lastVideoCount
    ) {
        lastVideoCount =
            count;

        stableTimer =
            setTimeout(
                () => {

                    /*
                     * Recalculate after stability.
                     */
                    updateDisplayedDuration();

                },
                STABLE_DELAY
            );

        return;
    }

    /*
     * Same number of videos.
     *
     * Still update immediately because this may be
     * a mutation changing a duration without changing
     * the number of elements.
     */
    scheduleUpdate();
}

export { resetStableDOMTracking };
export default waitForStableDOM
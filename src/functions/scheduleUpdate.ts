/*
 * ============================================================
 * DEBOUNCED UPDATE
 * ============================================================
 */

import updateDisplayedDuration from "./updateDisplayedDuration.js";

let updateTimer: string | number | NodeJS.Timeout | undefined

/*
 * Recalcul après modification du DOM.
 */
const RECALCULATE_DEBOUNCE = 250;

function scheduleUpdate() {

    clearTimeout(
        updateTimer
    );

    updateTimer =
        setTimeout(
            () => {

                /*
                 * Recalculate from scratch.
                 */
                updateDisplayedDuration();

            },
            RECALCULATE_DEBOUNCE
        );
}

export default scheduleUpdate
/*
 * ============================================================
 * CALCULATE TOTAL
 * ============================================================
 *
 * IMPORTANT:
 *
 * The total is ALWAYS rebuilt from zero.
 *
 * We NEVER do:
 *
 * total += newVideos
 *
 * This prevents duplicated values when YouTube lazy-loads
 * elements or reuses DOM nodes.
 */

import { CUSTOM_DURATION_ID, CUSTOM_DELIMITER_ID } from "./config.ts";
import getTimeElements from "./getTimeElements.ts";
import parseTimeToSeconds from "./parseTimeToSeconds.ts";

function calculateTotalDuration() {
    const timeElements =
        getTimeElements();
 
    const uniqueElements =
        new Set();

    let totalSeconds = 0;
    let count = 0;

    timeElements.forEach((element) => {

        /*
         * Ignore our own UI.
         */
        if (
            element.closest(
                `#${CUSTOM_DURATION_ID}, ` +
                `#${CUSTOM_DELIMITER_ID}`
            )
        ) {
            return;
        }

        /*
         * Deduplicate DOM elements.
         */
        if (
            uniqueElements.has(element)
        ) {
            return;
        }

        uniqueElements.add(element);

        const seconds =
            parseTimeToSeconds(
                element.textContent
            );

        /*
         * Ignore invalid values.
         */
        if (
            seconds <= 0
        ) {
            return;
        }

        totalSeconds += seconds;
        count++;
    });

    return {
        totalSeconds,
        count
    };
}

export default calculateTotalDuration
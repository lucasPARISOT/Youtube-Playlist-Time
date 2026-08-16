/*
 * ============================================================
 * REMOVE OUR UI
 * ============================================================
 */
 
import { CUSTOM_BR_ID, CUSTOM_DELIMITER_ID, CUSTOM_DURATION_ID } from "./config.ts";

function removeCustomDuration() {
    document
        .querySelectorAll(
            `#${CUSTOM_DURATION_ID}, ` +
            `#${CUSTOM_DELIMITER_ID}, ` +
            `#${CUSTOM_BR_ID}`
        )
        .forEach((element) => {
            element.remove();
        });
}

export default removeCustomDuration;
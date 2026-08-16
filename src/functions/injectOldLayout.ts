/*
 * ============================================================
 * OLD LAYOUT
 * ============================================================
 */

import { CUSTOM_BR_ID, CUSTOM_DURATION_ID } from "./config.ts";
import isElementVisible from "./isElementVisible.js";

function injectOldLayout() {
    const playlistByline =
        document.querySelector(
            "ytd-playlist-byline-renderer"
        );
 
    if (
        !playlistByline ||
        !isElementVisible(
            playlistByline
        )
    ) {
        return null;
    }

    let customText: HTMLElement | null =
        playlistByline.querySelector(
            `#${CUSTOM_DURATION_ID}`
        );

    if (!customText) {

        const titleElement =
            playlistByline.querySelector(
                "yt-formatted-string"
            );

        if (!titleElement) {
            return null;
        }

        customText =
            document.createElement(
                "span"
            );

        customText.id =
            CUSTOM_DURATION_ID;

        customText.style.color =
            "rgba(255,255,255,0.7)";

        customText.style.fontSize =
            "12px";

        customText.style.marginLeft =
            "8px";

        titleElement.appendChild(
            customText
        );
    }

    if (
        !document.getElementById(
            CUSTOM_BR_ID
        )
    ) {
        const br =
            document.createElement(
                "br"
            );

        br.id =
            CUSTOM_BR_ID;

        playlistByline.appendChild(
            br
        );
    }

    return {
        customText,
        delimiter: null
    };
}

export default injectOldLayout
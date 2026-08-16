/*
 * ============================================================
 * PLAYLIST OBSERVER
 * ============================================================
 *
 * IMPORTANT:
 *
 * This observer stays alive.
 *
 * Therefore if YouTube lazy-loads:
 *
 * video 101
 * video 102
 * video 103
 *
 * the total is recalculated automatically.
 */

import { CUSTOM_DELIMITER_ID, CUSTOM_DURATION_ID } from "./config.ts";
import waitForStableDOM from "./waitForStableDOM.js";

let playlistObserver: MutationObserver | null

function startPlaylistObserver() {

    if (
        playlistObserver
    ) {
        return;
    }

    playlistObserver =
        new MutationObserver(
            (mutations) => {

                let relevant =
                    false;

                for (
                    const mutation of mutations
                ) {

                    if (
                        mutation.type !==
                        "childList"
                    ) {
                        continue;
                    }

                    /*
                     * Ignore mutations caused exclusively
                     * by our own UI.
                     */
                    if (
                        (mutation.target as HTMLElement).closest &&
                        (mutation.target as HTMLElement).closest(
                            `#${CUSTOM_DURATION_ID}, ` +
                            `#${CUSTOM_DELIMITER_ID}`
                        )
                    ) {
                        continue;
                    }

                    const nodes = [
                        ...mutation.addedNodes,
                        ...mutation.removedNodes
                    ];

                    const onlyOurNodes =
                        nodes.length > 0 &&
                        nodes.every(
                            (node) => {

                                if (
                                    node.nodeType !==
                                    Node.ELEMENT_NODE
                                ) {
                                    return true;
                                }

                                return (
                                    (node as HTMLElement).id ===
                                        CUSTOM_DURATION_ID ||
                                    (node as HTMLElement).id ===
                                        CUSTOM_DELIMITER_ID
                                );
                            }
                        );

                    if (
                        onlyOurNodes
                    ) {
                        continue;
                    }

                    relevant =
                        true;

                    break;
                }

                if (!relevant) {
                    return;
                }

                /*
                 * Lazy loading detected.
                 *
                 * Recalculate.
                 */
                waitForStableDOM();
            }
        );

    playlistObserver.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );
}

function stopPlaylistObserver() {
    if (playlistObserver) {
        playlistObserver.disconnect();
        playlistObserver = null;
    }
}

export { startPlaylistObserver, stopPlaylistObserver };
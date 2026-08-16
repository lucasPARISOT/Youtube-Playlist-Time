import removeCustomDuration from "./removeCustomDuration.ts";
import { startPlaylistObserver, stopPlaylistObserver } from "./startPlaylistObserver.ts";
import { resetStableDOMTracking } from "./waitForStableDOM.ts";
import updateDisplayedDuration from "./updateDisplayedDuration.ts";

let initializationTimer: string | number | NodeJS.Timeout | undefined

const INITIAL_DELAY = 500;

/*
 * ============================================================
 * INITIALIZATION
 * ============================================================
 */
function initialize() {

    clearTimeout(
        initializationTimer
    );

    /*
     * Stop observing while cleaning our UI.
     */
    stopPlaylistObserver();
    resetStableDOMTracking();

    // Remove any existing UI we added on previous pages
    removeCustomDuration();

    initializationTimer =
        setTimeout(
            () => {

                /*
                 * First calculation.
                 */
                updateDisplayedDuration();

                /*
                 * Then permanently observe the page.
                 *
                 * Lazy-loaded videos will trigger
                 * another calculation.
                 */
                startPlaylistObserver();

            },
            INITIAL_DELAY
        );
}

export default initialize
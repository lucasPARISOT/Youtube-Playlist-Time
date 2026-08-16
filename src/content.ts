/*
 * ============================================================
 * YOUTUBE SPA NAVIGATION
 * ============================================================
 */

import initialize from './functions/initialize.ts';

document.addEventListener('yt-navigate-finish', () => {
  initialize();
});

/*
 * ============================================================
 * START
 * ============================================================
 */

initialize();

/*
 * ============================================================
 * FORMAT
 * ============================================================
 */
function formatDuration(totalSeconds: number) {
    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );
 
    const seconds =
        totalSeconds % 60;

    let result = "";

    if (hours > 0) {
        result += `${hours}h `;
    }

    if (minutes > 0 || hours > 0) {
        result += `${minutes}m `;
    }

    result += `${seconds}s`;

    return result.trim();
}

export default formatDuration
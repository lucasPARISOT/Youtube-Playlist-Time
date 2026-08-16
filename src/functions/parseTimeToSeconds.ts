/*
 * ============================================================
 * PARSE TIME
 * ============================================================
 */
function parseTimeToSeconds(text: string) {
    if (!text) {
        return 0;
    }
 
    const parts =
        text.trim()
            .split(":")
            .map(Number);

    if (
        parts.length === 2 &&
        !isNaN(parts[0]) &&
        !isNaN(parts[1])
    ) {
        return (
            parts[0] * 60 +
            parts[1]
        );
    }

    if (
        parts.length === 3 &&
        !isNaN(parts[0]) &&
        !isNaN(parts[1]) &&
        !isNaN(parts[2])
    ) {
        return (
            parts[0] * 3600 +
            parts[1] * 60 +
            parts[2]
        );
    }

    return 0;
}

export default parseTimeToSeconds
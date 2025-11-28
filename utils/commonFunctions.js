export function applyCurrencyFormat(value) {
    if (value == null) return 0;
    return Number(value).toLocaleString("en-IN");
}

export function parseToHoursMinutes(value) {
    if (value == null || value === "") return { hours: 0, minutes: 0 };
    let hours = 0;
    let minutes = 0;
    // If value contains colon → treat as HH:MM
    if (String(value).includes(":")) {
        const [h, m] = String(value).split(":");
        hours = parseInt(h) || 0;
        minutes = parseInt(m) || 0;
    } else {
        // Otherwise treat as decimal → 2.65 means 2 hours + (.65 * 60)
        const num = parseFloat(value);
        if (!isNaN(num)) {
            hours = Math.floor(num);
            minutes = Math.round((num - hours) * 60);
        }
    }
    // Normalize if minutes >= 60
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60;
    }
    return { hours, minutes };
}

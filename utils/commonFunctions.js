export function applyCurrencyFormat(value) {
    if (value == null) return 0;
    return Number(value).toLocaleString("en-IN");
}

export function parseToHoursMinutes(value) {
    if (value == null || value === "") return { hours: 0, minutes: 0 };

    const hours = Math.floor(value / 60);
    const minutes = value % 60;
    return { hours, minutes };
}

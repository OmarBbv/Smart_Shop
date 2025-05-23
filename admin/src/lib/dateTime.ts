const AZERBAIJANI_MONTHS = [
    'yanvar',
    'fevral',
    'mart',
    'aprel',
    'may',
    'iyun',
    'iyul',
    'avqust',
    'sentyabr',
    'oktyabr',
    'noyabr',
    'dekabr',
];

export function formatISOToReadable(
    isoString?: string | null
): string {
    if (!isoString) {
        return '';
    }

    const date = new Date(isoString);
    if (isNaN(date.getTime())) {
        return '';
    }

    const year = date.getFullYear();
    const monthName = AZERBAIJANI_MONTHS[date.getMonth()];
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day} ${monthName} ${year} ${hours}:${minutes}:${seconds}`;
}

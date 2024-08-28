import { DateTime } from 'luxon';

export function convertToDate(pattern: string, dateString?: string | null) {
    console.warn(dateString);
    if (!dateString)
        return '';

    const dateTime = getBackendValidDate(dateString);

    return dateTime.toFormat(pattern);
}

export function getBackendValidDate(dtStr: string): DateTime {
    let dtFormat = 'yyyy-MM-dd';
    const timeFormat = 'HH:mm:ss';
    if (dtStr.includes('/'))
        dtFormat = 'dd/MM/yyyy';
    else if (dtStr.split('-')[0].length == 2)
        dtFormat = 'dd-MM-yyyy';

    if (dtStr.includes(' '))
        dtFormat += ' ' + timeFormat;
    if (dtStr.includes('T'))
        dtFormat += 'T' + timeFormat;

    return DateTime.fromFormat(dtStr, dtFormat);
}
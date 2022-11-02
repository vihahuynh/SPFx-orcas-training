let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// export const INITIAL_EVENTS = [
//     {
//         id: createEventId(),
//         title: 'Rent car',
//         start: '2022-11-02T07:00:00',
//         end: '2022-11-02T09:00:00',
//         resourceId: 1,
//     },
//     {
//         id: createEventId(),
//         title: 'Rent car',
//         start: '2022-11-02T09:00:00',
//         end: '2022-11-02T14:00:00',
//         resourceId: 2,
//     },
//     {
//         id: createEventId(),
//         title: 'Rent car',
//         start: '2022-11-02T16:00:00',
//         end: '2022-11-02T20:00:00',
//         resourceId: 2,
//     }
// ]

export function createEventId() {
    return String(eventGuid++)
}
export function getTimestamp(
createdAt : string 

) {

const created = new Date(createdAt).getTime()
const elapsedSeconds = Math.floor((Date.now() - created) / 1000)
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })


const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
]


for (const [name, secondsInUnit] of UNITS) {
    if (elapsedSeconds >= secondsInUnit) {
        const count = Math.floor(elapsedSeconds / secondsInUnit)
        return rtf.format(-count, name)
    }
}

return 'just now'

}
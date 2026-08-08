function formatLabel(hour: number, minute: number) {
    const period = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    const displayMinute = String(minute).padStart(2, '0')
    return `${displayHour}:${displayMinute} ${period}`
}

export const timeOptions = Array.from({ length: 24 * 4 }, (_, index) => {
    const hour = Math.floor(index / 4)
    const minute = (index % 4) * 15
    const value = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    return { value, label: formatLabel(hour, minute) }
})

export const formatDate = (date) => {
    const newDate = new Date(date)
    return `${newDate.getUTCMonth() + 1}/${newDate.getUTCDate()}/${newDate.getFullYear()}`
}
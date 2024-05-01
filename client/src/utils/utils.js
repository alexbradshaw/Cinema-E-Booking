export const formatDate = (date) => {
    const newDate = new Date(date)
    return `${newDate.getUTCMonth() + 1}/${newDate.getUTCDate()}/${newDate.getFullYear()}`
}

export const formatDateForInput = (date) => {
  const newDate = new Date(date)
  return `${newDate.getFullYear()}-${newDate.getUTCMonth() + 1 < 10 ? '0' : ''}${newDate.getUTCMonth() + 1}-${newDate.getUTCDate() < 10 ? '0' : ''}${newDate.getUTCDate()}`
}

export const formatMovieLength = (length) => {
    const hours = Math.floor(length / 60);
    const minutes = length % 60;
  
    if (minutes < 10) {
      return `${hours}:0${minutes}`
    }

    return `${hours}:${minutes}`
}

export const formatPrice = (number) => {
  return JSON.parse(number).toFixed(2);
}

export const formatTime = (time) => {
  const parsedTime = /^[\d]{1,2}:[\d]{2}/.exec(time);
  if (/^[\d]{1,2}/.exec(time) == '09') {
    return `9:00am`
  }
  return `${parsedTime}pm`
}
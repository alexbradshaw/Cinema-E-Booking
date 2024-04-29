export const formatDate = (date) => {
    const newDate = new Date(date)
    return `${newDate.getUTCMonth() + 1}/${newDate.getUTCDate()}/${newDate.getFullYear()}`
}

export const formatMovieLength = (length) => {
    const hours = Math.floor(length / 60);
    const minutes = length % 60;
  
    if (minutes < 10) {
      return `${hours}:0${minutes}`
    }

    return `${hours}:${minutes}`
}
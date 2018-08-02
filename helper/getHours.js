function getHours(opening, closing) {
  const hours = [];
  for(let i = opening; i <= closing; i++) {
      hours.push(i)
  }
  return hours;
}

module.exports = getHours;

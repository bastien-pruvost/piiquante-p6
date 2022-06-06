exports.getLocaleDate = () => {
  const today = new Date();
  const DD = String(today.getDate()).padStart(2, '0');
  const MM = String(today.getMonth() + 1).padStart(2, '0');
  const YYYY = today.getFullYear();
  const HH = today.getHours();
  const mm = (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();

  return `${DD}/${MM}/${YYYY}-${HH}h${mm}`;
};

// Function to create a random integer in a range of two numbers (for images filename)
exports.getRandomBetween = (min, max) => Math.floor(Math.random() * (max - min) + min);

const roundByIncrement = (ratingDecimal, increment = 25) => {
  let magnitude = 100;
  ratingDecimal -= Math.floor(ratingDecimal);
  ratingDecimal *= magnitude;
  const incrementCount = Math.floor(magnitude / increment);

  let currentIncrement = increment;
  let lastIncrement = 0;
  for (let i = 0; i < incrementCount; i++) {
    if (ratingDecimal <= currentIncrement) {
      return ratingDecimal - lastIncrement >= increment / 2
        ? currentIncrement / magnitude
        : lastIncrement / magnitude;
    }
    lastIncrement = currentIncrement;
    currentIncrement += increment;
  }

  return -1;
};

export default roundByIncrement;
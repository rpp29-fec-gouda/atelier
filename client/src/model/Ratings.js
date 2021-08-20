class Ratings extends Map {
  getNumberOfRatings(productId) {
    let numberOfRatings = 0;
    const ratings = super.get(productId);
    if (ratings) {
      for (const count in ratings) {
        numberOfRatings += parseInt(ratings[count]);
      }
    }

    return numberOfRatings;
  }

  getAverageRating(productId) {
    const numberOfRatings = this.getNumberOfRatings(productId);
    const ratings = super.get(productId);
    if (!ratings || numberOfRatings === 0) {
      return 0;
    }

    let score = 0;
    for (const value in ratings) {
      const ratingCount = ratings[value];
      score += value * ratingCount;
    }

    return score / numberOfRatings;
  }
}

export default Ratings;
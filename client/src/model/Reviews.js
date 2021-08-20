import ProductReviews from './ProductReviews.js';

class Reviews extends Map {
  set(key, value) {
    super.set(key, new ProductReviews(value));
  }

}

export default Reviews;
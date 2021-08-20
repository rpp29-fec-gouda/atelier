// import Products from './Products.js';
import Questions from './Questions.js';
import Ratings from './Ratings.js';
import Reviews from './Reviews.js';
import Styles from './Styles.js';

class Cache {
  constructor() {
    this.products = new Map(); //Products();
    this.questions = new Questions(); //
    this.ratings = new Ratings(); //
    this.reviews = new Reviews(), //
    this.relatedIds = new Map();
    this.styles = new Styles(); //
  }

  getProduct(productId) {
    return this.products.get(productId);
  }

  setProduct(productId, product) {
    this.products.set(productId, product);
  }

  getQuestions(productId) {
    return this.questions.get(productId);
  }

  setQuestions(productId, questions) {
    this.questions.set(productId, questions);
  }

  getRatings(productId) {
    return this.ratings.get(productId);
  }

  setRatings(productId, ratings) {
    this.ratings.set(productId, ratings);
  }

  getReviews(productId) {
    return this.reviews.get(productId);
  }

  setReviews(productId, ratings) {
    this.reviews.set(productId, ratings);
  }

  getRelatedIds(productId) {
    return this.relatedIds.get(productId);
  }

  setRelatedIds(productId, relatedIds) {
    this.relatedIds.set(productId, relatedIds);
  }

  getStyle(productId, styleId) {
    return this.getStyles(productId).get(styleId);
  }

  getStyles(productId) {
    return this.styles.get(productId);
  }

  setStyles(productId, styles) {
    this.styles.set(productId, styles);
  }
}

export default Cache;
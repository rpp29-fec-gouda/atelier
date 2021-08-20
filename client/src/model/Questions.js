import ProductQuestions from './ProductQuestions.js';

class Questions extends Map {
  set(key, value) {
    super.set(key, new ProductQuestions(value))
  }
}

export default Questions;
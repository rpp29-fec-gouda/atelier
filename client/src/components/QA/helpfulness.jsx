

const helpfulness = (module) => {
  if (module) {
    if (module.questionId) {
      console.log('click from questions');
    }
    if (module.reviewId) {
      console.log('click from Review');
    }
  }
};
helpfulness();

export default helpfulness;
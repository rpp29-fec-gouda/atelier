import React from 'react';

const Price = (props) => {
  return (
    <div id="price" class="row-margin">
      $ { props.defaultPrice }
    </div>
  );
};

export default Price;
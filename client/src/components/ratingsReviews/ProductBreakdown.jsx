import React from 'react';

const ProductBreakdown = (props) => {
  const { characteristics } = props;

  // const barChars = [
  //   characteristics.Size,
  //   characteristics.Width,
  //   characteristics.Comfort,
  //   characteristics.Quality,
  //   characteristics.length,
  //   characteristics.Fit
  // ];

  // console.log('barChars:', barChars);

  return (
    <div id='product-breakdown'>
      <div>Size
        <div></div>
        <span>Too small</span>
        <span>Perfect</span>
        <span>Too wide</span>
      </div>

      <div>Width
        <div></div>
        <span>Too narrow</span>
        <span>Perfect</span>
        <span>Too wide</span>
      </div>

      <div>Comfort
        <div></div>
        <span>Uncomfortable</span>
        <span>Ok</span>
        <span>Perfect</span>
      </div>

      <div>Quality
        <div></div>
        <span>Poor</span>
        <span>What I Expected</span>
        <span>Perfect</span>
      </div>

      <div>Length
        <div></div>
        <span>Runs Short</span>
        <span>Perfect</span>
        <span>Runs Long</span>
      </div>

      <div>Fit
        <div></div>
        <span>Runs Tight</span>
        <span>Perfect</span>
        <span>Rung Long</span>
      </div>
    </div>
  );
};

export default ProductBreakdown;
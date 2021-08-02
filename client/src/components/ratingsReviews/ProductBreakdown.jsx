import React from 'react';

const ProductBreakdown = (props) => {
  const { characteristics } = props;
  console.log('characteristics:', characteristics);

  const barChars = [
    characteristics.Size,
    characteristics.Width,
    characteristics.Comfort,
    characteristics.Quality,
    characteristics.Length,
    characteristics.Fit
  ];

  console.log('barChars:', barChars);

  return (
    <div id='productBreakdown'>
      <div>Size
        <div></div>
        <span>Too small</span>
        <span>Perfect</span>
        <span>Too large</span>

      </div>
      <div>Width
        <div></div>

        <span>Too small</span>
        <span>Perfect</span>
        <span>Too large</span>

      </div>
      <div>Comfort
        <div></div>

        <span>Too small</span>
        <span>Perfect</span>
        <span>Too large</span>

      </div>
      <div>Quality
        <div></div>

        <span>Too small</span>
        <span>Perfect</span>
        <span>Too large</span>
      </div>
      <div>Length
        <div></div>
        <span>Too small</span>
        <span>Perfect</span>
        <span>Too large</span>

      </div>
      <div>Fit
        <div></div>
        <span>Too small</span>
        <span>Perfect</span>
        <span>Too large</span>

      </div>
    </div>
  );
};

export default ProductBreakdown;
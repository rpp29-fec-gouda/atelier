import React from 'react';

const ProductBreakdown = (props) => {
  const { characteristics } = props;
  console.log('SelectedProduct Characteristics: ', characteristics);

  return characteristics ? (
    <div id='product-breakdown'>
      {Object.entries(characteristics).map((characteristic, i) => (
        <div key={i}>{characteristic[0]}
          <br></br>
          <div>
            <input type="range" min="1" max="5" list="tickmarks" step='any' value={characteristic[1].value.slice(0, 4)} readonly></input>
            <datalist id="tickmarks">
              <option value="1" label='Too Small'>Too Small</option>
              <option value="3" label='Perfect'>Perfect</option>
              <option value="5" label='Too Wide'>Too Wide</option>
            </datalist>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div></div>
  );
};

export default ProductBreakdown;
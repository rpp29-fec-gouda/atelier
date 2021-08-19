import React from 'react';
import './productBreakdown.css';

const ProductBreakdown = (props) => {
  const { characteristics } = props;
  console.log('characteristics:', characteristics);

  const chart = {
    Characteristics: characteristics,
    Size: {first: 'Too Small', third: 'Perfect', fifth: 'Too Wide'},
    Width: {first: 'Too Narrow', third: 'Perfect', fifth: 'Too Wide'},
    Comfort: {first: 'Uncomfortable', third: 'Ok', fifth: 'Perfect'},
    Quality: {first: 'Poor', third: 'What I Expected', fifth: 'Perfect'},
    Length: {first: 'Runs Short', third: 'Perfect', fifth: 'Runs Long'},
    Fit: {first: 'Runs Tight', third: 'Perfect', fifth: 'Runs Long'}
  };

  return characteristics ? (
    <div id='rr-product-breakdown'>
      {Object.entries(chart.Characteristics).map((characteristic, i) => (
        <div key={i}>{characteristic[0]}
          <br></br>
          <div>
            <input id='rr-bar-chart' className='rr-bar-chart' type="range" min="1" max="5" list="tickmarks" step='any' value={characteristic[1].value ? characteristic[1].value.slice(0, 4) : ''} readonly></input>
            <datalist id="rr-breakdown-tickmarks" className="rr-breakdown-tickmarks">
              <option id='rr-breakdown-option' className='rr-breakdown-option' value="1" id={characteristic[0]}>{chart[characteristic[0]].first}</option>
              <option id='rr-breakdown-option' className='rr-breakdown-option'value="5" id={characteristic[0]}>{chart[characteristic[0]].fifth}</option>
            </datalist>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ProductBreakdown;
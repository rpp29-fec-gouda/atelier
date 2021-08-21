import React from 'react';
import './productBreakdown.css';

const ProductBreakdown = (props) => {
  const { characteristics } = props;
  console.log('characteristics:', characteristics);

  const chart = {
    Characteristics: characteristics,
    Size: { first: 'Too Small', third: 'Perfect', fifth: 'Too Wide' },
    Width: { first: 'Too Narrow', third: 'Perfect', fifth: 'Too Wide' },
    Comfort: { first: 'Uncomfortable', third: 'Ok', fifth: 'Perfect' },
    Quality: { first: 'Poor', third: 'What I Expected', fifth: 'Perfect' },
    Length: { first: 'Runs Short', third: 'Perfect', fifth: 'Runs Long' },
    Fit: { first: 'Runs Tight', third: 'Perfect', fifth: 'Runs Long' }
  };

  return characteristics ? (
    <div className='rr-product-breakdown'>
      <h2 for='rr-bar-chart'>By Characteristics</h2>
      {Object.entries(chart.Characteristics).map((characteristic, i) => (
        <div key={i}>
          <br></br>
          <div >
            <label for='rr-breakdown-tickmarks' >{characteristic[0]}</label>
            <label for='rr-bar-chart'></label>
            <input className='rr-bar-chart' type="range" min="1" max="5" list="tickmarks" step='any' value={characteristic[1].value ? characteristic[1].value.slice(0, 4) : ''} readonly></input>
            <datalist className="rr-breakdown-tickmarks">
              <label for='rr-breakdown-option-1'>{chart[characteristic[0]].first}</label>
              <option className='rr-breakdown-option-1' value="1"></option>
              <option className='rr-breakdown-option-5' value="5"></option>
              <label for='rr-breakdown-option-5'>{chart[characteristic[0]].fifth}</label>

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
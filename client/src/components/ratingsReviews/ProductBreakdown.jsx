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
      <label className='rr-by-characteristics' for='rr-bar-chart'>BY CHARACTERISTICS</label>
      {Object.entries(chart.Characteristics).map((characteristic, i) => (
        <div key={i}>
          <br></br>
          <div >
            <label for='rr-breakdown-tickmarks' >{characteristic[0]}</label>
            <input className='rr-bar-chart' type="range" min="1" max="5" list="tickmarks" step='any' value={characteristic[1].value ? characteristic[1].value.slice(0, 4) : ''} readonly></input>
            <datalist className="rr-breakdown-tickmarks">
              <option className='rr-breakdown-option' value="1" id={characteristic[0]}>{chart[characteristic[0]].first}</option>
              <option className='rr-breakdown-option' value="5" id={characteristic[0]}>{chart[characteristic[0]].fifth}</option>
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
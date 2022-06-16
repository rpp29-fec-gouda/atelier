import {
  roundByIncrement,
  incrementIndexDown,
  incrementIndexUp
} from './Calcs.js';

describe('Test roundByIncrement', function () {
  it('should should equal a matching empty increment', function () {
    expect(roundByIncrement(0, 25)).toEqual(0);
  });

  it('should should equal a matching quarter increment rounding up by default', function () {
    expect(roundByIncrement(3.9)).toEqual(1);
  });

  it('should should equal a matching quarter increment', function () {
    expect(roundByIncrement(3.25, 25)).toEqual(0.25);
  });

  it('should should equal a matching half increment', function () {
    expect(roundByIncrement(3.5, 25)).toEqual(0.5);
  });

  it('should should equal a matching three-quarter increment', function () {
    expect(roundByIncrement(3.75, 25)).toEqual(0.75);
  });

  it('should should equal a matching empty increment from whole number', function () {
    expect(roundByIncrement(4.0, 25)).toEqual(0);
  });


  it('should should equal a matching quarter increment rounding down', function () {
    expect(roundByIncrement(3.05, 25)).toEqual(0);
  });
  it('should should equal a matching quarter increment rounding up from half', function () {
    expect(roundByIncrement(3.125, 25)).toEqual(0.25);
  });
  it('should should equal a matching quarter increment rounding up', function () {
    expect(roundByIncrement(3.2, 25)).toEqual(0.25);
  });


  it('should should equal a matching quarter increment rounding down', function () {
    expect(roundByIncrement(3.26, 25)).toEqual(0.25);
  });
  it('should should equal a matching quarter increment rounding up from half', function () {
    expect(roundByIncrement(3.375, 25)).toEqual(0.5);
  });
  it('should should equal a matching quarter increment rounding up', function () {
    expect(roundByIncrement(3.549, 25)).toEqual(0.5);
  });


  it('should should equal a matching quarter increment rounding down', function () {
    expect(roundByIncrement(3.55, 25)).toEqual(0.5);
  });
  it('should should equal a matching quarter increment rounding up from half', function () {
    expect(roundByIncrement(3.625, 25)).toEqual(0.75);
  });
  it('should should equal a matching quarter increment rounding up', function () {
    expect(roundByIncrement(3.7, 25)).toEqual(0.75);
  });


  it('should should equal a matching quarter increment rounding down', function () {
    expect(roundByIncrement(3.8, 25)).toEqual(0.75);
  });
  it('should should equal a matching quarter increment rounding up from half', function () {
    expect(roundByIncrement(3.875, 25)).toEqual(1);
  });
  it('should should equal a matching quarter increment rounding up', function () {
    expect(roundByIncrement(3.9, 25)).toEqual(1);
  });

  it('should should equal a -1 for an invalid number', function () {
    expect(roundByIncrement('A', 25)).toEqual(-1);
  });
});

describe('incrementIndexDown', function () {
  it('should increment index down', function () {
    const props = {
      index: -1
    };
    expect(incrementIndexDown(props.index)).toEqual(props.index - 1);
  });

  it('should wrap around decrement to specified max if not capped', function () {
    const props = {
      index: 0,
      min: 0,
      max: 3
    };
    expect(incrementIndexDown(props.index, props.max, props.min)).toEqual(props.max);
  });

  it('should limit decrement to specified min if capped', function () {
    const props = {
      isCapped: true,
      index: 0,
      min: 0,
      max: 2
    };
    expect(incrementIndexDown(props.index, props.max, props.min, props.isCapped)).toEqual(props.min);
  });

  it('should not decrement if only 1 item exists', function () {
    const props = {
      index: 0,
      min: 0,
      max: 0
    };
    expect(incrementIndexDown(props.index, props.max, props.min, props.isCapped)).toEqual(props.index);
  });
});

// index, max, isCapped
describe('incrementIndexUp', function () {
  it('should increment index up', function () {
    const props = {
      index: 2
    };
    expect(incrementIndexUp(props.index)).toEqual(props.index + 1);
  });

  it('should wrap around increment to specified min if not capped', function () {
    const props = {
      min: 0,
      max: 2,
      index: 2
    };
    expect(incrementIndexUp(props.index, props.max, props.min)).toEqual(props.min);
  });

  it('should limit increment to specified max if capped', function () {
    const props = {
      isCapped: true,
      min: 0,
      max: 2,
      index: 2
    };
    expect(incrementIndexUp(props.index, props.max, props.min, props.isCapped)).toEqual(props.max);
  });

  it('should not increment if only 1 item exists', function () {
    const props = {
      index: 0,
      min: 0,
      max: 0
    };
    expect(incrementIndexUp(props.index, props.max, props.min, props.isCapped)).toEqual(props.index);
  });
});
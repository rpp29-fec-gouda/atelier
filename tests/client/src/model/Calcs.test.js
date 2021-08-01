import roundByIncrement from '../../../../client/src/model/Calcs.js';

describe('Test roundByIncrement', function () {
  it('should should equal a matching empty increment', function () {
    expect(roundByIncrement(0, 25)).toEqual(0);
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
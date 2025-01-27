import { expect } from 'chai';

describe('Calculator Tests', () => {
  const calculator = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => b !== 0 ? a / b : 'Error'
  };

  it('add(5, 2) should return 7', () => {
    expect(calculator.add(5, 2)).to.equal(7);
  });

  it('add(5, 2) should fail for 8', () => {
    expect(calculator.add(5, 2)).to.not.equal(8);
  });

  it('sub(5, 2) should return 3', () => {
    expect(calculator.sub(5, 2)).to.equal(3);
  });

  it('sub(5, 2) should fail for 5', () => {
    expect(calculator.sub(5, 2)).to.not.equal(5);
  });

  it('mul(5, 2) should return 10', () => {
    expect(calculator.mul(5, 2)).to.equal(10);
  });

  it('mul(5, 2) should fail for 12', () => {
    expect(calculator.mul(5, 2)).to.not.equal(12);
  });

  it('div(10, 2) should return 5', () => {
    expect(calculator.div(10, 2)).to.equal(5);
  });

  it('div(10, 2) should fail for 2', () => {
    expect(calculator.div(10, 2)).to.not.equal(2);
  });
});

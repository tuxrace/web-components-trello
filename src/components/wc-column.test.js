const WCTest = require('@open-wc/testing');

require('./wc-column');
  
const {
    html,
    fixture,
    expect,
  } = WCTest;

describe('Main', () => {
    let el;
    before(async () => {
        // runs before all tests in this block
        el = await fixture('<wc-column></wc-column>');
        el.data = {id:1, title: 'Column 1'}
      });
    test('Main rendered', async() => {
        const column = el.shadowRoot.querySelector('.column');
        expect(column).toBeDefined();
    })
})
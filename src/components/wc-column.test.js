import './wc-column';

describe('Column Components', () => {
    const el = document.createElement('wc-column');
    el.data = {
        id: 1,
        title: 'Column 1',
    };
    document.body.appendChild(el)

    test('Column rendered', async() => {
        expect(el).toBeDefined();
    })

    test('Column rendered', async() => {
        const allColumns = document.querySelectorAll("wc-column");
        expect(allColumns).toHaveLength(1);
    })

})
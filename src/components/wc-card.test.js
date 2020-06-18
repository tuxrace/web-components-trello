import './wc-card';

describe('Card Component', () => {
    
    test('Card rendered', async() => {
        const el = document.createElement('wc-card');
        el.data = {
            id: 1,
            title: 'Test',
            descriptions: 'Test Desription'
        }
        document.body.appendChild(el)
        const card = document.querySelector(".card");
        expect(card).toBeDefined();
    })

});

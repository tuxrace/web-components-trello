import './wc-new';

describe('New Component', () => {
    const el = document.createElement('wc-new');
    el.onClick = jest.fn();
    document.body.appendChild(el)

    test('New Card component rendered', async() => {
        expect(el).toBeDefined();
    });

    test('Add a card button rendered', async() => {
        const newCard = el.querySelector("#newCard");
        expect(newCard).toBeDefined();
    });

    test('newCardBox should be null', async() => {
        const newCardBox = el.querySelector("#newCardBox");
        expect(newCardBox).toBeNull();
    })
})
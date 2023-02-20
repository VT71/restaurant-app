import orderSlice, {
    updateGlobalState,
    initialState,
    addTableNumber,
    addTableStatus,
    addBreakfast,
    addSalad,
    addFish,
    addPork,
    addDessert,
    addComment,
} from '../store/slices/OrderSlice';
import userEvent from '@testing-library/user-event';

describe('OrderSlice Tests', () => {
    test('OrderSlice initializes with the expected initial state', () => {
        const orderSliceInit = orderSlice(initialState, { type: 'unknown' });
        expect(orderSliceInit).toBe(initialState);
    });
    test('Updating State from API', () => {
        const orderSliceInit = orderSlice(
            initialState,
            updateGlobalState({ 999: {} })
        );
        expect(orderSliceInit).toStrictEqual({ 999: {} });
    });
    test('Adding Table Number to the state', () => {
        const orderSliceInit = orderSlice(initialState, addTableNumber(999));
        console.log(orderSliceInit);
        expect(orderSliceInit[999]).toStrictEqual({});
    });
    test('Adding Table Status to the state', () => {
        const orderSliceInit = orderSlice(
            initialState,
            addTableStatus({ number: 1, status: 'Occupied' })
        );
        expect(orderSliceInit).toStrictEqual({
            1: { status: 'Occupied' },
        });
    });
    test('Adding Breakfast Order to the state', () => {
        const orderSliceInit = orderSlice(
            initialState,
            addBreakfast({ number: 1, food: ['Food 1'] })
        );
        expect(orderSliceInit).toStrictEqual({ 1: { food: ['Food 1'] } });
    });
    test('Adding Salads Order to the state', () => {
        const orderSliceInit = orderSlice(
            initialState,
            addSalad({ number: 1, food: ['Salad 1'] })
        );
        expect(orderSliceInit).toStrictEqual({ 1: { food: ['Salad 1'] } });
    });
    test('Adding Fish Order to the state', () => {
        const orderSliceInit = orderSlice(
            initialState,
            addFish({ number: 1, food: ['Fish 1'] })
        );
        expect(orderSliceInit).toStrictEqual({ 1: { food: ['Fish 1'] } });
    });
    test('Adding Pork Order to the state', () => {
        const orderSliceInit = orderSlice(
            initialState,
            addPork({ number: 1, food: ['Pork 1'] })
        );
        expect(orderSliceInit).toStrictEqual({ 1: { food: ['Pork 1'] } });
    });
    test('Adding Dessert Order to the state', () => {
        const orderSliceInit = orderSlice(
            initialState,
            addDessert({ number: 1, food: ['Desert 1'] })
        );
        expect(orderSliceInit).toStrictEqual({ 1: { food: ['Desert 1'] } });
    });
    test('Adding Dessert Order to the state', () => {
        const orderSliceInit = orderSlice(
            initialState,
            addComment({ number: 1, comment: 'Lots of comments' })
        );
        expect(orderSliceInit).toStrictEqual({
            1: { comments: 'Lots of comments' },
        });
    });
});

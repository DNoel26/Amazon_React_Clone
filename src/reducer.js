export const initial_state = {
    basket: [],
};

// Selector
export const get_basket_total = (basket) => (

    basket?.reduce((amount, item) => item.price + amount, 0)
);

const reducer = (state, action) => {

    console.log(action);
    //console.log(action.item);
    //console.log(state);
    //console.log(state.basket);

    switch (action.type) {
        
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };

        default:
            return state;
    }
};

export default reducer;
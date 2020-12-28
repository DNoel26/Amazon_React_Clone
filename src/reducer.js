export const initial_state = {
    basket: [],
    user: null,
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

        case "REMOVE_FROM_BASKET":

            const index = state.basket.findIndex(

                (basket_item) => basket_item.id === action.id
            );
            let new_basket = [...state.basket];

            if(index >= 0){

                new_basket.splice(index, 1);
            }

            else {

                console.warn(`Can't remove product (id: ${action.id} as it's not in basket!)`)
            };

            return {

                ...state,
                basket: new_basket,
            };
        
        case "SET_USER":
            return {

                ...state,
                user: action.user
            }

        default:
            return state;
    }
};

export default reducer;
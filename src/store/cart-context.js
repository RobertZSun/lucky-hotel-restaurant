import React, {useCallback, useReducer} from 'react';

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: item => {
    },
    removeItem: itemId => {
    },
    clear:()=>{},
});

const defaultCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
            const indexInTheCart = state.items.findIndex(item => item.id === action.payload.id);
            let updatedItems;
            if (indexInTheCart !== -1) {
                const theDish = state.items[indexInTheCart];
                const updatedDish = {
                    ...theDish,
                    amount: theDish.amount + action.payload.amount,
                };
                updatedItems = [...state.items];
                updatedItems[indexInTheCart] = updatedDish;
            } else {
                updatedItems = state.items.concat(action.payload);
            }
            return {items: updatedItems, totalAmount: updatedTotalAmount};
        case "REMOVE_ITEM":
            let newDishes = [...state.items];
            const indexOfTheCart = state.items.findIndex(item => item.id === action.payload);
            const theDishToMinus = {...state.items[indexOfTheCart]};
            theDishToMinus.amount -= 1;
            if (theDishToMinus.amount < 1) {
                newDishes.splice(indexOfTheCart, 1);
            } else {
                newDishes[indexOfTheCart] = theDishToMinus;
            }
            const newTotalAmount = state.totalAmount - theDishToMinus.price < 0.01 ? 0 : state.totalAmount - theDishToMinus.price;
            return {items: newDishes, totalAmount: newTotalAmount};
        case "CLEAR":
            return defaultCartState;
        default:
            return defaultCartState;
    }
};

// ********************************** Provider Component ***********************************************************

const CartProvider = React.memo((props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = useCallback((item) => {
        dispatchCartAction({type: "ADD_ITEM", payload: item});
    },[]);
    const removeItemToCartHandler = useCallback((itemId) => {
        dispatchCartAction({type: "REMOVE_ITEM", payload: itemId});
    },[]);
    const clearCartHandler = useCallback(() => {
        dispatchCartAction({type: "CLEAR"});
    },[]);

    const contextValue = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemToCartHandler,
        clear:clearCartHandler,
    };


    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
});

export {CartProvider};
export default CartContext;

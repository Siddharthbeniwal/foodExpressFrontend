import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quantity: [],
    price: [],
    itemTotalPrice: [],
    cartData: [],
    originalFoodList: [],
    foodList: [],
    isLoggedIn: false
}

export const foodExpressSlice = createSlice({
    name: 'foodExpress',
    initialState,
    reducers: {

        setIsLoggedIn: ((state, action) => {

            switch (action.payload.type) {

                case 'LOGIN':
                    state.isLoggedIn = true
                    break;

                case 'LOGOUT':
                    state.isLoggedIn = false
                    break;

                default:
                    return state;

            }
        }),

        setInitialData: ((state, action) => {
            switch (action.payload.type) {
                case 'SET_QUANTITY':
                    state.quantity = Array(action.payload.quantities).fill(0)
                    state.itemTotalPrice = Array(action.payload.quantities).fill(0)
                    break;

                case 'SET_PRICE':
                    state.price.push(action.payload.price)
                    break;

                default:
                    return state;
            }
        }),

        handleQuantity: ((state, action) => {
            const { index, type } = action.payload

            if (type === 'increment') {
                state.quantity[index] += 1
            }
            if (type === 'decrement' && state.quantity[index] > 0) {
                state.quantity[index] -= 1
            }
            state.itemTotalPrice[index] = state.price[index] * state.quantity[index]
        }),

        filterFoodList: ((state, action) => {

            switch (action.payload.type) {

                case 'SET_FOOD_LIST':
                    state.originalFoodList = action.payload.data
                    state.foodList = action.payload.data
                    break;

                case 'FILTER_FOOD_LIST':
                    let searchInput = action.payload.searchInput.toLowerCase()
                    if (searchInput) {
                        state.foodList = state.originalFoodList.filter((item) => item.name.toLowerCase().includes(searchInput))
                    } else {
                        state.foodList = state.originalFoodList
                    }
                    break;

                default:
                    return state;
            }

        }),

        handleCart: ((state, action) => {
            const { name, index, cartIndex } = action.payload
            switch (action.payload.type) {
                case 'ADD_TO_CART':
                    state.cartData.push({
                        name: name,
                        quantity: state.quantity[index],
                        price: state.itemTotalPrice[index]
                    })
                    break;

                case 'UPDATE_TO_CART':
                    state.cartData[cartIndex] = {
                        name: name,
                        quantity: state.quantity[index],
                        price: state.itemTotalPrice[index]
                    }
                    break;

                case 'REMOVE_FROM_CART':
                    state.cartData = state.cartData.filter((_, i) => i !== index)
                    break;

                case 'RESET_CART':
                    state.cartData = []
                    state.quantity = state.quantity.fill(0)
                    state.itemTotalPrice = state.itemTotalPrice.fill(0)
                    break;
                default:
                    return state;
            }
        })
    }
})

export default foodExpressSlice.reducer;

export const { setIsLoggedIn, handleQuantity, setInitialData, handleCart, filterFoodList } = foodExpressSlice.actions

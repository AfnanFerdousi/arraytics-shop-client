const initialState = {
    items: []
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map((item) => (item.id === action.payload.id ? action.payload : item))
            };
        case 'SET_ITEMS':
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

export default itemsReducer;

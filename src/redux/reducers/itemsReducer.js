/* eslint-disable no-case-declarations */
import axios from 'axios';

// Function to fetch items
export async function getItems() {
    try {
        const res = await axios.get('http://localhost:5000/api/v1/item');
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to add an item
async function addItem(item) {
    try {
        const res = await axios.post('http://localhost:5000/api/v1/item/create-item', item);
        console.log(res)
        if (res.status === 200) {
            return res.data;
        }
    } catch (error) {
        console.log(error);
    }
}

const initialState = {
    items: []
};

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const newItem = addItem(action.payload);
            if (newItem) {
                return {
                    ...state,
                    items: [...state.items, newItem]
                };
            }
            return state;
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload)
            };
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

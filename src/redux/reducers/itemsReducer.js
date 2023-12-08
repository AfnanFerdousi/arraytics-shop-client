import axios from 'axios'

const initialState = {
    items: getItems()
}

function getItems() {
    try {
        const res = axios.get('http://localhost:5000/api/v1/items')
        if(res.status === 200) {
            return res.data
        }
    
   } catch (error) {
    console.log(error)
   }
}

const itemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter((item) => item.id !== action.payload)
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map((item) => item.id === action.payload.id ? action.payload : item)
            }
        default:
            return state
    }
}

export default itemsReducer
export const ADD_ITEM = 'ADD_ITEM'
export const REMOVE_ITEM = 'REMOVE_ITEM'
export const UPDATE_ITEM = 'UPDATE_ITEM'

export const updateItem = (id, updatedItem) => ({
    type: UPDATE_ITEM,
    payload: {
        id,
        updatedItem
    }
})

export const setItems = (items) => ({
    type: 'SET_ITEMS',
    payload: items,
});
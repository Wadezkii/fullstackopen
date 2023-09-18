import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notifSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => action.payload,
        clearNotification: () => initialState
    }
})

export const { setNotification, clearNotification } = notifSlice.actions
export default notifSlice.reducer 
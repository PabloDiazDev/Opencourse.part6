import {createSlice} from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
    setNotificationMessage(state, action) {
        console.log(action.payload)
        return action.payload
    },
    clearNotificationMessage(state, action) {
        return ''
    }
  }
})

export const {setNotificationMessage, clearNotificationMessage} = notificationSlice.actions

export const setNotification = (message, time) => {
    return dispatch => {
        dispatch(setNotificationMessage(message))
        setTimeout(() => {
            dispatch(clearNotificationMessage())
        }, time * 1000) // Convert seconds to milliseconds
    }
}

export default notificationSlice.reducer
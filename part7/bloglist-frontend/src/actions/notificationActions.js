export const setNotification = (message, type) => {
    return dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: { message, type }
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR_NOTIFICATION'
            })
        }, 5000)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR_NOTIFICATION'
    }
}
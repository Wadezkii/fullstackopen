const notificationReducer = (state = { message: null, type: null}, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return { message: null, type: null}
    default:
      return state
  }
}

export default notificationReducer
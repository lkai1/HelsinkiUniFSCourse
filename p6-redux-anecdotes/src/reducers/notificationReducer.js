const notificationAtStart = ""

const notificationReducer = (state = notificationAtStart, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state = action.data
        default: return state
    }
}
export const setNotification = (notification, time) => {
    return async dispatch => {
        await dispatch({
            type: 'NOTIFY',
            data: notification
        })
        setTimeout(() => {
            dispatch({
                type:'NOTIFY',
                data: ""
            })
        }, [time * 1000])
    }
}
export default notificationReducer
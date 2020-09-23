const notificationAtStart = ""

const notificationReducer = (state = notificationAtStart, action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state = action.data
        default: return state
    }
}
export const notify = (notification) => {
    return {
        type: 'NOTIFY',
        data: notification
    }
}
export default notificationReducer
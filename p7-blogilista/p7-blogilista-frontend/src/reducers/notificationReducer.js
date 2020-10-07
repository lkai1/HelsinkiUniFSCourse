

const notificationReducer = (state="", action) => {
    switch (action.type) {
        case 'NOTIFY':
            return state = action.data
        default: return state

    }
}
export const notify = (message) => {
    return {
        type: 'NOTIFY',
        data: message
    }
    /* setTimeout(() => {
        dispatch({
            type: 'NOTIFY',
            data: ""
        })
    }, [1000]) */
}
export default notificationReducer
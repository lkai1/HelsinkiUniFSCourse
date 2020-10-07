

const userReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return state = action.data
        /* case 'SAVE':
            return state = action.data
        case 'LOAD':
            return state = action.data */
        default: return state
    }
}
/* export const loginUser = (user) => {
    return {
        type: 'LOGIN'
    }
} */
export const savedUser = (user) => {
    return {
        type: 'LOGIN',
        data: user
    }
}
/* export const loadUser = (user) => {
    return {
        type: 'LOAD'
    }
} */
export default userReducer
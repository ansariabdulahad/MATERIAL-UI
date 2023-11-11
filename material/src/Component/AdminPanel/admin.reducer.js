const Model = {
    dark: false
}

const adminReducer = (state = Model, action) => {
    switch (action.type) {
        case 'dark': return {
            ...state,
            dark: true
        }
        case 'light': return {
            ...state,
            dark: false
        }
        default: return state
    }
}

export {
    adminReducer
}
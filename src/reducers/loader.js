export default function reducer (state = true, action) {
    switch (action.type) {
        case 'TOGGLE_LOAD':
            return state = false;
        default:
            
    }
    return state
};

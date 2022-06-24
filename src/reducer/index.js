export function userReducer(state, action){
    switch(action.type){
        case 'LOGIN':
        case 'REGISTER':
            return {username: action.username, email: action.email, id:action.id}
        case 'LOGOUT':
            return {username: null, email: null,id: null}
        default:
            throw new Error()
    }
}
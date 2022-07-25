export function userReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
        case 'REGISTER':
            return {
                username: action.username,
                id: action.id,
                university: action.university,
                degree: action.degree,
                photo: action.photo,
                lastupdate:action.lastupdate
            }
        case 'LOGOUT':
            return {username: null, email: null, id: null, university: null, degree: null, photo: null,lastupdate:null}
        default:
            throw new Error()
    }
}
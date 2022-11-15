import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { booksListReducer, bookCreateReducer, booksDetailReducer, bookDelReducer, bookEditReducer, bookNamesReducer } from './reducers/booksReducer';
import { userLoginReducer, userRegisterReducer, userListReducer, userDelReducer } from './reducers/userReducers';


const reducer = combineReducers({
    booksList: booksListReducer,
    userLogin: userLoginReducer,
    bookCreate: bookCreateReducer,
    booksDetail: booksDetailReducer,
    bookDel: bookDelReducer,
    bookEdit: bookEditReducer,
    bookNames: bookNamesReducer,
    userRegister: userRegisterReducer,
    userList: userListReducer,
    userDel: userDelReducer,

})

const middleware = [thunk]

const UserInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null

const intialstate = {
    userLogin: { userInfo: UserInfoFromLocalStorage }
}

const store = createStore(reducer, intialstate, composeWithDevTools(applyMiddleware(...middleware)))

export default store

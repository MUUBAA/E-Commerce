import  loginUserSlice  from "../slices/loginUser";
import { persistSlice } from "../persistenceUtils";
import  { combineReducers, configureStore, isAction } from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import { encrypt } from "../../utils/encryptionUtils";


const rootReducer = combineReducers({
    loginUser: persistSlice(loginUserSlice, { sliceKey: 'loginUser' }),
    // Add other slices here
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

const jwtMiddleware: Middleware<object, RootState> = () => (next) => (action) => {
    const result = next(action);
    if(isAction(action) && action.type === 'loginUser/fulfilled') {
        const jwt = (action as unknown as { payload: string }).payload;
        localStorage.setItem('jwtToken', encrypt(jwt));
    }
    return result;
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ 
        serializableCheck: {
            ignoredActions: ['persist/PERSIST'],
            ignoredPaths: ['login.jwt']
        },
    }).concat(jwtMiddleware),
});
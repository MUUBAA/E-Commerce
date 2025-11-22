import { combineReducers, configureStore} from "@reduxjs/toolkit";
import type { Middleware } from "@reduxjs/toolkit";
import loginUserSlice from "../slices/loginUser";
import productsReducer from "../slices/productsSlice";
import cartSlice from "../slices/cartSlice";
import userSlice from "../slices/userSlice";
import { persistSlice } from "../persistenceUtils";
import { encrypt } from "../../utils/encryptionUtils";
import { loginUser } from "../thunk/jwtVerify";
import { registerUser } from "../thunk/jwtVerify";

const rootReducer = combineReducers({
  loginUser: persistSlice(loginUserSlice, { sliceKey: "loginUser" }),
  products: persistSlice(productsReducer, { sliceKey: "products" }),
  cart: persistSlice(cartSlice, { sliceKey: "cart" }),
  user: persistSlice(userSlice, { sliceKey: "user" }),
  // Add other slices here
});

export type RootState = ReturnType<typeof rootReducer>;

const jwtMiddleware: Middleware<object, RootState> = () => (next) => (action) => {
  const result = next(action);

  if (loginUser.fulfilled.match(action)) {
    const token = action.payload as string; 
    localStorage.setItem("jwtToken", encrypt(token));
  }

  if (registerUser.fulfilled.match(action)) {
    const { token } = action.payload as { token: string };
    if (token) {
      localStorage.setItem("jwtToken", encrypt(token));
    }
  }

  return result;
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredPaths: ["login.jwt"], 
      },
    }).concat(jwtMiddleware),
});

export type AppDispatch = typeof store.dispatch;

// src/redux/slices/loginUser.ts
import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../thunk/jwtVerify";
import { registerUser } from "../thunk/jwtVerify";
import { encrypt } from "../../utils/encryptionUtils";

export interface UserData {
  Id: number;
  Email: string;
  Name: string;
  CreatedAt: string;
}

export interface DecodedToken {
  exp: number;
  UserData: UserData;
  IssuedAt: number;
  jti: string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"?: string;
}

interface LoginState {
  jwtPayload: DecodedToken | null;
  loading: boolean;
  error: string | null;
  jwt: string | null;          // encrypted token in Redux state
  registerMessage: string | null;
}

const initialState: LoginState = {
  jwtPayload: null,
  loading: false,
  error: null,
  jwt: null,
  registerMessage: null,
};

const loginSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    resetJwt: (state) => {
      state.jwt = null;
      state.jwtPayload = null;
    },
    setJwtPayload: (state, action) => {
      state.jwtPayload = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const token = action.payload as string; // login thunk returns raw JWT
        state.jwt = encrypt(token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.registerMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const { token, message } = action.payload as {
          token: string;
          message: string;
        };

        if (token) {
          state.jwt = encrypt(token);
        }

        state.registerMessage = message ?? null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetJwt, setJwtPayload, clearAuthError } = loginSlice.actions;
export default loginSlice.reducer;

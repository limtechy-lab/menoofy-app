import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  name: string;
  username: string;
  email: string;
  phone: string;
  token: string | null;
  isStoreAdded: boolean | null;
  isActive: boolean | null;
  isDeleted: boolean | null;
}

const initialState: AuthState = {
  name: "",
  username: "",
  email: "",
  phone: "",
  token: null,
  isStoreAdded: null,
  isActive: null,
  isDeleted: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ 
      name: string;
      email: string;
      phone: string;
      username: string;
      isStoreAdded: boolean
      token: string;
      isActive: boolean;
      isDeleted: boolean;
    }>) => {
      const { name, email, phone, username, token, isStoreAdded, isActive, isDeleted } = action.payload;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.username = username;
      state.token = token;
      state.isStoreAdded = isStoreAdded;
      state.isActive = isActive;
      state.isDeleted = isDeleted;
    },
    setStoreAdded: (state, action: PayloadAction<{   
      isStoreAdded: boolean
    }>) => {
      const {isStoreAdded} = action.payload;
      state.isStoreAdded = isStoreAdded;
    },
    logOut: (state) => {
      state.name = "";
      state.username = "";
      state.email = "";
      state.phone = "";
      state.token = null;
      state.isStoreAdded = null;
      state.isActive = null;
      state.isDeleted = null;
    },
  },
});

export const { setCredentials, setStoreAdded, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token;
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth;

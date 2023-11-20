import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
// import counterReducer from '../features/counterSlice';
import jwt_decode from "jwt-decode";

const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: null,
    role: null,
  },
  reducers: {
    login: (state, action) => {
      console.log("IN DISPATCH LOGIN with action:", action);
      state.token = action.payload;
      const decoded = jwt_decode(state.token);
      console.log("DECODED: ", decoded);
      state.role = decoded.roles[0].substring(5);
      console.log("ROLE: ", state.role);
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      localStorage.setItem("reduxState", JSON.stringify(state));
      console.log("STORING THE STATE AFTER LOGOUT:", state);
    },
    checkValidity: (state) => {
      if (state.token != null) {
        const decodedJwt = jwt_decode(state.token);
        const expiryDate = new Date(decodedJwt.exp * 1000);
        const currDate = new Date();
        if (currDate > expiryDate) {
          state.token = null;
          state.role = null;
        }
      }
    },
  },
});

const eventsSlice = createSlice({
  name: "add_events",
  initialState: {
    events: [
      {
        title: "Meeting 1",
        start: new Date(2023, 8, 11, 10, 0), // September is 8 (0-based month), 11th day, 10:00 AM
        end: new Date(2023, 8, 11, 11, 0),
      },
      {
        title: "Meeting 2",
        start: new Date(2023, 8, 12, 14, 0),
        end: new Date(2023, 8, 12, 15, 30),
      },
    ],
  },
  reducers: {},
});

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

console.log("IN STORE PERSISTED STATE:", persistedState);

// export const actions = loginSlice.actions;

const reducers = combineReducers({
  loginReducer: loginSlice.reducer,
  eventsReducer: eventsSlice.reducer,
});

export const store = configureStore({
  reducer: reducers,
  preloadedState: persistedState,
});

store.subscribe(() => {
  // save a copy to localStorage
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  console.log("STORING THE STATE, LOCALLY");
});

export const { login, logout, checkValidity } = loginSlice.actions;

export default loginSlice.reducer;

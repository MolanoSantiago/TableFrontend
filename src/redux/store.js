import { configureStore, combineReducers, compose, applyMiddleware } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import procedimientosReducer from "./procedimientosDuck";

const rootReducer = combineReducers({
    procedimientos: procedimientosReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  return configureStore({reducer: rootReducer}, composeEnhancers(applyMiddleware(thunk)));
}
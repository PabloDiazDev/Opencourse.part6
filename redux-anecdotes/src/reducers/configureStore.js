import anecdoteReducer from "./anecdoteReducer"
import filterReducer from "./filterReducer";
import notificationReducer from "./notificationReducer";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({ 
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
})
import { configureStore } from "@reduxjs/toolkit";
import messageSlice from "./features/message/messageSlice";

const store = configureStore({
  reducer: {
    messages: messageSlice,
  },
});

export default store;

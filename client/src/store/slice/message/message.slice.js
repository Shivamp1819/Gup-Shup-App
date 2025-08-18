import { createSlice } from "@reduxjs/toolkit";
import { getMessageThunk, sendMessageThunk } from "./message.thunk";

const initialState = {
  buttonLoading: false,
  screenLoading: false,
  messages: [],
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setNewMessage: (state, action) => {
      const oldMessages = state.messages ?? [];
      state.messages = [...oldMessages, action.payload];
    },
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendMessageThunk.pending, (state) => {
      state.buttonLoading = true;
    });
    builder.addCase(sendMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      const newMsg = action.payload?.responseData;
      if (newMsg) {
        const oldMessages = state.messages ?? [];
        state.messages = [...oldMessages, newMsg];
      }
    });
    builder.addCase(sendMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
    builder.addCase(getMessageThunk.pending, (state) => {
      state.buttonLoading = true;
      state.messages = [];
    });
    builder.addCase(getMessageThunk.fulfilled, (state, action) => {
      state.buttonLoading = false;
      state.messages = action.payload?.responseData?.messages || [];
    });
    builder.addCase(getMessageThunk.rejected, (state) => {
      state.buttonLoading = false;
    });
  },
});

export const { setNewMessage, clearMessages } = messageSlice.actions;

export default messageSlice.reducer;

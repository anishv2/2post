import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  post: null,
};

const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    addPosts(state, action) {
      return {
        ...state,
        posts: action.payload,
      };
    },
    addPost(state, action) {
      return {
        ...state,
        post: action.payload,
      };
    },
  },
});

export const { addPosts, addPost } = postSlice.actions;
export default postSlice.reducer;

import { createSlice } from "@reduxjs/toolkit"


const initialState = {   
    // The initialState object defines the initial state of the Redux slice.
    // The state will be stored in our global state. Accessible from anywhere in our application
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

export const authSlice = createSlice({
    // The createSlice function takes three arguments:
    // 1. The name of the slice.
    // 2. The initial state of the slice.
    // 3. An object of reducer functions.
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light" 
        },
        setLogin: (state, action) => { // "action" has all the arguments
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state,action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state,action) => {
            // The setPost reducer function updates a specific post in the posts state.
            const updatedPosts = state.posts.map((post) => {
                if (post.id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts
        }
    }
});

//This allows other parts of your application to import the actions and reducer and use them to update the state of the Redux slice.
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost} = authSlice.actions;
export default authSlice.reducer;
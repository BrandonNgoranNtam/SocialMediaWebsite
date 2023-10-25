//Could make comments its own model if you want to add likes to each comment

import mongoose from "mongoose";
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String, //user id of the user who created this post
      required: true,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },

    location: String,
    description: String,

    userPicturePath: {
      type: String,
      default: "",
    },
    picturePath: {
      type: String,
      default: "",
    },
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter first name"],
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: [true, "Please enter last name"],
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      max: 50,
      unique: true,
    },
    password: {
      //Normally, there are more configurations for the password
      type: String,
      required: [true, "Please enter password"],
      min: 5,
      max: 50,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;

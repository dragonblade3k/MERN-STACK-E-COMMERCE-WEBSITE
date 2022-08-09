import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  password: String,
  image: {
    type: String,
    default: null,
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Products" }],
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;

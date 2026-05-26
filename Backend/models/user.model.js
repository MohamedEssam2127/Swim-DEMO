import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Admin", "WarehouseOwner", "StoreManager"],
      default: "StoreManager",
    },
    organizationID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
    },
  },
  { timestamps: true },
);
userSchema.pre("save",async function(){
    if(!this.isModified("passwordHash")){
        return;
    }
    const salt=await bcrypt.genSalt(10);
    this.passwordHash=await bcrypt.hash(this.passwordHash,salt);
})

const User=mongoose.model("User",userSchema);

export default User;

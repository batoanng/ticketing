import mongoose from "mongoose";
import { Password } from "../services/password";

//attrs for type checking with typescript
interface UserAttrs {
  email: string;
  password: string;
}

//interface for type checking of schema
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

//interface for type checking of each User document
//solve the issue unpredicted additional properties in mongoose model
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

//middleware to run before saving user
//use function instead of arrow function to keep the context of $this
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hashed = await Password.hash(this.get("password"));
    this.set("password", hashed);
  }
  next();
});

UserSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);

export { User };

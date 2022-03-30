/* import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
          },
          lastName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
          },
          username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            index: true,
            lowercase: true,
          },
          email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
          },
          hash_password: {
            type: String,
            required: true,
            min: 4,
            max: 20, 
          },
    },
    { timestamps: true }
);

userSchema.virtual('password')
.set(function(password: string){
    this.hash_password = bcrypt.hashSync(password, 10);
});

userSchema.methods = {
  authenticate: async function (password: string) {
    return await bcrypt.compareSync(password, this.hash_password);
  }
};

module.exports = mongoose.model('User', userSchema) */
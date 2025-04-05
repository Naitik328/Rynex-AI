import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: false,
		},
		name: {
			type: String,
			required: true,
		},
		isVerified: {
			type: Boolean,
			default: false, // New users are not verified by default
		  },
		  verificationToken: {
			type: String, // Store the verification token
		  },
		  provider: {
			type: String,
			enum: ["local", "google", "github"],
			default: "local",
		  },
		lastLogin: {
			type: Date,
			default: Date.now,
		},

	
	},
	{ timestamps: true }
);

export const User = mongoose.model("User", userSchema);
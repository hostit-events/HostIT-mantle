import mongoose, { Schema, Document } from "mongoose";

export interface IRegistration extends Document {
  eventId: string;
  eventName: string;
  role: string;
  name: string;
  email: string;
  xhandle?: string;
  agreeToNewsletter: boolean;
  registrationDate: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
     address: {
      type: String,
      trim: true,
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    xhandle: {
      type: String,
      trim: true,
      default: null,
    },
    agreeToNewsletter: {
      type: Boolean,
      default: false,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// compound index to prevent duplicate registrations
RegistrationSchema.index({ eventId: 1, email: 1 }, { unique: true });

const Registration = mongoose.models.Registration || mongoose.model<IRegistration>("Registration", RegistrationSchema);

export default Registration;
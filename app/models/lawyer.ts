import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ILawyer extends Document {
  enrollment_id: string;
  first_Name: string;
  last_Name: string;
  email: string;
  password_hash: string;
  mobile_Number: number;
  city: string[];
  WhatsApp_Number: number;
  address: string,
  intro_video_url: string;
  is_active: boolean;
  email_verified: boolean;
  mobile_verified: boolean;
  profile_completed: boolean;
  password_set: boolean;
  last_login: Date;
  practice_start_year: number;
  door_no: string;
  profile_overview: string;
  profile_picture_url: string;
  cover_picture_url: string;
  education: string;
  languages: string[];
  bio: string;
  state_id: number;
  city_id: number;
  is_premium: boolean;
  premium_expires_at: Date;
  area_of_expertise: string[];
  cases_completed: number,
}

const LawyerSchema: Schema<ILawyer> = new mongoose.Schema(
  {
    enrollment_id: { type: String, required: true, unique: true },
    first_Name: { type: String, required: true },
    last_Name: { type: String, required: true },
    email: { type: String, unique: true },
    password_hash: { type: String, required: true },
    mobile_Number: { type: Number, required: true, unique: true },
    city: { type: [String], required: true },
    area_of_expertise: { type: [String], default: [] },
    WhatsApp_Number: { type: Number, default: null },
    address: { type: String, default: null },
    intro_video_url: { type: String, default: null },
    is_active: { type: Boolean, default: false },
    email_verified: { type: Boolean, default: false },
    mobile_verified: { type: Boolean, default: false },
    profile_completed: { type: Boolean, default: false },
    password_set: { type: Boolean, default: false },
    last_login: { type: Date, default: null },
    practice_start_year: { type: Number, default: null },
    door_no: { type: String, default: null },
    profile_overview: { type: String, default: null },
    profile_picture_url: {
      type: String,
      default:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fprofile_3135715&psig=AOvVaw20Qv8sJmFKALbu8dkSB9Ai&ust=1752485501328000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOCf0LDDuY4DFQAAAAAdAAAAABAE',
    },
    cover_picture_url: {
      type: String,
      default:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Flawyer-banner&psig=AOvVaw1BuvjfB2bFOH_91-Cw1Ac0&ust=1752485551168000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCIim4enDuY4DFQAAAAAdAAAAABAE',
    },
    education: { type: String, default: null },
    languages: { type: [String], default: [] },
    bio: { type: String, default: null },
    state_id: { type: Number, default: null },
    city_id: { type: Number, default: null },
    is_premium: { type: Boolean, default: false },
    premium_expires_at: { type: Date, default: null },
    cases_completed: { type: Number, default: null },
  },
  { timestamps: true }, // adds createdAt and updatedAt automatically
);

export const Lawyer: Model<ILawyer> =
  mongoose.models.Lawyer || mongoose.model<ILawyer>('Lawyer', LawyerSchema);

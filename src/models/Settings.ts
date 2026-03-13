import mongoose, { Schema, model, models } from "mongoose";

export interface ISettings {
  _id?: string;
  key: string;
  value: any;
  createdAt?: Date;
  updatedAt?: Date;
}

const SettingsSchema = new Schema<ISettings>(
  {
    key: { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

const Settings = models.Settings || model("Settings", SettingsSchema);
export default Settings;

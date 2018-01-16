import { Profile } from "../profile/profile.interface";

export interface Drawing {
  author: string;
  name: string;
  path: string;
  authorDetails?: Profile;
}
import { Profile } from "../profile/profile.interface";

export interface Drawing {
  author: string;
  name: string;
  path: string;
  dateCreated: string;
  totalGuesses?: number;
  $key?: string;
}
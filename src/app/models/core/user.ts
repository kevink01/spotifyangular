import { Profile } from "./profile";

export interface CurrentUser extends Profile {
  country: string;
  email: string;
  product: string;
}
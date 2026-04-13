import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const tokenAtom = atomWithStorage("auth_token", null);
export const userProfileAtom = atomWithStorage("user_profile", {
  age: null,
  avatar: "",
  email: "",
  fullName: "",
  id: 129,
  mobileNumber: null,
  profileComplete: false,
  username: "",
});

export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));

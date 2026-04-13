import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { UserProfileType } from "../types";

export const tokenAtom = atomWithStorage("auth_token", null);
export const userProfileAtom = atomWithStorage<UserProfileType | null>(
  "user_profile",
  null,
);
export const isProfileModalOpenAtom = atomWithStorage("profileModal", false);
export const isLoginModalOpenAtom = atomWithStorage("loginModal", false);
export const isRegisterModalOpenAtom = atomWithStorage("registerModal", false);

export const isAuthenticatedAtom = atom((get) => !!get(tokenAtom));

export const isCompleteProfileAtom = atom((get) => {
  const userInfo = get(userProfileAtom);
  if (!userInfo) return false;

  const hasAge = !!userInfo?.age;
  const hasName = !!userInfo?.fullName;
  const hasMobile = !!userInfo?.mobileNumber;

  return hasAge && hasName && hasMobile;
});

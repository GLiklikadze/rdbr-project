import type { PropsWithChildren } from "react";

export interface ProfileModalProps extends PropsWithChildren {
  userInfo: {
    fullName: string;
    id: number;
    username: string;
    age: string;
    mobileNumber: string;
    avatar: null | string;
    profileComplete: boolean;
    email: string;
  };
  notCompleteProfile: boolean;
}
export interface formData {
  full_name: string;
  age: string;
  mobile_number: string;
  avatar: File | null;
}

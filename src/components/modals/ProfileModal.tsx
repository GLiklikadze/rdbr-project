import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";

import { useCallback, useState } from "react";
import { Button } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { useUpdateProfile } from "../../react-query/mutation/profile/profileMutation";
import uploadIcon from "@/assets/upload.svg";
import userIcon from "@/assets/user.png";
import { useAtom } from "jotai";
import { isProfileModalOpenAtom } from "../../state";
import type { formData, ProfileModalProps } from "../../types";

const ProfileModal: React.FC<ProfileModalProps> = ({
  children,
  userInfo,
  notCompleteProfile,
}) => {
  const [isOpenProfileModal, setIsOpenProfileModal] = useAtom(
    isProfileModalOpenAtom,
  );

  const [isDragging, setIsDragging] = useState(false);
  const { mutate: updateProfileMutate, isPending: updateProfilePending } =
    useUpdateProfile();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset: resetForm,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: userInfo?.email,
      full_name: "",
      mobile_number: "",
      age: "",
      avatar: null,
    },
  });
  const onSubmit = (data: formData) => {
    console.log(data);
    updateProfileMutate(data);
    setIsOpenProfileModal(false);
    resetForm();
  };

  const ages = Array.from({ length: 120 }, (_, i) => 12 + i);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (
      e: React.DragEvent<HTMLDivElement>,
      onChange: (file: File | null) => void,
    ) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = e.dataTransfer.files;
      if (files && files.length > 0) {
        const file = files[0];
        const validTypes = ["image/jpeg", "image/webp"];
        if (validTypes.includes(file.type)) {
          onChange(file);
        }
      }
    },
    [],
  );
  const handleFileChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      onChange: (file: File | null) => void,
    ) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onChange(files[0]);
      }
    },
    [],
  );
  return (
    <Dialog open={isOpenProfileModal} onOpenChange={setIsOpenProfileModal}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#FFFFFF] p-[50px] sm:h-[px] sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="mx-auto mb-[6px] text-[32px] font-semibold text-[#141414]">
            Profile
          </DialogTitle>
          <DialogDescription className="mx-auto text-[14px] font-medium text-[#666666]"></DialogDescription>
          <div className="flex flex-row items-center gap-4">
            <div className="relative">
              {userInfo?.avatar ? (
                <>
                  <img
                    src={userInfo?.avatar}
                    alt="logo"
                    className="h-[56px] w-[56px] rounded-full text-lg"
                  />
                </>
              ) : (
                <div className="rounded-full bg-[#EEEDFC] p-2">
                  <img
                    src={userIcon}
                    alt="logo"
                    className="h-[26px] w-[26px] text-lg"
                  />
                </div>
              )}
              <div
                className={`absolute bottom-0 right-0 h-[15px] w-[15px] rounded-full border-[2px] border-[#FFFFFF] ${notCompleteProfile ? "bg-[#F4A316]" : "bg-[#1DC31D]"}`}
              ></div>
            </div>
            <div>
              <div className="text-xl font-semibold text-[#0A0A0A]">
                {userInfo?.username}
              </div>
              <div className="text-[10px]">
                {notCompleteProfile ? (
                  <div className="text-[#F4A316]">Profile is not Complete</div>
                ) : (
                  <div className="text-[#1DC31D]">Profile is Complete</div>
                )}
              </div>
            </div>
          </div>
        </DialogHeader>
        <form
          className="m-0 flex flex-col gap-3 p-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor="full_name" className="text-[#3D3D3D]">
              Full Name
            </label>
            <Controller
              name="full_name"
              control={control}
              rules={{
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
                maxLength: {
                  value: 50,
                  message: "Name must not exceed 50 characters",
                },
              }}
              render={({ field }) => {
                return (
                  <input
                    type="text"
                    id="full_name"
                    autoComplete="name"
                    placeholder="John Smith"
                    className="mt-2 h-[48px] w-[360px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
                    {...field}
                  />
                );
              }}
            />
            {errors.full_name && (
              <div className="mr-10 mt-2 text-xs text-[#F4161A]">
                {errors?.full_name.message}
              </div>
            )}
          </div>

          <div>
            <label className="text-[#3D3D3D]">Email</label>
            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
              }}
              render={({ field }) => {
                return (
                  <input
                    type="email"
                    id="email"
                    autoComplete="email"
                    className="mt-2 h-[48px] w-[360px] cursor-not-allowed rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
                    {...field}
                    disabled
                  />
                );
              }}
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col">
              <label htmlFor="mobile_number" className="text-[#3D3D3D]">
                Mobile Number
              </label>
              <Controller
                name="mobile_number"
                control={control}
                rules={{
                  required: "Mobile number is required",
                  validate: (value) => {
                    const cleanValue = value.replace(/\s+/g, "");
                    if (cleanValue.length > 0 && !cleanValue.startsWith("5")) {
                      return "Georgian mobile numbers must start with 5";
                    }
                    if (cleanValue.length !== 9) {
                      return "Mobile number must be exactly 9 digits";
                    }
                    const isAllDigits = /^\d+$/.test(cleanValue);
                    if (!isAllDigits) {
                      return "Please enter a valid Georgian mobile number (9 digits starting with 5)";
                    }
                    return true;
                  },
                }}
                render={({ field }) => {
                  return (
                    <div className="relative">
                      <input
                        id="mobile_number"
                        type="tel"
                        autoComplete="tel"
                        placeholder="599209820"
                        className="mt-2 h-[48px] w-[267px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-12"
                        {...field}
                      />
                      <div className="absolute bottom-[14px] pl-2 text-[#ADADAD]">
                        +995
                      </div>
                    </div>
                  );
                }}
              />
              {errors.mobile_number && (
                <div className="mr-10 mt-2 text-xs text-[#F4161A]">
                  {errors?.mobile_number.message}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="age" className="text-[#3D3D3D]">
                Age
              </label>
              <Controller
                name="age"
                control={control}
                rules={{
                  required: "Age is required",
                  validate: (value) => {
                    if (value === "" || value === null)
                      return "Age is required";

                    if (isNaN(Number(value))) {
                      return "Age must be a number";
                    }
                    const age = Number(value);
                    if (age < 16) {
                      return "You must be at least 16 years old to enroll";
                    }

                    if (age > 120) {
                      return "Please enter a valid age";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <>
                    <select
                      id="age"
                      className="mt-2 h-[48px] w-[85px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-3 pr-4"
                      {...field}
                    >
                      <option value="" disabled></option>

                      {ages.map((age) => (
                        <option key={age} value={age}>
                          {age}
                        </option>
                      ))}
                    </select>
                  </>
                )}
              />
              {errors?.age && (
                <div className="mt-2 text-xs text-[#F4161A]">
                  {errors?.age.message}
                </div>
              )}
            </div>
          </div>
          <label htmlFor="file-upload" className="w-fit text-[#3D3D3D]">
            Upload Avatar
          </label>
          <Controller
            name="avatar"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div
                className={`flex h-[142px] flex-col items-center justify-center rounded-lg border-[1.5px] border-[#D1D1D1] ${
                  isDragging ? "border-[#281ED2] bg-[#281ED2]/5" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, onChange)}
              >
                {value ? (
                  <div className="flex flex-col items-center gap-2">
                    <p className="max-w-[200px] truncate text-sm font-normal">
                      {(value as File).name}
                    </p>
                    <button
                      type="button"
                      onClick={() => onChange(null)}
                      className="text-xs text-[#F4161A] underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div>
                      <img
                        src={uploadIcon}
                        alt="upload_icon"
                        className="h-[34px] w-[34px] object-cover"
                      />
                    </div>
                    <div className="text-sm font-normal">
                      Drag and drop or{" "}
                      <label
                        htmlFor="file-upload"
                        className="cursor-pointer text-[#281ED2] underline"
                      >
                        Upload file
                      </label>
                      <div className="mt-2 text-center text-xs">
                        JPG, WebP or PNG
                      </div>
                      <input
                        id="file-upload"
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handleFileChange(e, onChange)}
                      />
                    </div>
                  </>
                )}
              </div>
            )}
          />
          <DialogFooter>
            <Button
              type="submit"
              className="h-[47px] w-full bg-[#4F46E5] text-[#FFFFFF]"
              disabled={!isValid || updateProfilePending}
            >
              {!updateProfilePending ? "Upload Profile" : " Uploading..."}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;

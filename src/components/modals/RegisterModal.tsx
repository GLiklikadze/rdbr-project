import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useRegister } from "../../react-query/mutation/auth/authMutation";
import { useCallback, useState, type PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import { isLoginModalOpenAtom, isRegisterModalOpenAtom } from "../../state";
import { Controller, useForm } from "react-hook-form";
import uploadIcon from "@/assets/upload.svg";

type RegisterFormType = {
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
  avatar: File | null;
};

const RegisterModal: React.FC<PropsWithChildren> = ({ children }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormType>({
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
      username: "",
      avatar: null,
    },
    mode: "onBlur",
  });
  const [registerStep, setRegisterStep] = useState(1);

  const { mutate: registerMutate, isError, error } = useRegister();

  const [, setIsLoginOpen] = useAtom(isLoginModalOpenAtom);

  const [registerModalOpenAtom, setRegisterModalOpenAtom] = useAtom(
    isRegisterModalOpenAtom,
  );
  const [isDragging, setIsDragging] = useState(false);

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
  const onSubmit = (data: RegisterFormType) => {
    registerMutate(data, {
      onSuccess: () => {
        setRegisterModalOpenAtom(false);
        setIsLoginOpen(true);
      },
    });
  };

  return (
    <Dialog
      open={registerModalOpenAtom}
      onOpenChange={setRegisterModalOpenAtom}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#FFFFFF] p-[50px] sm:h-fit sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="mx-auto mb-[6px] text-[32px] font-semibold text-[#141414]">
            Create Account
          </DialogTitle>
          <DialogDescription className="mx-auto text-[14px] font-medium text-[#666666]">
            Join and start learning today
          </DialogDescription>
          <div className="gap mt-6 flex flex-row gap-2">
            <div
              className={`h-[8px] w-[115px] rounded-[30px] ${registerStep == 1 ? "bg-[#B7B3F4]" : "bg-[#4F46E5]"} `}
            ></div>
            <div
              className={`h-[8px] w-[115px] rounded-[30px] ${registerStep == 2 ? "bg-[#B7B3F4]" : registerStep == 1 ? "bg-[#EEEDFC]" : "bg-[#4F46E5]"} `}
            ></div>
            <div
              className={`h-[8px] w-[115px] rounded-[30px] ${registerStep == 3 ? "bg-[#B7B3F4]" : "bg-[#EEEDFC]"} `}
            ></div>
          </div>
        </DialogHeader>
        <form
          className="m-0 flex flex-col gap-4 p-0"
          onSubmit={handleSubmit(onSubmit)}
        >
          {registerStep === 1 && (
            <>
              <div className="space-y-2">
                <label htmlFor="email">Email*</label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      placeholder="you@example.com"
                      className="h-[48px] w-[360px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
                    />
                  )}
                />
              </div>
              {errors.email && (
                <div className="mr-10 mt-1 text-xs text-[#F4161A]">
                  {errors.email.message}
                </div>
              )}
            </>
          )}
          {registerStep === 2 && (
            <>
              <div className="space-y-2">
                <label htmlFor="password">Password*</label>
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Min 6 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      className="h-[48px] w-[360px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
                      placeholder="Password"
                    />
                  )}
                />
              </div>
              {errors.password && (
                <div className="mr-10 mt-2 text-xs text-[#F4161A]">
                  {errors.password.message}
                </div>
              )}
              <div className="space-y-2">
                <label htmlFor="password_confirmation">Confirm Password*</label>
                <Controller
                  name="password_confirmation"
                  control={control}
                  rules={{
                    required: "Confirm your password",
                    validate: (value, formValues) =>
                      value === formValues.password || "Passwords do not match",
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      placeholder="Confirm password"
                      className="h-[48px] w-[360px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
                    />
                  )}
                />
              </div>
              {errors.password_confirmation && (
                <div className="mr-10 mt-2 text-xs text-[#F4161A]">
                  {errors.password_confirmation.message}
                </div>
              )}
            </>
          )}
          {registerStep === 3 && (
            <>
              <div className="space-y-2">
                <label htmlFor="Username*" className="text-[#3D3D3D]">
                  Full Name
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Min 3 characters",
                    },
                    maxLength: {
                      value: 50,
                      message: "Max 50 characters",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="h-[48px] w-[360px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
                    />
                  )}
                />
                {errors.username && (
                  <div className="mr-10 mt-2 text-xs text-[#F4161A]">
                    {errors?.username.message}
                  </div>
                )}
              </div>
              <label className="text-[#3D3D3D]">Upload Avatar</label>
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
            </>
          )}
          {isError && (
            <p className="text-sm text-red-500">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
          )}
          {registerStep == 1 || registerStep === 2 ? (
            <Button
              type="button"
              onClick={() => {
                setRegisterStep((prev) => prev + 1);
              }}
              disabled={
                !!errors.email ||
                !!errors.password ||
                !!errors.password_confirmation
              }
              className="h-[47px] w-full bg-[#4F46E5] text-[#FFFFFF]"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              className="h-[47px] w-full bg-[#4F46E5] text-[#FFFFFF]"
            >
              Next
            </Button>
          )}
          <DialogFooter className="flex flex-col">
            <div className="mx-auto cursor-pointer text-xs">
              Already have an account?{" "}
              <span
                onClick={() => {
                  setRegisterModalOpenAtom(false);
                  setIsLoginOpen(true);
                }}
                className="text-sm font-medium text-[#141414] underline"
              >
                Log In
              </span>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;

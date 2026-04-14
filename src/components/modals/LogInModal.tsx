import {
  DialogTrigger,
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
} from "../ui/dialog";
import { useLogin } from "../../react-query/mutation/auth/authMutation";
import { useState, type PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { useAtom } from "jotai";
import { isLoginModalOpenAtom } from "../../state";

const LogInModal: React.FC<PropsWithChildren> = ({ children }) => {
  const { mutate: loginMutate, error, isError } = useLogin();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoginOpen, setIsLoginOpen] = useAtom(isLoginModalOpenAtom);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      email: "",
      password: "",
    };

    let isValid = true;

    if (form.email.length < 3) {
      newErrors.email = "Email must be at least 3 characters";
      isValid = false;
    }

    if (form.password.length < 3) {
      newErrors.password = "Password must be at least 3 characters";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) return;

    loginMutate(form, {
      onSuccess: () => {
        setIsLoginOpen(false);
      },
    });
  };
  return (
    <Dialog open={isLoginOpen} onOpenChange={setIsLoginOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-[#FFFFFF] p-[50px] sm:h-[481px] sm:max-w-[460px]">
        <DialogHeader>
          <DialogTitle className="mx-auto mb-[6px] text-[32px] font-semibold text-[#141414]">
            Welcome Back
          </DialogTitle>
          <DialogDescription className="mx-auto text-[14px] font-medium text-[#666666]">
            Log in to continue your learning
          </DialogDescription>
        </DialogHeader>
        <form className="m-0 flex flex-col gap-6 p-0" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              autoComplete="email"
              placeholder="you@example.com"
              className="h-[48px] w-[360px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
              onChange={handleChange}
              required
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}
          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              autoComplete="current-password"
              placeholder="●●●●●●"
              className="h-[48px] w-[360px] rounded-lg border-[1.5px] border-[#D1D1D1] bg-[#FFFFFF] pl-2"
              onChange={handleChange}
            />
          </div>
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}
          {isError && (
            <p className="text-sm text-red-500">
              {error instanceof Error ? error.message : "An error occurred"}
            </p>
          )}
          <DialogFooter>
            <Button
              type="submit"
              className="h-[47px] w-full bg-[#4F46E5] text-[#FFFFFF]"
            >
              Log In
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LogInModal;

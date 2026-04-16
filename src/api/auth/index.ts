import { httpClient } from "..";

type httpLoginProps = {
  email: string;
  password: string;
};
type httpRegisterProps = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
  avatar: File | null;
};

export const login = async ({ email, password }: httpLoginProps) => {
  try {
    const { data, status, statusText } = await httpClient.post(`login`, {
      email,
      password,
    });

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t Login", err);
    throw err;
  }
};

export const register = async ({
  username,
  email,
  password,
  password_confirmation,
  avatar,
}: httpRegisterProps) => {
  try {
    const formData = new FormData();

    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("password_confirmation", password_confirmation);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    const { data, status, statusText } = await httpClient.post(
      `register`,
      formData,
    );

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }
    return data;
  } catch (err) {
    console.error("Can`t register", err);
    throw err;
  }
};

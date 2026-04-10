import { httpClient } from "..";

type httpLoginProps = {
  email: string;
  password: string;
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

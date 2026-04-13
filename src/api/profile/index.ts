import { httpClient } from "..";

type putProfileProps = {
  full_name: string;
  age: string;
  mobile_number: string;
  avatar: File | null;
};
export const putProfile = async ({
  full_name,
  age,
  mobile_number,
  avatar,
}: putProfileProps) => {
  try {
    const formData = new FormData();

    formData.append("full_name", full_name);
    formData.append("age", age);
    formData.append("mobile_number", mobile_number);

    if (avatar) {
      formData.append("avatar", avatar);
    }

    const { data, status, statusText } = await httpClient.put(
      `profile`,
      formData,
    );

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }

    return data;
  } catch (err) {
    console.error("Can`t update profile", err);
    throw err;
  }
};

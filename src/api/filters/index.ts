import { httpClient } from "..";

export interface Category {
  id: number;
  name: string;
  icon: string;
}

export interface Topic {
  id: number;
  categoryId: number;
  name: string;
}

export interface Instructor {
  id: number;
  name: string;
  avatar: string;
}

export const getCategories = async (): Promise<Category[]> => {
  try {
    const { data, status, statusText } = await httpClient.get("/categories");

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }

    return data?.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
    throw err;
  }
};

export const getTopics = async (): Promise<Topic[]> => {
  try {
    const { data, status, statusText } = await httpClient.get("/topics");

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }

    return data?.data;
  } catch (err) {
    console.error("Error fetching topics:", err);
    throw err;
  }
};

export const getInstructors = async (): Promise<Instructor[]> => {
  try {
    const { data, status, statusText } = await httpClient.get("/instructors");

    if (status !== 200 && status !== 201) {
      throw new Error(`HTTP error! status: ${status} ${statusText}`);
    }

    return data?.data;
  } catch (err) {
    console.error("Error fetching instructors:", err);
    throw err;
  }
};

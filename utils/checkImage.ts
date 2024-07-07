import axios from "axios";

export const checkImage = async (url: string) => {
  try {
    const response = await axios.get(url);
    return (
      response.status === 200 &&
      response.headers["content-type"].includes("image")
    );
  } catch {
    return false;
  }
};

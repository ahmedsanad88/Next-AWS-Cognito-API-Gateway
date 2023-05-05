import ApiClientLocal from "@/utils/ApiClientLocal";

export const signup = async ({ email, password }) => {
  return ApiClientLocal.post("/api/signup", { email, password })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      return err;
    });
};

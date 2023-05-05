import ApiClientLocal from "@/utils/ApiClientLocal";

export const login = async ({ email, password }) => {
  return ApiClientLocal.post("/api/login", { email, password })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      return err;
    });
};

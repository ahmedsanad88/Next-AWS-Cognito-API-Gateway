import ApiClientLocal from "@/utils/ApiClientLocal";

export const confirmUser = async (username, code) => {
  return ApiClientLocal.post("/api/validate-user", { username, code })
    .then((data) => {
      return data.data;
    })
    .catch((err) => {
      return err;
    });
};

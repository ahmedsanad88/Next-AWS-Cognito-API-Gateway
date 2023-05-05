import axios from "axios";
import { getCookie } from "cookies-next";
import ApiClient from "@/utils/ApiClient";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method not allowed", type: "error" });
  }
  const BASE_URL = process.env.API_GATEWAY_URL;
  try {
    const response = await ApiClient.get(`${BASE_URL}/items`, {
      headers: {
        Authorization: getCookie("accessToken", { req, res }),
      },
    });
    const data = await response.data;
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ message: error.message, type: "error" });
  }
}

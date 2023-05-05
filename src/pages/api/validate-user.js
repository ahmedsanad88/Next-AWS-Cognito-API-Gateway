import UserPool from "@/server/cognito/cognito";
import { CognitoUser } from "amazon-cognito-identity-js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed", type: "error" });
  }

  const { username, code } = req.body;

  if (!username || !code) {
    res.status(400).json({ error: "Invalid data", type: "error" });
  }

  const userData = {
    Username: username,
    Pool: UserPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmRegistration(code, true, function (err, result) {
    if (err) {
      res.status(406).json({ error: err.message, type: "error" });
    }
    res.status(200).json(result);
  });
}

import UserPool from "@/server/cognito/cognito";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Invalid data" });
  }

  const authenticationData = {
    Username: email,
    Password: password,
  };
  const authenticationDetails = new AuthenticationDetails(authenticationData);

  var userData = {
    Username: email,
    Pool: UserPool,
  };
  var cognitoUser = new CognitoUser(userData);

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
      var accessToken = result.getAccessToken().getJwtToken();
      res.status(200).json(accessToken);
    },

    onFailure: function (err) {
      res.json({ error: err.message });
    },
  });
}

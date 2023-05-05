import UserPool from "@/server/cognito/cognito";

export default function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed", type: "error" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Invalid data", type: "error" });
  }

  UserPool.signUp(email, password, [], null, function (err, result) {
    if (err) {
      res.status(400).json({ error: err.message, type: "error" });
    }
    res.status(200).json(result);
  });
}

import React, { useState } from "react";
import { setCookie } from "cookies-next";
import Input from "./Input";
import Button from "./Button";
import { signup } from "@/server/signup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { login } from "@/server/login";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push, pathname } = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    signup({ email, password }).then((res) => {
      if (!res.error) {
        setCookie("userSub", res.userSub);
        toast.success("User created successfully", { theme: "colored" });
        push(`/validate-user/${email}`);
        setEmail("");
        setPassword("");
      } else {
        toast.error(res.error, { theme: "colored" });
      }
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password }).then((res) => {
      if (!res.error) {
        setCookie("accessToken", res);
        setEmail("");
        setPassword("");
        toast.success("User Login successfully", { theme: "colored" });
        push("/");
      } else {
        toast.error(res.error, { theme: "colored" });
      }
    });
  };

  return (
    <div className="max-w-2xl w-full mx-auto">
      <h1 className="text-center text-2xl font-bold">
        {pathname === "/signup" ? "Sign Up" : "Login"}
      </h1>
      <form
        onSubmit={pathname === "/signup" ? handleSignUp : handleLogin}
        className="flex flex-col gap-4"
      >
        <Input
          type="email"
          id="email"
          placeholder="abc@abc.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text={pathname === "/signup" ? "Sign Up" : "Login"} />
      </form>
    </div>
  );
};

export default SignUp;

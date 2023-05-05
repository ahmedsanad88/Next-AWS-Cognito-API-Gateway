import React, { useState } from "react";
import { setCookie } from "cookies-next";
import Input from "./Input";
import Button from "./Button";
import { signup } from "@/server/signup";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { login } from "@/server/login";
import Link from "next/link";
import { isAxiosError } from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { push, pathname } = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    signup({ email, password }).then((res) => {
      console.log(res);
      if (!isAxiosError(res) && !res.type) {
        setCookie("userSub", res.userSub);
        toast.success("User created successfully", { theme: "colored" });
        push(`/validate-user/${email}`);
        setEmail("");
        setPassword("");
      } else {
        if (res.type === "error") toast.error(res.error, { theme: "colored" });
        toast.error(res?.response?.data?.error, { theme: "colored" });
      }
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    login({ email, password }).then((res) => {
      if (!isAxiosError(res) && !res.type) {
        setCookie("accessToken", res);
        setEmail("");
        setPassword("");
        toast.success("User Login successfully", { theme: "colored" });
        push("/");
      } else {
        if (res.type === "error") toast.error(res.error, { theme: "colored" });
        toast.error(res?.response?.data?.error, { theme: "colored" });
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
      <div className="mt-4 text-gray-300">
        <Link href={pathname === "/signup" ? "/login" : "/signup"}>
          {pathname === "/signup"
            ? "Already have an account? Login here"
            : "Don't have an account? Sign up here"}
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

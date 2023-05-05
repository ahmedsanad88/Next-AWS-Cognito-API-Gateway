import React, { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { confirmUser } from "@/server/confirmUser";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const ActivateAccount = () => {
  const [code, setCode] = useState("");
  const { query, push } = useRouter();

  const handleConfirmation = async (e) => {
    e.preventDefault();
    confirmUser(query.username, code).then((res) => {
      if (!isAxiosError(res)) {
        toast.success("Account Confirmed", { theme: "colored" });
        setCode("");
        push("/login");
      } else {
        toast.error(res?.response?.data?.error, { theme: "colored" });
      }
    });
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl mb-4">
        Validate your account
      </h1>
      <form onSubmit={handleConfirmation}>
        <Input
          type="text"
          id="confirmationCode"
          placeholder="123456"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button text="Confirm account" />
      </form>
    </div>
  );
};

export default ActivateAccount;
{
  /* <Button
        text="Verify Account"
        type="button"
        onClick={() => setShowVerification(true)}
      /> */
}

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../core/apiClient";
import toast from "react-hot-toast";
import Button from "../../components/button/button";

export default function ResetPassword() {
  const { resettoken } = useParams();
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.put(`/auth/resetpassword/${resettoken}`, {
        password,
      });
      toast.success("Password updated!");
      navigate("/signin");
    } catch (err: any) {
      toast.error("Invalid or expired token");
    }
  };

  return (
    <div className="container mx-auto py-20 flex justify-center">
      <form onSubmit={handleReset} className="w-full max-w-md border p-8">
        <h2 className="header text-2xl mb-4">SET NEW PASSKEY</h2>
        <input
          type="password"
          className="w-full border p-4 mb-4"
          placeholder="New password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full">
          Reset Password
        </Button>
      </form>
    </div>
  );
}

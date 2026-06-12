import { useState } from "react";
import apiClient from "../../core/apiClient";
import toast from "react-hot-toast";
import Button from "../../components/button/button";
import { useTranslation } from "../../localization/i18n";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation("auth");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await apiClient.post("/auth/forgotpassword", { email });
      toast.success(t("forgotPassword.success"));
    } catch (err: any) {
      toast.error(err.response?.data?.message || t("forgotPassword.error"));
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="container mx-auto py-20 flex justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md border p-8">
        <h2 className="header text-2xl mb-4">{t("forgotPassword.title")}</h2>
        <input
          className="w-full border p-4 mb-4"
          placeholder={t("forgotPassword.placeholder")}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" variant="primary" className="w-full">
          {isLoading ? t("forgotPassword.sending") : t("forgotPassword.submit")}
        </Button>
      </form>
    </div>
  );
}

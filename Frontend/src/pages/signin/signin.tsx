import { useState } from "react";

function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex justify-center pt-16 px-4 pb-12">
        <div className="w-full max-w-3xl flex flex-col">
          <div className="mb-10">
            <h1 className="header text-6xl md:text-8xl text-[var(--primary-color-900)] tracking-tight mb-4">
              ACCESS SYSTEM
            </h1>
            <p className="inter text-base md:text-lg text-[var(--neutral-color-800)] max-w-2xl leading-relaxed">
              SWIM Protocol v4.02. Secure terminal for Industrial Store and
              Warehouse Inventory Management. Unauthorized access is logged and
              prosecuted.
            </p>
          </div>

          <div className="w-full border border-[var(--neutral-color-300)] p-8 md:p-12 bg-white">
            <div className="mb-8 inline-block">
              <h2 className="header text-base tracking-widest text-[var(--primary-color-900)] uppercase leading-tight">
                AUTHENTICATION
                <br />
                <span className="border-b-[3px] border-[var(--primary-color-900)] pb-1 inline-block">
                  REQ
                </span>
                <span className=" border-[var(--primary-color-900)] pb-1 inline-block">
                  UIRED
                </span>
              </h2>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="regular text-xs text-[var(--neutral-color-700)] uppercase tracking-widest">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operator@iti.gov.eg"
                  className="regular w-full border border-[var(--neutral-color-200)] p-4 text-[var(--primary-color-900)] placeholder-[var(--neutral-color-400)] focus:outline-none focus:border-[var(--primary-color-400)] transition-colors"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="regular text-xs text-[var(--neutral-color-700)] uppercase tracking-widest">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  className="regular w-full border border-[var(--neutral-color-200)] p-4 text-[var(--primary-color-900)] placeholder-[var(--neutral-color-400)] focus:outline-none focus:border-[var(--primary-color-400)] transition-colors"
                  required
                />
              </div>

              <button
                type="submit"
                className="inter tracking-widest w-full bg-[var(--primary-color-900)] text-white py-4 mt-4 font-medium hover:bg-[var(--primary-color-700)] transition-colors uppercase"
              >
                Authenticate
              </button>
            </form>

            <div className="flex justify-between items-center mt-6">
              <button
                type="button"
                className="regular text-xs text-[var(--neutral-color-600)] hover:text-[var(--primary-color-900)] underline decoration-[var(--neutral-color-400)] hover:decoration-[var(--primary-color-900)] underline-offset-4 transition-colors"
              >
                FORGOT PASSKEY?
              </button>
              <p className="regular text-xs text-[var(--neutral-color-600)]">
                NEW TO SWIM?{" "}
                <a
                  href="/signup"
                  className="text-[var(--primary-color-900)] hover:underline underline-offset-4 font-bold ml-1"
                >
                  SIGN UP
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default SignIn;
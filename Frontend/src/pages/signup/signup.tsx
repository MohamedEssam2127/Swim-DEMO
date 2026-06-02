import { useState } from "react";
import octopusImg from "../../assets/images/octupus.svg";
import Button from "../../components/button/button"

function SignUp() {
  const [step, setStep] = useState<number>(1);

  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [orgName, setOrgName] = useState<string>("");
  const [warehouse, setWarehouse] = useState<string>("");
  const [industry, setIndustry] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);

  const handleNextStep = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStep(2);
  };

  const handleCreateAccount = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Final Registration Data:", {
      fullName, email, password, orgName, warehouse, industry, agreed
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow flex justify-center pt-16 px-4 pb-12">
        <div className="w-full max-w-7xl flex flex-col">
          
          {step === 1 && (
            <div className="w-full flex flex-col animate-fade-in">
              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b border-transparent">
                <div>
                  <h1 className="header text-6xl md:text-8xl text-primary-900 tracking-tight mb-2 uppercase">
                    Join The Core
                  </h1>
                  <h2 className="inter text-xl md:text-2xl text-primary-900 uppercase tracking-widest">
                    Personal Information
                  </h2>
                </div>
                
                <div className="flex items-center gap-4 mt-6 md:mt-0">
                  <div className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary-700"></span>
                    <span className="w-5 h-5 rounded-full bg-primary-200"></span>
                  </div>
                  <span className="inter text-3xl text-primary-900">1/2</span>
                </div>
              </div>

              <form onSubmit={handleNextStep} className="flex flex-col gap-8">
                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="regular text-xs text-neutral-700 uppercase tracking-widest">Full Name</label>
                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="OPERATOR NAME" className="regular w-full border border-neutral-200 p-4 text-primary-900 placeholder-neutral-400 focus:outline-none focus:border-primary-400 transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="regular text-xs text-neutral-700 uppercase tracking-widest">Work Email Address</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="operator@iti.gov.eg" className="regular w-full border border-neutral-200 p-4 text-primary-900 placeholder-neutral-400 focus:outline-none focus:border-primary-400 transition-colors" required />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="regular text-xs text-neutral-700 uppercase tracking-widest">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="******" className="regular w-full border border-neutral-200 p-4 text-primary-900 placeholder-neutral-400 focus:outline-none focus:border-primary-400 transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <label className="regular text-xs text-neutral-700 uppercase tracking-widest">Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="******" className="regular w-full border border-neutral-200 p-4 text-primary-900 placeholder-neutral-400 focus:outline-none focus:border-primary-400 transition-colors" required />
                  </div>
                </div>

                <Button type="submit" variant="primary" className="w-full mt-4">
                  Next Step
                </Button>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="w-full flex flex-col animate-fade-in">
              <div className="flex justify-center mb-6">
                <img src={octopusImg} alt="Octopus Logo" className="w-40 h-40 object-contain" />
              </div>

              <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 border-b border-transparent">
                <div>
                  <h1 className="header text-6xl md:text-8xl text-primary-900 tracking-tight mb-2 uppercase">Set Up Your Dock</h1>
                  <h2 className="inter text-xl md:text-2xl text-primary-900 uppercase tracking-widest">Organization Information</h2>
                </div>
                <div className="flex items-center gap-4 mt-6 md:mt-0">
                  <div className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-primary-700"></span>
                    <span className="w-5 h-5 rounded-full bg-primary-700"></span>
                  </div>
                  <span className="inter text-3xl text-primary-900">2/2</span>
                </div>
              </div>

              <form onSubmit={handleCreateAccount} className="flex flex-col gap-8">
                 <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="regular text-xs text-neutral-700 uppercase tracking-widest">Company/Organization Name</label>
                    <input type="text" value={orgName} onChange={(e) => setOrgName(e.target.value)} placeholder="information technology institute" className="regular w-full border border-neutral-200 p-4 text-primary-900 placeholder-neutral-400 focus:outline-none focus:border-primary-400 transition-colors" required />
                  </div>
                  <div className="flex flex-col gap-2 w-full relative">
                    <label className="regular text-xs text-neutral-700 uppercase tracking-widest">Primary Warehouse Name/Location</label>
                    <select value={warehouse} onChange={(e) => setWarehouse(e.target.value)} className="regular appearance-none w-full border border-neutral-200 p-4 text-primary-900 bg-white focus:outline-none focus:border-primary-400 transition-colors cursor-pointer" required>
                      <option value="" disabled>smart village</option>
                      <option value="smart-village">Smart Village</option>
                      <option value="cairo">Cairo</option>
                    </select>
                    <div className="absolute right-4 top-[2.75rem] pointer-events-none text-neutral-500">▼</div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 w-full relative">
                  <label className="regular text-xs text-neutral-700 uppercase tracking-widest">Industry/Sector (Optional):</label>
                  <select value={industry} onChange={(e) => setIndustry(e.target.value)} className="regular appearance-none w-full border border-neutral-200 p-4 text-primary-900 bg-white focus:outline-none focus:border-primary-400 transition-colors cursor-pointer">
                    <option value="" disabled>Retail, Cold Storage, Manufacturing</option>
                    <option value="retail">Retail</option>
                    <option value="manufacturing">Manufacturing</option>
                  </select>
                  <div className="absolute right-4 top-[2.75rem] pointer-events-none text-neutral-500">▼</div>
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <input type="checkbox" id="protocol" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 accent-primary-900 cursor-pointer" required />
                  <label htmlFor="protocol" className="regular text-xs text-neutral-700 uppercase tracking-widest cursor-pointer mt-[2px]">I agree to the protocol</label>
                </div>

                <Button type="submit" variant="primary" className="w-full mt-4">
                  Create Account
                </Button>
              </form>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default SignUp;
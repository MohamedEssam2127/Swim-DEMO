import { useState } from "react";
import StoreRequestForm from "./store";
import MyRequests from "./request";

type ActiveTab = "store" | "request";

export default function StoreTab() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("store");

  const tabs: { id: ActiveTab; label: string }[] = [
    { id: "store", label: "Store Request" },
    { id: "request", label: "My Requests" },
  ];

  return (
    <div className="mt-8 flex flex-col gap-5">
      {/* ── Tab Navigator ── */}
      <div className="flex border-b border-neutral-300 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`relative shrink-0 flex items-center gap-2 px-5 py-3 header text-[13px] tracking-widest uppercase font-bold transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-b-2 border-primary-800 text-primary-800"
                  : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ── */}
      {activeTab === "store" && <StoreRequestForm />}
      {activeTab === "request" && <MyRequests />}
    </div>
  );
}

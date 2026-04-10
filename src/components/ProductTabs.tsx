"use client";

import { useState } from "react";

interface Tab {
  label: string;
  content: React.ReactNode;
}

interface ProductTabsProps {
  tabs: Tab[];
}

export default function ProductTabs({ tabs }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="mt-12 border-t border-gray-100">
      <div className="flex space-x-8 overflow-x-auto no-scrollbar py-6">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`text-sm font-medium uppercase tracking-widest pb-4 border-b-4 transition-all whitespace-nowrap ${activeTab === index
              ? "border-[#B4623A] text-gray-900"
              : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="py-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {tabs[activeTab].content}
      </div>
    </div>
  );
}

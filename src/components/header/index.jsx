"use client"
import React,{ useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const navigationItems = [
  { label: "Useful SaaS", value: "useful-saas" },
  { label: "History", value: "history" },
  { label: "Exporting", value: "exporting" },
  { label: "Export Logs", value: "export-logs" },
]

export default function HeaderComponent() {
  const [activeTab, setActiveTab] = useState("useful-saas")

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-6 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
      <div className="flex-1 overflow-x-auto scrollbar-hide mr-4 pb-2 md:pb-3">
        <nav className="flex items-center gap-6 md:gap-10 min-w-max">
          {navigationItems.map((tab) => (
            <button
              key={tab.value}
              className={`relative text-xs md:text-sm font-semibold transition-all duration-300 ease-out group whitespace-nowrap ${
                activeTab === tab.value ? "text-emerald-600" : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
              <span
                className={`absolute -bottom-2 md:-bottom-3 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300 ease-out ${
                  activeTab === tab.value
                    ? "w-full opacity-100"
                    : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
                }`}
              />
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center flex-shrink-0">
        <Button className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold rounded-lg md:rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95">
          <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
          <span className="hidden sm:inline">VIEW DEMO</span>
          <span className="sm:hidden">VIEW DEMO</span>
        </Button>
      </div>
    </header>
  )
}

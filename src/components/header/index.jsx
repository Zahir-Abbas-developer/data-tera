"use client"
import React,{ useState } from "react"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const navigationItems = [
  { label: "Data", value: "data" },
  { label: "History", value: "history" },
  { label: "Exporting", value: "exporting" },
  { label: "Export Logs", value: "export-logs" },
]

export default function HeaderComponent() {
  const [activeTab, setActiveTab] = useState("data")

  return (
    <header className="px-4 md:px-4 py-4 md:py-4 bg-white/95 backdrop-blur-sm border-b border-gray-200/60 shadow-sm">
      {/* Title section */}
    <div className="relative mb-4">
  <h1 className="text-2xl md:text-2xl font-bold text-gray-900">Useful SaaS</h1>
</div>

      <div className="flex items-center justify-between">
        <nav className="flex items-center gap-6 md:gap-8 overflow-x-auto scrollbar-hide">
          {navigationItems.map((tab) => (
            <button
              key={tab.value}
              className={`relative text-xs md:text-sm font-semibold transition-all duration-300 ease-out group whitespace-nowrap px-3 py-2 rounded-lg ${
                activeTab === tab.value
                  ? "text-emerald-600 border-2 border-emerald-500"
                  : "text-gray-600 hover:text-gray-900 border-2 border-transparent hover:border-gray-300"
              }`}
              onClick={() => setActiveTab(tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center flex-shrink-0 ml-4">
          <Button className="flex items-center gap-1.5 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white px-3 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-semibold rounded-lg md:rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 active:scale-95">
            <Eye className="h-3.5 w-3.5 md:h-4 md:w-4" />
            <span className="hidden sm:inline">VIEW DEMO</span>
            <span className="sm:hidden">VIEW DEMO</span>
          </Button>
        </div>
      </div>
    </header>
  )
}

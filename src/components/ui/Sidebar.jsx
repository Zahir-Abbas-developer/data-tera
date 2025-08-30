"use client"
import React,{ useState, useRef, useEffect } from "react"
import { Button } from "./button"
import { Input } from "./input"
import AddTransformationModal from "./AddTransformationModal"
import {
  ChevronDown,
  ChevronUp,
  MoreVertical,
  Plus,
  X,
  Search,
  User,
  LogOut,
  ExternalLink,
  Star,
  Pencil,
  Copy,
  EyeOff,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Globe,
} from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Tooltip, TooltipTrigger, TooltipContent } from "./tooltip"
import TransformationLimitBar from "../transformations/TransformationLimitBar"
import { cn } from "@/lib/utils"

const Sidebar = ({
  userEmail = "mihailorama@gmail.com",
  transformations = [
    "Useful SaaS",
    "SaaS - competitio",
    "B2B Email sample",
    "Marketing tools",
    "BUSIEST AIRPORTS",
    "Tennis Clubs in",
    "Investors_URLs",
    "Investors_info",
    "Amazon - list of",
    "Kits y reactivos",
    "PH_info",
    "HR_full",
  ],
  onSelect,
  onLogout,
  isCollapsed,
  onCollapsedChange,
  setIsStickyHeader,
}) => {
  const [openMenuIdx, setOpenMenuIdx] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [modalMode, setModalMode] = useState("create")
  const [editingItem, setEditingItem] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const menuRef = useRef()
  const navigate = useNavigate()
  const { logout } = useAuth()

  const [selectedLanguage, setSelectedLanguage] = useState("english")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const languageRef = useRef()

  const languages = [
    { value: "english", label: "English" },
    { value: "spanish", label: "Español" },
    { value: "french", label: "Français" },
    { value: "deutsch", label: "Deutsch" },
  ]

  const bottomItems = [
    {
      label: "Upgrade to PLUS",
      icon: <Star className="w-5 h-5 text-yellow-400" fill="#facc15" />,
      onClick: () => {},
    },
    {
      label: "Profile",
      icon: <User className="w-5 h-5 text-[#b3b3b3]" />,
      onClick: () => {},
    },
    
    {
      label: languages.find((lang) => lang.value === selectedLanguage)?.label || "English",
      icon: <Globe className="w-5 h-5 text-[#b3b3b3]" />,
      onClick: () => setShowLanguageDropdown(!showLanguageDropdown),
      isLanguage: true,
    },
    {
      label: "Integrations",
      icon: <ExternalLink className="w-5 h-5 text-[#b3b3b3]" />,
      onClick: () => {},
    },
    {
      label: "Logout",
      icon: <LogOut className="w-5 h-5 text-[#b3b3b3]" />,
      onClick:
        onLogout ||
        (() => {
          logout()
          localStorage.clear()
          navigate("/signin")
        }),
    },
  ]

  const handleMenuAction = (action, item) => {
    switch (action) {
      case "edit":
        setModalMode("edit")
        setEditingItem(item)
        setShowModal(true)
        break
      case "copyWithoutData":
        console.log("Copy without data:", item)
        break
      case "copyWithData":
        console.log("Copy with data:", item)
        break
      case "unsubscribe":
        console.log("Unsubscribe:", item)
        break
      case "delete":
        console.log("Delete:", item)
        break
      default:
        break
    }
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenuIdx(null)
      }
      if (languageRef.current && !languageRef.current.contains(e.target)) {
        setShowLanguageDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1030
      setIsMobile(mobile)
      if (mobile) {
        onCollapsedChange(true)
      } else {
        onCollapsedChange(false)
      }
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [onCollapsedChange])

  const chromeIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="w-5 h-5"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <circle cx="24" cy="24" r="20" fill="#fff" />
      <path fill="#ea4335" d="M24 4a20 20 0 0 1 17.32 10H24z" />
      <path fill="#4285f4" d="M24 44a20 20 0 0 1-17.32-10H24z" />
      <path fill="#fbbc04" d="M44 24a20 20 0 0 1-20 20v20z" />
      <path fill="#34a853" d="M4 24a20 20 0 0 1 20-20v20z" />
      <circle cx="24" cy="24" r="8" fill="#fff" />
      <circle cx="24" cy="24" r="5" fill="#4285f4" />
    </svg>
  )

  return (
    <>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => onCollapsedChange(true)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800 shadow-2xl transition-all duration-300 z-50",
          isMobile ? "w-[280px]" : "w-[280px]",
          isCollapsed && "translate-x-[-100%] lg:translate-x-0 lg:w-16",
          !isCollapsed && isMobile && "shadow-2xl",
        )}
      >
        {!isMobile && (
          <button
            onClick={() => onCollapsedChange((c) => !c)}
            className="absolute top-6 -right-3 z-20 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-full shadow-lg p-1.5 border border-slate-700 transition-all duration-200 hover:scale-105"
            style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center" }}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        )}

        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {!isCollapsed && (
            <div className="flex-shrink-0 flex items-center justify-between px-6 py-2 border-b border-slate-800/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <User size={16} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-white truncate">{userEmail}</span>
                </div>
              </div>
              {isMobile && (
                <button
                  onClick={() => onCollapsedChange(true)}
                  className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          )}

          {!isCollapsed && (
            <div className="flex-shrink-0 px-6 py-1">
              <Button
                onClick={() => {
                  setShowModal(true)
                  setIsStickyHeader(false)
                  if (isMobile) onCollapsedChange(true)
                }}
                className="bg-green-600 hover:bg-green-700 transition-colors text-white px-6 py-1 font-medium shadow-sm flex items-center gap-2 w-full justify-center"
              >
                <Plus size={18} /> New Transformation
              </Button>
            </div>
          )}

          {!isCollapsed && (
            <div className="flex-shrink-0 px-6 pb-2">
              <TransformationLimitBar used={10} total={10} />
            </div>
          )}

          {!isCollapsed && (
            <div className="flex-shrink-0 px-6 pb-1">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search ..."
                  className="w-full bg-slate-800 text-white border-slate-700 pl-10 placeholder:text-slate-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent rounded-lg h-11 transition-all duration-200"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              </div>
            </div>
          )}

          <nav className="flex-1 overflow-y-auto px-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent hover:scrollbar-thumb-slate-600">
            <style jsx>{`
              nav::-webkit-scrollbar {
                width: 6px;
              }
              nav::-webkit-scrollbar-track {
                background: transparent;
              }
              nav::-webkit-scrollbar-thumb {
                background-color: rgb(51 65 85);
                border-radius: 3px;
              }
              nav::-webkit-scrollbar-thumb:hover {
                background-color: rgb(71 85 105);
              }
              nav {
                scrollbar-width: thin;
                scrollbar-color: rgb(51 65 85) transparent;
              }
            `}</style>
            <ul className={`space-y-1 py-1 ${isCollapsed ? "flex flex-col items-center" : ""}`}>
              {transformations.map((item, idx) => (
                <li key={idx} className="relative w-full">
                  <div
                    className={`flex items-center ${!isCollapsed ? "justify-between" : "justify-center"} px-3 py-1 rounded-lg hover:bg-slate-800 cursor-pointer group transition-all duration-200 hover:shadow-sm border border-transparent hover:border-slate-700`}
                    title={isCollapsed ? item : undefined}
                  >
                    <div
                      className="flex items-center gap-3 flex-1 min-w-0"
                      onClick={() => {
                        navigate("/transformation-table")
                        if (isMobile) onCollapsedChange(true)
                      }}
                    >
                      {isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Globe
                              size={18}
                              className="text-slate-400 group-hover:text-emerald-400 transition-colors flex-shrink-0"
                            />
                          </TooltipTrigger>
                          <TooltipContent
                            side="right"
                            className="bg-slate-800 text-white rounded-lg px-3 py-1 text-sm shadow-xl border border-slate-700"
                          >
                            {item}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Globe
                          size={18}
                          className="text-slate-400 group-hover:text-emerald-400 transition-colors flex-shrink-0"
                        />
                      )}
                      {!isCollapsed && (
                        <span className="truncate font-medium text-sm text-slate-200 group-hover:text-white transition-colors">
                          {item}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-emerald-400 transition-colors">
                          <ChevronUp size={14} />
                        </button>
                        <button className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-emerald-400 transition-colors">
                          <ChevronDown size={14} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setOpenMenuIdx(openMenuIdx === idx ? null : idx)
                          }}
                          className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-emerald-400 transition-colors"
                        >
                          <MoreVertical size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  {openMenuIdx === idx && !isCollapsed && (
                    <div
                      ref={menuRef}
                      className="absolute left-2 top-2 z-50 w-56 bg-slate-800 rounded-lg shadow-2xl py-1 border border-slate-700 animate-fade-in backdrop-blur-sm"
                    >
                      <button
                        onClick={() => handleMenuAction("edit", item)}
                        className="flex items-center gap-3 w-full px-4 py-1 hover:bg-slate-700 text-sm text-slate-200 hover:text-white transition-colors"
                      >
                        <Pencil size={14} /> Edit name & descriptions
                      </button>
                      <button
                        onClick={() => handleMenuAction("copyWithoutData", item)}
                        className="flex items-center gap-3 w-full px-4 py-1 hover:bg-slate-700 text-sm text-slate-200 hover:text-white transition-colors"
                      >
                        <Copy size={14} /> Copy without data
                      </button>
                      <button
                        onClick={() => handleMenuAction("copyWithData", item)}
                        className="flex items-center gap-3 w-full px-4 py-1 hover:bg-slate-700 text-sm text-slate-200 hover:text-white transition-colors"
                      >
                        <Copy size={14} /> Copy with data
                      </button>
                      <div className="h-px bg-slate-700 my-1" />
                      <button
                        onClick={() => handleMenuAction("unsubscribe", item)}
                        className="flex items-center gap-3 w-full px-4 py-1 hover:bg-slate-700 text-sm text-orange-400 hover:text-orange-300 transition-colors"
                      >
                        <EyeOff size={14} /> Unsubscribe
                      </button>
                      <button
                        onClick={() => handleMenuAction("delete", item)}
                        className="flex items-center gap-3 w-full px-4 py-1 hover:bg-slate-700 text-sm text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`flex-shrink-0 border-t border-slate-800/50 px-4 py-1 space-y-1 ${
              isCollapsed ? "flex flex-col items-center" : ""
            }`}
          >
            {bottomItems.map((item) =>
              isCollapsed ? (
                <Tooltip key={item.label}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={item.onClick}
                      className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      {item.icon}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    className="bg-slate-800 text-white rounded-lg px-3 py-1 text-sm shadow-xl border border-slate-700"
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              ) : (
                <div key={item.label} className="relative">
                  <button
                    onClick={item.onClick}
                    className="flex items-center gap-3 w-full px-3 py-1 rounded-lg hover:bg-slate-800 text-sm font-medium text-slate-200 hover:text-white transition-all duration-200 border border-transparent hover:border-slate-700"
                  >
                    {item.icon}
                    {item.label}
                  </button>
                  {item.isLanguage && showLanguageDropdown && (
                    <div
                      ref={languageRef}
                      className="absolute bottom-full left-0 mb-2 w-full bg-slate-800 rounded-lg shadow-2xl py-1 border border-slate-700 animate-fade-in backdrop-blur-sm z-50"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.value}
                          onClick={() => {
                            setSelectedLanguage(lang.value)
                            setShowLanguageDropdown(false)
                          }}
                          className={`flex items-center w-full px-4 py-2 hover:bg-slate-700 text-sm transition-colors ${
                            selectedLanguage === lang.value
                              ? "text-emerald-400 bg-slate-700/50"
                              : "text-slate-200 hover:text-white"
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}
          </div>
        </div>
      </aside>

      <AddTransformationModal
        open={showModal}
        onClose={() => {
          setShowModal(false)
          setModalMode("create")
          setEditingItem(null)
        }}
        mode={modalMode}
        initialData={editingItem}
        setIsStickyHeader={setIsStickyHeader}
      />
    </>
  )
}

export default Sidebar

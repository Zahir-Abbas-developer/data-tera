"use client"

import React, { useState } from "react"

const initialColumns = [
  { key: "filename", label: "FileName" },
  { key: "datetime", label: "Date/Time" },
  { key: "source", label: "Data source single URL" },
  { key: "title", label: "Application Title" },
  { key: "description", label: "Description" },
]

// Generate 25 sample records for pagination demo
const initialData = Array.from({ length: 8 }, (_, i) => ({
  filename: `text${i + 1}.txt`,
  datetime: `10/15/2023, 12:43:${(13 + i).toString().padStart(2, "0")} PM`,
  source: i % 2 === 0 ? "https://www.tella.tv/" : "https://gumroad.com/",
  title:
    i % 2 === 0
      ? "Tella - Start recording better videos, fast. Tella - Record incredible videos, Tella 8DU Record incredible videos"
      : "Fitness & Health, Design, Writing & Publishing, Gaming, Audio, Self Improvement, ...",
  description:
    i % 2 === 0
      ? "Screen recording for creators — simple and powerful. Tella is your all-in-one screen recorder. ..."
      : "Short stories, novels, and epic tomes full of interesting characters and worlds. ...",
}))

const PAGE_SIZE = 5

const TransformationTable = ({ isStickyHeader, setIsStickyHeader }) => {
  const [columns] = useState(initialColumns)
  const [data] = useState(initialData)
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState({ key: null, direction: null })

  const filteredData = data.filter((row) =>
    columns.every((col) => !filters[col.key] || row[col.key]?.toLowerCase().includes(filters[col.key].toLowerCase())),
  )

  const sortedData = React.useMemo(() => {
    if (!sort.key || !sort.direction) return filteredData
    const sorted = [...filteredData].sort((a, b) => {
      const aVal = a[sort.key] || ""
      const bVal = b[sort.key] || ""
      if (aVal < bVal) return sort.direction === "asc" ? -1 : 1
      if (aVal > bVal) return sort.direction === "asc" ? 1 : -1
      return 0
    })
    return sorted
  }, [filteredData, sort])

  const totalPages = Math.ceil(sortedData.length / PAGE_SIZE)
  const paginatedData = sortedData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSort = (key) => {
    setSort((prev) => {
      if (prev.key !== key) return { key, direction: "asc" }
      if (prev.direction === "asc") return { key, direction: "desc" }
      if (prev.direction === "desc") return { key: null, direction: null }
      return { key, direction: "asc" }
    })
    setPage(1)
  }

  const goToPage = (p) => {
    if (p < 1 || p > totalPages) return
    setPage(p)
  }

  return (
    <div className="w-full bg-white">
      <div className="sticky top-0 z-10 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <button className="bg-green-600 hover:bg-green-700 transition-colors text-white px-6 py-1 rounded-xl font-medium shadow-sm flex items-center gap-2 w-full lg:w-auto justify-center">
            <span className="text-lg">+</span>
            <div className="text-left">
              <div className="font-semibold">Choose File, Text, or Website</div>
            </div>
          </button>
          <div className="flex gap-3 w-full lg:w-auto">
            <button className="bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 border border-green-200 rounded-lg px-4 py-2.5 font-medium flex items-center gap-2 flex-1 lg:flex-none justify-center text-sm">
              <span className="text-gray-500">+</span>
              Add Column
            </button>
            <button className="bg-gray-50 hover:bg-gray-100 transition-colors text-gray-700 border border-green-200 rounded-lg px-4 py-2.5 font-medium flex items-center gap-2 flex-1 lg:flex-none justify-center text-sm">
              <span className="text-gray-500">+</span>
              Add Row
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col h-[calc(100vh-242px)]">
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          <table className="min-w-full table-fixed">
            <thead className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-sm border-b border-gray-100">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={col.key}
                    className={`px-6 py-4 text-left font-semibold text-gray-900 cursor-pointer select-none hover:bg-gray-100/50 transition-colors ${
                      index !== columns.length - 1 ? "border-r border-gray-100" : ""
                    }`}
                    style={{
                      width:
                        col.key === "filename"
                          ? "15%"
                          : col.key === "datetime"
                            ? "18%"
                            : col.key === "source"
                              ? "20%"
                              : col.key === "title"
                                ? "25%"
                                : "22%",
                    }}
                    onClick={() => handleSort(col.key)}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm font-semibold">{col.label}</span>
                      <div className="flex items-center">
                        {sort.key === col.key && sort.direction === "asc" && (
                          <span className="text-green-600 text-xs">↑</span>
                        )}
                        {sort.key === col.key && sort.direction === "desc" && (
                          <span className="text-green-600 text-xs">↓</span>
                        )}
                        {sort.key !== col.key && <span className="text-gray-300 text-xs">↕</span>}
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder={`Filter ${col.label}`}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                      value={filters[col.key] || ""}
                      onChange={(e) => {
                        setFilters((f) => ({ ...f, [col.key]: e.target.value }))
                        setPage(1)
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-12 text-gray-500">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-xl">📄</span>
                      </div>
                      <p className="font-medium">No data found</p>
                      <p className="text-sm text-gray-400">Try adjusting your filters</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    {columns.map((col, colIndex) => (
                      <td
                        key={col.key}
                        className={`px-6 py-4 text-sm text-gray-700 align-top ${
                          colIndex !== columns.length - 1 ? "border-r border-gray-50" : ""
                        }`}
                        style={{
                          width:
                            col.key === "filename"
                              ? "15%"
                              : col.key === "datetime"
                                ? "18%"
                                : col.key === "source"
                                  ? "20%"
                                  : col.key === "title"
                                    ? "25%"
                                    : "22%",
                          wordBreak: "break-word",
                        }}
                      >
                        {col.key === "source" ? (
                          <a
                            href={row[col.key]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                          >
                            {row[col.key]}
                          </a>
                        ) : (
                          <span className="leading-relaxed">{row[col.key]}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="flex-shrink-0 border-t border-gray-100 bg-gray-50/30 px-6 py-4 sticky bottom-0 z-20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">{(page - 1) * PAGE_SIZE + 1}</span> to{" "}
              <span className="font-medium">{Math.min(page * PAGE_SIZE, sortedData.length)}</span> of{" "}
              <span className="font-medium">{sortedData.length}</span> results
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
              >
                Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum
                  if (totalPages <= 5) {
                    pageNum = i + 1
                  } else if (page <= 3) {
                    pageNum = i + 1
                  } else if (page >= totalPages - 2) {
                    pageNum = totalPages - 4 + i
                  } else {
                    pageNum = page - 2 + i
                  }

                  return (
                    <button
                      key={pageNum}
                      className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                        page === pageNum
                          ? "bg-green-600 text-white shadow-sm"
                          : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  )
                })}
              </div>
              <button
                className="px-3 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransformationTable

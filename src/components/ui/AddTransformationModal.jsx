"use client"

import React ,{ useState, useEffect } from "react"
import { X, Upload, Sparkles } from "lucide-react"

const AddTransformationModal = ({ open, onClose, mode = "create", initialData = null, setIsStickyHeader }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    template: "",
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        template: initialData.template || "",
      })
    } else {
      setFormData({ name: "", description: "", template: "" })
    }
  }, [initialData])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (mode === "edit") {
      console.log("Editing transformation:", formData)
    } else {
      console.log("Creating transformation:", formData)
    }
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl  relative animate-in fade-in-0 zoom-in-95 duration-300 max-h-[90vh] overflow-hidden">
        <div className="relative bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-emerald-100">
          <button
            onClick={() => {
              onClose()
              setIsStickyHeader(true)
            }}
            className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-gray-600 hover:bg-white/50 rounded-full transition-all duration-200"
            aria-label="Close"
          >
            <X size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <Sparkles className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {mode === "edit" ? "Edit Transformation" : "Create New Transformation"}
              </h2>
              <p className="text-xs text-gray-600 mt-0.5">
                {mode === "edit" ? "Update your transformation details" : "Set up a new data transformation"}
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 overflow-y-auto max-h-[calc(90vh-120px)]">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Transformation Name</label>
              <input
                type="text"
                placeholder="e.g., Conference Attendees"
                className="w-full border-2 border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-lg px-3 py-2.5 text-gray-900 bg-white placeholder-gray-400 outline-none transition-all duration-200 text-sm"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
<div className="space-y-1.5">
  <label
    htmlFor="description"
    className="block text-sm font-semibold text-gray-700"
  >
    Description
  </label>

  <textarea
    id="description"
    name="description"
    rows={4}   // 👈 limits visible lines to 3
    placeholder="Description example: This transformation is used to collect a list of contacts of speakers and attendees of the conferences including persons' name, position, company name, email, LinkedIn profile, X (Twitter) profile, and the conference name and website."
    className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:border-gray-400 focus:ring-0 resize-none"
    value={formData.description}
    onChange={(e) =>
      setFormData((prev) => ({ ...prev, description: e.target.value }))
    }
  />
</div>





           {mode === "create" && <div className="space-y-1.5">
              <label className="block text-sm font-semibold text-gray-700">Template</label>
              <select
                className="w-full border-2 border-gray-200 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 rounded-lg px-3 py-2.5 text-gray-900 bg-white outline-none transition-all duration-200 text-sm appearance-none cursor-pointer"
                value={formData.template}
                onChange={(e) => setFormData((prev) => ({ ...prev, template: e.target.value }))}
              >
                <option value="" disabled className="text-gray-400">
                  Select a template
                </option>
                <option value="data-cleaning">Conference Attendees</option>
                <option value="format-conversion">List of Investors</option>
                <option value="data-validation">Product Listings</option>
                <option value="aggregation">Social Media Posts</option>
              </select>
            </div>}

    <div className="flex flex-col sm:flex-row flex-wrap gap-x-6 gap-y-3 pt-3">
  {mode === "create" && (
    <>
      <button
        type="button"
        className="flex items-center justify-center gap-1.5 bg-gray-50 text-gray-500 rounded-md px-3 py-2 text-sm font-medium border border-gray-200 cursor-not-allowed"
        disabled
      >
        <Sparkles size={14} />
        Create Using AI
      </button>

      <button
        type="button"
        className="flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white rounded-md px-3 py-2 text-sm font-medium border border-green-200 hover:border-green-300 transition-all duration-200"
      >
        <Upload size={14} />
        Upload Sample File
      </button>
    </>
  )}

  <button
    type="submit"
    className="flex items-center justify-center gap-1.5 bg-green-100 hover:bg-green-200 text-green-700 rounded-md px-3 py-2 text-sm font-medium border border-green-200 hover:border-green-300 transition-all duration-200"
  >
    {mode === "edit" ? "Save Changes" : "Create from Scratch"}
  </button>
</div>



          </form>
        </div>
      </div>
    </div>
  )
}

export default AddTransformationModal

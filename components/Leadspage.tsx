"use client"

import { useEffect, useState } from "react"

interface LeadInterface {
  id: string
  name: string
  email: string
  phoneNumber: string
  dateofbirth: string
  time: string
  service: string
  concern: string
  description: string
  birthplace: string
}

export default function AdminLeads() {
  const [leads, setLeads] = useState<LeadInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLead, setSelectedLead] = useState<LeadInterface | null>(null)

  useEffect(() => {
    const fetchLeads = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/lead/get-all")
        const data = await res.json()
        if (res.ok) {
          setLeads(data.response)
        }
      } catch (e) {
        setError("Failed to fetch leads")
      } finally {
        setLoading(false)
      }
    }
    fetchLeads()
  }, [])

  const filteredLeads = leads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.service.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getStatusColor = (service: string) => {
    const colors: { [key: string]: string } = {
      consultation: "bg-blue-100 text-blue-700",
      urgent: "bg-red-100 text-red-700",
      followup: "bg-green-100 text-green-700",
      general: "bg-gray-100 text-gray-700",
    }
    return colors[service.toLowerCase()] || "bg-gray-100 text-gray-700"
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">Leads</h1>
          <p className="mt-2 text-slate-600">Manage and view all client leads</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name, email, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-500 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-200"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-slate-600">Loading leads...</div>
          </div>
        )}

        {/* Error State */}
        {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>}

        {/* Empty State */}
        {!loading && leads.length === 0 && !error && (
          <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white py-12">
            <svg className="mb-3 h-12 w-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M20 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
              />
            </svg>
            <p className="text-slate-600">No leads found</p>
          </div>
        )}

        {/* Table */}
        {!loading && filteredLeads.length > 0 && (
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Service
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Date of Birth
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="transition-colors duration-150 hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">{lead.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{lead.email}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{lead.phoneNumber}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusColor(
                          lead.service,
                        )}`}
                      >
                        {lead.service}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{lead.dateofbirth}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="inline-flex rounded bg-blue-900 px-3 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal / Detail View */}
        {selectedLead && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4 z-50">
            <div className="w-full max-w-2xl rounded-lg bg-white shadow-xl">
              {/* Modal Header */}
              <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">Lead Details</h2>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="text-slate-400 transition-colors duration-150 hover:text-slate-600"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Content */}
              <div className="px-6 py-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <DetailField label="Name" value={selectedLead.name} />
                  <DetailField label="Email" value={selectedLead.email} />
                  <DetailField label="Phone" value={selectedLead.phoneNumber} />
                  <DetailField label="DOB" value={selectedLead.dateofbirth} />
                  <DetailField label="Birthplace" value={selectedLead.birthplace} />
                  <DetailField label="Service" value={selectedLead.service} />
                  <DetailField label="Concern" value={selectedLead.concern} />
                  <DetailField label="Time" value={selectedLead.time} />
                </div>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
                  <p className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700">{selectedLead.description}</p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 flex justify-end">
                <button
                  onClick={() => setSelectedLead(null)}
                  className="rounded bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function DetailField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-slate-900 mb-1">{label}</label>
      <p className="rounded bg-slate-50 px-3 py-2 text-sm text-slate-700">{value}</p>
    </div>
  )
}

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheck, LogOut, Search, Filter, RefreshCw, 
  ChevronLeft, ChevronRight, Eye, Trash2, Mail, 
  Phone, Download, CheckCircle, AlertCircle, Clock, 
  Layers, ExternalLink 
} from 'lucide-react';
import Button from '../components/Button';
import LeadDetailModal from '../components/LeadDetailModal';
import { 
  getAdminStats, 
  getAdminLeads, 
  updateLeadStatusAndNotes, 
  deleteLeadRecord 
} from '../services/adminService';
import { adminLogout } from '../services/authService';

const STATUS_FILTERS = [
  { label: 'All Leads', value: '' },
  { label: 'New', value: 'new' },
  { label: 'Contacted', value: 'contacted' },
  { label: 'Qualified', value: 'qualified' },
  { label: 'Closed', value: 'closed' }
];

const SERVICE_OPTIONS = [
  'All Services',
  'Web Development',
  'E-commerce Solutions',
  'AI Automation & Agents',
  'SEO & Growth Marketing',
  'Google Ads & Performance',
  'Maintenance & Operations',
  'Other'
];

export default function AdminDashboard({ admin, onLogout }) {
  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, totalPages: 1 });
  
  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedService, setSelectedService] = useState('');
  
  // Modal & Detail
  const [selectedLead, setSelectedLead] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackMessage, setFeedbackMessage] = useState({ text: '', type: '' });

  const showNotification = (text, type = 'success') => {
    setFeedbackMessage({ text, type });
    setTimeout(() => setFeedbackMessage({ text: '', type: '' }), 4000);
  };

  const loadDashboardData = useCallback(async (page = 1) => {
    setIsLoading(true);
    try {
      const [statsRes, leadsRes] = await Promise.all([
        getAdminStats(),
        getAdminLeads({
          page,
          limit: 10,
          status: selectedStatus,
          service: selectedService === 'All Services' ? '' : selectedService,
          q: searchQuery
        })
      ]);

      if (statsRes.success) setStats(statsRes.data);
      if (leadsRes.success) {
        setLeads(leadsRes.data || []);
        setPagination(leadsRes.pagination || { page: 1, limit: 10, total: 0, totalPages: 1 });
      }
    } catch (err) {
      showNotification(err.message || 'Error fetching lead records', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [selectedStatus, selectedService, searchQuery]);

  useEffect(() => {
    loadDashboardData(1);
  }, [loadDashboardData]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDashboardData(1);
  };

  const handleStatusChange = async (leadId, newStatus) => {
    setIsUpdating(true);
    try {
      const res = await updateLeadStatusAndNotes(leadId, { status: newStatus });
      if (res.success) {
        showNotification(`Status updated to "${newStatus}"`);
        // Update local list
        setLeads(prev => prev.map(l => l._id === leadId ? { ...l, status: newStatus } : l));
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(prev => ({ ...prev, status: newStatus }));
        }
        // Refresh aggregate metrics
        getAdminStats().then(s => s.success && setStats(s.data));
      }
    } catch (err) {
      showNotification(err.message || 'Failed to update status', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleAddNote = async (leadId, noteText) => {
    try {
      const res = await updateLeadStatusAndNotes(leadId, { note: noteText });
      if (res.success) {
        showNotification('Internal note added.');
        if (selectedLead && selectedLead._id === leadId) {
          setSelectedLead(res.data);
        }
        setLeads(prev => prev.map(l => l._id === leadId ? res.data : l));
      }
    } catch (err) {
      showNotification(err.message || 'Failed to add note', 'error');
    }
  };

  const handleDeleteLead = async (leadId) => {
    try {
      const res = await deleteLeadRecord(leadId);
      if (res.success) {
        showNotification('Lead successfully removed.');
        setSelectedLead(null);
        loadDashboardData(pagination.page);
      }
    } catch (err) {
      showNotification(err.message || 'Failed to delete lead', 'error');
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    if (onLogout) onLogout();
    else window.location.href = '/admin';
  };

  // CSV Export utility
  const exportToCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Name', 'Email', 'Company', 'Phone', 'Service', 'Budget', 'Status', 'Date', 'Message'];
    const rows = leads.map(l => [
      `"${l.name || ''}"`,
      `"${l.email || ''}"`,
      `"${l.company || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.service || ''}"`,
      `"${l.budget || ''}"`,
      `"${l.status || ''}"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${(l.message || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ethixweb_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusBadge = (st) => {
    const map = {
      new: 'bg-red-50 text-brand-red border-red-200',
      contacted: 'bg-blue-50 text-blue-700 border-blue-200',
      qualified: 'bg-amber-50 text-amber-700 border-amber-200',
      closed: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    };
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${map[st] || 'bg-neutral-100 text-neutral-700'}`}>
        {st}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-neutral-100 text-brand-black pb-20">
      
      {/* Top Navbar */}
      <header className="bg-brand-black text-white border-b border-neutral-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/ethixweb-emblem.webp"
              alt="Ethixweb"
              width="24"
              height="24"
              className="h-6 w-auto"
            />
            <div>
              <span className="font-extrabold text-sm tracking-tight">Ethixweb Staff Operations</span>
              <span className="ml-2 text-[10px] font-mono uppercase bg-brand-red px-1.5 py-0.5 rounded text-white">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block text-xs font-mono text-neutral-400">
              {admin?.email}
            </span>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-neutral-400 hover:text-white flex items-center gap-1"
            >
              <span>View Site</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-xs text-neutral-300 hover:text-brand-red px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Toast alert banner */}
        {feedbackMessage.text && (
          <div className={`mb-6 p-4 rounded-xl text-xs font-semibold flex items-center justify-between border ${
            feedbackMessage.type === 'error'
              ? 'bg-red-50 text-red-800 border-red-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            <span>{feedbackMessage.text}</span>
            <button onClick={() => setFeedbackMessage({ text: '', type: '' })} className="font-bold">&times;</button>
          </div>
        )}

        {/* 1. Metric Overview Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-brand-border shadow-subtle">
            <p className="text-xs uppercase font-bold text-neutral-400">Total Leads</p>
            <p className="text-2xl sm:text-3xl font-black text-brand-black mt-1 font-mono">
              {stats?.total ?? 0}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-red-200 shadow-subtle bg-red-50/20">
            <p className="text-xs uppercase font-bold text-brand-red">New</p>
            <p className="text-2xl sm:text-3xl font-black text-brand-red mt-1 font-mono">
              {stats?.new ?? 0}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-blue-200 shadow-subtle">
            <p className="text-xs uppercase font-bold text-blue-600">Contacted</p>
            <p className="text-2xl sm:text-3xl font-black text-blue-700 mt-1 font-mono">
              {stats?.contacted ?? 0}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-amber-200 shadow-subtle">
            <p className="text-xs uppercase font-bold text-amber-600">Qualified</p>
            <p className="text-2xl sm:text-3xl font-black text-amber-700 mt-1 font-mono">
              {stats?.qualified ?? 0}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-200 shadow-subtle col-span-2 sm:col-span-1">
            <p className="text-xs uppercase font-bold text-emerald-600">Closed</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1 font-mono">
              {stats?.closed ?? 0}
            </p>
          </div>
        </div>

        {/* 2. Search & Filters Bar */}
        <div className="bg-white rounded-2xl border border-brand-border p-4 sm:p-6 mb-6 shadow-subtle">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search form */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative">
              <input
                type="text"
                placeholder="Search by name, email, or company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-lg border border-brand-border focus:outline-none focus:border-brand-red"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
            </form>

            {/* Filter pills & dropdown */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Status Selector */}
              <div className="flex items-center gap-1 bg-neutral-100 p-1 rounded-lg">
                {STATUS_FILTERS.map((f) => (
                  <button
                    key={f.value}
                    type="button"
                    onClick={() => setSelectedStatus(f.value)}
                    className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                      selectedStatus === f.value
                        ? 'bg-white text-brand-black shadow-sm font-bold'
                        : 'text-neutral-500 hover:text-brand-black'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Service filter */}
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-brand-border bg-white text-neutral-700 focus:outline-none focus:border-brand-red"
              >
                {SERVICE_OPTIONS.map((svc) => (
                  <option key={svc} value={svc}>
                    {svc}
                  </option>
                ))}
              </select>

              {/* Actions */}
              <button
                type="button"
                onClick={() => loadDashboardData(pagination.page)}
                className="p-2 rounded-lg border border-brand-border bg-white hover:bg-neutral-50 text-neutral-600"
                title="Refresh Table"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>

              <button
                type="button"
                onClick={exportToCSV}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-brand-border bg-white hover:bg-neutral-50 text-xs font-semibold text-neutral-700"
                title="Export Visible Leads to CSV"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Export CSV</span>
              </button>
            </div>

          </div>
        </div>

        {/* 3. Leads Table & Mobile View */}
        <div className="bg-white rounded-2xl border border-brand-border shadow-subtle overflow-hidden mb-6">
          {isLoading && leads.length === 0 ? (
            <div className="py-20 text-center text-neutral-400">
              <RefreshCw className="w-8 h-8 animate-spin mx-auto text-brand-red mb-3" />
              <p className="text-xs font-mono">Loading lead documents from MongoDB Atlas...</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="py-20 text-center text-neutral-500">
              <Layers className="w-10 h-10 mx-auto text-neutral-300 mb-3" />
              <h4 className="text-base font-bold text-brand-black">No Leads Found</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
                No inquiries match your current search or status filter. Try clearing filters or submit a test enquiry on the Contact page.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-neutral-50/80 border-b border-brand-border text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                    <th className="py-3 px-4">Contact</th>
                    <th className="py-3 px-4">Service &amp; Budget</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Submitted</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100 text-xs">
                  {leads.map((lead) => (
                    <tr 
                      key={lead._id}
                      className="hover:bg-neutral-50/80 transition-colors group cursor-pointer"
                      onClick={() => setSelectedLead(lead)}
                    >
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-brand-black text-sm">{lead.name}</div>
                        <div className="text-neutral-500 font-mono text-[11px] mt-0.5">{lead.email}</div>
                        {lead.company && (
                          <div className="text-neutral-400 text-[10px]">{lead.company}</div>
                        )}
                      </td>

                      {/* Service & Budget */}
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-neutral-800">{lead.service}</span>
                        {lead.budget && (
                          <span className="block text-[11px] text-brand-red font-medium mt-0.5">
                            {lead.budget}
                          </span>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                          className="text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-md border border-neutral-200 bg-white focus:outline-none focus:border-brand-red"
                        >
                          <option value="new">new</option>
                          <option value="contacted">contacted</option>
                          <option value="qualified">qualified</option>
                          <option value="closed">closed</option>
                        </select>
                      </td>

                      {/* Submitted Date */}
                      <td className="py-3.5 px-4 font-mono text-neutral-500 text-[11px]">
                        {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => setSelectedLead(lead)}
                            className="p-1.5 rounded-md hover:bg-neutral-200 text-neutral-600 transition-colors"
                            title="View Full Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteLead(lead._id)}
                            className="p-1.5 rounded-md hover:bg-red-50 text-red-500 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Footer */}
          {pagination.totalPages > 1 && (
            <div className="p-4 bg-neutral-50 border-t border-brand-border flex items-center justify-between text-xs text-neutral-500">
              <span>
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} leads)
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={pagination.page <= 1}
                  onClick={() => loadDashboardData(pagination.page - 1)}
                  className="p-1.5 rounded border border-brand-border bg-white disabled:opacity-40"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  disabled={pagination.page >= pagination.totalPages}
                  onClick={() => loadDashboardData(pagination.page + 1)}
                  className="p-1.5 rounded border border-brand-border bg-white disabled:opacity-40"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Slide-over / Modal for Lead Details */}
      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onStatusChange={handleStatusChange}
          onDeleteLead={handleDeleteLead}
          onAddNote={handleAddNote}
          isUpdating={isUpdating}
        />
      )}

    </div>
  );
}

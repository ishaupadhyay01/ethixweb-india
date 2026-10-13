import React, { useState } from 'react';
import { 
  X, Mail, Phone, Building, Calendar, DollarSign, 
  Trash2, Send, Copy, Check, MessageSquare 
} from 'lucide-react';
import Button from './Button';

export default function LeadDetailModal({
  lead,
  onClose,
  onStatusChange,
  onDeleteLead,
  onAddNote,
  isUpdating
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!lead) return null;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(lead.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    onAddNote(lead._id, noteText.trim());
    setNoteText('');
  };

  const statusColors = {
    new: 'bg-red-50 text-brand-red border-red-200',
    contacted: 'bg-blue-50 text-blue-700 border-blue-200',
    qualified: 'bg-amber-50 text-amber-700 border-amber-200',
    closed: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-neutral-200">
        
        {/* Header */}
        <div className="p-6 bg-brand-black text-white flex items-center justify-between sticky top-0 z-10 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold">{lead.name}</h3>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${statusColors[lead.status] || 'bg-neutral-100 text-neutral-700'}`}>
                {lead.status}
              </span>
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">{lead.company || 'Direct Individual Client'}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Details */}
        <div className="p-6 space-y-6">
          
          {/* Quick Contact Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-700 truncate">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a href={`mailto:${lead.email}`} className="hover:underline truncate">{lead.email}</a>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors ml-2"
                title="Copy Email"
              >
                {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {lead.phone ? (
              <div className="flex items-center gap-2 text-neutral-700">
                <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                <a href={`tel:${lead.phone}`} className="hover:underline">{lead.phone}</a>
                <a
                  href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-auto text-[11px] font-semibold text-emerald-600 hover:underline"
                >
                  WhatsApp &rarr;
                </a>
              </div>
            ) : (
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <Phone className="w-4 h-4 text-neutral-300" />
                <span>No phone number provided</span>
              </div>
            )}
          </div>

          {/* Service & Budget Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
              <p className="text-neutral-400 uppercase font-semibold">Service</p>
              <p className="text-sm font-bold text-brand-black mt-1">{lead.service}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100">
              <p className="text-neutral-400 uppercase font-semibold">Budget Range</p>
              <p className="text-sm font-bold text-brand-red mt-1">{lead.budget || 'To be discussed'}</p>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 col-span-2 sm:col-span-1">
              <p className="text-neutral-400 uppercase font-semibold">Received On</p>
              <p className="text-sm font-bold text-neutral-700 mt-1">
                {new Date(lead.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Project Message */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Project Description
            </h4>
            <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-100 text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
              {lead.message}
            </div>
          </div>

          {/* Status Change Selector */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              Update Lead Pipeline Status
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['new', 'contacted', 'qualified', 'closed'].map((st) => (
                <button
                  key={st}
                  type="button"
                  disabled={isUpdating}
                  onClick={() => onStatusChange(lead._id, st)}
                  className={`py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                    lead.status === st
                      ? 'border-brand-red bg-brand-redLight text-brand-red shadow-sm'
                      : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Internal Notes History */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-brand-red" />
              <span>Internal Admin Notes ({lead.notes?.length || 0})</span>
            </h4>

            {lead.notes && lead.notes.length > 0 ? (
              <div className="space-y-2 mb-3">
                {lead.notes.map((n, idx) => (
                  <div key={idx} className="p-3 bg-neutral-50 rounded-lg border border-neutral-100 text-xs">
                    <p className="text-neutral-800">{n.text}</p>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      {n.author} &bull; {new Date(n.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-neutral-400 italic mb-3">No internal notes added yet.</p>
            )}

            <form onSubmit={handleNoteSubmit} className="flex gap-2">
              <input
                type="text"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a team note (e.g. Call scheduled for tomorrow at 3pm)..."
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-none focus:border-brand-red"
              />
              <Button type="submit" variant="secondary" size="sm" icon={Send} disabled={!noteText.trim()}>
                Add Note
              </Button>
            </form>
          </div>

          {/* Delete Action */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            {showDeleteConfirm ? (
              <div className="flex items-center gap-2">
                <span className="text-xs text-red-600 font-medium">Permanently delete this lead?</span>
                <button
                  type="button"
                  onClick={() => onDeleteLead(lead._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded text-xs font-semibold hover:bg-red-700"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-2 py-1 text-xs text-neutral-500 hover:text-neutral-800"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="inline-flex items-center gap-1.5 text-xs text-red-500 hover:text-red-700 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>
            )}

            <Button variant="outline" size="sm" onClick={onClose}>
              Close Window
            </Button>
          </div>

        </div>

      </div>
    </div>
  );
}

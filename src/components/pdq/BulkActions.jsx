'use client';

import { useState } from 'react';
import { 
  X, 
  UserPlus, 
  CheckCircle, 
  Download, 
  ChevronDown,
  Loader2,
  Search
} from 'lucide-react';
import { bulkAssignOwner, bulkUpdateStatus, getUsers } from '@/lib/pdq/api';

export function BulkActionsBar({ selectedCount, selectedItems, onClearSelection }) {
  const [showAssignDialog, setShowAssignDialog] = useState(false);
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleExportCSV = () => {
    const csvHeaders = [
      'Loan Account No',
      'Customer Name',
      'Merchant Name',
      'Disbursal Date',
      'Amount (INR)',
      'Status',
      'Aging Days',
      'Assigned To',
      'Last Updated'
    ];

    const csvRows = selectedItems.map(item => [
      item.loanAccountNo,
      item.customerName,
      item.merchantName,
      new Date(item.disbursalDate).toLocaleDateString('en-GB'),
      item.amount,
      item.status,
      item.agingDays,
      item.assignedTo || '',
      new Date(item.lastUpdatedAt).toLocaleDateString('en-GB')
    ]);

    const csvContent = [
      csvHeaders.join(','),
      ...csvRows.map(row => row.map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `post-disbursal-export-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div 
        className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-blue-600 text-white rounded-2xl shadow-lg border border-blue-700"
        data-testid="pdq-bulkbar"
      >
        <div className="flex items-center gap-4 px-6 py-4">
          {/* Selection Info */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {selectedCount} item{selectedCount !== 1 ? 's' : ''} selected
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAssignDialog(true)}
              disabled={loading}
              data-testid="pdq-assign"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50"
            >
              <UserPlus className="h-4 w-4" />
              Assign
            </button>

            <button
              onClick={() => setShowStatusDialog(true)}
              disabled={loading}
              data-testid="pdq-mark-status"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50"
            >
              <CheckCircle className="h-4 w-4" />
              Update Status
            </button>

            <button
              onClick={handleExportCSV}
              disabled={loading}
              data-testid="pdq-export-csv"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          {/* Clear Selection */}
          <button
            onClick={onClearSelection}
            className="rounded-lg p-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Assign Dialog */}
      {showAssignDialog && (
        <AssignDialog
          selectedItems={selectedItems}
          onClose={() => setShowAssignDialog(false)}
          onSuccess={() => {
            setShowAssignDialog(false);
            onClearSelection();
          }}
          setLoading={setLoading}
        />
      )}

      {/* Status Dialog */}
      {showStatusDialog && (
        <StatusDialog
          selectedItems={selectedItems}
          onClose={() => setShowStatusDialog(false)}
          onSuccess={() => {
            setShowStatusDialog(false);
            onClearSelection();
          }}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

// Assign Owner Dialog
function AssignDialog({ selectedItems, onClose, onSuccess, setLoading }) {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Load users on mount
  useState(() => {
    const loadUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Failed to load users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };
    loadUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssign = async () => {
    if (!selectedUser) return;

    setSubmitting(true);
    setLoading(true);
    
    try {
      const itemIds = selectedItems.map(item => item.id);
      await bulkAssignOwner(itemIds, selectedUser);
      onSuccess();
    } catch (error) {
      console.error('Failed to assign owner:', error);
      alert('Failed to assign owner. Please try again.');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Assign Owner
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Assign owner to {selectedItems.length} selected item{selectedItems.length !== 1 ? 's' : ''}
            </p>

            {/* Search Users */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Users List */}
            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
              {loadingUsers ? (
                <div className="p-4 text-center text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto mb-2" />
                  Loading users...
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="p-4 text-center text-gray-500">
                  No users found
                </div>
              ) : (
                filteredUsers.map((user) => (
                  <label
                    key={user.id}
                    className="flex items-center gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="assignee"
                      value={user.id}
                      checked={selectedUser === user.id}
                      onChange={(e) => setSelectedUser(e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </label>
                ))
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedUser || submitting}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Assigning...
                  </div>
                ) : (
                  'Assign'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Status Update Dialog
function StatusDialog({ selectedItems, onClose, onSuccess, setLoading }) {
  const [selectedStatus, setSelectedStatus] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const statuses = [
    { value: 'Pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'In Review', label: 'In Review', color: 'bg-blue-100 text-blue-800' },
    { value: 'Completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
    { value: 'Rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' }
  ];

  const handleUpdateStatus = async () => {
    if (!selectedStatus) return;

    setSubmitting(true);
    setLoading(true);
    
    try {
      const itemIds = selectedItems.map(item => item.id);
      await bulkUpdateStatus(itemIds, selectedStatus);
      onSuccess();
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status. Please try again.');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-25" onClick={onClose} />
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Update Status
              </h3>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-4">
              Update status for {selectedItems.length} selected item{selectedItems.length !== 1 ? 's' : ''}
            </p>

            {/* Status Options */}
            <div className="space-y-2 mb-6">
              {statuses.map((status) => (
                <label
                  key={status.value}
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="status"
                    value={status.value}
                    checked={selectedStatus === status.value}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${status.color}`}>
                    {status.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={!selectedStatus || submitting}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </div>
                ) : (
                  'Update Status'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

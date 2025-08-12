'use client';

import { useState, useEffect, useCallback } from 'react';
import { Search, Calendar, ChevronDown, X, Filter } from 'lucide-react';
import { getDistinctMerchants, getStatuses } from '@/lib/pdq/api';

export function PostDisbursalFilters({ filters, onFiltersChange, loading }) {
  const [merchants, setMerchants] = useState([]);
  const [statuses] = useState(getStatuses());
  const [showMerchantDropdown, setShowMerchantDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);

  // Load merchants on mount
  useEffect(() => {
    const loadMerchants = async () => {
      try {
        const merchantData = await getDistinctMerchants();
        setMerchants(merchantData);
      } catch (error) {
        console.error('Failed to load merchants:', error);
      }
    };
    loadMerchants();
  }, []);

  const handleInputChange = useCallback((field, value) => {
    onFiltersChange({ [field]: value });
  }, [onFiltersChange]);

  const handleMerchantToggle = useCallback((merchantId) => {
    const currentIds = filters.merchantIds || [];
    const newIds = currentIds.includes(merchantId)
      ? currentIds.filter(id => id !== merchantId)
      : [...currentIds, merchantId];
    onFiltersChange({ merchantIds: newIds });
  }, [filters.merchantIds, onFiltersChange]);

  const handleStatusToggle = useCallback((status) => {
    const currentStatuses = filters.statuses || [];
    const newStatuses = currentStatuses.includes(status)
      ? currentStatuses.filter(s => s !== status)
      : [...currentStatuses, status];
    onFiltersChange({ statuses: newStatuses });
  }, [filters.statuses, onFiltersChange]);

  const clearMerchants = useCallback(() => {
    onFiltersChange({ merchantIds: [] });
  }, [onFiltersChange]);

  const clearStatuses = useCallback(() => {
    onFiltersChange({ statuses: [] });
  }, [onFiltersChange]);

  const getSelectedMerchantNames = () => {
    const selectedIds = filters.merchantIds || [];
    return merchants
      .filter(m => selectedIds.includes(m.id))
      .map(m => m.name);
  };

  const hasActiveFilters = () => {
    return filters.q || 
           filters.from || 
           filters.to || 
           (filters.merchantIds && filters.merchantIds.length > 0) ||
           (filters.statuses && filters.statuses.length > 0);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
      <div className="space-y-4">
        {/* Search and Date Range Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Global Search */}
          <div className="relative">
            <label htmlFor="pdq-search" className="sr-only">
              Search loans, customers, or merchants
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="pdq-search"
                data-testid="pdq-search"
                type="text"
                placeholder="Search loans, customers, or merchants..."
                value={filters.q || ''}
                onChange={(e) => handleInputChange('q', e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Date From */}
          <div className="relative">
            <label htmlFor="pdq-date-from" className="block text-xs font-medium text-gray-700 mb-1">
              From Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="pdq-date-from"
                data-testid="pdq-date-from"
                type="date"
                value={filters.from || ''}
                onChange={(e) => handleInputChange('from', e.target.value)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Date To */}
          <div className="relative">
            <label htmlFor="pdq-date-to" className="block text-xs font-medium text-gray-700 mb-1">
              To Date
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                id="pdq-date-to"
                data-testid="pdq-date-to"
                type="date"
                value={filters.to || ''}
                onChange={(e) => handleInputChange('to', e.target.value)}
                disabled={loading}
                min={filters.from || undefined}
                className="w-full rounded-lg border border-gray-300 pl-10 pr-4 py-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Merchant Multi-Select */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Merchants
            </label>
            <div className="relative">
              <button
                data-testid="pdq-merchant-select"
                onClick={() => setShowMerchantDropdown(!showMerchantDropdown)}
                disabled={loading}
                className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <span className="truncate">
                  {getSelectedMerchantNames().length === 0
                    ? 'Select merchants...'
                    : getSelectedMerchantNames().length === 1
                    ? getSelectedMerchantNames()[0]
                    : `${getSelectedMerchantNames().length} merchants selected`
                  }
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showMerchantDropdown && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="max-h-60 overflow-auto p-2">
                    {filters.merchantIds && filters.merchantIds.length > 0 && (
                      <button
                        onClick={clearMerchants}
                        className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <X className="h-3 w-3" />
                        Clear selection
                      </button>
                    )}
                    {merchants.map((merchant) => (
                      <label
                        key={merchant.id}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.merchantIds?.includes(merchant.id) || false}
                          onChange={() => handleMerchantToggle(merchant.id)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="truncate">{merchant.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Status Multi-Select */}
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="relative">
              <button
                data-testid="pdq-status-select"
                onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                disabled={loading}
                className="w-full flex items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-left text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500"
              >
                <span className="truncate">
                  {(filters.statuses?.length || 0) === 0
                    ? 'Select status...'
                    : filters.statuses?.length === 1
                    ? filters.statuses[0]
                    : `${filters.statuses?.length} statuses selected`
                  }
                </span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showStatusDropdown && (
                <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                  <div className="max-h-60 overflow-auto p-2">
                    {filters.statuses && filters.statuses.length > 0 && (
                      <button
                        onClick={clearStatuses}
                        className="w-full flex items-center gap-2 rounded-md px-2 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <X className="h-3 w-3" />
                        Clear selection
                      </button>
                    )}
                    {statuses.map((status) => (
                      <label
                        key={status}
                        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={filters.statuses?.includes(status) || false}
                          onChange={() => handleStatusToggle(status)}
                          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="flex items-center gap-2">
                          <StatusBadge status={status} />
                          {status}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Active Filters Indicator */}
        {hasActiveFilters() && (
          <div className="flex items-center gap-2 text-xs text-gray-600">
            <Filter className="h-3 w-3" />
            <span>Active filters applied</span>
          </div>
        )}
      </div>

      {/* Click outside to close dropdowns */}
      {(showMerchantDropdown || showStatusDropdown) && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => {
            setShowMerchantDropdown(false);
            setShowStatusDropdown(false);
          }}
        />
      )}
    </div>
  );
}

// Status badge component
function StatusBadge({ status }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'In Review':
        return 'bg-blue-100 text-blue-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`inline-flex h-2 w-2 rounded-full ${getStatusColor(status)}`} />
  );
}

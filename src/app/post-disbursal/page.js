'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { PostDisbursalFilters } from '@/components/pdq/Filters';
import { PostDisbursalTable } from '@/components/pdq/Table';
import { BulkActionsBar } from '@/components/pdq/BulkActions';
import { fetchPostDisbursal } from '@/lib/pdq/api';
import { parseFiltersFromURL, buildURLFromFilters } from '@/lib/pdq/url';
import { saveFiltersToStorage, loadFiltersFromStorage, clearFiltersFromStorage } from '@/lib/pdq/storage';

export default function PostDisbursalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Parse initial filters from URL or localStorage
  const initialFilters = useMemo(() => {
    const urlFilters = parseFiltersFromURL(searchParams);
    const savedFilters = loadFiltersFromStorage();
    return { ...savedFilters, ...urlFilters };
  }, [searchParams]);

  // State management
  const [filters, setFilters] = useState(initialFilters);
  const [data, setData] = useState({ data: [], total: 0, page: 1, pageSize: 25 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [expandedRows, setExpandedRows] = useState(new Set());

  // Debounced search
  const [searchDebounce, setSearchDebounce] = useState(null);

  // Fetch data when filters change
  const fetchData = useCallback(async (currentFilters) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchPostDisbursal(currentFilters);
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update URL and fetch data when filters change
  useEffect(() => {
    const newURL = buildURLFromFilters(filters);
    router.replace(newURL, { shallow: true });
    saveFiltersToStorage(filters);
    
    // Clear search debounce if exists
    if (searchDebounce) {
      clearTimeout(searchDebounce);
    }

    // Debounce search queries
    if (filters.q !== initialFilters.q) {
      const timeout = setTimeout(() => {
        fetchData(filters);
      }, 300);
      setSearchDebounce(timeout);
    } else {
      fetchData(filters);
    }

    return () => {
      if (searchDebounce) {
        clearTimeout(searchDebounce);
      }
    };
  }, [filters, router, fetchData]);

  // Initial data fetch
  useEffect(() => {
    fetchData(initialFilters);
  }, []);

  const handleFiltersChange = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
    setSelectedRows(new Set());
  }, []);

  const handlePageChange = useCallback((page, pageSize) => {
    setFilters(prev => ({ ...prev, page, pageSize }));
    setSelectedRows(new Set());
  }, []);

  const handleSortChange = useCallback((sortConfig) => {
    setFilters(prev => ({ ...prev, sort: sortConfig, page: 1 }));
    setSelectedRows(new Set());
  }, []);

  const handleClearFilters = useCallback(() => {
    clearFiltersFromStorage();
    const clearedFilters = {
      q: '',
      from: '',
      to: '',
      merchantIds: [],
      statuses: [],
      page: 1,
      pageSize: 25,
      sort: []
    };
    setFilters(clearedFilters);
    setSelectedRows(new Set());
  }, []);

  const handleRowSelect = useCallback((rowId, selected) => {
    setSelectedRows(prev => {
      const newSet = new Set(prev);
      if (selected) {
        newSet.add(rowId);
      } else {
        newSet.delete(rowId);
      }
      return newSet;
    });
  }, []);

  const handleSelectAll = useCallback((selected) => {
    if (selected) {
      setSelectedRows(new Set(data.data.map(item => item.id)));
    } else {
      setSelectedRows(new Set());
    }
  }, [data.data]);

  const handleRowExpand = useCallback((rowId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Post Disbursal Queue
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Monitor and manage post-disbursal loan processes
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleClearFilters}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                data-testid="pdq-clear-filters"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <PostDisbursalFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
          loading={loading}
        />

        {/* Bulk Actions */}
        {selectedRows.size > 0 && (
          <BulkActionsBar
            selectedCount={selectedRows.size}
            selectedItems={data.data.filter(item => selectedRows.has(item.id))}
            onClearSelection={() => setSelectedRows(new Set())}
          />
        )}

        {/* Main Content */}
        <div className="mt-6">
          <PostDisbursalTable
            data={data}
            loading={loading}
            error={error}
            filters={filters}
            selectedRows={selectedRows}
            expandedRows={expandedRows}
            onRowSelect={handleRowSelect}
            onSelectAll={handleSelectAll}
            onRowExpand={handleRowExpand}
            onSortChange={handleSortChange}
            onPageChange={handlePageChange}
            onRetry={() => fetchData(filters)}
          />
        </div>
      </div>
    </div>
  );
}

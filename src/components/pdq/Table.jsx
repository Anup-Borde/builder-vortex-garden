'use client';

import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  MoreHorizontal,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Inbox
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { RowDetail } from './RowDetail';

const VIRTUAL_THRESHOLD = 200;
const ROW_HEIGHT = 64;

export function PostDisbursalTable({
  data,
  loading,
  error,
  filters,
  selectedRows,
  expandedRows,
  onRowSelect,
  onSelectAll,
  onRowExpand,
  onSortChange,
  onPageChange,
  onRetry
}) {
  const [columnVisibility, setColumnVisibility] = useState({
    select: true,
    loanAccountNo: true,
    customerName: true,
    merchantName: true,
    disbursalDate: true,
    amount: true,
    status: true,
    agingDays: true,
    assignedTo: true,
    lastUpdatedAt: true
  });

  const tableRef = useRef(null);
  const [virtualized, setVirtualized] = useState(false);

  // Check if we should virtualize
  useEffect(() => {
    setVirtualized(data.total > VIRTUAL_THRESHOLD);
  }, [data.total]);

  const columns = useMemo(() => [
    {
      key: 'select',
      label: '',
      width: '50px',
      sortable: false,
      sticky: true
    },
    {
      key: 'loanAccountNo',
      label: 'Loan A/c No',
      width: '140px',
      sortable: true,
      sticky: false
    },
    {
      key: 'customerName',
      label: 'Customer Name',
      width: '180px',
      sortable: true,
      sticky: false
    },
    {
      key: 'merchantName',
      label: 'Merchant',
      width: '160px',
      sortable: true,
      sticky: false
    },
    {
      key: 'disbursalDate',
      label: 'Disbursal Date',
      width: '140px',
      sortable: true,
      sticky: false
    },
    {
      key: 'amount',
      label: 'Amount',
      width: '120px',
      sortable: true,
      sticky: false
    },
    {
      key: 'status',
      label: 'Status',
      width: '120px',
      sortable: true,
      sticky: false
    },
    {
      key: 'agingDays',
      label: 'Aging (Days)',
      width: '110px',
      sortable: true,
      sticky: false
    },
    {
      key: 'assignedTo',
      label: 'Assigned To',
      width: '140px',
      sortable: true,
      sticky: false
    },
    {
      key: 'lastUpdatedAt',
      label: 'Last Updated',
      width: '130px',
      sortable: true,
      sticky: false
    }
  ], []);

  const visibleColumns = useMemo(() => 
    columns.filter(col => columnVisibility[col.key]),
    [columns, columnVisibility]
  );

  const handleSort = useCallback((columnKey) => {
    const currentSort = filters.sort || [];
    const existingSort = currentSort.find(s => s.field === columnKey);
    
    let newSort;
    if (existingSort) {
      if (existingSort.direction === 'asc') {
        newSort = currentSort.map(s => 
          s.field === columnKey ? { ...s, direction: 'desc' } : s
        );
      } else {
        newSort = currentSort.filter(s => s.field !== columnKey);
      }
    } else {
      newSort = [...currentSort, { field: columnKey, direction: 'asc' }];
    }
    
    onSortChange(newSort);
  }, [filters.sort, onSortChange]);

  const getSortIcon = useCallback((columnKey) => {
    const currentSort = filters.sort || [];
    const sortConfig = currentSort.find(s => s.field === columnKey);
    
    if (!sortConfig) {
      return <ArrowUpDown className="h-3 w-3 text-gray-400" />;
    }
    
    return sortConfig.direction === 'asc' 
      ? <ArrowUp className="h-3 w-3 text-blue-600" />
      : <ArrowDown className="h-3 w-3 text-blue-600" />;
  }, [filters.sort]);

  const formatCurrency = useCallback((amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  }, []);

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }, []);

  const formatRelativeTime = useCallback((dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true });
  }, []);

  if (loading && data.data.length === 0) {
    return <TableSkeleton />;
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Failed to load data</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      </div>
    );
  }

  if (data.data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
        <Inbox className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
        <p className="text-gray-600 mb-4">
          No post-disbursal items match your current filters.
        </p>
        <button
          onClick={() => onPageChange(1, filters.pageSize)}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Clear Filters
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Table Header */}
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-900">
              {data.total.toLocaleString()} items
            </span>
            {loading && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <RefreshCw className="h-3 w-3 animate-spin" />
                Loading...
              </div>
            )}
          </div>
          <ColumnVisibilityMenu 
            columns={columns}
            visibility={columnVisibility}
            onVisibilityChange={setColumnVisibility}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto" ref={tableRef} data-testid="pdq-table">
        <table className="w-full">
          <TableHeader 
            columns={visibleColumns}
            selectedRows={selectedRows}
            totalRows={data.data.length}
            onSelectAll={onSelectAll}
            onSort={handleSort}
            getSortIcon={getSortIcon}
          />
          <tbody className="divide-y divide-gray-200">
            {data.data.map((item, index) => (
              <TableRow
                key={item.id}
                item={item}
                index={index}
                columns={visibleColumns}
                isSelected={selectedRows.has(item.id)}
                isExpanded={expandedRows.has(item.id)}
                onSelect={onRowSelect}
                onExpand={onRowExpand}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                formatRelativeTime={formatRelativeTime}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={data.page}
        pageSize={data.pageSize}
        totalItems={data.total}
        onPageChange={onPageChange}
      />
    </div>
  );
}

// Table Header Component
function TableHeader({ columns, selectedRows, totalRows, onSelectAll, onSort, getSortIcon }) {
  const allSelected = totalRows > 0 && selectedRows.size === totalRows;
  const someSelected = selectedRows.size > 0 && selectedRows.size < totalRows;

  return (
    <thead className="bg-gray-50 sticky top-0 z-10">
      <tr>
        {columns.map((column) => (
          <th
            key={column.key}
            className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.sticky ? 'sticky left-0 bg-gray-50 z-20' : ''
            }`}
            style={{ width: column.width }}
          >
            {column.key === 'select' ? (
              <input
                type="checkbox"
                checked={allSelected}
                ref={(input) => {
                  if (input) input.indeterminate = someSelected;
                }}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
            ) : column.sortable ? (
              <button
                onClick={() => onSort(column.key)}
                className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700 focus:outline-none"
              >
                {column.label}
                {getSortIcon(column.key)}
              </button>
            ) : (
              column.label
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
}

// Table Row Component
function TableRow({ 
  item, 
  index, 
  columns, 
  isSelected, 
  isExpanded, 
  onSelect, 
  onExpand, 
  formatCurrency, 
  formatDate, 
  formatRelativeTime 
}) {
  const getStatusBadge = (status) => {
    const colors = {
      'Completed': 'bg-green-100 text-green-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Review': 'bg-blue-100 text-blue-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
        {status}
      </span>
    );
  };

  const renderCell = (column, item) => {
    switch (column.key) {
      case 'select':
        return (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(item.id, e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
        );
      
      case 'loanAccountNo':
        return (
          <button
            onClick={() => onExpand(item.id)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium"
            data-testid={`pdq-row-expand-${item.id}`}
          >
            {item.loanAccountNo}
            <ExternalLink className="h-3 w-3" />
          </button>
        );
      
      case 'customerName':
        return (
          <div>
            <div className="font-medium text-gray-900">{item.customerName}</div>
            {item.tags && item.tags.length > 0 && (
              <div className="flex gap-1 mt-1">
                {item.tags.slice(0, 2).map((tag, idx) => (
                  <span key={idx} className="inline-flex items-center rounded px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      
      case 'merchantName':
        return <span className="text-gray-900">{item.merchantName}</span>;
      
      case 'disbursalDate':
        return (
          <time className="text-gray-900" dateTime={item.disbursalDate}>
            {formatDate(item.disbursalDate)}
          </time>
        );
      
      case 'amount':
        return <span className="font-medium text-gray-900">{formatCurrency(item.amount)}</span>;
      
      case 'status':
        return getStatusBadge(item.status);
      
      case 'agingDays':
        return (
          <span className={`font-medium ${item.agingDays > 30 ? 'text-red-600' : item.agingDays > 14 ? 'text-yellow-600' : 'text-gray-900'}`}>
            {item.agingDays}
          </span>
        );
      
      case 'assignedTo':
        return item.assignedTo ? (
          <span className="text-gray-900">{item.assignedTo}</span>
        ) : (
          <span className="text-gray-400">Unassigned</span>
        );
      
      case 'lastUpdatedAt':
        return (
          <time 
            className="text-gray-600 text-sm" 
            dateTime={item.lastUpdatedAt}
            title={new Date(item.lastUpdatedAt).toLocaleString()}
          >
            {formatRelativeTime(item.lastUpdatedAt)}
          </time>
        );
      
      default:
        return null;
    }
  };

  return (
    <>
      <tr 
        className={`hover:bg-gray-50 ${isSelected ? 'bg-blue-50' : ''}`}
        data-testid={`pdq-row-${item.id}`}
      >
        {columns.map((column) => (
          <td
            key={column.key}
            className={`px-4 py-3 whitespace-nowrap text-sm ${
              column.sticky ? 'sticky left-0 bg-white z-10' : ''
            } ${isSelected && column.sticky ? 'bg-blue-50' : ''}`}
          >
            {renderCell(column, item)}
          </td>
        ))}
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={columns.length} className="px-4 py-0">
            <RowDetail item={item} onClose={() => onExpand(item.id)} />
          </td>
        </tr>
      )}
    </>
  );
}

// Table Pagination Component
function TablePagination({ currentPage, pageSize, totalItems, onPageChange }) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  const pageSizeOptions = [10, 25, 50, 100];

  return (
    <div className="border-t border-gray-200 bg-white px-4 py-3 sm:px-6" data-testid="pdq-pagination">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Results Info */}
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{startItem}</span> to{' '}
          <span className="font-medium">{endItem}</span> of{' '}
          <span className="font-medium">{totalItems.toLocaleString()}</span> results
        </div>

        {/* Page Size Selector */}
        <div className="flex items-center gap-2">
          <label htmlFor="page-size" className="text-sm text-gray-700">
            Show:
          </label>
          <select
            id="page-size"
            data-testid="pdq-page-size"
            value={pageSize}
            onChange={(e) => onPageChange(1, parseInt(e.target.value))}
            className="rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1, pageSize)}
            disabled={currentPage <= 1}
            data-testid="pdq-page-prev"
            className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => onPageChange(currentPage + 1, pageSize)}
            disabled={currentPage >= totalPages}
            data-testid="pdq-page-next"
            className="inline-flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Column Visibility Menu
function ColumnVisibilityMenu({ columns, visibility, onVisibilityChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleColumn = (columnKey) => {
    onVisibilityChange(prev => ({
      ...prev,
      [columnKey]: !prev[columnKey]
    }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Columns
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <>
          <div className="absolute right-0 z-20 mt-1 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
            <div className="p-2">
              {columns.filter(col => col.key !== 'select').map((column) => (
                <label
                  key={column.key}
                  className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={visibility[column.key]}
                    onChange={() => toggleColumn(column.key)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  {column.label}
                </label>
              ))}
            </div>
          </div>
          <div 
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
}

// Table Skeleton Component
function TableSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
      <div className="p-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex gap-4 py-3 border-b border-gray-100 last:border-0">
            <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-28 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

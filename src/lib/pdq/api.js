// Mock data generator for demonstration
const generateMockData = (count = 1000) => {
  const statuses = ['Pending', 'In Review', 'Completed', 'Rejected'];
  const merchants = [
    { id: 1, name: 'Amazon India' },
    { id: 2, name: 'Flipkart' },
    { id: 3, name: 'Myntra' },
    { id: 4, name: 'BigBasket' },
    { id: 5, name: 'Swiggy' },
    { id: 6, name: 'Zomato' },
    { id: 7, name: 'BookMyShow' },
    { id: 8, name: 'MakeMyTrip' },
    { id: 9, name: 'Paytm Mall' },
    { id: 10, name: 'UrbanClap' }
  ];
  
  const assignees = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'];
  const firstNames = ['Arjun', 'Priya', 'Rohit', 'Sneha', 'Vikram', 'Anita', 'Rajesh', 'Kavya', 'Amit', 'Pooja'];
  const lastNames = ['Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Agarwal', 'Joshi', 'Mehta', 'Shah', 'Reddy'];

  return Array.from({ length: count }, (_, index) => {
    const merchant = merchants[Math.floor(Math.random() * merchants.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const disbursalDate = new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000);
    const agingDays = Math.floor((Date.now() - disbursalDate.getTime()) / (24 * 60 * 60 * 1000));
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return {
      id: `pdq-${index + 1}`,
      loanAccountNo: `LA${String(1000000 + index).slice(1)}`,
      customerName: `${firstName} ${lastName}`,
      merchantName: merchant.name,
      merchantId: merchant.id,
      disbursalDate: disbursalDate.toISOString(),
      amount: Math.floor(Math.random() * 500000) + 10000,
      status,
      agingDays,
      assignedTo: Math.random() > 0.3 ? assignees[Math.floor(Math.random() * assignees.length)] : null,
      lastUpdatedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      tags: Math.random() > 0.7 ? ['High Priority', 'VIP Customer'] : Math.random() > 0.5 ? ['Follow Up'] : null
    };
  });
};

// Generate and cache mock data
let mockDataCache = null;
const getMockData = () => {
  if (!mockDataCache) {
    mockDataCache = generateMockData(1500);
  }
  return mockDataCache;
};

// Utility functions for filtering and sorting
const applyFilters = (data, filters) => {
  let filtered = [...data];

  // Search filter
  if (filters.q) {
    const searchTerm = filters.q.toLowerCase();
    filtered = filtered.filter(item =>
      item.loanAccountNo.toLowerCase().includes(searchTerm) ||
      item.customerName.toLowerCase().includes(searchTerm) ||
      item.merchantName.toLowerCase().includes(searchTerm)
    );
  }

  // Date range filter
  if (filters.from) {
    const fromDate = new Date(filters.from);
    filtered = filtered.filter(item => new Date(item.disbursalDate) >= fromDate);
  }

  if (filters.to) {
    const toDate = new Date(filters.to);
    toDate.setHours(23, 59, 59, 999); // Include full day
    filtered = filtered.filter(item => new Date(item.disbursalDate) <= toDate);
  }

  // Merchant filter
  if (filters.merchantIds && filters.merchantIds.length > 0) {
    filtered = filtered.filter(item => filters.merchantIds.includes(item.merchantId));
  }

  // Status filter
  if (filters.statuses && filters.statuses.length > 0) {
    filtered = filtered.filter(item => filters.statuses.includes(item.status));
  }

  return filtered;
};

const applySorting = (data, sortConfig) => {
  if (!sortConfig || sortConfig.length === 0) {
    return data;
  }

  return [...data].sort((a, b) => {
    for (const { field, direction } of sortConfig) {
      let aVal = a[field];
      let bVal = b[field];

      // Handle date fields
      if (field === 'disbursalDate' || field === 'lastUpdatedAt') {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
      }

      // Handle numeric fields
      if (field === 'amount' || field === 'agingDays') {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }

      // Handle string fields
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        aVal = aVal.toLowerCase();
        bVal = bVal.toLowerCase();
      }

      if (aVal < bVal) return direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return direction === 'asc' ? 1 : -1;
    }
    return 0;
  });
};

// Main API function
export const fetchPostDisbursal = async (params = {}) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 200));

  // Simulate occasional errors (5% chance)
  if (Math.random() < 0.05) {
    throw new Error('Failed to fetch data. Please try again.');
  }

  const {
    q = '',
    from = '',
    to = '',
    merchantIds = [],
    statuses = [],
    page = 1,
    pageSize = 25,
    sort = []
  } = params;

  const mockData = getMockData();
  
  // Apply filters
  const filtered = applyFilters(mockData, { q, from, to, merchantIds, statuses });
  
  // Apply sorting
  const sorted = applySorting(filtered, sort);
  
  // Apply pagination
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = sorted.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    total: filtered.length,
    page,
    pageSize
  };
};

// Get distinct merchants for filter dropdown
export const getDistinctMerchants = async () => {
  const data = getMockData();
  const merchants = data.reduce((acc, item) => {
    if (!acc.find(m => m.id === item.merchantId)) {
      acc.push({
        id: item.merchantId,
        name: item.merchantName
      });
    }
    return acc;
  }, []);
  
  return merchants.sort((a, b) => a.name.localeCompare(b.name));
};

// Get all possible statuses
export const getStatuses = () => {
  return ['Pending', 'In Review', 'Completed', 'Rejected'];
};

// Get summary counts for dashboard
export const getSummaryCounts = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));

  // Simulate occasional errors (2% chance)
  if (Math.random() < 0.02) {
    throw new Error('Failed to fetch summary counts. Please try again.');
  }

  // Return mock data based on the provided structure
  return {
    summary: Math.floor(Math.random() * 50),
    details: Math.floor(Math.random() * 1500) + 800, // Higher count as this seems to be main bucket
    unsettled: Math.floor(Math.random() * 1200) + 600, // Second highest
    refund: Math.floor(Math.random() * 150) + 50,
    refundsAndCancellations: "",
    refundInitiated: Math.floor(Math.random() * 10) + 1,
    bulkrefundInitiated: "",
    tranchePending: Math.floor(Math.random() * 20)
  };
};

// Bulk action stubs - TODO: Replace with actual API calls
export const bulkAssignOwner = async (itemIds, assigneeId) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Bulk assign owner:', { itemIds, assigneeId });
  return { success: true };
};

export const bulkUpdateStatus = async (itemIds, newStatus) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Bulk update status:', { itemIds, newStatus });
  return { success: true };
};

// Get mock users for assignment
export const getUsers = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return [
    { id: 'user1', name: 'John Doe', email: 'john.doe@company.com' },
    { id: 'user2', name: 'Jane Smith', email: 'jane.smith@company.com' },
    { id: 'user3', name: 'Mike Johnson', email: 'mike.johnson@company.com' },
    { id: 'user4', name: 'Sarah Wilson', email: 'sarah.wilson@company.com' },
    { id: 'user5', name: 'David Brown', email: 'david.brown@company.com' }
  ];
};

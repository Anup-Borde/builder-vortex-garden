// Parse filters from URL search parameters
export const parseFiltersFromURL = (searchParams) => {
  const filters = {
    q: searchParams.get('q') || '',
    from: searchParams.get('from') || '',
    to: searchParams.get('to') || '',
    merchantIds: [],
    statuses: [],
    page: parseInt(searchParams.get('page')) || 1,
    pageSize: parseInt(searchParams.get('pageSize')) || 25,
    sort: []
  };

  // Parse merchant IDs
  const merchantIds = searchParams.getAll('merchantIds');
  if (merchantIds.length > 0) {
    filters.merchantIds = merchantIds.map(id => parseInt(id)).filter(id => !isNaN(id));
  }

  // Parse statuses
  const statuses = searchParams.getAll('statuses');
  if (statuses.length > 0) {
    filters.statuses = statuses;
  }

  // Parse sort configuration
  const sortParam = searchParams.get('sort');
  if (sortParam) {
    try {
      filters.sort = sortParam.split(',').map(item => {
        const [field, direction] = item.split(':');
        return { field, direction: direction || 'asc' };
      }).filter(item => item.field);
    } catch (error) {
      console.warn('Invalid sort parameter:', sortParam);
      filters.sort = [];
    }
  }

  return filters;
};

// Build URL from filters object
export const buildURLFromFilters = (filters) => {
  const params = new URLSearchParams();

  // Add simple string parameters
  if (filters.q) params.set('q', filters.q);
  if (filters.from) params.set('from', filters.from);
  if (filters.to) params.set('to', filters.to);
  
  // Add page and pageSize
  if (filters.page && filters.page !== 1) {
    params.set('page', filters.page.toString());
  }
  if (filters.pageSize && filters.pageSize !== 25) {
    params.set('pageSize', filters.pageSize.toString());
  }

  // Add merchant IDs
  if (filters.merchantIds && filters.merchantIds.length > 0) {
    filters.merchantIds.forEach(id => {
      params.append('merchantIds', id.toString());
    });
  }

  // Add statuses
  if (filters.statuses && filters.statuses.length > 0) {
    filters.statuses.forEach(status => {
      params.append('statuses', status);
    });
  }

  // Add sort configuration
  if (filters.sort && filters.sort.length > 0) {
    const sortString = filters.sort
      .map(({ field, direction }) => `${field}:${direction}`)
      .join(',');
    params.set('sort', sortString);
  }

  const queryString = params.toString();
  return queryString ? `/post-disbursal?${queryString}` : '/post-disbursal';
};

// Validate filter values
export const validateFilters = (filters) => {
  const validated = { ...filters };

  // Validate page
  if (!validated.page || validated.page < 1) {
    validated.page = 1;
  }

  // Validate pageSize
  const validPageSizes = [10, 25, 50, 100];
  if (!validPageSizes.includes(validated.pageSize)) {
    validated.pageSize = 25;
  }

  // Validate dates
  if (validated.from && !isValidDate(validated.from)) {
    validated.from = '';
  }
  if (validated.to && !isValidDate(validated.to)) {
    validated.to = '';
  }

  // Ensure arrays are arrays
  if (!Array.isArray(validated.merchantIds)) {
    validated.merchantIds = [];
  }
  if (!Array.isArray(validated.statuses)) {
    validated.statuses = [];
  }
  if (!Array.isArray(validated.sort)) {
    validated.sort = [];
  }

  return validated;
};

// Helper function to validate date strings
const isValidDate = (dateString) => {
  if (!dateString) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

// Get default filters
export const getDefaultFilters = () => ({
  q: '',
  from: '',
  to: '',
  merchantIds: [],
  statuses: [],
  page: 1,
  pageSize: 25,
  sort: []
});

// Compare two filter objects for equality (useful for detecting changes)
export const filtersEqual = (filters1, filters2) => {
  if (!filters1 || !filters2) return false;

  const keys = [
    'q', 'from', 'to', 'page', 'pageSize'
  ];

  // Check simple properties
  for (const key of keys) {
    if (filters1[key] !== filters2[key]) {
      return false;
    }
  }

  // Check arrays
  const arrayKeys = ['merchantIds', 'statuses', 'sort'];
  for (const key of arrayKeys) {
    const arr1 = filters1[key] || [];
    const arr2 = filters2[key] || [];
    
    if (arr1.length !== arr2.length) {
      return false;
    }
    
    if (key === 'sort') {
      // Deep comparison for sort objects
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i].field !== arr2[i].field || arr1[i].direction !== arr2[i].direction) {
          return false;
        }
      }
    } else {
      // Simple array comparison
      for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
    }
  }

  return true;
};

// Extract unique values for filters from data
export const extractFilterOptions = (data) => {
  const merchants = new Map();
  const statuses = new Set();

  data.forEach(item => {
    // Collect unique merchants
    if (!merchants.has(item.merchantId)) {
      merchants.set(item.merchantId, {
        id: item.merchantId,
        name: item.merchantName
      });
    }

    // Collect unique statuses
    statuses.add(item.status);
  });

  return {
    merchants: Array.from(merchants.values()).sort((a, b) => a.name.localeCompare(b.name)),
    statuses: Array.from(statuses).sort()
  };
};

const STORAGE_KEY = 'pdq-filters';

// Save filters to localStorage
export const saveFiltersToStorage = (filters) => {
  try {
    const toSave = {
      q: filters.q || '',
      from: filters.from || '',
      to: filters.to || '',
      merchantIds: filters.merchantIds || [],
      statuses: filters.statuses || [],
      pageSize: filters.pageSize || 25,
      sort: filters.sort || []
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (error) {
    console.warn('Failed to save filters to localStorage:', error);
  }
};

// Load filters from localStorage
export const loadFiltersFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        q: parsed.q || '',
        from: parsed.from || '',
        to: parsed.to || '',
        merchantIds: Array.isArray(parsed.merchantIds) ? parsed.merchantIds : [],
        statuses: Array.isArray(parsed.statuses) ? parsed.statuses : [],
        pageSize: parsed.pageSize || 25,
        sort: Array.isArray(parsed.sort) ? parsed.sort : [],
        page: 1 // Always start from page 1
      };
    }
  } catch (error) {
    console.warn('Failed to load filters from localStorage:', error);
  }
  
  // Return default filters if nothing saved or error occurred
  return {
    q: '',
    from: '',
    to: '',
    merchantIds: [],
    statuses: [],
    page: 1,
    pageSize: 25,
    sort: []
  };
};

// Clear filters from localStorage
export const clearFiltersFromStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn('Failed to clear filters from localStorage:', error);
  }
};

// Check if localStorage is available
export const isStorageAvailable = () => {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (error) {
    return false;
  }
};

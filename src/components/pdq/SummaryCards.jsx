'use client';

import { 
  FileText, 
  Info, 
  AlertTriangle, 
  RefreshCw, 
  DollarSign,
  Clock,
  TrendingUp,
  Activity 
} from 'lucide-react';

export function SummaryCards({ counts, loading }) {
  // Define the cards configuration with icons and styling
  const cardConfigs = [
    {
      key: 'details',
      label: 'Details',
      icon: FileText,
      description: 'Items requiring detailed review',
      color: 'blue',
      priority: 'high'
    },
    {
      key: 'unsettled',
      label: 'Unsettled',
      icon: AlertTriangle,
      description: 'Items pending settlement',
      color: 'orange',
      priority: 'high'
    },
    {
      key: 'refund',
      label: 'Refunds',
      icon: RefreshCw,
      description: 'Refund requests',
      color: 'red',
      priority: 'medium'
    },
    {
      key: 'refundInitiated',
      label: 'Refund Initiated',
      icon: DollarSign,
      description: 'Refunds in progress',
      color: 'purple',
      priority: 'medium'
    },
    {
      key: 'tranchePending',
      label: 'Tranche Pending',
      icon: Clock,
      description: 'Pending tranche processing',
      color: 'gray',
      priority: 'low'
    },
    {
      key: 'summary',
      label: 'Summary',
      icon: TrendingUp,
      description: 'Summary items',
      color: 'green',
      priority: 'low'
    }
  ];

  const getColorClasses = (color, priority) => {
    const baseClasses = {
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        icon: 'text-blue-600',
        text: 'text-blue-900',
        count: 'text-blue-700'
      },
      orange: {
        bg: 'bg-orange-50',
        border: 'border-orange-200',
        icon: 'text-orange-600',
        text: 'text-orange-900',
        count: 'text-orange-700'
      },
      red: {
        bg: 'bg-red-50',
        border: 'border-red-200',
        icon: 'text-red-600',
        text: 'text-red-900',
        count: 'text-red-700'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        icon: 'text-purple-600',
        text: 'text-purple-900',
        count: 'text-purple-700'
      },
      gray: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        icon: 'text-gray-600',
        text: 'text-gray-900',
        count: 'text-gray-700'
      },
      green: {
        bg: 'bg-green-50',
        border: 'border-green-200',
        icon: 'text-green-600',
        text: 'text-green-900',
        count: 'text-green-700'
      }
    };

    return baseClasses[color] || baseClasses.gray;
  };

  const formatCount = (count) => {
    if (count === null || count === undefined || count === '') {
      return '0';
    }
    return parseInt(count).toLocaleString();
  };

  const getCountValue = (key) => {
    const value = counts?.[key];
    if (value === null || value === undefined || value === '') {
      return 0;
    }
    return parseInt(value) || 0;
  };

  // Sort cards by priority and count
  const sortedCards = cardConfigs
    .map(config => ({
      ...config,
      count: getCountValue(config.key)
    }))
    .sort((a, b) => {
      // First sort by priority (high -> medium -> low)
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
      if (priorityDiff !== 0) return priorityDiff;
      
      // Then sort by count (descending)
      return b.count - a.count;
    });

  if (loading) {
    return <SummaryCardsSkeleton />;
  }

  return (
    <div className="mb-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Queue Summary</h2>
        <p className="text-sm text-gray-600">Overview of post-disbursal items by category</p>
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {sortedCards.map((card) => {
          const Icon = card.icon;
          const colors = getColorClasses(card.color, card.priority);
          const hasItems = card.count > 0;
          
          return (
            <div
              key={card.key}
              className={`relative rounded-2xl border p-4 transition-all duration-200 ${
                hasItems 
                  ? `${colors.bg} ${colors.border} hover:shadow-md cursor-pointer` 
                  : 'bg-gray-50 border-gray-200'
              }`}
              data-testid={`summary-card-${card.key}`}
            >
              {/* Priority indicator for high priority items */}
              {card.priority === 'high' && hasItems && (
                <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500"></div>
              )}
              
              <div className="flex items-center gap-3">
                <div className={`rounded-lg p-2 ${hasItems ? colors.bg : 'bg-gray-100'}`}>
                  <Icon className={`h-5 w-5 ${hasItems ? colors.icon : 'text-gray-400'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className={`text-2xl font-bold ${hasItems ? colors.count : 'text-gray-400'}`}>
                    {formatCount(card.count)}
                  </div>
                  <div className={`text-xs font-medium ${hasItems ? colors.text : 'text-gray-500'}`}>
                    {card.label}
                  </div>
                </div>
              </div>
              
              {/* Tooltip description */}
              <div className="mt-2">
                <p className={`text-xs ${hasItems ? colors.text + ' opacity-75' : 'text-gray-500'}`}>
                  {card.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total summary */}
      <div className="mt-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <div className="text-lg font-semibold text-blue-900">
                Total Active Items
              </div>
              <div className="text-sm text-blue-700">
                Items requiring attention across all categories
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-blue-800">
            {formatCount(
              Object.values(counts || {})
                .filter(val => val !== '' && val !== null && val !== undefined)
                .reduce((sum, val) => sum + (parseInt(val) || 0), 0)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton for summary cards
function SummaryCardsSkeleton() {
  return (
    <div className="mb-6">
      <div className="mb-4">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="rounded-2xl border border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="rounded-lg p-2 bg-gray-200 animate-pulse">
                <div className="h-5 w-5 bg-gray-300 rounded"></div>
              </div>
              <div className="flex-1">
                <div className="h-6 w-12 bg-gray-200 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
            <div className="mt-2">
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-gray-200 p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg p-2 bg-gray-200 animate-pulse">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
            </div>
            <div>
              <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-8 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}

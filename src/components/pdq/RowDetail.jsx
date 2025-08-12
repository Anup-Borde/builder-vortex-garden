'use client';

import { useState } from 'react';
import { 
  X, 
  User, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle,
  PlayCircle,
  Calendar,
  DollarSign,
  Building,
  Hash,
  Eye
} from 'lucide-react';

export function RowDetail({ item, onClose }) {
  const [activeTab, setActiveTab] = useState('details');

  const tabs = [
    { id: 'details', label: 'Details', icon: Eye },
    { id: 'timeline', label: 'Timeline', icon: Clock },
    { id: 'json', label: 'Raw Data', icon: Hash }
  ];

  return (
    <div className="bg-gray-50 border-t border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-gray-900">
              Loan Details - {item.loanAccountNo}
            </h3>
            <StatusBadge status={item.status} />
          </div>
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 bg-white p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="max-h-96 overflow-y-auto">
          {activeTab === 'details' && <DetailsTab item={item} />}
          {activeTab === 'timeline' && <TimelineTab item={item} />}
          {activeTab === 'json' && <JsonTab item={item} />}
        </div>
      </div>
    </div>
  );
}

// Details Tab Component
function DetailsTab({ item }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const detailSections = [
    {
      title: 'Customer Information',
      icon: User,
      fields: [
        { label: 'Customer Name', value: item.customerName },
        { label: 'Tags', value: item.tags?.join(', ') || 'None' }
      ]
    },
    {
      title: 'Loan Information',
      icon: DollarSign,
      fields: [
        { label: 'Loan Account No', value: item.loanAccountNo },
        { label: 'Disbursal Amount', value: formatCurrency(item.amount) },
        { label: 'Disbursal Date', value: formatDate(item.disbursalDate) },
        { label: 'Aging Days', value: `${item.agingDays} days` }
      ]
    },
    {
      title: 'Merchant Information',
      icon: Building,
      fields: [
        { label: 'Merchant Name', value: item.merchantName },
        { label: 'Merchant ID', value: item.merchantId.toString() }
      ]
    },
    {
      title: 'Processing Information',
      icon: Clock,
      fields: [
        { label: 'Current Status', value: item.status },
        { label: 'Assigned To', value: item.assignedTo || 'Unassigned' },
        { label: 'Last Updated', value: formatDate(item.lastUpdatedAt) }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {detailSections.map((section, index) => {
        const Icon = section.icon;
        return (
          <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon className="h-4 w-4 text-gray-500" />
              <h4 className="text-sm font-medium text-gray-900">{section.title}</h4>
            </div>
            <dl className="space-y-2">
              {section.fields.map((field, fieldIndex) => (
                <div key={fieldIndex} className="flex justify-between text-sm">
                  <dt className="text-gray-500">{field.label}:</dt>
                  <dd className="text-gray-900 font-medium text-right">{field.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        );
      })}
    </div>
  );
}

// Timeline Tab Component
function TimelineTab({ item }) {
  // Generate mock timeline based on item status
  const generateTimeline = (item) => {
    const baseDate = new Date(item.disbursalDate);
    const timeline = [];

    // Disbursed (always present)
    timeline.push({
      status: 'Disbursed',
      date: baseDate,
      description: 'Loan amount disbursed to merchant',
      completed: true,
      icon: CheckCircle,
      color: 'text-green-600'
    });

    // In Review (if status is In Review or beyond)
    if (['In Review', 'Completed', 'Rejected'].includes(item.status)) {
      const reviewDate = new Date(baseDate.getTime() + Math.random() * 3 * 24 * 60 * 60 * 1000);
      timeline.push({
        status: 'In Review',
        date: reviewDate,
        description: 'Post-disbursal review initiated',
        completed: true,
        icon: PlayCircle,
        color: 'text-blue-600'
      });
    }

    // Final status
    if (item.status === 'Completed') {
      const completedDate = new Date(item.lastUpdatedAt);
      timeline.push({
        status: 'Completed',
        date: completedDate,
        description: 'Post-disbursal process completed successfully',
        completed: true,
        icon: CheckCircle,
        color: 'text-green-600'
      });
    } else if (item.status === 'Rejected') {
      const rejectedDate = new Date(item.lastUpdatedAt);
      timeline.push({
        status: 'Rejected',
        date: rejectedDate,
        description: 'Post-disbursal process rejected',
        completed: true,
        icon: XCircle,
        color: 'text-red-600'
      });
    } else if (item.status === 'Pending') {
      timeline.push({
        status: 'Pending Review',
        date: null,
        description: 'Awaiting post-disbursal review',
        completed: false,
        icon: AlertCircle,
        color: 'text-yellow-600'
      });
    }

    return timeline.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return a.date.getTime() - b.date.getTime();
    });
  };

  const timeline = generateTimeline(item);

  const formatTimelineDate = (date) => {
    if (!date) return 'Pending';
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flow-root">
        <ul className="-mb-8">
          {timeline.map((event, eventIdx) => {
            const Icon = event.icon;
            return (
              <li key={eventIdx}>
                <div className="relative pb-8">
                  {eventIdx !== timeline.length - 1 ? (
                    <span
                      className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                        event.completed ? 'bg-green-200' : 'bg-gray-200'
                      }`}
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          event.completed
                            ? 'bg-green-500'
                            : event.status === 'Pending Review'
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {event.status}
                        </p>
                        <p className="text-sm text-gray-500">
                          {event.description}
                        </p>
                      </div>
                      <div className="whitespace-nowrap text-right text-sm text-gray-500">
                        <time dateTime={event.date?.toISOString()}>
                          {formatTimelineDate(event.date)}
                        </time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

// JSON Tab Component
function JsonTab({ item }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(item, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h4 className="text-sm font-medium text-gray-900">Raw JSON Data</h4>
        <button
          onClick={copyToClipboard}
          className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
        >
          {copied ? 'Copied!' : 'Copy JSON'}
        </button>
      </div>
      <div className="p-4">
        <pre className="text-xs text-gray-800 overflow-x-auto bg-gray-50 rounded p-3">
          {JSON.stringify(item, null, 2)}
        </pre>
      </div>
    </div>
  );
}

// Status Badge Component
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
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}

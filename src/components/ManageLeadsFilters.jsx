"use client";

import React, { useState, useDeferredValue, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

const ManageLeadsFilters = ({ onSearch, onReset }) => {
  // Filter state
  const [filters, setFilters] = useState({
    searchType: "custId",
    query: "",
    channel: "",
    segment: "",
    merchant: "",
    dateFrom: "",
    dateTo: "",
  });

  // Performance optimization with deferred value
  const deferredQuery = useDeferredValue(filters.query);

  // Search type options configuration
  const searchTypeOptions = [
    { value: "custId", label: "Cust ID", placeholder: "Type here" },
    { value: "mobile", label: "Mobile No", placeholder: "Type here" },
    { value: "orderId", label: "Order ID", placeholder: "Type here" },
    { value: "loanId", label: "Loan ID", placeholder: "Type here" },
  ];

  // Dropdown options
  const channelOptions = [
    { value: 4, label: "AFFILIATE" },
    { value: 2, label: "AGGREGATOR" },
    { value: 1, label: "CHECKOUT" },
    { value: 3, label: "DSA" },
    { value: 5, label: "LAMF" },
  ];

  // Tree-structured segment options
  const segmentTree = [
    {
      companyCategoryName: "BNPL DigitalHealth",
      companyCategoryValue: "BNPL_DigitalHealth",
      subCategoryList: [
        { name: "Digitalhealth CENTRAL", value: "Digitalhealth_CENTRAL" },
        { name: "Digitalhealth Aggregator", value: "Digitalhealth Aggregator" },
        { name: "Digitalhealth CLINICAL", value: "Digitalhealth_CLINICAL" },
      ],
      subSubCategoryList: [
        { name: "Dental", value: "Dental" },
        { name: "Wellness", value: "Wellness" },
        { name: "Health Card", value: "Health Card" },
        { name: "Reversals", value: "Reversals" },
        { name: "Medical Equipment", value: "Medical Equipment" },
      ],
    },
    {
      companyCategoryName: "BNPL SCHOOLS",
      companyCategoryValue: "BNPL_SCHOOLS",
      subCategoryList: [
        { name: "ERP", value: "ERP" },
        { name: "Direct School", value: "Direct_School" },
      ],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "Ecommerce",
      companyCategoryValue: "Ecommerce",
      subCategoryList: [],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "Edtech",
      companyCategoryValue: "Edtech",
      subCategoryList: [
        { name: "Direct Merchant", value: "Direct_Merchant" },
        { name: "Coaching", value: "Coaching" },
        { name: "University", value: "University" },
        { name: "Upgrad-Uplift", value: "Upgrad-Uplift" },
      ],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "Healthtech",
      companyCategoryValue: "Healthtech",
      subCategoryList: [
        { name: "Hospital Aggregator", value: "Hospital_Aggregator" },
        { name: "HospiClinic", value: "HospiClinic" },
        { name: "Hospital", value: "Hospital" },
      ],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "Insurance",
      companyCategoryValue: "Insurance",
      subCategoryList: [
        { name: "Insurance", value: "Insurance" },
        { name: "Insurance EW", value: "Insurance_EW" },
      ],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "Insurance non-cancellation",
      companyCategoryValue: "Insurance_non-cancellation",
      subCategoryList: [
        {
          name: "Insurance non-cancellation",
          value: "Insurance_non-cancellation",
        },
      ],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "Solar Panel",
      companyCategoryValue: "Solar_Panel",
      subCategoryList: [],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "Travel",
      companyCategoryValue: "Travel",
      subCategoryList: [{ name: "Travel", value: "Travel" }],
      subSubCategoryList: [],
    },
    {
      companyCategoryName: "University",
      companyCategoryValue: "University",
      subCategoryList: [],
      subSubCategoryList: [],
    },
  ];
  // State for open/close of segment tree
  const [openSegmentTree, setOpenSegmentTree] = useState({});

  // Affiliate merchant data
  const affiliateMerchantData = [
    {
      merchantId: 0,
      merchantName: "All",
    },
    {
      merchantId: 5416,
      merchantName: "Udchalo",
    },
    {
      merchantId: 10470,
      merchantName: "Shopse-PolicyBazaar",
      subMerchants: [
        {
          merchantId: 10470,
          merchantName: "Shopse-PolicyBazaar",
        },
        {
          merchantId: 10671,
          merchantName: "Shopse-PolicyBazaar",
        },
        {
          merchantId: 10794,
          merchantName: "Shopse-InsuranceDekho",
        },
      ],
    },
    {
      merchantId: 10656,
      merchantName: "TestVaishnavi",
    },
    {
      merchantId: 10657,
      merchantName: "TestVaishnaviDSA",
    },
    {
      merchantId: 10683,
      merchantName: "amazon",
    },
    {
      merchantId: 10818,
      merchantName: "test",
    },
  ];

  const merchantOptions = [
    { value: "kotak", label: "Kotak" },
    { value: "hdfc", label: "HDFC" },
    { value: "icici", label: "ICICI" },
    { value: "axis", label: "Axis" },
    { value: "sbi", label: "SBI" },
  ];

  // State for merchant search, tree open/close, and dropdown open/close
  const [merchantSearch, setMerchantSearch] = useState("");
  const [openTree, setOpenTree] = useState({});
  const [merchantDropdownOpen, setMerchantDropdownOpen] = useState(false);
  // Checkout merchant tree state
  const [checkoutMerchantDropdownOpen, setCheckoutMerchantDropdownOpen] =
    useState(false);
  const [openCheckoutTree, setOpenCheckoutTree] = useState({});
  const [checkoutMerchantSearch, setCheckoutMerchantSearch] = useState("");

  // Provided merchant JSON for Checkout
  const checkoutMerchantData = [
    {
      merchantId: 2,
      merchantName: "Demo Brand123",
      utm: "test1",
      isAgentLed: false,
      companyCategory: "BNPL_DigitalHealth",
      companySubCategory: "Insurance_non-cancellation",
      isactive: 1,
      subMerchants: [
        {
          merchantId: 2,
          merchantName: "Demo Brand123",
          utm: "test1",
          isAgentLed: false,
          companyCategory: "BNPL_DigitalHealth",
          companySubCategory: "Insurance_non-cancellation",
          isactive: 1,
        },
        {
          merchantId: 4751,
          merchantName: "Vanish",
          utm: "SANKASH",
          isAgentLed: false,
          companyCategory: "Ecommerce",
          companySubCategory: "Ecommerce",
          isactive: 1,
        },
        {
          merchantId: 7439,
          merchantName: "fsdfsdfsdf",
          utm: "test_utm_source",
          isAgentLed: true,
          companyCategory: "Insurance",
          companySubCategory: "Insurance",
          isactive: 1,
        },
        {
          merchantId: 7442,
          merchantName: "sdfsdf",
          utm: "test_utm_source",
          isAgentLed: true,
          companyCategory: "Ecommerce",
          companySubCategory: "Ecommerce",
          isactive: 1,
        },
        {
          merchantId: 7633,
          merchantName: "ClikFin",
          utm: "CLIKFIN",
          isAgentLed: false,
          companyCategory: "BNPL_SCHOOLS",
          companySubCategory: "ERP",
          isactive: 1,
        },
        {
          merchantId: 10690,
          merchantName: "Bnpl digital",
          utm: "TestUtm",
          isAgentLed: false,
          companyCategory: "BNPL_DigitalHealth",
          companySubCategory: "Digitalhealth_CLINICAL",
          isactive: 1,
        },
      ],
    },
    {
      merchantId: 131,
      merchantName: "paisabazaar",
      utm: "paisabazaar",
      isAgentLed: false,
      companyCategory: "Insurance",
      companySubCategory: "Insurance",
      isactive: 1,
    },
    {
      merchantId: 308,
      merchantName: "Razorpay_QA",
      utm: "razorpay",
      isAgentLed: true,
      companyCategory: "BFSI",
      companySubCategory: "Insurance_non-cancellation",
      isactive: 1,
    },
    {
      merchantId: 1001,
      merchantName: "Pearl Fertility (Partial Sub)_12",
      utm: "PEARLFERTILITY",
      isAgentLed: false,
      companyCategory: "Healthtech",
      companySubCategory: "Hospitech",
      isactive: 1,
      subMerchants: [
        {
          merchantId: 1001,
          merchantName: "Pearl Fertility (Partial Sub)_12",
          utm: "PEARLFERTILITY",
          isAgentLed: false,
          companyCategory: "Healthtech",
          companySubCategory: "Hospitech",
          isactive: 1,
        },
        {
          merchantId: 10610,
          merchantName:
            "VOLO HEALTH (DR KM CHERIAN INSTITUTE OF MEDICAL SCIENCES)",
          utm: "VOLOHEALTH",
          isAgentLed: true,
          companyCategory: "Healthtech",
          companySubCategory: "Hospital_Aggregator",
          isactive: 1,
        },
      ],
    },
    {
      merchantId: 1010,
      merchantName: "Health Merchant",
      utm: "TestUTM",
      isAgentLed: true,
      companyCategory: "Healthtech",
      companySubCategory: "Hospital",
      isactive: 1,
      subMerchants: [
        {
          merchantId: 1010,
          merchantName: "Health Merchant",
          utm: "TestUTM",
          isAgentLed: true,
          companyCategory: "Healthtech",
          companySubCategory: "Hospital",
          isactive: 1,
        },
        {
          merchantId: 10274,
          merchantName: "test_brand",
          utm: "test_utm_source",
          isAgentLed: false,
          companyCategory: "Edtech",
          companySubCategory: "Direct_Merchant",
          isactive: 1,
        },
        {
          merchantId: 10583,
          merchantName: "Test merchant",
          utm: "test_utm",
          isAgentLed: false,
          companyCategory: "Solar_Panel",
          companySubCategory: "Solar_Panel",
          isactive: 1,
        },
        {
          merchantId: 10685,
          merchantName: "Bnpl digital ESAL 26921",
          utm: "TestUtm",
          isAgentLed: false,
          companyCategory: "BNPL_DigitalHealth",
          companySubCategory: "Digitalhealth_CLINICAL",
          isactive: 1,
        },
        {
          merchantId: 10688,
          merchantName: "Health",
          utm: "TestUtm",
          isAgentLed: false,
          companyCategory: "Healthtech",
          companySubCategory: "Hospital",
          isactive: 1,
        },
        {
          merchantId: 10689,
          merchantName: "BNPL School",
          utm: "TestUtm",
          isAgentLed: false,
          companyCategory: "BNPL_SCHOOLS",
          companySubCategory: "ERP",
          isactive: 1,
        },
        {
          merchantId: 10691,
          merchantName: "Edtech",
          utm: "TestUtm",
          isAgentLed: false,
          companyCategory: "Edtech",
          companySubCategory: "University",
          isactive: 1,
        },
      ],
    },
    {
      merchantId: 1077,
      merchantName: "Razorpay_QA",
      utm: "SCALER",
      isAgentLed: true,
      companyCategory: "HealthTech",
      companySubCategory: "Insurance_non-cancellation",
      isactive: 1,
      subMerchants: [
        {
          merchantId: 1077,
          merchantName: "Razorpay_QA",
          utm: "SCALER",
          isAgentLed: true,
          companyCategory: "HealthTech",
          companySubCategory: "Insurance_non-cancellation",
          isactive: 1,
        },
        {
          merchantId: 1078,
          merchantName: "Sahyadri School KFI3",
          isAgentLed: true,
          companyCategory: "Education",
          companySubCategory: "Insurance_non-cancellation",
          isactive: 1,
        },
        {
          merchantId: 1079,
          merchantName: "IACSD",
          isAgentLed: true,
          companyCategory: "Education",
          companySubCategory: "Insurance_non-cancellation",
          isactive: 1,
        },
        {
          merchantId: 1080,
          merchantName: "Symbiosis Institute",
          isAgentLed: true,
          companyCategory: "Education",
          companySubCategory: "Test_2",
          isactive: 1,
        },
        {
          merchantId: 1081,
          merchantName: "SNAP",
          isAgentLed: true,
          companyCategory: "Automobiles And Vehicles",
          companySubCategory: "Insurance_non-cancellation",
          isactive: 1,
        },
      ],
    },
    {
      merchantId: 1142,
      merchantName: "Max Bupa",
      utm: "MAXBUPATEST",
      isAgentLed: true,
      companyCategory: "Insurance",
      companySubCategory: "Insurance",
      isactive: 1,
    },
    {
      merchantId: 1185,
      merchantName: "McCoy",
      utm: "McCoy",
      isAgentLed: false,
      companyCategory: "",
      companySubCategory: "Insurance_non-cancellation",
      isactive: 1,
    },
    // ...truncated for brevity, add the rest of the provided JSON here...
    { merchantId: 0, merchantName: "All", isAgentLed: false, isactive: 1 },
  ];

  // Helper to filter merchants by search (for Checkout)
  const filterCheckoutMerchants = (list) => {
    return list.filter((m) => {
      const match = m.merchantName
        .toLowerCase()
        .includes(checkoutMerchantSearch.toLowerCase());
      if (m.subMerchants) {
        m.subMerchants = filterCheckoutMerchants(m.subMerchants);
        return match || m.subMerchants.length > 0;
      }
      return match;
    });
  };

  // Helper to filter merchants by search
  const filterMerchants = (list) => {
    return list.filter((m) => {
      const match = m.merchantName
        .toLowerCase()
        .includes(merchantSearch.toLowerCase());
      if (m.subMerchants) {
        m.subMerchants = filterMerchants(m.subMerchants);
        return match || m.subMerchants.length > 0;
      }
      return match;
    });
  };

  // Handle input changes
  const handleInputChange = useCallback((field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Handle search type change
  const handleSearchTypeChange = useCallback((searchType) => {
    setFilters((prev) => ({
      ...prev,
      searchType,
      query: "", // Clear query when switching types
    }));
  }, []);

  // Handle search
  const handleSearch = useCallback(() => {
    const searchFilters = {
      searchType: filters.searchType,
      query: deferredQuery,
      channel: filters.channel,
      segment: filters.segment,
      merchant: filters.merchant,
      dateFrom: filters.dateFrom,
      dateTo: filters.dateTo,
    };

    console.log("Search Filters:", searchFilters);
    onSearch(searchFilters);
  }, [filters, deferredQuery, onSearch]);

  // Handle reset
  const handleReset = useCallback(() => {
    const resetFilters = {
      searchType: "custId",
      query: "",
      channel: "",
      segment: "",
      merchant: "",
      dateFrom: "",
      dateTo: "",
    };

    setFilters(resetFilters);
    onReset(resetFilters);
  }, [onReset]);

  // Get current placeholder and label based on search type
  const getCurrentSearchConfig = () => {
    const config = searchTypeOptions.find(
      (option) => option.value === filters.searchType
    );
    return config || searchTypeOptions[0];
  };

  const currentConfig = getCurrentSearchConfig();

  const router = useRouter();

  // Channel logic for filter visibility
  const channelInt = Number(filters.channel);
  const isAffiliate = channelInt === 4;
  const isAggregator = channelInt === 2;
  const isDSA = channelInt === 3;
  const isLAMF = channelInt === 5;
  const isCheckout = channelInt === 1;
  const hideSegment = isAffiliate || isAggregator || isDSA || isLAMF;

  return (
    <div className="bg-white border border-[#E6E6E6] rounded-2xl p-6 mb-6 w-full mx-auto">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="space-y-4">
          <div className="flex flex-row items-center gap-4">
            {/* Channel Dropdown always visible */}
            <div className="w-[300px]">
              <Select
                value={filters.channel}
                onValueChange={(value) => handleInputChange("channel", value)}
              >
                <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-base">
                  <SelectValue placeholder="Select Channel" />
                </SelectTrigger>
                <SelectContent>
                  {channelOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Segment Dropdown: show only if not hidden, tree structure */}
            {!hideSegment && (
              <div className="w-[350px] relative">
                <div
                  className="h-12 border border-[#E6E6E6] rounded-lg flex items-center px-4 cursor-pointer bg-white select-none"
                  onClick={() =>
                    setOpenSegmentTree((prev) => ({
                      ...prev,
                      root: !prev.root,
                    }))
                  }
                >
                  <span className="text-base text-[#999] flex-1">
                    {filters.segment
                      ? (() => {
                          // Find selected segment name
                          const findSegment = (list, val) => {
                            for (const cat of list) {
                              if (cat.companyCategoryValue === val)
                                return cat.companyCategoryName;
                              if (cat.subCategoryList) {
                                for (const sub of cat.subCategoryList) {
                                  if (sub.value === val) return sub.name;
                                }
                              }
                              if (cat.subSubCategoryList) {
                                for (const subsub of cat.subSubCategoryList) {
                                  if (subsub.value === val) return subsub.name;
                                }
                              }
                            }
                            return "";
                          };
                          return findSegment(segmentTree, filters.segment);
                        })()
                      : "Select Segment"}
                  </span>
                  <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                      openSegmentTree.root ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {openSegmentTree.root && (
                  <div className="absolute z-20 left-0 mt-2 w-full border border-[#E6E6E6] rounded-lg bg-white shadow-lg max-h-72 overflow-y-auto">
                    {segmentTree.map((cat, i) => (
                      <div key={cat.companyCategoryValue}>
                        <div
                          className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenSegmentTree((prev) => ({
                              ...prev,
                              [cat.companyCategoryValue]:
                                !prev[cat.companyCategoryValue],
                            }));
                          }}
                        >
                          {(cat.subCategoryList.length > 0 ||
                            cat.subSubCategoryList.length > 0) && (
                            <span className="text-lg select-none">
                              {openSegmentTree[cat.companyCategoryValue]
                                ? "▾"
                                : "▸"}
                            </span>
                          )}
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleInputChange(
                                "segment",
                                cat.companyCategoryValue
                              );
                              setOpenSegmentTree({});
                            }}
                            className="flex-1"
                          >
                            {cat.companyCategoryName}
                          </span>
                        </div>
                        {/* Subcategories */}
                        {cat.subCategoryList.length > 0 &&
                          openSegmentTree[cat.companyCategoryValue] && (
                            <div className="pl-6">
                              {cat.subCategoryList.map((sub) => (
                                <div
                                  key={sub.value}
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleInputChange("segment", sub.value);
                                    setOpenSegmentTree({});
                                  }}
                                >
                                  <span className="flex-1">{sub.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        {/* SubSubCategories */}
                        {cat.subSubCategoryList.length > 0 &&
                          openSegmentTree[cat.companyCategoryValue] && (
                            <div className="pl-6">
                              {cat.subSubCategoryList.map((subsub) => (
                                <div
                                  key={subsub.value}
                                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleInputChange("segment", subsub.value);
                                    setOpenSegmentTree({});
                                  }}
                                >
                                  <span className="flex-1">{subsub.name}</span>
                                </div>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {/* Merchant Dropdown: Affiliate tree if Affiliate, Aggregator, DSA, LAMF; Checkout tree if Checkout and segment selected; else normal */}
            {isAffiliate || isAggregator || isDSA || isLAMF ? (
              // ...existing code for Affiliate tree dropdown...
              <div className="flex flex-row items-center w-full gap-4">
                <div className="min-w-[350px] max-w-[400px] w-full relative">
                  {/* Custom Select Merchant Trigger */}
                  <div
                    className="h-12 border border-[#E6E6E6] rounded-lg flex items-center px-4 cursor-pointer bg-white select-none"
                    onClick={() => setMerchantDropdownOpen((open) => !open)}
                  >
                    <span className="text-base text-[#999] flex-1">
                      {filters.merchant
                        ? (() => {
                            // Find selected merchant name
                            const findMerchant = (list, id) => {
                              for (const m of list) {
                                if (m.merchantId === id)
                                  return (
                                    m.merchantName +
                                    (m.merchantId !== 0
                                      ? ` (${m.merchantId})`
                                      : "")
                                  );
                                if (m.subMerchants) {
                                  const found = findMerchant(
                                    m.subMerchants,
                                    id
                                  );
                                  if (found) return found;
                                }
                              }
                              return "";
                            };
                            return findMerchant(
                              affiliateMerchantData,
                              filters.merchant
                            );
                          })()
                        : "Select Merchant"}
                    </span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform ${
                        merchantDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {/* Dropdown Content */}
                  {merchantDropdownOpen && (
                    <div className="absolute z-20 left-0 mt-2 w-full border border-[#E6E6E6] rounded-lg bg-white shadow-lg">
                      <div className="p-2 border-b border-[#E6E6E6]">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={merchantSearch}
                          onChange={(e) => setMerchantSearch(e.target.value)}
                          className="w-full px-2 py-1 border border-[#E6E6E6] rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-2">
                        {filterMerchants(affiliateMerchantData).map(
                          (merchant) => (
                            <div key={merchant.merchantId}>
                              <div className="flex items-center gap-2">
                                {merchant.subMerchants && (
                                  <button
                                    type="button"
                                    className="text-lg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenTree((prev) => ({
                                        ...prev,
                                        [merchant.merchantId]:
                                          !prev[merchant.merchantId],
                                      }));
                                    }}
                                  >
                                    {openTree[merchant.merchantId] ? "▾" : "▸"}
                                  </button>
                                )}
                                <input
                                  type="checkbox"
                                  checked={
                                    filters.merchant === merchant.merchantId
                                  }
                                  onChange={() => {
                                    handleInputChange(
                                      "merchant",
                                      merchant.merchantId
                                    );
                                    setMerchantDropdownOpen(false);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <span>
                                  {merchant.merchantName}{" "}
                                  {merchant.merchantId !== 0 &&
                                    `(${merchant.merchantId})`}
                                </span>
                              </div>
                              {merchant.subMerchants &&
                                openTree[merchant.merchantId] && (
                                  <div className="pl-6">
                                    {merchant.subMerchants.map((sub) => (
                                      <div
                                        key={sub.merchantId}
                                        className="flex items-center gap-2 mt-1"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={
                                            filters.merchant === sub.merchantId
                                          }
                                          onChange={() => {
                                            handleInputChange(
                                              "merchant",
                                              sub.merchantId
                                            );
                                            setMerchantDropdownOpen(false);
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <span>
                                          {sub.merchantName} ({sub.merchantId})
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : isCheckout && filters.segment ? (
              // Checkout tree-structured merchant dropdown
              <div className="flex flex-row items-center w-full gap-4">
                <div className="min-w-[350px] max-w-[400px] w-full relative">
                  {/* Custom Select Merchant Trigger for Checkout */}
                  <div
                    className="h-12 border border-[#E6E6E6] rounded-lg flex items-center px-4 cursor-pointer bg-white select-none"
                    onClick={() =>
                      setCheckoutMerchantDropdownOpen((open) => !open)
                    }
                  >
                    <span className="text-base text-[#999] flex-1">
                      {filters.merchant
                        ? (() => {
                            // Find selected merchant name in checkoutMerchantData
                            const findMerchant = (list, id) => {
                              for (const m of list) {
                                if (m.merchantId === id)
                                  return (
                                    m.merchantName +
                                    (m.merchantId !== 0
                                      ? ` (${m.merchantId})`
                                      : "")
                                  );
                                if (m.subMerchants) {
                                  const found = findMerchant(
                                    m.subMerchants,
                                    id
                                  );
                                  if (found) return found;
                                }
                              }
                              return "";
                            };
                            return findMerchant(
                              checkoutMerchantData,
                              filters.merchant
                            );
                          })()
                        : "Select Merchant"}
                    </span>
                    <svg
                      className={`w-4 h-4 ml-2 transition-transform ${
                        checkoutMerchantDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                  {/* Dropdown Content */}
                  {checkoutMerchantDropdownOpen && (
                    <div className="absolute z-20 left-0 mt-2 w-full border border-[#E6E6E6] rounded-lg bg-white shadow-lg">
                      <div className="p-2 border-b border-[#E6E6E6]">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={checkoutMerchantSearch}
                          onChange={(e) =>
                            setCheckoutMerchantSearch(e.target.value)
                          }
                          className="w-full px-2 py-1 border border-[#E6E6E6] rounded"
                          onClick={(e) => e.stopPropagation()}
                        />
                      </div>
                      <div className="max-h-60 overflow-y-auto p-2">
                        {filterCheckoutMerchants(checkoutMerchantData).map(
                          (merchant) => (
                            <div key={merchant.merchantId}>
                              <div className="flex items-center gap-2">
                                {merchant.subMerchants && (
                                  <button
                                    type="button"
                                    className="text-lg"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setOpenCheckoutTree((prev) => ({
                                        ...prev,
                                        [merchant.merchantId]:
                                          !prev[merchant.merchantId],
                                      }));
                                    }}
                                  >
                                    {openCheckoutTree[merchant.merchantId]
                                      ? "▾"
                                      : "▸"}
                                  </button>
                                )}
                                <input
                                  type="checkbox"
                                  checked={
                                    filters.merchant === merchant.merchantId
                                  }
                                  onChange={() => {
                                    handleInputChange(
                                      "merchant",
                                      merchant.merchantId
                                    );
                                    setCheckoutMerchantDropdownOpen(false);
                                  }}
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <span>
                                  {merchant.merchantName}{" "}
                                  {merchant.merchantId !== 0 &&
                                    `(${merchant.merchantId})`}
                                </span>
                              </div>
                              {merchant.subMerchants &&
                                openCheckoutTree[merchant.merchantId] && (
                                  <div className="pl-6">
                                    {merchant.subMerchants.map((sub) => (
                                      <div
                                        key={sub.merchantId}
                                        className="flex items-center gap-2 mt-1"
                                      >
                                        <input
                                          type="checkbox"
                                          checked={
                                            filters.merchant === sub.merchantId
                                          }
                                          onChange={() => {
                                            handleInputChange(
                                              "merchant",
                                              sub.merchantId
                                            );
                                            setCheckoutMerchantDropdownOpen(
                                              false
                                            );
                                          }}
                                          onClick={(e) => e.stopPropagation()}
                                        />
                                        <span>
                                          {sub.merchantName} ({sub.merchantId})
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="w-[300px]">
                <Select
                  value={filters.merchant}
                  onValueChange={(value) =>
                    handleInputChange("merchant", value)
                  }
                >
                  <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-base">
                    <SelectValue placeholder="Select Merchant" />
                  </SelectTrigger>
                  <SelectContent>
                    {merchantOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Action Buttons */}
            <div className="flex gap-4 ml-auto">
              <Button
                onClick={handleSearch}
                className="h-12 bg-[#079F9F] hover:bg-[#079F9F]/90 text-white px-6 rounded-lg flex items-center gap-2"
              >
                <Search className="h-6 w-6" />
                <span className="font-semibold text-base">Search</span>
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="h-12 border-[#079F9F] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#079F9F] px-6 rounded-lg flex items-center gap-2"
              >
                <RotateCcw className="h-8 w-8" />
                <span className="font-semibold text-base">Reset</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="space-y-4">
          {/* Mobile Search - Full width */}
          <div className="w-full">
            <div className="relative border-[1.5px] border-[#079F9F] rounded-lg bg-white h-12 flex">
              <div className="flex items-center px-3 min-w-[110px] border-r border-[#079F9F]">
                <Select
                  value={filters.searchType}
                  onValueChange={handleSearchTypeChange}
                >
                  <SelectTrigger className="border-0 p-0 h-auto bg-transparent focus:ring-0 shadow-none w-full">
                    <div className="flex items-center justify-between w-full text-[#434343] text-sm font-medium whitespace-nowrap">
                      <span>{currentConfig.label}</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {searchTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder={currentConfig.placeholder}
                value={filters.query}
                onChange={(e) => handleInputChange("query", e.target.value)}
                className="border-0 focus:ring-0 shadow-none placeholder:text-[#999] text-sm h-full rounded-l-none pl-4"
              />
            </div>
          </div>

          {/* Mobile Date Range - Two separate rows */}
          <div className="w-full space-y-3">
            {/* To Date */}
            <div className="relative border border-[#E6E6E6] rounded-lg bg-white h-10 flex items-center px-4">
              <span className="text-[#999] text-sm mr-3 whitespace-nowrap">
                To
              </span>
              <Input
                type="date"
                value={filters.dateTo}
                onChange={(e) => handleInputChange("dateTo", e.target.value)}
                className="border-0 focus:ring-0 shadow-none text-[#434343] text-sm h-auto p-0 flex-1"
                placeholder="dd/mm/yyyy"
              />
            </div>

            {/* From Date */}
            <div className="relative border border-[#E6E6E6] rounded-lg bg-white h-10 flex items-center px-4">
              <span className="text-[#999] text-sm mr-3 whitespace-nowrap">
                From:
              </span>
              <Input
                type="date"
                value={filters.dateFrom}
                onChange={(e) => handleInputChange("dateFrom", e.target.value)}
                className="border-0 focus:ring-0 shadow-none text-[#434343] text-sm h-auto p-0 flex-1"
                placeholder="dd/mm/yyyy"
              />
            </div>
          </div>

          {/* Mobile Dropdowns - Single column layout */}
          <div className="space-y-3">
            <Select
              value={filters.channel}
              onValueChange={(value) => handleInputChange("channel", value)}
            >
              <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-sm">
                <SelectValue placeholder="Select Channel" />
              </SelectTrigger>
              <SelectContent>
                {channelOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.merchant}
              onValueChange={(value) => handleInputChange("merchant", value)}
            >
              <SelectTrigger className="h-12 border-[#E6E6E6] focus:ring-[#079F9F] text-sm">
                <SelectValue placeholder="Select Merchant" />
              </SelectTrigger>
              <SelectContent>
                {merchantOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mobile Action Buttons - Full width */}
          <div className="flex gap-3">
            <Button
              onClick={handleSearch}
              className="flex-1 h-12 bg-[#079F9F] hover:bg-[#079F9F]/90 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <Search className="h-5 w-5" />
              <span className="font-semibold text-base">Search</span>
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 h-12 border-[#079F9F] hover:border-[#079F9F] focus:ring-[#079F9F] text-[#079F9F] rounded-lg flex items-center justify-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              <span className="font-semibold text-base">Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ManageLeadsFilters };

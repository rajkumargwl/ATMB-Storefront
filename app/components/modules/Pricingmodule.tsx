import React, { useState } from 'react';

const PricingComponent = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [billingCycle, setBillingCycle] = useState(0);

  if (!data) {
    return <div className="text-center p-8">Loading pricing data...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{data.label}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{data.title}</p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-lg p-1 inline-flex">
          {data.billingOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                billingCycle === index
                  ? 'bg-white text-gray-800 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              } transition-colors duration-200`}
              onClick={() => setBillingCycle(index)}
            >
              {option.label}
              {option.discountText && (
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                  {option.discountText}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-gray-200 mb-10">
        {data.tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-4 py-2 text-base font-medium ${
              activeTab === index
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            } transition-colors duration-200`}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.plans.map((plan, index) => (
          <div
            key={index}
            className={`bg-white rounded-xl shadow-lg overflow-hidden ${
              plan.highlight ? 'border-2 border-blue-500 transform scale-105' : 'border border-gray-200'
            } transition-all duration-200`}
          >
            {plan.highlight && (
              <div className="bg-blue-500 text-white text-center py-2">
                <span className="text-sm font-semibold">{plan.highlight}</span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">{plan.title}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              
              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">{plan.frequency}</span>
                <p className="text-sm text-gray-500 mt-1">Starting from:</p>
              </div>
              
              <ul className="mb-6 space-y-2">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200">
                {plan.ctaText || 'Buy Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingComponent;


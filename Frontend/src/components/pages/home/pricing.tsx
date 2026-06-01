import React from 'react';
import PriceCard from '../../pricingCards/priceCard';
import FeatureCard from '../../pricingCards/featureCard';

function Pricing() {
  return (
    <div id="pricing" className="w-full bg-white py-24 px-4 md:px-8 overflow-hidden">
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-[#051426] text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-16 tracking-wide header">
          PRICING PROTOCOLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left Column */}
          <div className="flex flex-col gap-8 items-start">
            <PriceCard 
              title="CORE"
              price="$0"
              period="FIXED"
              subtitle="STANDARD ACCESS"
              buttonVariant="outline"
            />
            <FeatureCard 
              label="ENTERPRISE"
              title="ENTERPRISE"
              subtitle="API ACCESS & MULTI-SITE"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-8 items-start">
            <PriceCard 
              title="PRO"
              price="$40"
              period="FLEET"
              subtitle="UNLIMITED ACCESS"
              buttonVariant="primary"
              isRecommended={true}
            />
            <FeatureCard 
              label="CUSTOMIZED"
              title="CUSTOM"
              subtitle="API ACCESS & MULTI-SITE"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Pricing;


import PriceCard from "../../pricingCards/priceCard";
import FeatureCard from "../../pricingCards/featureCard";
import { useTranslation } from "../../../localization/i18n";

function Pricing() {
  const { t } = useTranslation("home");

  return (
    <div
      id="pricing"
      className="w-full bg-white py-24 px-4 md:px-6 lg:px-8 overflow-hidden"
    >
      <div className="container mx-auto max-w-[900px]">
        <h2 className="text-[#051426] text-3xl md:text-4xl lg:text-5xl font-black uppercase mb-16 tracking-wide header rtl:text-right">
          {t("pricing.title")}
        </h2>

        <div className="flex flex-col gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="flex justify-between flex-col sm:flex-row gap-8 items-start">
            <PriceCard
              title={t("pricing.core")}
              price="$0"
              period={t("pricing.fixed")}
              subtitle={t("pricing.standardAccess")}
              buttonVariant="outline"
            />
            <PriceCard
              title={t("pricing.pro")}
              price="$40"
              period={t("pricing.fleet")}
              subtitle={t("pricing.unlimitedAccess")}
              buttonVariant="primary"
              isRecommended={true}
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <FeatureCard
              label={t("pricing.enterprise")}
              title={t("pricing.enterprise")}
              subtitle={t("pricing.apiAccess")}
            />

            <FeatureCard
              label={t("pricing.customized")}
              title={t("pricing.custom")}
              subtitle={t("pricing.apiAccess")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;

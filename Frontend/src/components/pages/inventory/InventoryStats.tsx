import StatsCard from "../../StatsCard/StatsCard";
import arrowInventoryIcon from '../../../assets/icons/arrow inventory.svg';
import moneyInventoryIcon from '../../../assets/icons/money inventory.svg';
import { useTranslation } from "../../../localization/i18n";

interface InventoryStatsProps {
  totalValue: number;
  totalWarehousesCount: number;
  totalStoresCount: number;
  userRole: string | null;
  selectedLocationName?: string;
  totalItemsCount?: number;
}

export default function InventoryStats({
  totalValue,
  totalWarehousesCount,
  totalStoresCount,
  userRole,
  selectedLocationName,
  totalItemsCount = 0,
}: InventoryStatsProps) {
  const isOwner = userRole === 'Owner';
  const { t } = useTranslation("inventory");

  return (
    <div className="flex flex-col gap-4 mb-8">
      <StatsCard
        title={t("stats.totalValue")}
        value={`${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EGP`}
        subtext={
          <span className="flex items-center justify-center md:justify-start gap-1.5">
            <img src={arrowInventoryIcon} alt="Arrow Up" className="w-3 h-2" />
            <span>{t("stats.vsLastQuarter")}</span>
          </span>
        }
        variant="dark"
        icon={<img src={moneyInventoryIcon} alt="Money Icon" className="w-8 h-8" />}
      />
      {isOwner ? (
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title={t("stats.totalWarehouses")}
            value={totalWarehousesCount.toString()}
            subtext={`${t("stats.remaining")} 1`}
            variant="light"
          />
          <StatsCard
            title={t("stats.totalStores")}
            value={totalStoresCount.toString()}
            subtext={`${t("stats.remaining")} 2`}
            variant="light"
          />
        </div>
      ) : (
        <StatsCard
          title={t("stats.activeStoreDetails")}
          value={selectedLocationName || t("stats.noStoreSelected")}
          subtext={`${t("stats.totalItemsInStore")}: ${totalItemsCount} | ${t("stats.totalStoresAvailable")}: ${totalStoresCount}`}
          variant="light"
        />
      )}
    </div>
  );
}

import InventoryRow from "../../InventoryRow/InventoryRow";
import { type InventoryItem } from "../../../interfaces/InventoryTypes/inventory";
import { useTranslation } from "../../../localization/i18n";

interface InventoryTableProps {
  filteredItems: InventoryItem[];
  inventoryItemsCount: number;
  inventoryStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  inventoryError: string | null;
  onClearSearch: () => void;
}

export default function InventoryTable({
  filteredItems,
  inventoryItemsCount,
  inventoryStatus,
  inventoryError,
  onClearSearch,
}: InventoryTableProps) {
  const { t } = useTranslation("inventory");

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="regular text-[11px] md:text-[12px] tracking-widest text-neutral-500 uppercase font-bold">
          {filteredItems.length} {t("of", "common")} {inventoryItemsCount} {t("items", "common")}
        </span>
        <button 
          onClick={onClearSearch}
          className="regular text-[11px] md:text-[12px] tracking-widest text-neutral-900 font-bold uppercase cursor-pointer hover:text-primary-500 transition-colors flex items-center gap-1"
        >
          {t("seeAll", "common")}
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
          </svg>
        </button>
      </div>

      <div className="flex flex-col">
        <div className="grid grid-cols-[1.5fr_1fr_1fr] pb-3 border-b-2 border-neutral-300">
          <div className="text-left rtl:text-right">
            <span className="regular text-[14px] tracking-widest uppercase">{t("table.item")}</span>
          </div>
          <div className="text-center md:text-right rtl:md:text-left">
            <span className="regular text-[14px] tracking-widest text-tertiary-500 uppercase">{t("table.quantity")}</span>
          </div>
          <div className="text-right rtl:text-left">
            <span className="regular text-[14px] tracking-widest text-tertiary-500 uppercase">{t("table.price")}</span>
          </div>
        </div>

        {inventoryStatus === 'loading' && (
          <div className="text-center py-8 text-neutral-500 uppercase font-bold tracking-widest animate-pulse">
            {t("table.loading")}
          </div>
        )}

        {inventoryStatus === 'failed' && (
          <div className="text-center py-8 text-red-500 uppercase font-bold tracking-widest">
            {t("error", "common")}: {inventoryError || t("table.error")}
          </div>
        )}

        {inventoryStatus === 'succeeded' && filteredItems.length === 0 && (
          <div className="text-center py-8 text-neutral-500 uppercase font-bold tracking-widest">
            {t("table.noItems")}
          </div>
        )}

        {inventoryStatus === 'succeeded' && filteredItems.length > 0 && filteredItems.map((item) => (
          <InventoryRow key={`${item._id}`} item={item} />
        ))}
      </div>
    </>
  );
}

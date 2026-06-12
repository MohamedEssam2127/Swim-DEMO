import boltIcon from "../../assets/icons/bolt-icon.svg";
import { useState, useEffect } from "react";
import apiClient from "../../core/apiClient";
import { showSuccessToast, showErrorToast } from "../../utils/toast";
import { useTranslation } from "../../localization/i18n";

interface props {
  isOpen: boolean;
  onClose: () => void;
  locationId: string;
}

function AddNewItemPopup({ isOpen, onClose, locationId }: props) {
  const { t } = useTranslation("inventory");

  const [itemName, setItemName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("10");

  useEffect(() => {
    if (isOpen) {
      setItemName("");
      setCategory("");
      setDescription("");
      setQuantity("");
      setPrice("10");
    }
  }, [isOpen]);

  const addNewItem = async () => {
    try {
      const itemData = {
        name: itemName,
        category: category || "ALPHA-01 (COLD)",
        description,
        price: Number(price),
      };

      const itemResponse = await apiClient.post("/item", itemData);
      
      await apiClient.post(`/inventory/${locationId}`, {
        itemId: itemResponse.data.data._id,
        quantity: Number(quantity),
      });
      showSuccessToast(t("popups.addNewItem.successToast"));
      onClose();
    } catch (error: any) {
      console.log("STATUS:", error.response?.status);
      console.log("DATA:", error.response?.data);
      console.log("FULL ERROR:", error);
      const errorMsg = error.response?.data?.message || "An error occurred while adding the item.";
      showErrorToast(errorMsg);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-900/60 backdrop-blur-sm" onClick={onClose}>
        <div className="relative w-[90%] sm:w-[420px] max-w-[420px] bg-primary-900 border border-primary-800 border-l-[4px] border-l-secondary-500 shadow-2xl max-h-[90vh] overflow-y-auto no-scrollbar" onClick={(e) => e.stopPropagation()}>
          {/* Watermarks */}
          <div className="absolute top-10 -left-4 text-[200px] font-bold text-white/[0.03] leading-none select-none pointer-events-none z-0 header">
            S
          </div>
          <div className="absolute top-10 -right-4 text-[200px] font-bold text-white/[0.03] leading-none select-none pointer-events-none z-0 header">
            W
          </div>
          <div className="absolute bottom-10 -left-4 text-[200px] font-bold text-white/[0.03] leading-none select-none pointer-events-none z-0 header">
            I
          </div>
          <div className="absolute bottom-10 -right-4 text-[200px] font-bold text-white/[0.03] leading-none select-none pointer-events-none z-0 header">
            M
          </div>

          <div className="relative z-10">
            <div className="flex h-[60px] items-center justify-between border-b border-primary-800 px-6 text-[14px] tracking-[1.5px] regular text-white">
              <span className="font-semibold uppercase flex items-center gap-3">
                <span className="text-[16px] leading-none flex items-center justify-center bg-white text-primary-900 w-5 h-5 rounded-[2px] font-bold">+</span> {t("popups.addNewItem.title")}
              </span>
              <button onClick={onClose} className="text-Accents-red hover:text-red-400 transition-colors cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            </div>
            
            <div className="flex flex-col gap-5 p-6">
              <div className="flex flex-col gap-2 relative z-10">
                <label className="regular text-[10px] text-primary-200 uppercase tracking-[0.2em] rtl:text-right">
                  {t("popups.addNewItem.skuIdentifier")}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    onChange={(e) => setItemName(e.target.value)}
                    value={itemName}
                    placeholder={t("popups.addNewItem.skuPlaceholder")}
                    className="regular w-full bg-[#131C2A] border border-white/20 rounded-[4px] p-4 text-white placeholder-neutral-400 focus:outline-none focus:border-white/40 transition-colors text-sm uppercase"
                  />
                  <div className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 flex gap-[2px] opacity-50">
                    <div className="w-[2px] h-4 bg-white"></div>
                    <div className="w-[4px] h-4 bg-white"></div>
                    <div className="w-[1px] h-4 bg-white"></div>
                    <div className="w-[3px] h-4 bg-white"></div>
                    <div className="w-[2px] h-4 bg-white"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <label className="regular text-[10px] text-primary-200 uppercase tracking-[0.2em] rtl:text-right">
                  {t("popups.addNewItem.storageZone")}
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="regular w-full bg-[#131C2A] border border-white/20 rounded-[4px] p-4 text-white focus:outline-none focus:border-white/40 transition-colors appearance-none text-sm uppercase rtl:text-right"
                  >
                    <option value="" disabled hidden>{t("popups.addNewItem.zoneCold")}</option>
                    <option value="ALPHA-01 (COLD)" className="bg-primary-900">{t("popups.addNewItem.zoneCold")}</option>
                    <option value="BETA-02 (DRY)" className="bg-primary-900">{t("popups.addNewItem.zoneDry")}</option>
                    <option value="GAMMA-03 (HAZMAT)" className="bg-primary-900">{t("popups.addNewItem.zoneHazmat")}</option>
                  </select>
                  <div className="absolute right-4 rtl:right-auto rtl:left-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary-400">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <label className="regular text-[10px] text-primary-200 uppercase tracking-[0.2em] rtl:text-right">
                  {t("popups.addNewItem.description")}
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="regular w-full bg-[#131C2A] border border-white/20 rounded-[4px] p-4 text-white placeholder-neutral-400 focus:outline-none focus:border-white/40 transition-colors resize-none h-24 text-sm"
                  placeholder={t("popups.addNewItem.descriptionPlaceholder")}
                ></textarea>
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <label className="regular text-[10px] text-primary-200 uppercase tracking-[0.2em] rtl:text-right">
                  {t("popups.addNewItem.quantity")}
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  className="regular w-full bg-[#131C2A] border border-white/20 rounded-[4px] p-4 text-white placeholder-neutral-400 focus:outline-none focus:border-white/40 transition-colors text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <label className="regular text-[10px] text-primary-200 uppercase tracking-[0.2em] rtl:text-right">
                  {t("popups.addNewItem.price")}
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="10.00"
                  className="regular w-full bg-[#131C2A] border border-white/20 rounded-[4px] p-4 text-white placeholder-neutral-400 focus:outline-none focus:border-white/40 transition-colors text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 relative z-10">
                <label className="regular text-[10px] text-primary-200 uppercase tracking-[0.2em] rtl:text-right">
                  {t("popups.addNewItem.trackingProtocol")}
                </label>
                <div className="flex gap-3">
                  <button className="flex-1 bg-primary-400 text-white py-3 flex items-center justify-center gap-2 border border-primary-400 text-xs tracking-widest font-bold hover:bg-primary-500 transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16v16H4z"/><path d="M4 12h16"/><path d="M12 4v16"/></svg> {t("popups.addNewItem.rfid")}
                  </button>
                  <button className="flex-1 bg-transparent text-primary-300 py-3 flex items-center justify-center gap-2 border border-primary-800 text-xs tracking-widest hover:border-primary-600 transition-colors font-bold hover:text-primary-200">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2"/><path d="M6 14h12v8H6z"/></svg> {t("popups.addNewItem.printTag")}
                  </button>
                </div>
              </div>

              <button
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white py-4 mt-2 flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-[0.2em] transition-colors relative z-10"
                onClick={addNewItem}
              >
                <img src={boltIcon} alt="bolt" className="w-4 h-4 filter brightness-0 invert" />
                {t("popups.addNewItem.initializeEntry")}
              </button>
            </div>
            <div className="pb-6 text-center">
              <span className="regular text-[10px] text-primary-400 uppercase tracking-[0.2em]">
                {t("popups.addNewItem.systemLogIdle")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewItemPopup;

import { useNavigate } from "react-router-dom";
import Button from "../button/button";
import cancelIcon from "../../assets/icons/cancel-02.svg";
import printerIcon from "../../assets/icons/printer-icon.svg";
import stockIcon from "../../assets/icons/stock-icon.svg";
import { useTranslation } from "../../localization/i18n";

interface props {
  isOpen: boolean;
  onClose: () => void;
  idPrefix: string;
  idNum: string;
  customerName: string;
  itemCount: number;
  totalAmount: number; // value in DOLLARS, not cents
  orderId?: string;       // full MongoDB _id of the order
  transactionId?: string; // full MongoDB _id of the confirmed transaction
}

function OrderConfirmationPopup({
  isOpen,
  onClose,
  idPrefix,
  idNum,
  customerName,
  itemCount,
  totalAmount,
  orderId,
  transactionId,
}: props) {
  const navigate = useNavigate();
  const { t, language } = useTranslation("inventory");

  if (!isOpen) return null;

  const handlePrintReceipt = () => {
    const params = new URLSearchParams();
    if (orderId) params.set("orderId", orderId);
    if (transactionId) params.set("transactionId", transactionId);
    navigate(`/reciept?${params.toString()}`);
    onClose();
  };

  return (
    <>
      <div className="fixed inset-0 z-9999 flex items-center justify-center bg-neutral-900/40">
        <div className="w-140 bg-neutral-900 shadow-2xl rounded-t-[30px] max-h-[80vh] overflow-y-auto">
          <div className="flex h-[52px] items-center justify-between bg-light-800 px-[18px] text-[14px] tracking-[1.5px] regular text-light-100 rounded-t-[30px]">
            <span className="font-semibold uppercase">{t("popups.orderConfirmation.title")}</span>
            <Button
              variant="outline"
              className="border-none"
              icon={cancelIcon}
              onClick={onClose}
            >
              {""}
            </Button>
          </div>
          <div className="flex flex-col gap-[18px] p-[36px]">
            <label className="regular text-xs text-light-100 uppercase tracking-widest rtl:text-right">
              {t("popups.orderConfirmation.orderId")}
            </label>
            <label className="regular text-xs text-light-100 uppercase tracking-widest rtl:text-right">
              {idPrefix}-{idNum}
            </label>
            <Button icon={printerIcon} onClick={handlePrintReceipt}>
              {t("popups.orderConfirmation.printReceipt")}
            </Button>
            <Button variant="outline" onClick={() => { navigate('/history'); onClose(); }} className="text-white">
              {t("popups.orderConfirmation.returnToHistory")}
            </Button>
            <div className="bg-black w-auto rounded-md px-4 py-2">
              <div className="flex justify-between items-center">
                <label className="uppercase regular text-sm text-white">
                  {t("popups.orderConfirmation.summaryDetails")}
                </label>
                <img src={stockIcon} alt="stock icon"></img>
              </div>
              <div className="w-full border my-2 border-light-100"></div>
              <label className="uppercase regular text-sm text-white flex rtl:justify-end">
                {t("popups.orderConfirmation.customerName")}
              </label>
              <label className="text-white flex mb-5 rtl:justify-end">{customerName}</label>
              <label className="uppercase text-white text-sm flex rtl:justify-end">{t("popups.orderConfirmation.itemCount")}</label>
              <label className="text-white flex mb-5 rtl:justify-end">{itemCount}</label>
              <div className="w-full mb-5 bg-blue-900 p-2">
                <label className="text-white uppercase regular text-sm flex rtl:justify-end">
                  {t("popups.orderConfirmation.totalAmount")}
                </label>
                <label className="flex text-white text-lg mt-1 rtl:justify-end">
                  {totalAmount.toLocaleString(language === "ar" ? "ar-EG" : "en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirmationPopup;

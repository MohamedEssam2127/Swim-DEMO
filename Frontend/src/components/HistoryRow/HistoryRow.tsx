import { useNavigate } from 'react-router-dom';
import { gridClass } from '../types';
import StatusBadge from '../StatusBadge/StatusBadge';
import ActionButton from '../ActionButton/ActionButton';
import type { FetchedOrder, FetchedOrderItem } from '../../interfaces/historyTypes/history';
import { useTranslation } from '../../localization/i18n';

function HistoryRow({ order, isOwner, gridLayoutClass }: { order: FetchedOrder; isOwner?: boolean; gridLayoutClass?: string }) {
  const navigate = useNavigate();
  const { t, language } = useTranslation("history");
  const idToUse = order._id || '';
  const parts = idToUse.includes('-') ? idToUse.split('-') : ['ORD', idToUse.substring(Math.max(0, idToUse.length - 6)).toUpperCase()];
  const prefix = parts[0];
  const num = parts[1];

  const totalQty = order.items?.reduce((sum, item: FetchedOrderItem) => sum + (item.quantity || 1), 0) || 0;
  
  // Use backend status directly, fallback to PENDING
  const status = (order.status ? order.status.toUpperCase() : 'PENDING') as any;
  
  return (
    <div className={`${gridLayoutClass || gridClass} py-5 border-b border-neutral-200 items-center`}>

      {isOwner && (
        <div className="flex justify-center text-center">
          <span className="header text-[12px] font-bold text-primary-700 tracking-wide uppercase max-w-[120px] truncate">
            {order.storeId?.name || t("unknownStore")}
          </span>
        </div>
      )}

      <div className="flex flex-row md:flex-col items-center justify-center">
        <span className="regular text-[11px] text-neutral-700 leading-snug">
          {prefix}<span className="hidden md:inline">-</span>
        </span>
        <span className="regular text-[11px] text-neutral-700 leading-snug md:hidden">-</span>
        <span className="regular text-[11px] text-neutral-700 leading-snug">{num}</span>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5 text-center">
        <span className="header text-[12px] font-bold text-neutral-900 tracking-wide">
          {order.createdAt ? new Date(order.createdAt).toLocaleDateString(language === 'ar' ? 'ar-EG' : undefined) : 'N/A'}
        </span>
        <span className="regular text-[10px] text-neutral-500 tracking-widest">
          {order.createdAt ? new Date(order.createdAt).toLocaleTimeString(language === 'ar' ? 'ar-EG' : [], { hour: '2-digit', minute: '2-digit' }) : ''}
        </span>
      </div>

      <div className="flex flex-row md:flex-col items-center justify-center gap-1 md:gap-0.5 text-center">
        <span className="header text-[13px] font-bold text-neutral-900">{totalQty}</span>
        <span className="regular text-[10px] text-neutral-500 tracking-widest">
          {totalQty > 1 ? t("alert.units", "inventory") : t("alert.unit", "inventory")}
        </span>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5 text-center">
        <span className="header text-[12px] font-bold text-neutral-900 tracking-wide">
          {order.customerId?.name || t("unknownCustomer")}
        </span>
        <span className="regular text-[10px] text-neutral-500">
          {order.customerId?._id ? `${t("table.orderId")}: ${order.customerId._id.substring(Math.max(0, order.customerId._id.length - 6)).toUpperCase()}` : '—'}
        </span>
      </div>

      <div className="flex items-center justify-center">
        <StatusBadge status={status} />
      </div>

      <div className="flex items-center justify-end gap-2 pr-1">
        {status === 'PENDING' && (
          <ActionButton variant="secondary">{t("editOrder")}</ActionButton>
        )}
        <ActionButton variant="primary" onClick={() => navigate(`/reciept?orderId=${order._id}`)}>{t("createReceipt")}</ActionButton>
      </div>
    </div>
  );
}

export default HistoryRow;

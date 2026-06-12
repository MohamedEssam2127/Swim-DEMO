import { type Status } from '../types';
import { useTranslation } from '../../localization/i18n';

function StatusBadge({ status }: { status: Status }) {
  const { t } = useTranslation();
  const normalizedStatus = (status || 'PENDING').toUpperCase();

  const statusMap: Record<string, string> = {
    PENDING: t("statuses.pending"),
    COMPLETED: t("statuses.completed"),
    CONFIRMED: t("statuses.confirmed"),
  };

  const label = statusMap[normalizedStatus] || normalizedStatus;

  if (status === 'COMPLETED' || status === 'CONFIRMED') {
    return (
      <span className="regular text-[10px] tracking-widest bg-primary-500 text-white px-3 py-[6px] uppercase">
        {label}
      </span>
    );
  }
  return (
    <span className="regular text-[10px] tracking-widest border border-neutral-900 text-neutral-900 px-3 py-[6px] uppercase">
      {label}
    </span>
  );
}

export default StatusBadge;

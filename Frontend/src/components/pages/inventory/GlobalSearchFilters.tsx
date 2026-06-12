import SearchInput from "../../SearchInput/SearchInput";
import SortDropdown from "../../SortDropdown/SortDropdown";
import { useTranslation } from "../../../localization/i18n";

interface GlobalSearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

export default function GlobalSearchFilters({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
}: GlobalSearchFiltersProps) {
  const { t } = useTranslation("inventory");

  const sortOptionsMap: Record<string, string> = {
    "Sort By Quantity": t("search.sortByQuantity"),
    "Sort By Price": t("search.sortByPrice"),
    "Sort By Name": t("search.sortByName"),
    "Sort By ID": t("search.sortById"),
  };

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-6">
      <div className="flex-1">
        <SearchInput
          id="search-inventory"
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={t("search.placeholder")}
        />
      </div>
      <SortDropdown
        id="sort-inventory"
        value={sortOptionsMap[sortBy] || sortBy}
        onChange={(label) => {
          const key = Object.keys(sortOptionsMap).find(k => sortOptionsMap[k] === label) || "Sort By Quantity";
          setSortBy(key);
        }}
        options={Object.values(sortOptionsMap)}
      />
    </div>
  );
}

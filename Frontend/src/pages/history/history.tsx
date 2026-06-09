import { useEffect, useState } from "react";
import { gridClass } from "../../components/types";
import HistoryRow from "../../components/HistoryRow/HistoryRow";
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchInput from "../../components/SearchInput/SearchInput";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { fetchHistory, selectOrders, selectHistoryStatus, selectSelectedStoreId, setSelectedStoreId } from "../../store/slices/historySclice";
import type { FetchedOrder } from "../../interfaces/historyTypes/history";
import { fetchAllLocations, selectTotalStores } from "../../store/slices/InventorySclice";

function History() {
  const dispatch = useDispatch<AppDispatch>();
  const totalOrders = useSelector(selectOrders) as FetchedOrder[];
  const historyStatus = useSelector(selectHistoryStatus);
  const user = useSelector((state: RootState) => state.auth.user);
  const isOwner = user?.role === "Owner";

  const selectedStoreId = useSelector(selectSelectedStoreId);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const stores = useSelector(selectTotalStores);
  const gridLayoutClass = isOwner
    ? "grid grid-cols-[1.2fr_0.8fr_1.6fr_1fr_1.6fr_1fr_1.8fr]"
    : gridClass;

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Sort By Date");

  const filteredOrders = (totalOrders || [])
    .filter((order) => {
      const q = searchQuery.toLowerCase();
      const customerName = (order.customerId?.name || "").toLowerCase();
      const orderId = (order._id || "").toLowerCase();
      const dateStr = order.createdAt
        ? new Date(order.createdAt).toLocaleDateString().toLowerCase()
        : "";
      return (
        customerName.includes(q) || orderId.includes(q) || dateStr.includes(q)
      );
    })
    .sort((a, b) => {
      if (sortBy === "Sort By Customer Name") {
        const nameA = a.customerId?.name || "";
        const nameB = b.customerId?.name || "";
        return nameA.localeCompare(nameB);
      }
      if (sortBy === "Sort By Date") {
        const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return dateB - dateA; // newest first
      }
      if (sortBy === "Sort By Order ID") {
        const idA = a._id || "";
        const idB = b._id || "";
        return idA.localeCompare(idB);
      }
      return 0;
    });

  useEffect(() => {
    if (isOwner) {
      dispatch(fetchAllLocations());
    }
  }, [dispatch, isOwner]);

  useEffect(() => {
    dispatch(fetchHistory(selectedStoreId));
  }, [dispatch, selectedStoreId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".custom-dropdown-container")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 p-section-mobile md:p-section-desktop">
      <PageTitle title="History Management" />

      <div>
        <div className="regular text-[13px] md:text-[14px] text-center md:text-left text-tertiary-500 tracking-widest uppercase mb-6 leading-relaxed">
          <span className="block md:inline">Active Logistics Queue — </span>
          <span className="block md:inline">
            {filteredOrders.length} Items{" "}
          </span>
          <span className="block">Total</span>
        </div>

        {isOwner && (
          <div className="mb-6 custom-dropdown-container relative">
            <h2 className="header font-bold text-[14px] md:text-[18px] tracking-widest uppercase mb-3 text-left">
              Filter by Store
            </h2>
            <div className="relative w-full">
              <button
                id="history-store-filter-dropdown"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex justify-between items-center w-full header font-bold text-[14px] md:text-[18px] tracking-wide text-neutral-900 border border-neutral-300 bg-white px-6 py-3.5 cursor-pointer uppercase outline-none focus:border-neutral-500 hover:border-primary-500 transition-colors"
              >
                <span>
                  {selectedStoreId
                    ? stores.find((s) => s._id === selectedStoreId)?.name || "Unknown Store"
                    : "All Stores"}
                </span>
                <svg
                  className={`w-5 h-5 text-neutral-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute left-0 z-50 w-full mt-1 bg-white border border-neutral-300 shadow-xl overflow-hidden">
                  <div className="max-h-60 overflow-y-auto no-scrollbar">
                    <button
                      onClick={() => {
                        dispatch(setSelectedStoreId(""));
                        setIsDropdownOpen(false);
                      }}
                      className={`flex items-center justify-between w-full px-6 py-3 text-left header font-bold text-[12px] md:text-[16px] tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                        !selectedStoreId
                          ? 'bg-neutral-100 text-primary-700 font-extrabold'
                          : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'
                      }`}
                    >
                      <span>All Stores</span>
                      {!selectedStoreId && (
                        <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>

                    {stores.map((store) => {
                      const isSelected = store._id === selectedStoreId;
                      return (
                        <button
                          key={store._id}
                          onClick={() => {
                            dispatch(setSelectedStoreId(store._id));
                            setIsDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between w-full px-6 py-3 text-left header font-bold text-[12px] md:text-[16px] tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-100 text-primary-700 font-extrabold'
                              : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'
                          }`}
                        >
                          <span>{store.name}</span>
                          {isSelected && (
                            <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <SortDropdown
            id="sort-by"
            value={sortBy}
            onChange={setSortBy}
            options={[
              "Sort By Date",
              "Sort By Customer Name",
              "Sort By Order ID",
            ]}
          />

          <div className="flex-1">
            <SearchInput
              id="search-item"
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search With Customer Name, Date, or Order ID"
            />
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-212.5 md:min-w-full">
            <div className={`${gridLayoutClass} pb-3 border-b-2 border-neutral-300`}>
              {isOwner && (
                <div className="flex justify-center">
                  <span className="regular text-[14px] tracking-widest text-neutral-500 uppercase font-bold text-center">
                    Store
                  </span>
                </div>
              )}
              <div className="flex justify-center">
                <span className="regular text-[14px] tracking-widest text-neutral-500 uppercase font-bold text-center">
                  Order ID
                </span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[14px] tracking-widest text-neutral-500 uppercase font-bold">
                  Order Created When
                </span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[14px] tracking-widest text-neutral-500 uppercase font-bold">
                  Quantity
                </span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[14px] tracking-widest text-neutral-500 uppercase font-bold">
                  Customer
                </span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[14px] tracking-widest text-neutral-500 uppercase font-bold">
                  Status
                </span>
              </div>
              <div className="flex justify-end">
                <span className="regular text-[14px] tracking-widest text-neutral-500 uppercase font-bold pr-1">
                  Actions
                </span>
              </div>
            </div>

            {historyStatus === 'loading' && (
              <div className="text-center py-8 text-neutral-500 uppercase font-bold tracking-widest animate-pulse">
                Loading History...
              </div>
            )}

            {historyStatus === 'failed' && (
              <div className="text-center py-8 text-red-500 uppercase font-bold tracking-widest">
                Failed to fetch history.
              </div>
            )}

            {historyStatus === 'succeeded' && filteredOrders.length === 0 && (
              <div className="text-center py-8 text-neutral-500 uppercase font-bold tracking-widest">
                No history items found.
              </div>
            )}

            {historyStatus === 'succeeded' && filteredOrders.length > 0 && filteredOrders.map((order, index) => (
              <HistoryRow key={index} order={order} isOwner={isOwner} gridLayoutClass={gridLayoutClass} />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
          <span className="regular text-[11px] tracking-widest text-neutral-400 uppercase">
            {filteredOrders.length} of {totalOrders.length} Orders
          </span>
          <span className="regular text-[11px] tracking-widest text-neutral-900 font-bold uppercase cursor-pointer hover:text-primary-500 transition-colors">
            See More
          </span>
        </div>
      </div>
    </div>
  );
}

export default History;

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import apiClient from "../../core/apiClient";
import PageTitle from "../../components/PageTitle/PageTitle";
import SearchInput from "../../components/SearchInput/SearchInput";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import { type InventoryItem, type Location } from "../../interfaces/InventoryTypes/inventory";
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllLocations,
  selectTotalWarehouses,
  selectTotalStores,
  selectCurrentView,
  setCurrentView,
  selectInventoryItems,
  selectInventoryStatus,
  selectInventoryError,
  fetchInventoryForLocation
} from '../../store/slices/InventorySclice';
import InventoryStats from '../../components/pages/inventory/InventoryStats';
import InventoryTable from '../../components/pages/inventory/InventoryTable';
import type { AppDispatch, RootState } from '../../store';
import FloatingActionButton from '../../components/floatingActionButton/floatingActionButton';
import WarehouseOperationsPopup from '../../components/warehouseOperationsPopup/warehouseOperationsPopup';
import AddNewItemPopup from '../../components/addNewItemPopup/addNewItemPopup';
import ExportToStorePopup from '../../components/exportToStorePopup/exportToStorePopup';
import MoveBetweenWarehousesPopup from '../../components/moveBetweenWarehousesPopup/moveBetweenWarehousesPopup';

const getRoleFromToken = (token: string | null): string | null => {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const decoded = JSON.parse(jsonPayload);
    return decoded.role || null;
  } catch (error) {
    return null;
  }
};

function Inventory() {
  const dispatch = useDispatch<AppDispatch>();

  const token = useSelector((state: RootState) => state.auth.token);
  const userRole = getRoleFromToken(token);
  const isOwner = userRole === 'Owner';

  const [selectedLocationId, setSelectedLocationId] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Sort By Quantity');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentView = useSelector(selectCurrentView);

  const totalWarehouses = useSelector(selectTotalWarehouses);
  const totalStores = useSelector(selectTotalStores);
  const inventoryItems = useSelector(selectInventoryItems);
  const inventoryStatus = useSelector(selectInventoryStatus);
  const inventoryError = useSelector(selectInventoryError);

  const [isWarehousePopupOpen, setIsWarehousePopupOpen] = useState(false);
  const [isAddNewItemPopupOpen, setIsAddNewItemPopupOpen] = useState(false);
  const [isExportToStorePopupOpen, setIsExportToStorePopupOpen] = useState(false);
  const [isMoveBetweenWarehousesPopupOpen, setIsMoveBetweenWarehousesPopupOpen] = useState(false);
  
  const [otherLocationsInfo, setOtherLocationsInfo] = useState<{
    matchingItems: { _id: string; name: string; category: string }[];
    otherLocations: { itemId: string; itemName: string; location: Location; quantity: number }[];
  } | null>(null);
  const [isCheckingElsewhere, setIsCheckingElsewhere] = useState(false);
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  const activeList = currentView ? totalWarehouses : totalStores;

  const activeLocationId =
    selectedLocationId &&
    activeList.some((loc: Location) => loc._id === selectedLocationId)
      ? selectedLocationId
      : activeList[0]?._id || "";

  const selectedLocation = activeList.find(
    (loc: Location) => loc._id === activeLocationId,
  );

  const changeCurrentView = () => {
    dispatch(setCurrentView(!currentView));
  };

  const handleRequestStockForItem = (itemName: string) => {
    toast.success(
      `Stock transfer request simulated! Agent will handle the transfer request for "${itemName.toUpperCase()}" dynamically.`,
      {
        duration: 5000,
        icon: '🤖',
        style: {
          border: '2px solid #FF6B35',
          padding: '16px',
          color: '#FF6B35',
          backgroundColor: '#fffaf8',
          fontWeight: 'bold',
          textTransform: 'uppercase',
          fontSize: '14px',
          letterSpacing: '0.05em',
        },
      }
    );
    setSearchQuery("");
  };

  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch]);

  useEffect(() => {
    if (!isOwner && currentView) {
      dispatch(setCurrentView(false));
    }
  }, [isOwner, currentView, dispatch]);

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

  useEffect(() => {
    if (activeLocationId) {
      dispatch(fetchInventoryForLocation(activeLocationId));
    }
  }, [dispatch, activeLocationId]);


  const filteredItems = inventoryItems
    .filter((item: InventoryItem) => {
      if (!item.itemId) return false;
      const q = searchQuery.toLowerCase();
      return (
        item.itemId.name.toLowerCase().includes(q) ||
        item.itemId.category.toLowerCase().includes(q) ||
        (item.itemId._id || "").toLowerCase().includes(q)
      );
    })
    .sort((a: InventoryItem, b: InventoryItem) => {
      if (sortBy === "Sort By Quantity") {
        return b.quantity - a.quantity;
      }
      if (sortBy === "Sort By Price") {
        const priceA = a.itemId?.price || 0;
        const priceB = b.itemId?.price || 0;
        return priceB - priceA;
      }
      if (sortBy === "Sort By ID") {
        const idA = a.itemId?._id || "";
        const idB = b.itemId?._id || "";
        return idA.localeCompare(idB);
      }
      if (sortBy === "Sort By Name") {
        const nameA = a.itemId?.name || "";
        const nameB = b.itemId?.name || "";
        return nameA.localeCompare(nameB);
      }
      return 0;
    });

  const totalValue = filteredItems.reduce(
    (acc: number, item: InventoryItem) => {
      const price = item.itemId?.price || 0;
      return acc + item.quantity * price;
    },
    0,
  );

  useEffect(() => {
    // Immediately clear stale results and reset dismiss flag when starting a new search
    setOtherLocationsInfo(null);
    setIsAlertDismissed(false);

    if (!searchQuery.trim()) {
      return;
    }

    if (filteredItems.length > 0) {
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsCheckingElsewhere(true);
      try {
        const response = await apiClient.get(
          `inventory/${activeLocationId}/check-search?q=${encodeURIComponent(searchQuery)}`
        );
        setOtherLocationsInfo(response.data);
      } catch (error) {
        console.error("Error checking item availability elsewhere:", error);
        setOtherLocationsInfo(null);
      } finally {
        setIsCheckingElsewhere(false);
      }
    }, 450);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, filteredItems.length, activeLocationId]);

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 p-section-mobile md:p-section-desktop">
      <PageTitle title="Swim Inventory" />

      {isOwner && (
        <div className="regular flex flex-col gap-4 justify-between md:flex-row md:justify-between text-[14px] md:text-[18px] text-center md:text-left text-tertiary-500 tracking-widest uppercase mb-6 leading-relaxed">
          <span className="block md:inline ">switch to  {currentView ? "store" : "WareHouse"}  →</span>
          <button className="regular text-[14px] w-full md:w-auto tracking-widest bg-primary-700 text-white px-16 py-1.5 uppercase"
            onClick={changeCurrentView}>
            {currentView ? "Store" : "WareHouse"}
          </button>
        </div>
      )}

      <InventoryStats
        totalValue={totalValue}
        totalWarehousesCount={totalWarehouses.length}
        totalStoresCount={totalStores.length}
        userRole={userRole}
        selectedLocationName={selectedLocation?.name}
        totalItemsCount={filteredItems.length}
      />
      {isOwner && (
        <div className="mb-6 custom-dropdown-container relative">
          <h2 className="header font-bold text-[20px] md:text-[40px] tracking-widest uppercase mb-3 text-left">
            {currentView ? "WareHouse" : "Store"} Management
          </h2>
          <div className="relative w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex justify-between items-center w-full header font-bold text-[20px] md:text-[36px] tracking-wide text-neutral-900 border border-neutral-300 bg-white px-6 py-4 cursor-pointer uppercase outline-none focus:border-neutral-500 hover:border-primary-500 transition-colors"
            >
              <span>{selectedLocation?.name || `Select ${currentView ? 'Warehouse' : 'Store'}`}</span>
              <svg
                className={`w-6 h-6 text-neutral-600 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 z-50 w-full mt-1 bg-white border border-neutral-300 shadow-xl overflow-hidden animate-slide-down">
                <div className="max-h-60 overflow-y-auto no-scrollbar">
                  {activeList.map((item: Location) => {
                    const isSelected = item._id === activeLocationId;
                    return (
                      <button
                        key={item._id}
                        onClick={() => {
                          setSelectedLocationId(item._id);
                          setIsDropdownOpen(false);
                        }}
                        className={`flex items-center justify-between w-full px-6 py-4 text-left header font-bold text-[18px] md:text-[24px] tracking-wide uppercase transition-all duration-200 cursor-pointer ${isSelected
                            ? 'bg-neutral-100 text-primary-700 font-extrabold'
                            : 'text-neutral-700 hover:bg-neutral-50 hover:text-primary-700'
                          }`}
                      >
                        <span>{item.name}</span>
                        {isSelected && (
                          <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="flex-1">
          <SearchInput
            id="search-inventory"
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search With Item Name, Category, or ID"
          />
        </div>
        <SortDropdown
          id="sort-inventory"
          value={sortBy}
          onChange={setSortBy}
          options={[
            "Sort By Quantity",
            "Sort By Price",
            "Sort By Name",
            "Sort By ID",
          ]}
        />
      </div>

      {isCheckingElsewhere && (
        <div className="mb-6 p-4 md:p-6 border border-neutral-300 bg-neutral-50 animate-pulse flex items-center gap-3 md:gap-4">
          <div className="w-10 h-10 bg-neutral-200 flex items-center justify-center flex-shrink-0">
            <svg className="animate-spin h-5 w-5 text-neutral-500" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="h-5 bg-neutral-200 rounded w-28 md:w-48 mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-full max-w-[14rem] md:max-w-[24rem]"></div>
          </div>
        </div>
      )}

      {otherLocationsInfo && otherLocationsInfo.otherLocations.length > 0 && !isAlertDismissed && (
        <div className="mb-6 border-2 border-secondary-500 bg-[#fffaf9] p-4 md:p-6 flex flex-col items-start gap-4 transition-all duration-300 w-full">
          <div className="flex items-start gap-3 md:gap-4 w-full">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-secondary-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div className="flex-1 min-w-0 w-full">
              <h3 className="header text-[14px] md:text-[20px] font-bold text-neutral-900 uppercase tracking-widest mb-1.5 leading-tight">
                ITEMS FOUND IN OTHER LOCATIONS
              </h3>
              <p className="regular text-[10px] md:text-[13px] text-neutral-500 uppercase tracking-widest mb-4">
                THE SEARCH QUERY "{searchQuery.toUpperCase()}" MATCHES ITEMS THAT DO NOT EXIST AT {selectedLocation?.name.toUpperCase() || 'THIS WAREHOUSE'}, BUT ARE AVAILABLE ELSEWHERE:
              </p>
              
              <div className="flex flex-col gap-3 w-full bg-white border border-neutral-200 p-4 mb-2">
                {otherLocationsInfo.matchingItems
                  .filter(item => otherLocationsInfo.otherLocations.some(loc => loc.itemId === item._id))
                  .map(item => {
                    const locationsForItem = otherLocationsInfo.otherLocations
                      .filter(loc => loc.itemId === item._id)
                      .sort((a, b) => {
                        const typeA = a.location.type || "";
                        const typeB = b.location.type || "";
                        if (typeA === "Warehouse" && typeB !== "Warehouse") return -1;
                        if (typeA !== "Warehouse" && typeB === "Warehouse") return 1;
                        return 0;
                      });
                    const locsText = locationsForItem.map(l => `${l.location.name} (${l.quantity} UNIT${l.quantity > 1 ? 'S' : ''})`).join(", ");
                    return (
                      <div key={item._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                        <div className="min-w-0">
                          <span className="font-extrabold text-[12px] md:text-[14px] text-neutral-900 block truncate">
                            {item.name.toUpperCase()}
                          </span>
                          <span className="regular text-[9px] md:text-[11px] text-neutral-400 block tracking-widest uppercase mt-0.5">
                            CATEGORY: {item.category.toUpperCase()} | AVAILABLE ON: {locsText.toUpperCase()}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRequestStockForItem(item.name)}
                          className="flex-shrink-0 self-start sm:self-center bg-secondary-500 hover:bg-neutral-900 text-white font-bold tracking-widest text-[9px] md:text-[10px] px-3.5 py-2 uppercase transition-all duration-200 cursor-pointer focus:outline-none"
                        >
                          Request
                        </button>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAlertDismissed(true);
              setSearchQuery("");
            }}
            className="flex items-center justify-center border border-neutral-300 bg-white text-neutral-500 hover:text-neutral-950 font-bold uppercase tracking-widest text-[11px] px-4 py-2.5 transition-all duration-200 cursor-pointer focus:outline-none"
            title="Dismiss Alert"
          >
            Cancel & Clear
          </button>
        </div>
      )}

      {otherLocationsInfo && otherLocationsInfo.otherLocations.length === 0 && !isAlertDismissed && (
        <div className="mb-6 border border-neutral-300 bg-[#fffdfa] p-4 md:p-6 flex flex-col items-start gap-4 transition-all duration-300">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-shrink-0 mt-1">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <div>
              <h3 className="header text-[14px] md:text-[20px] font-bold text-neutral-900 uppercase tracking-widest mb-1.5 leading-tight">
                ITEM NOT FOUND ANYWHERE
              </h3>
              <p className="regular text-[10px] md:text-[13px] font-bold tracking-widest text-neutral-500 uppercase leading-relaxed">
                NO ACTIVE ITEMS MATCHING "{searchQuery}" WERE FOUND IN ANY OF YOUR WAREHOUSES OR STORES.
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setIsAlertDismissed(true);
              setSearchQuery("");
            }}
            className="flex items-center justify-center border border-neutral-300 bg-white text-neutral-500 hover:text-neutral-955 font-bold uppercase tracking-widest text-[11px] p-3 transition-all duration-200 cursor-pointer focus:outline-none"
            title="Dismiss Alert"
            aria-label="Dismiss Alert"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <InventoryTable
        filteredItems={filteredItems}
        inventoryItemsCount={inventoryItems.length}
        inventoryStatus={inventoryStatus}
        inventoryError={inventoryError}
        onClearSearch={() => setSearchQuery("")}
      />


      <FloatingActionButton onClick={() => setIsWarehousePopupOpen(true)} />


      <WarehouseOperationsPopup
        isOpen={isWarehousePopupOpen}
        onClose={() => setIsWarehousePopupOpen(false)}
        onAddNewItem={() => {
          setIsWarehousePopupOpen(false);
          setIsAddNewItemPopupOpen(true);
        }}
        onExportToStore={() => {
          setIsWarehousePopupOpen(false);
          setIsExportToStorePopupOpen(true);
        }}
        onMoveBetweenWarehouses={()=>{
          setIsWarehousePopupOpen(false);
          setIsMoveBetweenWarehousesPopupOpen(true);
        }}
      />

      <AddNewItemPopup
        isOpen={isAddNewItemPopupOpen}
        onClose={() => setIsAddNewItemPopupOpen(false)}
      ></AddNewItemPopup>

      <ExportToStorePopup
        isOpen={isExportToStorePopupOpen}
        onClose={() => setIsExportToStorePopupOpen(false)}
      ></ExportToStorePopup>

      <MoveBetweenWarehousesPopup
        isOpen={isMoveBetweenWarehousesPopupOpen}
        onClose={()=>setIsMoveBetweenWarehousesPopupOpen(false)}
      ></MoveBetweenWarehousesPopup>
    </div>
  );
}

export default Inventory;

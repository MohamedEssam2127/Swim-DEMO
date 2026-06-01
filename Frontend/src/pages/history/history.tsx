import { type Order, gridClass } from '../../components/types';
import HistoryRow from '../../components/HistoryRow';

const mockOrders: Order[] = [
  { id: 'ORD-7729', destination: 'CENTRAL HUB-04', location: 'SEATTLE, WA', quantity: '2,440', unit: 'UNIT', customer: 'MOHAMED SADEK', customerId: '32', status: 'PENDING' },
  { id: 'ORD-7729', destination: 'CENTRAL HUB-04', location: 'SEATTLE, WA', quantity: '2,440', unit: 'UNIT', customer: 'MOHAMED SADEK', customerId: '32', status: 'COMPLETED' },
  { id: 'ORD-7729', destination: 'CENTRAL HUB-04', location: 'SEATTLE, WA', quantity: '2,440', unit: 'UNIT', customer: 'MOHAMED SADEK', customerId: '32', status: 'PENDING' },
  { id: 'ORD-7729', destination: 'CENTRAL HUB-04', location: 'SEATTLE, WA', quantity: '2,440', unit: 'UNIT', customer: 'MOHAMED SADEK', customerId: '32', status: 'PENDING' },
  { id: 'ORD-7729', destination: 'CENTRAL HUB-04', location: 'SEATTLE, WA', quantity: '2,440', unit: 'UNIT', customer: 'MOHAMED SADEK', customerId: '32', status: 'PENDING' },
  { id: 'ORD-7729', destination: 'CENTRAL HUB-04', location: 'SEATTLE, WA', quantity: '2,440', unit: 'UNIT', customer: 'MOHAMED SADEK', customerId: '32', status: 'PENDING' },
  { id: 'ORD-7729', destination: 'CENTRAL HUB-04', location: 'SEATTLE, WA', quantity: '2,440', unit: 'UNIT', customer: 'MOHAMED SADEK', customerId: '32', status: 'PENDING' },
];

function History() {
  return (
    <div className="px-6 md:px-10 py-8">

      <div className="flex justify-center md:justify-start">
        <h1 className="header font-semibold text-[40px] md:text-[64px] text-center tracking-[0.8px] align-middle uppercase">
          HISTORY MANAGEMENT
        </h1>
      </div>

      <div>
        <div className="regular text-[13px] md:text-[14px] text-center md:text-left text-tertiary-500 tracking-widest uppercase mb-6 leading-relaxed">
          <span className="block md:inline">Active Logistics Queue — </span>
          <span className="block md:inline">144 Items </span>
          <span className="block">Total</span>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative w-full md:w-auto shrink-0">
            <select
              id="sort-by"
              className="regular text-[12px] tracking-widest text-tertiary-500 border border-neutral-300 bg-[#FBF9FB] px-4 py-3 pr-10 appearance-none cursor-pointer uppercase w-full md:w-[220px] outline-none focus:border-neutral-500"
            >
              <option>Sort By Quantity</option>
              <option>Sort By Date</option>
              <option>Sort By Status</option>
            </select>
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <input
              id="search-item"
              type="text"
              placeholder="Search With Item Name"
              className="regular text-[12px] tracking-widest text-tertiary-500 border border-neutral-300 bg-[#FBF9FB] px-4 py-3 w-full placeholder:text-tertiary-500 outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <div className="min-w-[850px] md:min-w-full">
            <div className={`${gridClass} pb-3 border-b-2 border-neutral-300`}>
              <div className="flex justify-center">
                <span className="regular text-[10px] tracking-widest text-neutral-500 uppercase">Order ID</span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[10px] tracking-widest text-neutral-500 uppercase">Destination</span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[10px] tracking-widest text-neutral-500 uppercase">Quantity</span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[10px] tracking-widest text-neutral-500 uppercase">Customer</span>
              </div>
              <div className="flex justify-center">
                <span className="regular text-[10px] tracking-widest text-neutral-500 uppercase">Status</span>
              </div>
              <div className="flex justify-end">
                <span className="regular text-[10px] tracking-widest text-neutral-500 uppercase pr-1">Actions</span>
              </div>
            </div>

            {mockOrders.map((order, index) => (
              <HistoryRow key={index} order={order} />
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-neutral-200">
          <span className="regular text-[11px] tracking-widest text-neutral-400 uppercase">
            10 of 100 Orders
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

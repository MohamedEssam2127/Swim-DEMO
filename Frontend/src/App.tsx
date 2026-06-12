import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";
import { socket } from "./core/socket";
import { fetchRequests } from "./store/slices/requestsSlice";
import {
  showRequestNotificationToast,
  showApprovedToast,
  showRejectedToast,
} from "./utils/toast";
import Nav from "./layout/nav/nav";
import MobileNav from "./layout/nav/mobileNav";
import Footer from "./layout/footer/footer";
import LanguageSwitcher from "./components/common/LanguageSwitcher";
import { useTranslation } from "./localization/i18n";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const { t } = useTranslation("common");

  useEffect(() => {
    if (user && token) {
      const orgId = user.organizationID || (user as any).organizationId;
      const userId = user._id || user.id;
      if (orgId) {
        socket.connect();
        socket.emit("join_org", orgId);
        console.log(`Socket joined organization: ${orgId}`);
      }
      if (userId) {
        socket.emit("join_user", userId);
        console.log(`Socket joined personal room: user_${userId}`);
      }
    } else {
      socket.disconnect();
    }
  }, [user, token]);

  useEffect(() => {
    if (user && token && user.role === "Owner") {
      const handleNewRequest = (newRequest: any) => {
        const storeName = typeof newRequest.storeId === "object"
          ? newRequest.storeId?.name
          : newRequest.storeName || "Store";
          
        const requester = newRequest.requestedBy?.fullName || "A manager";

        // Show toast notification using the application's premium theme
        showRequestNotificationToast(
          t("toast.newRequest")
            .replace("{{requester}}", requester)
            .replace("{{store}}", storeName),
          6000
        );

        // Dispatch fetchRequests to update the Orange notification dot and list in real time
        dispatch(fetchRequests());
      };

      socket.on("new_stock_request", handleNewRequest);

      return () => {
        socket.off("new_stock_request", handleNewRequest);
      };
    }
  }, [user, token, dispatch, t]);

  // ── Store manager: notified when owner approves or rejects their request ──
  useEffect(() => {
    if (user && token && user.role === "StoreManager") {
      const handleResolved = (payload: {
        status: "approved" | "rejected";
        storeName: string;
        itemNames: string;
        adminNote?: string;
      }) => {
        if (payload.status === "approved") {
          showApprovedToast(
            `✅ ${t("toast.requestApproved")
              .replace("{{items}}", payload.itemNames)
              .replace("{{store}}", payload.storeName)}`
          );
        } else {
          showRejectedToast(
            `❌ ${t("toast.requestRejected").replace("{{store}}", payload.storeName)}${
              payload.adminNote
                ? ` ${t("toast.reason").replace("{{note}}", payload.adminNote)}`
                : ""
            }`
          );
        }
      };

      socket.on("stock_request_resolved", handleResolved);

      return () => {
        socket.off("stock_request_resolved", handleResolved);
      };
    }
  }, [user, token, t]);

  return (
    <div className="app-layout min-h-screen flex flex-col relative pb-[80px] md:pb-0">
      <Nav />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
      <MobileNav />
      <LanguageSwitcher />
    </div>
  );
}

export default App;

// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import PlaceOrder from "views/PlaceOrder/PlaceOrder.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";
import { Place } from "@material-ui/icons";
import { TableLayout } from "views/BookTable/BookTable";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Order",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/user",
    name: "User Profile",
    rtlName: "ملف تعريفي للمستخدم",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/placeOrder",
    name: "Place Order",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: PlaceOrder,
    layout: "/admin"
  },
  {
    path: "/bookTable",
    name: "Book Table",
    rtlName: "پشتیبانی از راست به چپ",
    icon: Language,
    component: TableLayout,
    layout: "/admin"
  },
  
];

export default dashboardRoutes;

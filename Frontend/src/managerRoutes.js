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
import SetMenu from "views/SetMenu/SetMenu.js";
import CustomerInfo from "views/CustomerInfo/CustomerInfo";
import EmployeeInfo from "views/EmployeeInfo/EmployeeInfo";

const dashboardRoutes = [
  {
    path: "/setMenu",
    name: "Set Menu",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: SetMenu,
    layout: "/manager",
  },
  {
    path: "/Transactions",
    name: "Transactions",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/manager",
  },
  {
    path: "/reserveTable",
    name: "Reserve Table",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: TableLayout,
    layout: "/manager",
  },
  {
    path: "/customerInfo",
    name: "Customer Info",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: CustomerInfo,
    layout: "/manager",
  },
  {
    path: "/employeeInfo",
    name: "Employee Info",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: EmployeeInfo,
    layout: "/manager",
  },
];

export default dashboardRoutes;

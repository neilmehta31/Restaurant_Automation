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
import PlaceOrder from "views/PlaceOrder/PlaceOrder.js";
import Confirm from "views/Confirm/Confirm.js";
// core components/views for RTL layout
import { Place } from "@material-ui/icons";
import { TableLayout } from "views/BookTable/BookTable";
import CustomerInfo from "views/CustomerInfo/CustomerInfo";
import EmployeeInfo from "views/EmployeeInfo/EmployeeInfo";
import Transaction from "views/Transactions/Transaction";
import Chef from "layouts/Chef";

const dashboardRoutes = [
  {
    path: "/confirm",
    name: "Confirm",
    icon: Dashboard,
    component: Confirm,
    layout: "/chef",
  }
];

export default dashboardRoutes;

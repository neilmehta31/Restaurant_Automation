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
// core components/views for RTL layout
import { Place } from "@material-ui/icons";
import { TableLayout } from "views/BookTable/BookTable";
import CustomerInfo from "views/CustomerInfo/CustomerInfo";
import EmployeeInfo from "views/EmployeeInfo/EmployeeInfo";
import Transaction from "views/Transactions/Transaction";

const dashboardRoutes = [
  {
    path: "/notification",
    name: "Notifications",
    icon: Dashboard,
    component: PlaceOrder,
    layout: "/busboy",
  }
  
  
];

export default dashboardRoutes;

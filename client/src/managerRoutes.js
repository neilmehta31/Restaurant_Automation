// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import Setmenu from "./views/PlaceOrder/Setmenu.js";
// import TableLayout from "views/BookTable/BookTable";
// core components/views for RTL layout
import { TableLayout } from "./views/BookTable/BookTable";
import CustomerInfo from "./views/CustomerInfo/CustomerInfo";
import EmployeeInfo from "./views/EmployeeInfo/EmployeeInfo";
import Transaction from "./views/Transactions/Transaction";

const dashboardRoutes = [
  {
    path: "/setMenu",
    name: "Set Menu",
    icon: Dashboard,
    component: Setmenu,
    layout: "/manager",
  },
  {
    path: "/Transactions",
    name: "Transactions",
    icon: Dashboard,
    component: Transaction,
    layout: "/manager",
  },
  {
    path: "/reserveTable",
    name: "Reserve Table",
    icon: Dashboard,
    component: TableLayout,
    layout: "/manager",
  },
  {
    path: "/customerInfo",
    name: "Customer Info",
    icon: Dashboard,
    component: CustomerInfo,
    layout: "/manager",
  },
  {
    path: "/employeeInfo",
    name: "Employee Info",
    icon: Dashboard,
    component: EmployeeInfo,
    layout: "/manager",
  },
];

export default dashboardRoutes;

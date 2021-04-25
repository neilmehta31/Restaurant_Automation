// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import PlaceOrder from "./views/PlaceOrder/PlaceOrder.js";
// core components/views for RTL layout
import { TableLayout } from "./views/BookTable/BookTable";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Order",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/placeOrder",
    name: "Place Order",
    icon: Language,
    component: PlaceOrder,
    layout: "/admin",
  },
  {
    path: "/bookTable",
    name: "Book Table",
    icon: Language,
    component: TableLayout,
    layout: "/admin",
  },
];

export default dashboardRoutes;

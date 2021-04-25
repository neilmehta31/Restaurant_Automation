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

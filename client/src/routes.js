// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Language from "@material-ui/icons/Language";
// core components/views for Admin layout
import DashboardPage from "./views/Dashboard/Dashboard.js";
import PlaceOrder from "./views/PlaceOrder/PlaceOrder.js";
// core components/views for RTL layout
import { TableLayout } from "./views/BookTable/BookTable";
import Feedback from './views/Feedback/feedback.js';
import Orders from './views/Order/order.js';


const dashboardRoutes = [
  {
    path: "/bookTable",
    name: "Book Table",
    icon: Language,
    component: TableLayout,
    layout: "/admin",
  },
  {
    path: "/placeOrder",
    name: "Place Order",
    icon: Language,
    component: PlaceOrder,
    layout: "/admin",
  },
  {
    path: "/order",
    name: "Order",
    icon: Language,
    component: Orders,
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
    path: "/feedback",
    name: "Feedback",
    icon: Language,
    component: Feedback,
    layout: "/admin",
  },
];

export default dashboardRoutes;

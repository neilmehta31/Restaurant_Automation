// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import PlaceOrder from "./views/PlaceOrder/PlaceOrder.js";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/cashpayment",
    name: "Cash Payment",
    icon: Dashboard,
    component: PlaceOrder,
    layout: "/cashier",
  },
  {
    path: "/onlinepayemnt",
    name: "Online Payment",
    icon: Dashboard,
    component: PlaceOrder,
    layout: "/cashier",
  }
];

export default dashboardRoutes;

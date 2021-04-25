// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import Confirm from "./views/Confirm/Confirm.js";
// core components/views for RTL layout

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

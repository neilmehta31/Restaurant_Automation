// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import BusboyNotification from "./views/BusBoyNotification/BusboytNotification";
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/notification",
    name: "Notifications",
    icon: Dashboard,
    component: BusboyNotification,
    layout: "/busboy",
  }
  
  
];

export default dashboardRoutes;

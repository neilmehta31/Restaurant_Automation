// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import WaiterNotification from "./views/WaiterNotification/WaiterNotification.js";


const dashboardRoutes = [
  {
    path: "/notification",
    name: "Notification",
    icon: Dashboard,
    component: WaiterNotification,
    layout: "/waiter",
  }
];

export default dashboardRoutes;

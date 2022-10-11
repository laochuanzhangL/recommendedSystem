import Home from "../pages/Home";
import Login from "../pages/Login";

const Routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login/*",
    component: Login,
  },
];

export default Routes;

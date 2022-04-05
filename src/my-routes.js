import Home from "./pages/Home";
import Major from "./pages/Major";
import Login from "./pages/Login";
import MajorEdit from "./pages/MajorEdit";
import NotFound from "./pages/NotFound";
import Student from "./pages/Student";

const myRoutes=[
    {path:"", component: <Home/>},
    {path:"/home", component: <Home/>},
    {path:"/major", component: <Major/>},
    {path:"/student", component: <Student/>},
    {path:"/major/:id", component: <MajorEdit/>},
    {path:"/login", component: <Login/>},
    {path:"/*", component: <NotFound/>},

];

export default myRoutes;

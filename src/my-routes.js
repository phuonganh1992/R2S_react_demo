import Home from "./pages/Home";
import Major from "./pages/Major";
import Login from "./pages/Login";
import MajorEdit from "./pages/MajorEdit";
import NotFound from "./pages/NotFound";
import Student from "./pages/Student";
import Instructor from "./pages/Instructor";
import InstructorEdit from "./pages/InstructorEdit";

const myRoutes = [
  { path: "", component: <Home /> },
  { path: "/home", component: <Home /> },
  { path: "/major", component: <Major /> },
  { path: "/student", component: <Student /> },
  { path: "/major/:id", component: <MajorEdit /> },
  { path: "/login", component: <Login /> },
  { path: "/*", component: <NotFound /> },
  { path: "/no-internet*", component: <NotFound /> },
  { path: "/instructor*", component: <Instructor /> },
  { path: "/instructor/:id", component: <InstructorEdit /> },
];

export default myRoutes;

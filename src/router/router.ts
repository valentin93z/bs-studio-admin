import EventPage from "../pages/EventPage";
import Events from "../pages/Events";
import Login from "../pages/Login";
import Panel from "../pages/Panel";

export const publicRoutes = [
    {path: '/login', element: Login},
];

export const privateRoutes = [
    {path: '/events', element: Events},
    {path: '/events/:id', element: EventPage},
    {path: '/panel', element: Panel},
];
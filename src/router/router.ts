import EventPage from "../pages/EventPage";
import Events from "../pages/Events";
import Login from "../pages/Login";

export const publicRoutes = [
    {path: '/login', element: Login},
];

export const privateRoutes = [
    {path: '/events', element: Events},
    {path: '/events/:id', element: EventPage},
];
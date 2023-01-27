import Main from "../components/Main/Main";
import Contacts from "../pages/Contacts/Contacts";
import EventPage from "../pages/EventPage";
import Events from "../pages/Events/Events";
import Gallery from "../pages/Gallery/Gallery";
import Masters from "../pages/Masters/Masters";
import Services from "../pages/Services/Services";


export const privateRoutes = [
    {path: 'main', element: Main},
    {path: 'events', element: Events},
    {path: 'events/:id', element: EventPage},
    {path: 'services/*', element: Services},
    {path: 'masters/*', element: Masters},
    {path: 'gallery', element: Gallery},
    {path: 'contacts', element: Contacts},
];
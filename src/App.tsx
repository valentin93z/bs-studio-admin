import Calendar from "./components/Calendar/Calendar";
import EventList from "./components/EventList/EventList";
import Times from "./components/Times/Times";

function App() {
  return (
    <div className="App">
      <Calendar />
      <Times />
      <EventList />
    </div>
  );
}

export default App;
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import Login from "./pages/Login";
import Panel from "./pages/Panel";

function App() {

  const { isAuth } = useAppSelector(state => state.authSlice);

  return (
    <div className="App">
      {
        isAuth
          ?
            <Routes>
              <Route path='panel/*' element={<Panel/> } />
              <Route path='*' element={<Navigate to='panel' replace />} />
            </Routes>
          :
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path='*' element={<Navigate to='login'replace />} />
            </Routes>
      }
    </div>
  );
}

export default App;
import { Navigate, Route, Routes } from "react-router-dom";
import { useAppSelector } from "./app/hooks";
import { privateRoutes, publicRoutes } from "./router/router";

function App() {

  const { isAuth } = useAppSelector(state => state.authSlice);

  return (
    <div className="App">
      {
        isAuth
          ?
            <Routes>
              {privateRoutes.map((route) =>
              <Route key={route.path} path={route.path} element={<route.element/>} />)}
              <Route path='*' element={<Navigate to='/panel' replace />} />
            </Routes>

          :
            <Routes>
              {publicRoutes.map((route) =>
              <Route key={route.path} path={route.path} element={<route.element/>} />)}
              <Route path='*' element={<Navigate to='/login'replace />} />
            </Routes>
      }
    </div>
  );
}

export default App;
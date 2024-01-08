import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles";

import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";

function App() {
  return (
    <>
      <GlobalStyles /> {/* Styling that applys to the entire App */}
      <BrowserRouter>
        <Routes>
          {/* index page
        The replace prop on the Navigate component is used to render a declarative redirect. It allows us to navigate back by replacing the current element in the history stack.*/}
          <Route index element={<Navigate replace to="dashboard" />} />

          {/* AppLayout: This offer a systematic and logical manner to specify the arrangement of various UI components, which can enhance a codebase’s maintainability and scalability. */}
          <Route element={<AppLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>

          <Route path="login" element={<Login />} />
          {/* Page to be matched if none of the urls can be matched  */}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

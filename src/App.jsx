import {
  BrowserRouter as Router,
  Routes,
  Route,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import "./index.css";
import Dashboard from "./pages/Dashboard";
import RequestLawyers from "./pages/RrguesteLawyers";
import Lawyers from "./pages/Lawyers";
import Clients from "./pages/Clients";
import ArticlesTable from "./pages/ArticlesTable";
import Login from "./pages/Login";
import Notfoud from "./pages/Notfoud";
import Layout from "./pages/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";


let route = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <ProtectedRoute><Dashboard /></ProtectedRoute>},
      { path: "/request", element:<ProtectedRoute> <RequestLawyers /> </ProtectedRoute>},
      { path: "/accepted", element: <ProtectedRoute><Lawyers /> </ProtectedRoute>},
      { path: "/clients", element:<ProtectedRoute><Clients /> </ProtectedRoute>},
      { path: "/articles", element: <ProtectedRoute><ArticlesTable /> </ProtectedRoute>},
      { path: "/login", element: <Login /> },
      { path: "*", element: <Notfoud /> },
    ],
  },
]);
function App() {
  return (
    // <Router>
    //   <div className="flex">
    //     <NavBar />

    //     <div className="ml-64 p-6 w-full min-h-screen bgPrimary text-white">
    //       <Routes>
    //         <Route path="/" element={<Dashboard />} />
    //         <Route path="/request" element={<RequestLawyers />} />
    //         <Route path="/accepted" element={<Lawyers />} />
    //         <Route path="/clients" element={<Clients />} />
    //         <Route path="/articles" element={<ArticlesTable />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/notfound" element={<Notfoud/>} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    
      <RouterProvider router={route}></RouterProvider>
    
  );
}

export default App;

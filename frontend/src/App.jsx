import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import Properties from "./Pages/Properties";
import PropertyDetails from "./Pages/PropertyDetails";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ScrollToTop from "./components/ScrollToTop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./admin/Dashboard";
import AdminProperties from "./admin/Properties";
import CreateProperty from "./admin/CreateProperty";
import EditProperty from "./admin/EditProperty";
import Categories from "./admin/Categories";
import Enquiries from "./admin/Enquiries";
import User from "./admin/User";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:slug" element={<PropertyDetails />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>  

          {/* Direct Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="properties" element={<AdminProperties />} />
        <Route path="properties/create" element={<CreateProperty />} />
        <Route path="properties/edit/:id" element={<EditProperty />} />
        <Route path="categories" element={<Categories />} />
        <Route path="enquiries" element={<Enquiries />} />
        <Route path="users" element={<User />} />
        </Route>
      </Routes>
    </>
  );
}
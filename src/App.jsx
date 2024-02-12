import "./App.css";
import RouteHandler from "./routes/RouteHandler";
// import HomePage from "./screens/HomePage";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./screens/Login";
// import Navbar from "./components/Navbar";

function App() {
  return (
    // <BrowserRouter>
    //   <Navbar />
    //   <Routes>
    //     <Route path="/" element={<HomePage />} />
    //     <Route path="/login" element={<Login />} />
    //   </Routes>
    // </BrowserRouter>
    <RouteHandler />
  );
}

export default App;

import "./App.css";
import "./index.css";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegistrationPage";
import SharedPage from "./pages/SharedPage";
import { Route, Routes, Navigate } from "react-router-dom";

function App(){
  return (
    <Routes>
      <Route path="/HomePage" element={<HomePage />} />
      <Route path="/" element={<RegisterPage />} />
      <Route path="/share/:id" element={<SharedPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;

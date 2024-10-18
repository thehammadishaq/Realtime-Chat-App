import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { RegisterPage } from "./pages/Registerpage";
import { ChatPage } from "./pages/ChatPage";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/chat" element={<ChatPage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";

import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/mainPage";
import { JoinPage } from "./pages/join";

function App() {
  return (
    <BrowserRouter>
      <meta name="color-scheme" content="light only"></meta>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/join" element={<JoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

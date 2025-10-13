import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <RecoilRoot>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </RecoilRoot>
);

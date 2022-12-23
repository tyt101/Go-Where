import ReactDom from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import store from "./store";
const root = ReactDom.createRoot(document.getElementById("ticket"));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

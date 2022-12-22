import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import store from './store'
import './App.css'

const root = ReactDOM.createRoot(document.getElementById('query'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WaiterPage from "./components/pages/WaiterPage";
import EntryPage from "./components/pages/EntryPage";
import KitchenPage from "./components/pages/KitchenPage";
import CustomerPage from "./components/pages/CustomerPage";
import MenuPage from "./components/pages/MenuPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" exact element={<EntryPage />} />
                <Route path="/waiter" exact element={<WaiterPage />} />
                <Route path="/kitchen" exact element={<KitchenPage />} />
                <Route path="/customer" exact element={<CustomerPage />} />
                <Route path="/menu" exact element={<MenuPage />} />
            </Routes>
        </Router>
    );
}

export default App;

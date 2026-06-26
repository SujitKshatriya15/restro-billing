import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Order from "./pages/Order";
import Home from "./pages/Home";
import Records from "./pages/Records"
import Login from "./pages/Login"
import ProtectedRoute from "./components/ProtectedRoute";
import { RouteOr } from "lucide-react";


function App(){
    return(
        <div>
                <BrowserRouter>
                    <Routes>
                        <ProtectedRoute>
                        <Route path="/login" element = {<Login />}/>
                        <Route path="/" element = {<Home />}/>
                        <Route path="/" element = {<Home />}/>
                        
                        <Route path="/records" element = {<Records />}/>
                        <Route path="/menu/:tableNumber" element={<Order />}/>
                        </ProtectedRoute>
                    </Routes>
                </BrowserRouter>

        </div>
        
    );

}
export default App;
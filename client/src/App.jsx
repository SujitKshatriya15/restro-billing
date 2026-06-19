import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Order from "./component/Order";
import Home from "./component/Home";
import Records from "./component/Records"
import Login from "./component/Login"
import ProtectedRoute from "./component/ProtectedRoute";
import { RouteOr } from "lucide-react";


function App(){
    return(
        <div>
                <BrowserRouter>
                    <Routes>
                        <Route path="/login" element = {<Login />}/>
                        <Route path="/home" element = {<ProtectedRoute><Home /></ProtectedRoute>}/>
                        <Route path="/records" element = {<Records />}/>
                        <Route path="/menu/:tableNumber" element={<Order />}/>
                    </Routes>
                </BrowserRouter>

        </div>
        
    );

}
export default App;
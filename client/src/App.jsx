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
                        
                        <Route path="/login" element = {<Login />}/>
                        <Route path="/" element = {<ProtectedRoute><Home /></ProtectedRoute>}/>
                        {/* <Route path="/" element = {<Home />}/> */}
                        
                        <Route path="/records" element = {<ProtectedRoute><Records /></ProtectedRoute>}/>
                        <Route path="/menu/:tableNumber" element={<ProtectedRoute><Order /></ProtectedRoute>}/>
                        
                    </Routes>
                </BrowserRouter>

        </div>
        
    );

}
export default App;
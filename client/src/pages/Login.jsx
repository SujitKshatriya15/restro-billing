import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

function Login(){
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
    const loginPost = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
        const response = await fetch(
            "https://restro-billing-yogurt-co.onrender.com/login/auth",
            {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
                ,

            },
            body: JSON.stringify({ username, password }),
            }
        );

        if (!response.ok) {
            throw new Error("Invalid username or password");
        }

        const data = await response.json();

        // TODO: handle successful login (e.g. store token, redirect, close modal)
        console.log("Login success:", data);
        localStorage.setItem("token", data.token);
        navigate("/");
        } catch (err) {
        setError(err.message || "Login failed");
        } finally {
        setLoading(false);
        }
    };

    return(
        <div className="modal-overlay">
          <nav className="navbar">

        <div className="nav-left">

          <Menu
            size={28}
            className="menu-icon"
          />

          <h1>
            Restro-billing
          </h1>

        </div>
      </nav>
      <div className="food-modal login-modal">
        <h2>Login</h2>

        <form className="login-form" onSubmit={loginPost}>
          <div className="login-field">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className="login-field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* <button className="close-btn" onClick={contact}>
          Contact
        </button> */}
      </div>
    </div>
    )
}
export default Login;
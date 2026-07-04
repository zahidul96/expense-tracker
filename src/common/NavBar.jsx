import "./NavBar.css";
import { Link, Outlet } from "react-router";
const NavBar = () => {
  return (
    <div className="layout-container">
      <header className="navbar">
        <div>
          <h1>Expense Tracker</h1>
        </div>
        <nav className="nav">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/product" className="link">
            Product
          </Link>
          <Link to="/about" className="link">
            About
          </Link>
          <Link to="/login" className="link">
            Login
          </Link>
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};
export default NavBar;

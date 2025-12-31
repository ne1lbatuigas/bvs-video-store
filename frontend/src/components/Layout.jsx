import { NavLink } from "react-router-dom";
import { FaPlay, FaUsers, FaFilm, FaFileAlt } from "react-icons/fa";

function Layout({ children, wide = false }) {
  return (
    <>
      <header className="app-header">
        {/* BRAND SECTION */}
        <div className="brand">
          <div className="logo">🎬</div>
          <div>
            <h1>Bogsy Video Store</h1>
            <p>Buhangin, Davao City - Video Rental Management</p>
          </div>
        </div>

        {/* NAVIGATION */}
        <nav className="nav-tabs">
          <NavLink to="/rentals" className="tab">
            <FaPlay /> Rentals
          </NavLink>

          <NavLink to="/customers" className="tab">
            <FaUsers /> Customers
          </NavLink>

          <NavLink to="/" className="tab">
            <FaFilm /> Videos
          </NavLink>

          <NavLink to="/reports" className="tab">
            <FaFileAlt /> Reports
          </NavLink>
        </nav>
      </header>

      <div className={wide ? "container-wide" :  "container"}>{children}</div>

      {/* FOOTER */}
      <footer className="app-footer">
        © {new Date().getFullYear()} Bogsy Video Store developed by Neil Jason Batuigas. All rights reserved.
      </footer>
    </>
  );
}

export default Layout;

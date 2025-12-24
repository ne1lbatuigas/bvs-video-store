import { Link } from "react-router-dom";

function Layout({ children }) {
  return (
    <>
      <nav>
        <Link to="/">Videos</Link>
        <Link to="/customers">Customers</Link>
        <Link to="/rentals">Rentals</Link>
      </nav>

      <div className="container">
        {children}
      </div>
    </>
  );
}

export default Layout;
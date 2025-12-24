import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import VideoList from "./pages/VideoList";
import Customers from "./pages/Customers";
import Rentals from "./pages/Rentals";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/rentals" element={<Rentals />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from "react";
import {
  getVideoInventoryReport,
  getCustomerRentalReport,
} from "../services/reportService";
import { Download } from "lucide-react";

function Reports() {
  const [activeTab, setActiveTab] = useState("videos");
  const [videoReport, setVideoReport] = useState([]);
  const [customerReport, setCustomerReport] = useState([]);

  useEffect(() => {
    loadReports();
  }, []);

  const loadReports = async () => {
    const videos = await getVideoInventoryReport();
    const customers = await getCustomerRentalReport();

    setVideoReport(videos);
    setCustomerReport(customers);
  };

  return (
    <div className="container-wide">
      {/* HEADER */}
      <div className="page-header">
        <h2 className="page-title">Reports</h2>
      </div>

      {/* TABS */}
      <div className="report-tabs">
        <button
          className={`report-tab ${
            activeTab === "videos" ? "active" : ""
          }`}
          onClick={() => setActiveTab("videos")}
        >
          Video Inventory
        </button>

        <button
          className={`report-tab ${
            activeTab === "customers" ? "active" : ""
          }`}
          onClick={() => setActiveTab("customers")}
        >
          Active Customer Rentals
        </button>

        <button
          className={`report-tab ${
            activeTab === "history" ? "active" : ""
          }`}
          onClick={() => setActiveTab("history")}
          disabled
        >
          Rentals History
        </button>
      </div>

      {/* CONTENT */}
      <div className="card">
        {activeTab === "videos" && (
          <>
            <div className="report-header">
              <h3>Video Inventory</h3>

              <button
                className="btn-primary"
                onClick={() =>
                  window.open(
                    "http://localhost:5000/api/reports/videos/csv"
                  )
                }
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>In</th>
                  <th>Out</th>
                </tr>
              </thead>
              <tbody>
                {videoReport.map((video, index) => (
                  <tr key={index}>
                    <td>{video.title}</td>
                    <td>{video.category}</td>
                    <td>{video.in}</td>
                    <td>{video.out}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "customers" && (
          <>
            <div className="report-header">
              <h3>Active Customer Rentals</h3>

              <button
                className="btn-primary"
                onClick={() =>
                  window.open(
                    "http://localhost:5000/api/reports/customers/csv"
                  )
                }
              >
                <Download size={16} />
                Export CSV
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Video</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {customerReport.map((item, index) => (
                  <tr key={index}>
                    <td>{item.customer}</td>
                    <td>{item.video}</td>
                    <td>
                      {new Date(item.dueDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {activeTab === "history" && (
          <div className="empty">
            Rentals history report coming soon
          </div>
        )}
      </div>
    </div>
  );
}

export default Reports;

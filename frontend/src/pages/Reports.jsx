import { useEffect, useState } from "react";
import {
  getVideoInventoryReport,
  getCustomerRentalReport,
} from "../services/reportService";

function Reports() {
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
    <div>
      <h2>Video Inventory Report</h2>

      <button
        onClick={() =>
          window.open("http://localhost:5000/api/reports/videos/csv")
        }
      >
        Export CSV
      </button>

      <table>
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

      <hr />

      <h2>Customer Rental Report</h2>

      <button
        onClick={() =>
          window.open("http://localhost:5000/api/reports/customers/csv")
        }
      >
        Export CSV
      </button>

      <table>
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
              <td>{new Date(item.dueDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;

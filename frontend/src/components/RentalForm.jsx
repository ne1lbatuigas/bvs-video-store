import { useEffect, useState } from "react";
import { getCustomers } from "../services/customerService";
import { getAllVideos } from "../services/videoService";
import { createRental } from "../services/rentalService";

function RentalForm({ onRentalCreated }) {
  const [customers, setCustomers] = useState([]);
  const [videos, setVideos] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [videoId, setVideoId] = useState("");
  const [days, setDays] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      setCustomers(await getCustomers());
      setVideos(await getAllVideos());
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createRental({
      customerId, 
      videoId,
      days,
    });

    setCustomerId("");
    setVideoId("");
    setDays(1);
    onRentalCreated();
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h3>Rent a Video</h3>

      <select
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
        required
      >
        <option value="">Select Customer</option>
        {customers.map((c) => (
          <option key={c._id} value={c._id}>
            {c.fullName}
          </option>
        ))}
      </select>

      <select
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        required
      >
        <option value="">Select Video</option>
        {videos
          .filter((v) => v.totalCopies - v.rentedCopies > 0)
          .map((v) => (
            <option key={v._id} value={v._id}>
              {v.title} ({v.category})
            </option>
        ))}
      </select>

      <input
        type="number"
        min="1"
        max="3"
        value={days}
        onChange={(e) => setDays(e.target.value)}
        required
      />

      <button type="submit">Rent</button>
    </form>
  );
}

export default RentalForm;  
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

  const selectedVideo = videos.find((v) => v._id === videoId);

  useEffect(() => {
    const loadData = async () => {
      setCustomers(await getCustomers());
      setVideos(await getAllVideos());
    };
    loadData();
  }, []);

  useEffect(() => {
    if (selectedVideo) {
      setDays(1);
    }
  }, [selectedVideo]);

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
    <form className="card rental-form" onSubmit={handleSubmit}>
      <h3>Rent a Video</h3>

      <div className="rental-form-row">
        {/* CUSTOMER */}
        <div className="form-group">
          <label>Select Customer</label>
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          >
            <option value="">-- Choose Customer --</option>
            {customers.map((c) => (
              <option key={c._id} value={c._id}>
                {c.fullName}
              </option>
            ))}
          </select>
        </div>

        {/* VIDEO */}
        <div className="form-group">
          <label>Select Video</label>
          <select
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
            required
          >
            <option value="">-- Choose Video --</option>
            {videos
              .filter((v) => v.totalCopies - v.rentedCopies > 0)
              .map((v) => (
                <option key={v._id} value={v._id}>
                  {v.title} ({v.category})
                </option>
              ))}
          </select>
        </div>

        {/* DAYS */}
        <div className="form-group days">
          <label>Days</label>
          <input
            type="number"
            min="1"
            max={selectedVideo ? selectedVideo.maxRentDays : 1}
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            required
          />
        </div>

        {/* BUTTON */}
        <div className="form-group form-group-button">
          <label>&nbsp;</label>
          <button type="submit" className="rent-btn">
            ▶ Rent Video
          </button>
        </div>
      </div>
    </form>
  );
}

export default RentalForm;

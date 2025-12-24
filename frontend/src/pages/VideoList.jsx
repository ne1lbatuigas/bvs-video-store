import { useEffect, useState } from "react";
import { getAllVideos } from "../services/videoService";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllVideos()
      .then((data) => setVideos(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading videos...</p>;

  return (
    <div>
      <h2>Videos</h2>

      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        videos.map((video) => (
          <div className="card" key={video._id}>
            <h3>{video.title}</h3>
            <p>Rate: ₱{video.dailyRate}/day</p>
            <p>Available: {video.totalCopies - video.rentedCopies}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default VideoList;

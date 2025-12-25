import { useEffect, useState } from "react";
import { getAllVideos, deleteVideo } from "../services/videoService";
import VideoForm from "../components/VideoForm";


function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const loadVideos = () => {
    setLoading(true);
    getAllVideos()
      .then((data) => setVideos(data))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVideos();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;

    await deleteVideo(id);
    loadVideos();
  };

  if (loading) return <p>Loading videos...</p>;

  return (
    <div>
      <VideoForm
        onVideoSaved={loadVideos}
        selectedVideo={selectedVideo}
        clearSelection={() => setSelectedVideo(null)}
      />

      <h2>Videos</h2>

      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        videos.map((video) => (
          <div className="card" key={video._id}>
            <h3>{video.title}</h3>
            <p>
              Rate: ₱{video.category === "VCD" ? 25 : 50}/day
            </p>
            <p>Available: {video.totalCopies - video.rentedCopies}</p>
            <button onClick={() => setSelectedVideo(video)}>Edit</button>
            <button onClick={() => handleDelete(video._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default VideoList;

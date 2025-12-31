import { useEffect, useState } from "react";
import { getAllVideos, deleteVideo } from "../services/videoService";
import VideoForm from "../components/VideoForm";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

function VideoList() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
    <div className="video-page">

      <div className="page-header">
        <h2 className="page-title">Video Library</h2>
        <button
          className="btn-primary"
          onClick={() => {
            setSelectedVideo(null);
            setShowModal(true);
          }}
        >
          <FaPlus />
          <span> Add New Video</span>
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()}
          >
            <VideoForm
              selectedVideo={selectedVideo}
              onVideoSaved={() => {
                loadVideos();
                setShowModal(false);
              }}
              clearSelection={() => {
                setSelectedVideo(null);
                setShowModal(false);
              }}
            />
          </div>
        </div>
      )}

      {videos.length === 0 ? (
        <p>No videos found</p>
      ) : (
        <div className="table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>TITLE</th>
                <th>TYPE</th>
                <th>RENTAL FEE</th>
                <th>DAYS LIMIT</th>
                <th>TOTAL QTY</th>
                <th>AVAILABLE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {videos.map((video) => (
                <tr key={video._id}>
                  <td>{video.title}</td>
                  <td>
                    <span
                      className={`type-badge ${
                        video.category === "DVD" ? "type-dvd" : "type-vcd"
                      }`}
                    >
                      {video.category}
                    </span>
                  </td>
                  <td>₱{video.category === "VCD" ? 25 : 50}</td>
                  <td>{video.maxRentDays === 1 ? "1 day" : `${video.maxRentDays} days`}</td>
                  <td>{video.totalCopies}</td>
                  <td className="availablecopy">{video.totalCopies - video.rentedCopies}</td>
                  <td className="actions">
                  <button
                    className="icon-btn edit"
                    title="Edit Video"
                    onClick={() => {
                      setSelectedVideo(video);
                      setShowModal(true);
                    }}
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="icon-btn delete"
                    title="Delete Video"
                    onClick={() => handleDelete(video._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default VideoList;

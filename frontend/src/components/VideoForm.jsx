import { useEffect, useState } from "react";
import { createVideo, updateVideo } from "../services/videoService";

function VideoForm({ onVideoSaved, selectedVideo, clearSelection }) {
  const isEdit = Boolean(selectedVideo);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("VCD");
  const [totalCopies, setTotalCopies] = useState("");
  const [maxRentDays, setMaxRentDays] = useState(1);

  useEffect(() => {
    if (selectedVideo) {
      setTitle(selectedVideo.title);
      setCategory(selectedVideo.category);
      setTotalCopies(selectedVideo.totalCopies);
      setMaxRentDays(selectedVideo.maxRentDays);
    }
  }, [selectedVideo]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      category,
      totalCopies: Number(totalCopies),
      maxRentDays: Number(maxRentDays),
    };

    if (isEdit) {
      await updateVideo(selectedVideo._id, payload);
      clearSelection();
    } else {
      await createVideo(payload);
    }

    setTitle("");
    setTotalCopies("");
    setMaxRentDays(1);
    onVideoSaved();
  };

  return (
    <form onSubmit={handleSubmit} className="card">
      <h3>{isEdit ? "Edit Video" : "Add New Video"}</h3>

      <input
        type="text"
        value={title}
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="VCD">VCD</option>
        <option value="DVD">DVD</option>
      </select>

      <input
        type="number"
        value={totalCopies}
        placeholder="Total Copies"
        onChange={(e) => setTotalCopies(e.target.value)}
        required
      />

      <select
        value={maxRentDays}
        onChange={(e) => setMaxRentDays(e.target.value)}
      >
        <option value={1}>1 day</option>
        <option value={2}>2 days</option>
        <option value={3}>3 days</option>
      </select>

      <button type="submit">
        {isEdit ? "Update Video" : "Add Video"}
      </button>

      {isEdit && (
        <button type="button" onClick={clearSelection}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default VideoForm;

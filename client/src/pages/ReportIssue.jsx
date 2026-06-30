import { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
function LocationMarker({ setPosition, setLatitude, setLongitude }) {
  useMapEvents({
    click(e) {
      setPosition([
        e.latlng.lat,
        e.latlng.lng,
      ]);

      setLatitude(e.latlng.lat);
      setLongitude(e.latlng.lng);
    },
  });

  return null;
}
function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center, 14);
  return null;
}
function ReportIssue() {
  const [image, setImage] = useState(null);
  const [aiResult, setAiResult] = useState(null);
const [position, setPosition] = useState(null);
const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");
  const [issueType, setIssueType] = useState("Pothole");
  const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [severity, setSeverity] = useState("Medium");
const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [mapCenter, setMapCenter] = useState([
  17.9784,
  79.5941,
  
]);
const getCurrentLocation = () => {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      setLatitude(lat);
      setLongitude(lon);
      setPosition([lat, lon]);
      setMapCenter([lat, lon]);

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );

        const data = await response.json();

        if (data.display_name) {
          setLocation(data.display_name);
        }

      } catch (err) {
        console.log(err);
      }
    },
(error) => {
  console.log(error);

  alert(
    `Code: ${error.code}\nMessage: ${error.message}`
  );
},

{
  enableHighAccuracy: true,
  timeout: 10000,
  maximumAge: 0,
}
  );
};
const searchLocation = async () => {
  if (!location.trim()) {
    alert("Enter location");
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
        location + ", Telangana, India"
      )}`
    );

    const data = await response.json();

    if (data.length > 0) {
      const lat = Number(data[0].lat);
      const lon = Number(data[0].lon);

      setMapCenter([lat, lon]);
      setPosition([lat, lon]);
      setLatitude(lat);
      setLongitude(lon);
    } else {
      alert("Location not found");
    }
  } catch (err) {
    console.error(err);
  }
};

const handleImageUpload = (e) => {
  const file = e.target.files[0];
  setImage(file);
};

const handleAIAnalysis = async () => {
if (!title.trim()) {
  alert("Enter Issue Title");
  return;
}

if (!description.trim()) {
  alert("Enter Description");
  return;
}

  if (!image) {
    alert("Please upload an image");
    return;
  }

if (!location.trim()) {
    alert("Please enter location");
    return;
  }

if (!position) {
    alert("Please search the location and click the exact place on the map.");
    return;
}
const formData = new FormData();

formData.append("title", title);
formData.append("description", description);
formData.append("issueType", issueType);
formData.append("location", location);
formData.append("severity", severity);
formData.append("latitude", latitude);
formData.append("longitude", longitude);

if (image) {
  formData.append("image", image);
}

const response = await fetch(
  "http://localhost:5000/api/issues",
  {
    method: "POST",
    body: formData,
  }
);
const data = await response.json();

if (!response.ok) {
  throw new Error(data.message || "Failed to 🤖 Analyze & Submit Complaint");
}

setLoading(false);

setAiResult({
  title: data.title,
  description: data.description,
  issueType: data.issueType,
  severity: data.severity,
  priority: data.priority,
  status: data.status,
  suggestedAction: data.suggestedAction,
  location: data.location,
  latitude: data.latitude,
  longitude: data.longitude,
});

alert("Issue Saved to MongoDB ✅");

setTitle("");
setDescription("");
setIssueType("Pothole");
setSeverity("Medium");
setLocation("");
setImage(null);
setPosition(null);
setMapCenter([
  17.9784,
  79.5941,
]);
try {
  setLatitude("");
setLongitude("");
} catch (error) {
  setLoading(false);
  console.error(error);
  alert("Error: " + error.message);
}
};

  return (
    <div style={{ padding: "40px" }}>
      <h1>Report Community Issue</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          marginTop: "40px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            flex: 1,
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>Upload Image</h2>

<input
  type="file"
  accept="image/*"
  onChange={handleImageUpload}
  style={{ marginTop: "20px" }}
/>

{/* Issue Title */}
<div style={{ marginTop: "20px" }}>
  <label>Issue Title</label>

  <input
    type="text"
    placeholder="Enter issue title"
    value={title}
    onChange={(e) => setTitle(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "8px",
    }}
  />
</div>
{/* Description */}
<div style={{ marginTop: "20px" }}>
  <label>Description</label>

  <textarea
    rows="4"
    placeholder="Describe the issue..."
    value={description}
    onChange={(e) => setDescription(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "8px",
      resize: "none",
    }}
  />
</div>

{/* Issue Type */}
<div style={{ marginTop: "20px" }}>
  <label>Issue Type</label>

  <select
    value={issueType}
    onChange={(e) => setIssueType(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "8px",
    }}
  >
    <option>Pothole</option>
    <option>Garbage</option>
    <option>Street Light</option>
    <option>Water Leakage</option>
    <option>Road Damage</option>
  </select>
</div>

{/* ADD THIS HERE 👇 */}
<div style={{ marginTop: "20px" }}>
  <label>Severity</label>

  <select
    value={severity}
    onChange={(e) => setSeverity(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "8px",
    }}
  >
    <option>Low</option>
    <option>Medium</option>
    <option>High</option>
    <option>Critical</option>
  </select>
</div>

{/* Location */}
<div style={{ marginTop: "15px" }}>
  <label>Location</label>

  <input
    type="text"
    placeholder="Enter location"
    value={location}
    onChange={(e) => setLocation(e.target.value)}
    style={{
      width: "100%",
      padding: "10px",
      marginTop: "5px",
      borderRadius: "8px",
    }}
  />
</div>

{/* Current Location Button */}
<button
  onClick={getCurrentLocation}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  📍 Use My Current Location
</button>

{/* Search Button */}
<button
  onClick={searchLocation}
  style={{
    marginTop: "10px",
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  🔍 Search Location
</button>

          {image && (
            
            <>
              <img
                src={URL.createObjectURL(image)}
                alt="preview"
                style={{
                  width: "100%",
                  marginTop: "20px",
                  borderRadius: "10px",
                  maxHeight: "300px",
                  objectFit: "cover",
                }}
              />

             <button
  disabled={loading}
  onClick={handleAIAnalysis}
                style={{
                  marginTop: "20px",
                  padding: "12px 20px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                {loading ? "Saving..." : "Save Issue"}
              </button>
            </>
          )}
        </div>

        <div
          style={{
            flex: 1,
            background: "#1e293b",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h2>Issue Details</h2>
          <h3 style={{ marginTop: "20px" }}>
  Select Exact Location
</h3>

<MapContainer
center={mapCenter}
zoom={13}
style={{
height:"300px",
width:"100%",
marginTop:"10px",
borderRadius:"10px"
}}
>

<ChangeMapView center={mapCenter} />

<TileLayer
  attribution="&copy; OpenStreetMap contributors"
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>
  <LocationMarker
    setPosition={setPosition}
    setLatitude={setLatitude}
    setLongitude={setLongitude}
  />
{position && (
  <Marker
    position={position}
    draggable={true}
    eventHandlers={{
      dragend: (e) => {
        const marker = e.target;
        const pos = marker.getLatLng();

        setPosition([pos.lat, pos.lng]);
        setLatitude(pos.lat);
        setLongitude(pos.lng);
      },
    }}
  />
)}
  
</MapContainer>

<p style={{ marginTop: "10px" }}>
  Latitude: {latitude}
</p>

<p>
  Longitude: {longitude}
</p>

     {aiResult ? (
  <div
    style={{
      background: "#0f172a",
      padding: "20px",
      borderRadius: "10px",
      marginTop: "20px",
      border: "1px solid #22c55e",
    }}
  >
    <h3 style={{ color: "#22c55e" }}>
      ✅ Issue Submitted Successfully
    </h3>

    <hr />
<p><strong>Issue Type:</strong> {aiResult.issueType}</p>

<p><strong>Severity:</strong> {aiResult.severity}</p>

<p><strong>Status:</strong> {aiResult.status}</p>

<p><strong>Title:</strong> {aiResult.title}</p>

<p><strong>Description:</strong> {aiResult.description}</p>

<p><strong>Location:</strong> {aiResult.location}</p>

<p><strong>Latitude:</strong> {aiResult.latitude}</p>

<p><strong>Longitude:</strong> {aiResult.longitude}</p>

<p><strong>Priority:</strong> {aiResult.priority}</p>

    <p>
      <strong>Suggested Action:</strong>{" "}
      {aiResult.suggestedAction}
    </p>
  </div>
) : (
  <p>Fill details and save the issue.</p>
)}
        </div>
      </div>
    </div>
  );
}
export default ReportIssue;
import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function ChangeMapView({ center }) {
  const map = useMap();
  map.setView(center, 15);
  return null;
}

function LocationMarker({
  setMarkerPosition,
  setLocation,
}) {
  useMapEvents({
    async click(e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      setMarkerPosition([lat, lon]);

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
  });

  return null;
}

function Map() {
 const [location, setLocation] = useState("");

const [searchedPlace, setSearchedPlace] =
  useState("");

const [mapCenter, setMapCenter] =
  useState([17.9784, 79.5941]);

const [markerPosition, setMarkerPosition] =
  useState(null);

const [accuracy, setAccuracy] =
  useState("");

const [issues, setIssues] =
  useState([]);

useEffect(() => {
  fetch("https://civictrack-ai-3.onrender.com/api/issues")
    .then((res) => res.json())
    .then((data) => {
      setIssues(data);
    })
    .catch((err) => console.log(err));
}, []);
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        setAccuracy(position.coords.accuracy);

        setMapCenter([lat, lon]);

        setMarkerPosition([lat, lon]);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );

          const data = await response.json();

          if (data.display_name) {
            setLocation(data.display_name);
            setSearchedPlace(data.display_name);
          }
        } catch (err) {
          console.log(err);
        }
      },
      () => {
        alert("Unable to get current location.");
      }
    );
  };

  const searchLocation = async () => {
    if (!location.trim()) {
      alert("Enter a location");
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          location
        )}`
      );

      const data = await response.json();

      if (data.length > 0) {
        const lat = Number(data[0].lat);
        const lon = Number(data[0].lon);

        setMapCenter([lat, lon]);
        setMarkerPosition([lat, lon]);
        setSearchedPlace(data[0].display_name);
      } else {
        alert("Location not found");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>🗺 Community Issue Map</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          marginBottom: "20px",
        }}
      >
        <button
          onClick={getCurrentLocation}
          style={{
            background: "#16a34a",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📍 Use My Current Location
        </button>

        <input
          type="text"
          placeholder="Search any place..."
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchLocation();
            }
          }}
          style={{
            width: "320px",
            padding: "10px",
            borderRadius: "8px",
          }}
        />

        <button
          onClick={searchLocation}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          🔍 Search
        </button>
      </div>      <div style={{ marginBottom: "20px" }}>
        <h3>Selected Location</h3>

        <p>
          <strong>Address:</strong>{" "}
          {searchedPlace || location || "Not Selected"}
        </p>

        {markerPosition && (
          <>
            <p>
              <strong>Latitude:</strong>{" "}
              {markerPosition[0].toFixed(6)}
            </p>

            <p>
              <strong>Longitude:</strong>{" "}
              {markerPosition[1].toFixed(6)}
            </p>

            {accuracy && (
              <p>
                <strong>Accuracy:</strong> ±
                {Math.round(accuracy)} meters
              </p>
            )}
          </>
        )}
      </div>

      <MapContainer
        center={mapCenter}
        zoom={14}
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "15px",
        }}
      >
        <ChangeMapView center={mapCenter} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <LocationMarker
          setMarkerPosition={setMarkerPosition}
          setLocation={setLocation}
        />
{issues.map((issue) => (
  issue.latitude &&
  issue.longitude && (
    <Marker
      key={issue._id}
      position={[
        issue.latitude,
        issue.longitude,
      ]}
    >
      <Popup>
        <div>
          <h3>{issue.title}</h3>

          <p>
            <strong>Type:</strong>{" "}
            {issue.issueType}
          </p>

          <p>
            <strong>Severity:</strong>{" "}
            {issue.severity}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {issue.status}
          </p>

          <p>
            <strong>Location:</strong>{" "}
            {issue.location}
          </p>

          <p>
            <strong>Description:</strong>{" "}
            {issue.description}
          </p>
        </div>
      </Popup>
    </Marker>
  )
))}
        {markerPosition && (
          <Marker
            position={markerPosition}
            draggable={true}
            eventHandlers={{
              async dragend(e) {
                const marker = e.target;
                const pos = marker.getLatLng();

                setMarkerPosition([
                  pos.lat,
                  pos.lng,
                ]);

                try {
                  const response = await fetch(
                    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.lat}&lon=${pos.lng}`
                  );

                  const data =
                    await response.json();

                  if (data.display_name) {
                    setLocation(
                      data.display_name
                    );

                    setSearchedPlace(
                      data.display_name
                    );
                  }
                } catch (err) {
                  console.log(err);
                }
              },
            }}
          >
            <Popup>
              <div>
                <h3>📍 Selected Location</h3>

                <p>
                  {searchedPlace ||
                    location}
                </p>

                <hr />

                <p>
                  <strong>Latitude:</strong>{" "}
                  {markerPosition[0].toFixed(
                    6
                  )}
                </p>

                <p>
                  <strong>Longitude:</strong>{" "}
                  {markerPosition[1].toFixed(
                    6
                  )}
                </p>

                {accuracy && (
                  <p>
                    Accuracy ±
                    {Math.round(
                      accuracy
                    )}{" "}
                    meters
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default Map;
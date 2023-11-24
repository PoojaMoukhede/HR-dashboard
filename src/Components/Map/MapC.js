import React, { useEffect } from "react";

export default function MapC() {
  useEffect(() => {
    let mapContainer = document.getElementById("map");
    const mapl = window.L;

    if (mapContainer && !mapContainer._mapquest) {
      mapl.mapquest.key = "urXw4lfYOkv5w3osyatzBTfNulYG7BYd";

      function createMap(error, response) {
        // Check if the map container is already initialized
        if (mapContainer._mapquest) {
          console.error(
            "Map container is already initialized inside geocoding callback."
          );
          return;
        }

        // Initialize the Map
        const map = mapl.mapquest.map("map", {
          layers: mapl.mapquest.tileLayer("map"),
          center: [40.7128, -74.0059],
          zoom: 13,
        });

        // Generate the feature group containing markers from the geocoded locations
        const featureGroup = generateMarkersFeatureGroup(response);
        function generateMarkersFeatureGroup(response) {
          // console.log(`response : ${response}`);
          const group = [];
          for (let i = 0; i < response.results.length; i++) {
            const location = response.results[i].locations[0];
            const locationLatLng = location.latLng;
            // console.log(`locationLatLng : ${locationLatLng}`);
            // console.log(`location : ${location}`);

            // Create a marker for each location
            const marker = mapl
              .marker(locationLatLng, { icon: mapl.mapquest.icons.marker() })
              .bindPopup(location.adminArea5 + ", " + location.adminArea3);

            group.push(marker);
            // console.log(`group : ${group}`);
          }
          return mapl.featureGroup(group);
        }
        // Add markers to the map and zoom to the features
        featureGroup.addTo(map);
        map.fitBounds(featureGroup.getBounds());

        // Set a property on the map container to indicate that it has been initialized
        mapContainer._mapquest = true;
      }

      // Geocode locations
      mapl.mapquest
        .geocoding()
        // .geocode(["Sola, AHM","Gota,AHM"], createMap);
        .geocode(["Naroda, GJ", "Nikol, GJ", "Narol, GJ","Vatva, GJ","Gandhi Nagar,GJ","South Bopal,GJ","Karnavati Club,GJ","Sola, GJ","Gota,GJ"], createMap);
    } else {
      console.error("Map container is already initialized.");
    }
  }, []); // Empty dependency array ensures that the effect runs once after the initial render
  return (
    <>
      <div className="card-header-tab card-header">
        <div className="card-header-title">
          <i className="header-icon lnr lnr-map-marker icon-gradient bg-asteroid">
            {" "}
          </i>
          Active Employees Location
        </div>
      </div>
      {/* <iframe src="https://maps.google.com/maps?q=ahmedabad&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed" frameborder="0" scrolling="no" style={{width:" 100%", height: "800px"}}></iframe> */}
      <div style={{ border: "0", margin: "0" }}>
        <div id="map" style={{ width: "100%", height: "750px" }}></div>
      </div>
    </>
  );
}

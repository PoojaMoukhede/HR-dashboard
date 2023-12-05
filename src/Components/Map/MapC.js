import React, { useEffect, useState } from "react";
import axios from "axios";
import marker1 from "../../Images/location (1).png";
import marker2 from '../../Images/position.png'

export default function MapC() {
  const [data, setData] = useState([]);
  // from API
  useEffect(() => {
    axios
      .get("http://192.168.1.211:8080/location")  // Assuming this endpoint returns an array of user locations
      .then((response) => {
        setData(response.data);
        const mapl = window.L;
        let mapContainer = document.getElementById("map");
        mapl.mapquest.key = "urXw4lfYOkv5w3osyatzBTfNulYG7BYd";
  
        // Check if response.data exists and has at least one element
        if (response.data && response.data.length > 0) {
          // Initialize the Map
          const map = mapl.mapquest.map("map", {
            layers: mapl.mapquest.tileLayer("map"),
            center: [40.7128, -74.0059],
            zoom: 13,
          });
  
          response.data.forEach((userLocation) => {
            if (
              userLocation.Location_info &&
              userLocation.Location_info.length > 0
            ) {
              const lastPoint =
                userLocation.Location_info[
                  userLocation.Location_info.length - 1
                ].endPoint.endPointname;
              // Create a marker for the endpoint
              const marker = mapl
                .marker([40.7128, -74.0059], {
                  icon: mapl.mapquest.icons.marker(),
                })
                .bindPopup(lastPoint)
          
  
              // Add the marker to the map
              marker.addTo(map);
              mapContainer._mapquest = true;
              mapl.mapquest.geocoding().geocode(lastPoint);
            } else {
              console.log("Location_info is empty or undefined for a user");
            }
          });
        } else {
          console.log("Data is empty or undefined");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  
// hardcoded
  // useEffect(() => {
  //   axios
  //     .get("http://192.168.1.211:8080/location")
  //     .then((response) => {
  //       setData(response.data);

  //       // Check if response.data exists and has at least one element
  //       if (response.data && response.data.length > 0) {
  //         const lastLocationInfo = response.data[response.data.length - 1];

  //         if (
  //           lastLocationInfo.Location_info &&
  //           lastLocationInfo.Location_info.length > 0
  //         ) {
  //           const lastLocation =
  //             lastLocationInfo.Location_info[
  //               lastLocationInfo.Location_info.length - 1
  //             ];
  //           console.log(`Endpoint: ${lastLocation.endPoint.endPointname}`);
  //         } else {
  //           console.log("Last Location_info is empty or undefined");
  //         }
  //       } else {
  //         console.log("Data is empty or undefined");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);

  // useEffect(() => {
  //   let mapContainer = document.getElementById("map");
  //   const mapl = window.L;

  //   if (mapContainer && !mapContainer._mapquest) {
  //     mapl.mapquest.key = "urXw4lfYOkv5w3osyatzBTfNulYG7BYd";

  //     function createMap(error, response) {
  //       // Check if the map container is already initialized
  //       if (mapContainer._mapquest) {
  //         console.error(
  //           "Map container is already initialized inside geocoding callback."
  //         );
  //         return;
  //       }

  //       // Initialize the Map
  //       const map = mapl.mapquest.map("map", {
  //         layers: mapl.mapquest.tileLayer("map"),
  //         center: [40.7128, -74.0059],
  //         zoom: 13,
  //       });

  //       // Generate the feature group containing markers from the geocoded locations
  //       const featureGroup = generateMarkersFeatureGroup(response);
  //       function generateMarkersFeatureGroup(response) {
  //         const group = [];
  //         for (let i = 0; i < response.results.length; i++) {
  //           const location = response.results[i].locations[0];
  //           const locationLatLng = location.latLng;
  //           const customIcon = window.L.icon({
  //             iconUrl: marker1,
  //             iconSize: [40, 40], // Adjust the size of your custom marker icon
  //           });
  
  //           const marker = mapl
  //             // .marker(locationLatLng, { icon: mapl.mapquest.icons.marker() })
  //             .marker(locationLatLng, { icon: customIcon })
  //             .bindPopup(location.adminArea5 + ", " + location.adminArea3);

  //           group.push(marker);
  //         }
  //         return mapl.featureGroup(group);
  //       }
  //       featureGroup.addTo(map);
  //       map.fitBounds(featureGroup.getBounds());
  //       mapContainer._mapquest = true; // Set a property on the map container to indicate that it has been initialized
  //     }

  //     // Geocode locations
  //     mapl.mapquest
  //       .geocoding()
  //       // .geocode(["Sola, AHM","Gota,AHM"], createMap);
  //       .geocode(
  //         [
  //           "Naroda, GJ",
  //           "Nikol, GJ",
  //           "Narol, GJ",
  //           "Vatva, GJ",
  //           "Gandhi Nagar,GJ",
  //           "South Bopal,GJ",
  //           "Karnavati Club,GJ",
  //           "Sola, GJ",
  //           "Gota,GJ",
  //         ],
  //         createMap
  //       );
  //   } else {
  //     console.error("Map container is already initialized.");
  //   }
  // }, []);


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
      <div style={{ border: "0", margin: "0" }}>
        <div id="map" style={{ width: "100%", height: "750px" }}></div>
      </div>
    </>
  );
}

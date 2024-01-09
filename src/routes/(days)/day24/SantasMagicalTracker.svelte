<script context="module">
  import maplibregl from "maplibre-gl";
</script>

<script>
  import { onMount, onDestroy } from "svelte";
  let map;
  let citiesData = [];

  onMount(async () => {
    map = new maplibregl.Map({
      container: "map",
      style:
        "https://api.maptiler.com/maps/streets/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
      center: [-103.59179687498357, 40.66995747013945],
      zoom: 3,
    });

    try {
      const response = await fetch(
        "https://advent.sveltesociety.dev/data/2023/day-twenty-four.json",
      ); // Replace with your API endpoint
      citiesData = await response.json();
      console.log(citiesData);

      map.on("load", () => {
        // Add a new source from our GeoJSON data
        map.addSource("cities", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: citiesData.history.map((item, index) => ({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [item.location.lng, item.location.lat],
              },
              properties: { ...item, index },
            })),
          },
        });

        map.addLayer({
          id: "unclustered-point",
          type: "circle",
          source: "cities",
          paint: {
            "circle-color": "#11b4da",
            "circle-radius": 8,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#fff",
          },
        });
        map.addLayer({
          id: "point-index",
          type: "symbol",
          source: "cities",
          layout: {
            "text-field": ["get", "index"], // Use the 'index' property of each feature
            "text-size": 12,
          },
          paint: {
            "text-color": "#000",
          },
        });

        map.on("click", "unclustered-point", (e) => {
          const feature = e.features[0];
          const { coordinates } = feature.geometry;

          new maplibregl.Popup({ anchor: "top" })
            .setLngLat(coordinates)
            .setHTML(
              `Arrived: ${new Date(
                feature.properties.arrival,
              ).toLocaleString()}<br>Departure: ${new Date(
                feature.properties.departure,
              ).toLocaleString()}<br>City: ${
                feature.properties.city
              }<br>Region: ${feature.properties.region}<br>Population: ${
                feature.properties.population
              }<br>Presents Delivered: ${
                feature.properties.presentsDelivered
              } `,
            )
            .addTo(map);
        });
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    // Cleanup map on component destroy
    onDestroy(() => {
      map.remove();
    });
  });
</script>

<div class="magical-tracker">
  <div id="map"></div>
</div>

<style>
  .magical-tracker {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  #map {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: relative;
    z-index: 1;
  }

  :global(.maplibregl-popup) {
    position: absolute !important;
    top: 0 !important;
    background-color: transparent !important;
    max-width: fit-content !important;
  }
  :global(.maplibregl-control-container) {
    position: absolute !important;
    top: 0 !important;
    background-color: transparent !important;
  }
  :global(.maplibregl-popup-content) {
    background-color: #444444;
    color: #fff;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
  }
  :global(.maplibregl-popup-content > button) {
    background-color: #fff;
    color: #444444;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    outline: none;
    width: fit-content;
    height: 100%;
    margin: 0 auto;
  }
</style>

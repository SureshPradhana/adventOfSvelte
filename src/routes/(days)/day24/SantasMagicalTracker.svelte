<script lang="ts">
  // import { MapLibre, Marker, Line } from "svelte-maplibre";
  import { MapLibre, Marker, LineLayer,Popup } from "svelte-maplibre";
  import { onMount, onDestroy } from "svelte";
  import maplibregl from "maplibre-gl";
  import { LngLat } from "maplibre-gl";
    import type { Popup } from "svelte-maplibre";
  let data;
  let newarr = [];
  let markerLocations: LngLat[] = [];
  let initialView:LngLat = [];
  let fetchTimeout; // = setTimeout(fetchData, 8 * 1000);
  // let latitude;
  // let longitude;
  $: center = initialView;
  let styleURL =
    "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
  let zoom = 1;

  async function fetchData() {
    try {
      let response = await fetch(
        "https://advent.sveltesociety.dev/data/2023/day-twenty-four.json",
      );

      if (response.ok) {
         data = await response.json();
         newarr = [];
        data.history.forEach((entry) => {
          newarr.push([entry.location.lng, entry.location.lat]);
        });
        if (data.current) {
          initialView = [data.current.location.lng, data.current.location.lat];
        } else {
          initialView = [
            data.history[data.history.length - 1].location.lng,
            data.history[data.history.length - 1].location.lat,
          ];
        }

        markerLocations = [...newarr];
   
        console.log(markerLocations);
        console.log(initialView);

        fetchTimeout = setTimeout(fetchData, 8 * 1000);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  onMount(() => {
    fetchData();
  });

  onDestroy(() => {
    clearTimeout(fetchTimeout);
  });

  function handleMapLoad({ detail: map }) {
    const marker = new maplibregl.Marker()
      .setLngLat(initialView)
      .setPopup(new maplibregl.Popup().setHTML(`Temperature: 30c`))
      .addTo(map);
  }
</script>


<div class="smt">
  <div class="map-wrapper">
    <MapLibre
      center={center}
      zoom={1}
      class="map"
      standardControls
      style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      on:load={handleMapLoad}
    >
      {#if markerLocations}
      <Marker lngLat={new LngLat(177.477371, 64.736656)}  ></Marker>  
      
      {/if}
    </MapLibre>

   
  </div>
</div>

<style>
  .smt {
    height: 100%;
    width: 100%;
  }
  .map-wrapper {
    height: 100%;
    width: 100%;
  }
  :global(.map) {
    height: 100%;
    width: 100%;
  }
  :global(.map-wrapper *) {
    background-color: transparent;
    color: #2e2e2e;
  }
</style>

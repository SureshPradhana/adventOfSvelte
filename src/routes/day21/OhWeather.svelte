<script>
    import { MapLibre } from "svelte-maplibre";
    import maplibregl from "maplibre-gl";
    import { onMount } from "svelte";

    const API_KEY = import.meta.env.VITE_YOUR_SECRET;

    let wmo_code = {
        "0": "Clear sky",
        "1": "Mainly clear",
        "2": "Partly cloudy",
        "3": "Overcast",
        "45": "Fog and depositing rime fog",
        "48": "Fog and depositing rime fog",
        "51": "Drizzle: Light intensity",
        "53": "Drizzle: Moderate intensity",
        "55": "Drizzle: Dense intensity",
        "56": "Freezing Drizzle: Light intensity",
        "57": "Freezing Drizzle: Dense intensity",
        "61": "Rain: Slight intensity",
        "63": "Rain: Moderate intensity",
        "65": "Rain: Heavy intensity",
        "66": "Freezing Rain: Light intensity",
        "67": "Freezing Rain: Heavy intensity",
        "71": "Snow fall: Slight intensity",
        "73": "Snow fall: Moderate intensity",
        "75": "Snow fall: Heavy intensity",
        "77": "Snow grains",
        "80": "Rain showers: Slight intensity",
        "81": "Rain showers: Moderate intensity",
        "82": "Rain showers: Violent intensity",
        "85": "Snow showers: Slight intensity",
        "86": "Snow showers: Heavy intensity",
        "95": "Thunderstorm: Slight intensity",
        "96": "Thunderstorm with hail: Slight intensity",
        "99": "Thunderstorm with hail: Heavy intensity",
    };

    let statuss;
    let latitude = 38.9049;
    let longitude = 104.9773;
    let locationName = "North Pole";
    let forecaseData;
    $: center = [longitude, latitude];
    let day = Date.now();
    let travelStatus = "Yes";
    let weathercode = "Clear sky";
    let mintemp = 0;
    let maxtemp = 0;
    let sunrise = 0;
    let sunset = 0;
    let snow = 0;
    
    const santaCanTravelCodes = ["0","1","2","3","45","48","51","53","55","56","57","61","63","66","71","73","77","80","81","85","86"];
    let value = "North pole";
    async function searchName() {
        let res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`,
        );

        let data = await res.json();
        console.log(data.results[0].formatted);
        locationName = data.results[0].formatted;
        console.log(data);
    }

    async function searchByName() {
        console.log(value);
        let res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${value}&key=${API_KEY}&language=en&pretty=1`,
        );
        let data = await res.json();
        console.log(data);
        if (data.results.length == 0) {
            alert("No such location found");
            return;
        }
        latitude = parseFloat(data.results[0].geometry.lat);
        longitude = parseFloat(data.results[0].geometry.lng);
        console.log(data);
        locationName = data.results[0].formatted;
        console.log(latitude, longitude, locationName);
    }

    async function fetchData() {
        let response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,rain_sum,showers_sum,snowfall_sum`,
        );
        let data = await response.json();
        console.log(data);
        forecaseData = data.daily;
        console.log(forecaseData);
        day = forecaseData.time[0];
        weathercode = wmo_code[forecaseData.weather_code[0]];
        mintemp = forecaseData.temperature_2m_min[0];
        maxtemp = forecaseData.temperature_2m_max[0];
        sunrise = new Date(forecaseData.sunrise[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        sunset = new Date(forecaseData.sunset[0]).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
        snow = forecaseData.snowfall_sum[0];
        console.log(day, weathercode, mintemp, maxtemp, sunrise, sunset, snow);

        if (!response.ok) {
            console.error(`API request failed with status ${response.status}`);
            return;
        }
    }

    async function findByCords() {
        function success(position) {
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
        }

        function error() {
            locationName = "Unable to retrieve your location";
        }

        if (!navigator.geolocation) {
            locationName = "Geolocation is not supported by your browser";
        } else {
            locationName = "Locating…";
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }

    async function geoFindMyLocation() {
        findByCords();
        searchName();
        fetchData();
        forecaseData = { ...forecaseData };
    }
    async function geoFindByName() {
        searchByName();
        fetchData();
        forecaseData = { ...forecaseData };
    }

    function handleMapLoad({ detail: map }) {
        const marker = new maplibregl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(
                new maplibregl.Popup().setHTML(
                    // `Temperature: ${forecaseData.forecast_timeframes[0].temperature_2m}°C<br>Precipitation: ${forecaseData.forecast_timeframes[0].precipitation}`,
                    `Temperature: 30c`,
                ),
            )
            .addTo(map);
    }

    onMount(() => {
        geoFindMyLocation();

        return () => {
            statuss = null;
        };
    });
    function changerep(index) {
        day = forecaseData.time[index];
        travelStatus = santaCanTravelCodes.includes(forecaseData.weather_code[index]) ? "Yes" : "No";
        weathercode = wmo_code[forecaseData.weather_code[index]];
        mintemp = forecaseData.temperature_2m_min[index];
        maxtemp = forecaseData.temperature_2m_max[index];
        sunrise = forecaseData.sunrise[index];
        sunset = forecaseData.sunset[index];
        snow = forecaseData.snowfall_sum[index];
    }
</script>

<div class="oh_weather">
    <div class="daily_data">
        {#if forecaseData}
            <h3>
                {forecaseData
                    ? `${forecaseData.time[0]} to ${forecaseData.time[6]}`
                    : "Loading weather data..."}
            </h3>
            <div class="daily_data_container">
                {#each Array(7).fill({}) as item, index}
                    <div
                        on:click={() => changerep(index)}
                        class="daily_data_item"
                    >
                        <p>{forecaseData.time[index]}</p>
                        <p>{wmo_code[forecaseData.weather_code[index]]}</p>
                        <p>max: {forecaseData.temperature_2m_max[index]}°C</p>
                        <p>min: {forecaseData.temperature_2m_min[index]}°C</p>
                    </div>
                {/each}
            </div>
        {/if}
    </div>

    <div class="search">
        <div class="current_location">
            <button on:click={() => geoFindMyLocation()} id="find-me"
                >Show current location</button
            >
        </div>
        <div class="search_by_name">
            <input bind:value type="text" placeholder="Enter your location" />
            <input
                on:click={() => geoFindByName()}
                type="submit"
                value="Search"
            />
            <br />
        </div>
        <div class="details">
            <p>{latitude}N , {longitude} W</p>
            <p bind:this={statuss}>{locationName}</p>
        </div>
    </div>

    <div class="map">
        <MapLibre
            {center}
            zoom={7}
            class="map"
            standardControls
            style="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
            on:load={handleMapLoad}
        />
    </div>
    <div class="santa_can_go">
        <h3>Can Santa go here?</h3>
        <p>Day : {day}</p>
        <p>travelStatus : {travelStatus}</p>
        <p>weather : {weathercode}</p>
        <p>min temp : {mintemp} °C </p>
        <p>max temp : {maxtemp} °C</p>
        <p>sun rise : {sunrise}</p>
        <p>sun set : {sunset} </p>
        <p>snow : {snow} mm</p>
    </div>
</div>

<style>
    :global(.map) {
        height: 500px;
    }
    .oh_weather {
        width: 100%;
        display: grid;
        grid-template-columns: 3fr 1fr;
        margin: 1rem;
    }
    .santa_can_go {
        margin:0.4rem;


    }

    .search {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        /* align-items: center; */
        align-content: center;
    }
    .search > div {
        margin: 0.4rem;
    }
    .search_by_name {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .daily_data {
        width: inherit;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .daily_data_container {
        display: grid; /* justify-content: space-around;
        align-items: center; */
        grid-template-columns: repeat(7, 1fr);
        font-size: 0.7rem;
        width: inherit;
        grid-gap: 3px;
    }
    .daily_data_item > * {
        background-color: transparent;
        color: #2e2e2e;
    }
    .daily_data_item {
        background-color: white;
        cursor: pointer;
        padding: 0.2rem;
    }
    :global(.maplibregl-ctrl-icon) {
        background-color: white;
        color: white;
    }
    :global(.map, .map * > *) {
        background-color: white;
        color: #2e2e2e;
    }
    .daily_data_item:hover {
        background-color: #f1f1f1;
        cursor: pointer;
    }
    @media (max-width: 768px) {
       .oh_weather{
           grid-template-columns: 1fr;
       }
    }
</style>

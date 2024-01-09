<script>
    import { onMount } from "svelte";

    // data
    let bpm = 120;
    let audio = null;
    let clickTimes = [];

    onMount(() => {
        console.log("mounted");
        audio = new Audio("./Click_308_05.wav");
        document.querySelector(".clickable").focus();
    });

    function play(event) {
        const currentTime = Date.now();
        clickTimes.push(currentTime);
        if (clickTimes.length < 2) {
            console.log("Insufficient data to calculate BPM.");
            bpm = bpm;
            return;
        }

        const timeDifferences = [];
        for (let i = 1; i < clickTimes.length; i++) {
            timeDifferences.push(clickTimes[i] - clickTimes[i - 1]);
        }

        const averageTimeDifference =
            timeDifferences.reduce((sum, time) => sum + time, 0) /
            timeDifferences.length;

        const beatsPerMinute = 60000 / averageTimeDifference;

        bpm = Math.round(beatsPerMinute);

        audio.play();
        event.preventDefault();
    }
    function handleSpaceKey(event) {
        if (event.key === " " || event.key === "Spacebar") {
            event.preventDefault();
            play(event);
        }
    }
    function reset() {
        clickTimes = [];
        bpm = 120;
        document.querySelector(".clickable").focus();
    }
</script>

<div class="misteltoe-metronome">
    <div class="metronome-container">
        <div class="video-container">
            <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/nlR0MkrRklg?si=Ixe5TfoadGFNer4A"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
            ></iframe>
        </div>
        <div class="bpm-conatiner-wrapper">
            <button on:click={reset} class="reset-button">Reset</button>
            <div
                class="bpm-container clickable"
                on:click={play}
                on:keydown={handleSpaceKey}
                role="button"
                tabindex="0"
            >
                <h3>Tap <span class="instruction"> or Use Space</span></h3>
                <p class="bpm">{bpm} BPM</p>
            </div>
        </div>
    </div>
</div>

<style>
    .misteltoe-metronome {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: 1fr;
        justify-items: center;
        align-items: center;
        justify-content: center;
    }
    .video-container {
        width: 560px;
        height: 315px;
    }
    .clickable {
        cursor: pointer;
        text-decoration: none;
        outline: none; /* Remove the default focus outline */
        background-color: transparent;
    }
    .clickable:active
    ,.clickable:focus {
    outline: none:q;
}
    .clickable > * {
        pointer-events: none;
        user-select: none;
    }
    .bpm-conatiner-wrapper {
        position: relative;
    }
    .bpm-container {
        display: grid;
        grid-template-rows: 1fr auto;
        justify-items: center;
        align-items: center;
        justify-content: center;
        align-content: center;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        transition: all 0.2s ease-in-out;
        padding: 1rem;
    }
    .clickable > .bpm {
        font-size: 2rem;
        font-weight: bold;
        color: #b5acac;
        text-align: center;
    }
    .instruction {
        font-size: 1rem;
        color: #777;
    }
    .reset-button {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        background-color: #fff;
        color: #2e2e2e;
        padding: 0.5rem;
        font-size: 0.8rem;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }
    @media (max-width: 600px) {
        .video-container {
            width: 100%;
            height: 100%;
        }
    }
</style>

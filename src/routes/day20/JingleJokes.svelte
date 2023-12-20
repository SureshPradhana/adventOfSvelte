<script>
    import { onMount } from "svelte";

    let itemsPerPage = 1;
    let currentPage = 1;
    let pitch = 1;
    let rate = 1;

    let synth;
    let voiceSelect;
    let data;
    let jokediv;

    onMount(async () => {
        synth = window.speechSynthesis;
        voiceSelect = synth.getVoices()[3];
        const res = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-twenty.json",
        );
        data = await res.json();
    });

    $: {
        if (jokediv) {
            setTimeout(() => speak(), 1000);
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            currentPage++;
        }
    }

    function speak() {
        synth.cancel();
        const joke = jokediv.querySelector(".setup").innerText;
        const punchline = jokediv.querySelector(".punchline").innerText;
        const utterThis = new SpeechSynthesisUtterance(
            joke + "         " + punchline,
        );
        utterThis.voice = voiceSelect;
        synth.speak(utterThis);
    }
</script>

<div class="jigglejokes">
    <div class="jokes">
        <div class="joke">
            {#if data}
                {#each data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as joke, i (joke)}
                    {@const index =
                        i + 1 + (currentPage - 1) * itemsPerPage - 1}
                    <div bind:this={jokediv} class="joke {index}">
                        <div class="setup">{joke.split("?")[0] + "?"}</div>
                        <div class="punchline">{joke.split("?")[1]}</div>
                    </div>
                {/each}
            {/if}
        </div>

        <div class="controls">
            <button on:click={nextPage} class="next">Get a New Joke</button>
        </div>
    </div>
</div>

<style>
    @keyframes snowflakes {
        0% {
            background-position:
                0px 0px,
                0px 0px,
                0px 0px;
        }
        100% {
            background-position:
                500px 1000px,
                400px 400px,
                300px 300px;
        }
    }
    * {
        background-color: transparent;
    }
    .jokes {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        font-family: "Amatic SC", cursive;
    }

    .setup {
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
        padding: 0.5rem;
    }
    .next {
        background-color: white;
    }
    .next:hover {
        background-color: var(--blue);
        cursor: pointer;
    }

    .punchline {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 1rem;
        text-align: center;
        padding: 0.5rem;
    }
    button {
        padding: 0.4rem;
    }
</style>

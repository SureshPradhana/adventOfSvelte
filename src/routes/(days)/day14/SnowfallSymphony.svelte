<script>
    import { onMount, tick } from "svelte";
    import { generate } from "$lib/utils/myUtilities";
    import { svg } from "d3";
    let value = "snowflake";
    let width = 30;
    let height = 30;
    let quantity = 50;
    let speed = 5;
    let svgdata = "";
    let svgs = [];
    let svgtemp = [];

    function handleClick() {
        let data = generate(value);
        svgdata = data;
    }
    $: handleClick();

    onMount(() => {
        handleClick();
        return () => {};
    });
</script>

<div class="snowfall-symphony">
    {#each Array(quantity) as _, index (index)}
        <div
            class="snowflake"
            style="animation-delay: {index * 0.1}s;top:-100px; left: {Math.random() *
                90}vw; animation-duration: {Math.random() * speed + speed}s"
        >
            <svg
                width="{width}px"
                height="{height}px"
                viewBox="0 0 100 100"
                role="img"
                ><title>A Snowflake</title><g class="js-canvas"
                    >{@html svgdata}</g
                ></svg
            >
        </div>
    {/each}
    <div class="name_input">
        <input bind:value type="text" placeholder="name" />
        <button on:click={() => handleClick()}>Generate</button>
        <div class="settings">
            <label>
                Width:
                <input type="range" bind:value={width} min="10" max="100" step="0.1"/>
            </label>
            <label>
                Height:
                <input type="range" bind:value={height} min="10" max="100" step="0.1"/>
            </label>
            <label>
                Quantity:
                <input type="range" bind:value={quantity} min="1" max="100" step="1" />
            </label>
            <label>
                Speed:
                <input type="range" bind:value={speed} min="1" max="10" step="0.1"/>
            </label>
        </div>
    </div>
</div>

<style>
    .snowfall-symphony {
        position: relative;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .name_input {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    .snowflake {
        position: absolute;
        animation: snowfall 5s linear infinite;
        background-color: transparent;
    }
    .settings {
        display: flex;
        flex-direction: column;
        background-color: transparent;
    }
    .settings label {
        display: flex;
        flex-direction: row;
        background-color: transparent;
        justify-content: space-between;
        align-items: center;
        margin: 0.2rem;
    }
    @keyframes snowfall {
        0% {
            transform: translateY(-100px);
        }
        100% {
            transform: translateY(100vh);
        }
    }
</style>

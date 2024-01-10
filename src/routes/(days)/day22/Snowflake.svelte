<script>
    import { icons } from "feather-icons";
    import { onMount } from "svelte";
    import { generate } from "$lib/utils/myUtilities";
    import { svg } from "d3";

    let value = "snowflake";
    let svgdata = "";
    let isButtonDisabled = true;
    function handleClick() {
        svgdata = generate(value);
        isButtonDisabled = false;
    }
    onMount(() => {
        handleClick();
        return () => {};
    });

    function downloadSvg() {
        const svg = svgdata;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "snowflake.svg";
        link.click();
    }
</script>

<div class="snowflake">
    <div class="center">
        <div class="svg_wrapper">
            <svg viewBox="0 0 100 100" role="img">
                <title>A Snowflake</title>
                <g class="js-canvas">{@html svgdata}</g>
            </svg>
        </div>
        <div class="search">
            <input bind:value type="text" placeholder="name" />
            <button on:click={() => handleClick()}>Generate</button>
            <button
                on:click={() => downloadSvg()}
                class="download_btn"
                disabled={isButtonDisabled}
            >
                {@html icons.download.toSvg({
                    class: "feather btn-transparent download",
                    width: "18px",
                    height: "18px",
                })}
            </button>
        </div>
    </div>
</div>

<style>
    .snowflake {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    .center > div {
        margin: 0.5rem;
    }
    .svg_wrapper {
        width: 100%;
        height: 100%;
        border: 1px solid var(--stroke);
    }

    svg {
        width: inherit;
        height: inherit;
    }

    .search {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: space-around;
    }
    .download_btn {
        background-color: var(--green);
        border: none;
        cursor: pointer;
    }

  
    .download_btn:disabled {
        background-color: var(--stroke);
        cursor: not-allowed;
    }
    .download_btn:disabled:hover {
        background-color: var(--stroke);
    }
    .download_btn:hover {
        background-color: var(--blue);
    }

    @keyframes fade {
        0% {
            opacity: 0;
            transform: translateY(var(--start-translation, -2px));
        }
        20% {
            opacity: 1;
            transform: translateY(0%);
        }
        80% {
            opacity: 1;
            transform: translateY(0%);
        }
        100% {
            opacity: 0;
            transform: translateY(var(--end-translation, 2px));
        }
    }

    @media (prefers-reduced-motion: reduce) {
        :root {
            --start-translation: 0;
            --end-translation: 0;
        }
    }
</style>

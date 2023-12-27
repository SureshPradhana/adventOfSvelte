<script>
    import { icons } from "feather-icons";
    import { onMount } from "svelte";
    let svgEL;
    let value = "snowflake";
    let name_length = 0;
    let characters_used = [];
    let arrangement = [];
    let isButtonDisabled = true;
    let settings = {
        trunkLength: 40,
        branches: [
            { distance: 10, length: 5 },
            { distance: 20, length: 10 },
            { distance: 30, length: 8 },
        ],
        treeCount: 6,
    };
    let svgdata = "";
    function generate() {
        name_length = value.length;
        characters_used = [...new Set(value.split(""))];
        arrangement = value.split("");
        settings.trunkLength = name_length * 10;
        settings.treeCount = characters_used.length;
        settings.branches = arrangement.map((char, index) => ({
            distance: index * 10,
            length: char.charCodeAt(0) % 10,
        }));
        console.log(settings);
        svgdata = buildSnowflake(settings);
        isButtonDisabled = false;
    }

    function buildSnowflake({ trunkLength, branches, treeCount }) {
        return `<g class="snowflake" style="--tree-count: ${treeCount};">
            ${buildTree({ trunkLength, branches })}
      ${buildTreeCopies(treeCount)}
    </g>
  `;
    }

    function buildTree({ trunkLength, branches }) {
        const trunk = `
    <line x1="50" y1="50" x2="50" y2="${50 - trunkLength}" class="line" />
  `;

        const branchStrings = branches.map(({ distance, length }) => {
            const startY = 50 - distance;
            return `
      <line 
        x1="50" 
        y1="${startY}" 
        x2="${50 - length}" 
        y2="${startY - length}" 
        class="line"
      />
    `;
        });
        return `<g id="tree">
    ${trunk}
    <g id="branches">${branchStrings.join(" ")}</g>
    <use href="#branches" class="flipped-branches" />
  </g>`;
    }

    function buildTreeCopies(treeCount) {
        let copies = "";
        for (let i = 0; i < treeCount; i++) {
            copies += `
      <use 
        href="#tree" 
        style="--index: ${i}" 
        class="rotated-tree"
      />`;
        }
        return copies;
    }

    function downloadSvg() {
        const svg = svgdata;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "snowflake.svg";
        link.click();
    }
    onMount(() => {
        generate();
        return () => {};
    });
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
            <button on:click={() => generate()}>Generate</button>
            <button
                on:click={() => downloadSvg()}
                class="download_btn"
                disabled={isButtonDisabled}
            >
                {@html icons.download.toSvg({
                    class: "feather download",
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
        border: 1px solid #444444;
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
    :global(#branches) {
        stroke: #fff;
        stroke-width: 1.5px;
        stroke-linecap: round;
    }

    :global(.line) {
        stroke: #fff;
        stroke-width: 1.5px;
        stroke-linecap: round;
    }
    :global(.flipped-branches) {
        scale: -1 1;
        transform-origin: center;
    }
    :global(.rotated-tree) {
        transform-origin: center;
        rotate: calc(360deg / var(--tree-count) * var(--index));
    }
    .download_btn {
        background-color: var(--green);
        border: none;
        cursor: pointer;
    }

    :global(.download) {
        color: #2e2e2e;
        background-color: transparent;
    }
    .download_btn:disabled {
        background-color: #444444;
        cursor: not-allowed;
    }
    .download_btn:disabled:hover {
        background-color: #444444;
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

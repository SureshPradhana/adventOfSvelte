export function generate(value) {
    let name_length = value.length;
    let  characters_used = [...new Set(value.split(""))];
    let  arrangement = value.split("");
    let settings = {
        trunkLength: name_length * 10,
        treeCount: characters_used.length,
        branches: arrangement.map((char, index) => ({
            distance: index * 10,
            length: char.charCodeAt(0) % 10,
        })),
    };
    console.log(settings);
    let svgdata = buildSnowflake(settings);
    return svgdata;
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
    <line x1="50" y1="50" x2="50" y2="${50 - trunkLength}" class="line" style="stroke: #fff; stroke-width: 1px; stroke-linecap: round;"/>
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
         style="stroke: #fff; stroke-width: 1px; stroke-linecap: round;"
      />
    `;
    });
    return `<g id="tree">
    ${trunk}
    <g id="branches" style="stroke: #fff; stroke-width: 1px; stroke-linecap: round;">${branchStrings.join(" ")}</g>
    <use href="#branches" class="flipped-branches" style="scale: -1 1; transform-origin: center;"/>
  </g>`;
}

function buildTreeCopies(treeCount) {
    let copies = "";
    for (let i = 0; i < treeCount; i++) {
        copies += `
      <use 
        href="#tree" 
        style="--index: ${i}; transform-origin: center; rotate: calc(360deg / var(--tree-count) * var(--index));" 
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
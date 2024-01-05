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
      ${buildTreeCopies({treeCount,trunkLength, branches})}
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
      <line 
        x1="50" 
        y1="${startY}" 
        x2="${50 + length}" 
        y2="${startY - length}" 
        class="line flipped-branches"
         style="stroke: #fff; stroke-width: 1px; stroke-linecap: round;"
      />
    `;
    });
    return `<g id="tree">
    ${trunk}
    <g id="branches" style="stroke: #fff; stroke-width: 1px; stroke-linecap: round;">${branchStrings.join(" ")}</g>
  </g>`;
}

function buildTreeCopies({treeCount,trunkLength, branches}) {
    console.log(treeCount);
    console.log(trunkLength);
    console.log(branches);
    let copies = "";
   for (let i = 0; i < treeCount; i++) {
        const rotation = (360 / treeCount) * i;
        const tree = buildTree({ trunkLength, branches });
        copies += `<g transform="rotate(${rotation} 50 50)">${tree}</g>`;
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
<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let width :number= 540;
    let height :number= 500;
    let marginTop:number = 20;
    let marginRight:number = 20;
    let marginBottom :number= 20;
    let marginLeft:number = 20;
    let width2:number = 300;
    let height2 :number= 200;
    let x:any, y:any, xAxis:any, yAxis:any, line:any;

    let data :number[]= [];
    let url :string= "https://advent.sveltesociety.dev/data/2023/day-four.json";

    onMount(async () => {
        setInterval(async () => {
            const response = await fetch(url);
            let temp = await response.json();
            data = [...data, temp.heartRate];
            if (data.length > 10) {
                data.shift();
            }
        }, 1000);
    });

    $: x = d3
        .scaleLinear()
        .domain([0, 9])
        .range([marginLeft, width - marginRight]);
    $: y = d3
        .scaleLinear()
        .domain([55, 105])
        .range([height - marginBottom, marginTop]);
    $: x2 = d3
        .scaleLinear()
        .domain([0, data.length - 1])
        .range([0, width2]);
    $: y2 = d3.scaleLinear().domain(d3.extent(data)).range([height2, 0]);

    $: line = d3
        .line()
        .x((d, i) => x(i))
        .y((d) => y(d));

    $: line2 = d3
        .line()
        .x((d, i) => x2(i))
        .y((d) => y2(d));

    let xAxisGroup: any;
    let yAxisGroup: any;

    onMount(() => {
        xAxis = d3.axisBottom(x).tickSize(0);
        yAxis = d3.axisLeft(y).tickSize(0);

        d3.select(xAxisGroup).call(xAxis);
        d3.select(yAxisGroup).call(yAxis);
    });

    $: if (xAxisGroup && yAxisGroup) {
        d3.select(xAxisGroup).call(xAxis);
        d3.select(yAxisGroup).call(yAxis);
    }
</script>

<div class="main-wrapper">
    <div class="monitor">
        <svg {width} {height}>
            <text x="100" y="50" fill="black" id="title">
                Santa’s Heart Rate Monitor (SHRM™)
            </text>
            <text x="300" y="100" fill="black" id="title">
                x = Time (seconds)
            </text>
            <text x="300" y="120" fill="black" id="title">
                y = Heart Rate (bpm)
            </text>

            <path
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                d={line(data)}
            />
            <g fill="white" stroke="currentColor" stroke-width="1.5">
                {#each data as d, i}
                    <circle
                        key={i}
                        cx={x(i)}
                        cy={y(d)}
                        r="2.5"
                        fill={d < 60 || d > 100 ? "#6c2f2f" : "white"}
                        stroke={d < 72 || d > 100 ? "#6c2f2f" : "currentColor"}
                    />
                {/each}
            </g>
            <g
                transform={`translate(0, ${height - marginBottom})`}
                bind:this={xAxisGroup}
            />

            <!-- Y Axis -->
            <g
                transform={`translate(${marginLeft}, 0)`}
                bind:this={yAxisGroup}
            />
        </svg>
    </div>
    <div class="vital-signs">
        <div class="svg-wrapper">
            <svg
                width={width2}
                height={height2}
                viewBox={`0 0 ${width2} ${height2}`}
                class="two"
            >
                <path
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    d={line2(data)}
                />
                <g fill="white" stroke="currentColor" stroke-width="1.5">
                    {#each data as d, i}
                        <circle
                            key={i}
                            cx={x2(i)}
                            cy={y2(d)}
                            r="2.5"
                            fill={d < 72 || d > 100 ? "#6c2f2f" : "white"}
                            stroke={d < 72 || d > 100
                                ? "#6c2f2f"
                                : "currentColor"}
                        />
                    {/each}
                </g>
            </svg>
        </div>
        <div class="gridcol">
            <div class="heart-rate">
                <div class="heart">{data && data.length > 0 ? data[data.length - 1] : 89} bpm</div>
            </div>
            <div class="condition">
                <div class="condition-text">
                    {#if data[data.length - 1] > 100 || data[data.length - 1] < 60}
                        <div class="danger">abnormal</div>
                    {:else}
                        <div class="normal">normal</div>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .main-wrapper {
        height: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
    }
    svg {
        width: 100%;
        height: 100%;
        /* overflow: scroll; */
    }
    .monitor {
        margin: 1rem;
        /* overflow :scroll; */
    }
    #title {
        font-family: Sans-Serif;
        text-align: center;
        fill: #ccc;
        font-size: 1rem;
    }

    svg {
        margin: 0 auto;
    }
    .two {
        padding: 1rem;
        margin: 1rem;
        overflow: visible;
    }
    .vital-signs {
        display: grid;
        grid-template-rows: 1fr 1fr;
    }
    .gridcol {
        display: grid;
        grid-template-rows: 1fr 1fr;
        justify-content: center;
        justify-content: center;
        justify-items: center;
        align-items: center;
    }
  
    .heart {
        font-size: 3rem;
        font-weight: bold;
        color: #b5acac;
        text-align: center;
    }
    .danger {
        font-size: 1.5rem;
        font-weight: bold;
        color: #9a3f3f;
    }
    .normal {
        font-size: 1.5rem;
        font-weight: bold;
        color: var(--green);
    }
      @media (max-width: 768px) {
        .main-wrapper {
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;
            grid-template-areas:"one" "two";
        }
        .monitor{
            grid-area:two;
        }
        .vital-signs {
            grid-area:one;
            overflow: visible;
            grid-area: "div1 div2" "div1 div2";
            grid-template-columns: 1.5fr 1fr;
            grid-template-rows: 1fr;
        }
        .vital-signs > div:nth-child(1) {
            grid-area: "div1";
        }

        .vital-signs > div:nth-child(2) {
            grid-area: "div2";
        }
    }
</style>

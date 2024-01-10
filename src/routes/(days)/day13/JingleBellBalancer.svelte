<script lang="ts">
    //use cookie from static
    import { onMount } from "svelte";
    import { icons } from "feather-icons";
    let currentPage = 1;
    let pinpage = 1;
    const itemsPerPage = 18;
    let tour: any = [];
    let pin: number = -1;
    let weight: number = 0;
    let totalweight: number = 0;
    let totalweightofall: number = 0;
    let m = false;

    interface Gifts {
        name: string;
        weight: number;
    }
    let children: Gifts[] = [];
    let children2: Gifts[] = [];
    onMount(async () => {
        const response = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-thirteen.json");
        children = await response.json();
        children2 = [...children];
        totalweightofall = children.reduce((prev, current) => {
            return prev + current.weight;
        }, 0);
        console.log(children);
    });

    function addtotour(i: any) {
        // alert(i);
        if (weight > 100) {
            console.log("weight is more than 100");
            return;
        }
        if (pin == -1) {
            tour = [...tour, []];
            pin = 0;
        }
        console.log(i);
        tour[pin] = [...tour[pin], children2[i]];
        console.log(tour);
        //delete added child from children2 array
        // console.log(children2);
        console.log(children2[i]);
        try {
            children2.splice(i, 1);
            children2 = children2;
        } catch (error) {
            console.error(
                "An error occurred while filtering the children array: ",
                error,
            );
        }
        console.log("working");
        console.log(children2);
    }
    function previousPage() {
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(children.length / itemsPerPage)) {
            currentPage++;
        }
    }
    function previousPinPage() {
        if (pinpage > 1) {
            pinpage--;
        }
    }

    function nextPinPage() {
        if (pinpage < Math.ceil(tour[pin].length / itemsPerPage)) {
            pinpage++;
        }
    }

    function addtour() {
        tour = [...tour, []];
        pin = pin + 1;
        console.log(tour);
    }
    function deletetour(i: any) {
        children2=[...children2,...tour[i]]
        tour.splice(i, 1);
        tour = tour;
        console.log(tour);
        pin = pin - 1;
    }
    function reset() {
        tour = [];
        pin = -1;
        currentPage = 1;
        pinpage = 1;
        totalweight = 0;
        weight = 0;
        children2 = [...children];
    }
    function changepin(i: any) {
        return function () {
            pin = i;
            pinpage = 1;
        };
    }
    function removeadd(i: any) {
        children2 = [...children2, tour[pin][i]];
        tour[pin].splice(i, 1);
        tour[pin] = tour[pin];
    }
    function autobalancer(i: boolean) {
        if (i) {
            //manual balancer
            for (let j = 0; j < tour.length; j++) {
            let currentTour = tour[j];
            let currentWeight = currentTour.reduce((total:number, child:Gifts) => total + child.weight, 0);

            for (let k = 0; k < children2.length; k++) {
                if (currentWeight + children2[k].weight <= 100) {
                    currentTour.push(children2[k]);
                    currentWeight += children2[k].weight;
                    children2.splice(k, 1);
                    k--;
                }
            }

            tour[j] = currentTour;
        }
        } else {
            reset();
            console.log(children2);

            children2.sort((a, b) => b.weight - a.weight);

            while (children2.length > 0) {
           
                let currentTour = [];
                let currentWeight = 0;

                for (let i = 0; i < children2.length; i++) {
                    if (currentWeight + children2[i].weight <= 100) {
                        currentTour.push(children2[i]);
                        currentWeight += children2[i].weight;
                        children2.splice(i, 1);
                        i--;
                    }
                }
                tour.push(currentTour);
                pin=0
            }
        }
    }
    $: {
        if (pin != -1) {
            weight = tour[pin].reduce((prev, current) => {
                return prev + current.weight;
            }, 0);
        } else {
            weight = 0;
        }
    }
    $: {
        totalweight = children2.reduce((prev, current) => {
            return prev + current.weight;
        }, 0);
    }
</script>

<div class="main-wrapper">
    <div class="tool stats details stats2">
        <p>Total Weight:{Math.ceil(totalweight)}</p>
        <p>Tours:{tour.length}</p>
        <p> Avg Weight:{Math.ceil(totalweightofall / (tour.length <= 0 ? 1:tour.length))}</p>
        <p>
            <input type="checkbox" id="myCheckbox" bind:checked={m} />
            <label for="myCheckbox">Manual balancer</label> 
            <button on:click={() => autobalancer(m)}>Auto Balancer</button>
        </p>
        <p><button on:click={reset}>reset</button></p>
    </div>
    <div class="jingle-bell">
        <div class="tmp">
            <div class="child-wrapper">
                <div class="child details">
                    <!--filter  todo-->
                    <p>n</p>
                    <p>name</p>
                    <p>weight</p>
                    <p>+</p>
                </div>
                {#each children2.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as child, i (child)}
                    {@const index = i + 1 + (currentPage - 1) * itemsPerPage - 1}
                    <div class="child details">
                        <p>{index}</p>
                        <p>{child.name}</p>
                        <p>{child.weight}</p>
                        <p>
                            <button on:click={() => addtotour(index)}>+</button>
                        </p>
                    </div>
                {/each}
            </div>
            <div class=" control details">
                <button on:click={previousPage}>Previous</button>
                <p>{currentPage}</p>
                <button on:click={nextPage}>Next</button>
            </div>
        </div>
        <div class="tmp">
            <div class="child-wrapper">
                <div class="child details tour">
                    <!--filter  todo-->

                    <button on:click={addtour}>Tour +</button>
                </div>
                <div class="list">
                    {#each tour as child, i (child)}
                        {@const index = i}
                        <div class={`btn-wrapper btn ${pin === i ? "active" : ""}`} on:click={changepin(i)}>
                            <div>
                                Tour {i + 1}
                                <!-- <p><button on:click={() => addtotour(index)}>+</button></p> -->
                            </div>
                            <div class="btn" on:click={deletetour(i)}>
                                {@html icons.trash.toSvg({
                                    class: "feather btn-transparent",
                                    width: "18px",
                                    height: "18px",
                                })}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
        <div class="tmp">
            <div>
                <div class="tool stats details stats3">
                    <p>Weight:{Math.ceil(weight)}</p>
                    <p>Tour No:{pin + 1}</p>
                    <p class="grid2col">
                        <progress max="100" value={weight}></progress>
                        {#if weight >= 100}
                            {@html icons.layers.toSvg({
                                class: "feather txt-red",
                                width: "18px",
                                height: "18px",
                            })}
                        {:else}
                            {@html icons.shield.toSvg({
                                class: "feather txt-green",
                                width: "18px",
                                height: "18px",
                            })}
                        {/if}
                    </p>
                </div>
            </div>
            <div class="child-wrapper">
                <div class="child details stats4">
                    <!--filter  todo-->
                    <p>n</p>
                    <p>name</p>
                    <p>weight</p>
                    <p>-</p>
                </div>
                {#if pin != -1}
                    {#each tour[pin].slice((pinpage - 1) * itemsPerPage, pinpage * itemsPerPage) as child, i (child)}
                        {@const index =
                            i + 1 + (pinpage - 1) * itemsPerPage - 1}
                        <div class="child details stats4">
                            <p>{index}</p>
                            <p>{child.name}</p>
                            <p>{child.weight}</p>
                            <p>
                                <button on:click={() => removeadd(i)}>-</button>
                            </p>
                        </div>
                    {/each}
                {/if}
                <div class=" control details">
                    <button on:click={previousPinPage}>Previous</button>
                    <p>{pinpage}</p>
                    <button on:click={nextPinPage}>Next</button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    @import "$lib/assets/day3.css";
    .main-wrapper {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr;
        align-items: center;
        flex-wrap: wrap;
    }
    .stats {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr 1fr;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .jingle-bell {
        height: 100%;
        display: grid;
        grid-template-columns: 2fr 1fr 2fr;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        /* overflow: hidden; */
    }
    .tmp {
        width: 100%;
        height: 100%;
        /* background-color: #fff; */
        border: 1px solid var(--stroke);
    }

    .child {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    .tour {
        grid-template-columns: 1fr;
        padding: 0;
    }
    .tour > button {
        padding: 0;
        margin: 0;
    }
    .btn-wrapper{
        display: grid;
        grid-template-columns: 1fr auto;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
   
    .stats3 {
        grid-template-columns: 1fr 1fr 1fr;
    }
    .grid2col {
        display: grid;
        grid-template-columns: auto 1fr;
    }
    .stats3 > p > progress {
        width: 100%;
    }
    .stats4 {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
   
   
    .btn-wrapper > div {
        padding: 0.2rem 0.5rem;
        background-color: transparent;
        font-weight: bold;
    }

    @media (max-width:600px){
    .jingle-bell {
        grid-template-columns: 3fr 1fr;
        display: grid;
        grid-template-areas: "div3 div3" "div1 div2";
    }
     .jingle-bell > div:nth-child(1) {
        grid-area: div1;
    }

    .jingle-bell > div:nth-child(2) {
        grid-area: div2;
    }

    .jingle-bell > div:nth-child(3) {
        grid-area: div3;
    }

    }
</style>

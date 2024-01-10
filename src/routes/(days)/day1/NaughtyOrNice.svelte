<script lang="ts">
    import { onMount } from "svelte";
    import childrenUrl from '$lib/assets/children.json?url';
    import {icons} from "feather-icons";
    interface Child {
        name: string;
        tally: number;
        category?: string;
    }

    let name = "";
    let deed = "";
    let children: Child[] = [];
    let currentPage = 1;
    const itemsPerPage = 18;
    let naughtiest = {};
    let nicest = {};
    let niceChildren = 0;
    let naughtyChildren = 0;

    $: {
        niceChildren = children.filter((child) => child.tally > 0).length;
        naughtyChildren = children.filter((child) => child.tally < 0).length;
    }

    onMount(async () => {
        const response = await fetch(childrenUrl);
        children = await response.json();
        children = children.map((child) => ({
            ...child,
            category: child.tally > 0 ? "Nice" : "Naughty",
        }));
        console.log(children);
    });
    $: {
        if (children.length > 0) {
            naughtiest = children.reduce((prev, current) =>
                prev.tally < current.tally ? prev : current,
            );
            nicest = children.reduce((prev, current) =>
                prev.tally > current.tally ? prev : current,
            );
        }
    }

    function addNewChild() {
        children.push({
            name: name,
            tally: parseInt(deed),
            category: parseInt(deed) > 0 ? "Nice" : "Naughty",
        });
        children = [...children];
        name = "";
        deed = "";
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
    function inc(i: any) {
        children[i].tally++;
        children[i].category = children[i].tally > 0 ? "Nice" : "Naughty";
    }
    function dec(i: any) {
        children[i].tally--;
        children[i].category = children[i].tally > 0 ? "Nice" : "Naughty";
    }
    function del(i: any) {
        console.log("del function called with index:", i);
        children = children.filter(
            (_, index) => index !== i + (currentPage - 1) * itemsPerPage,
        );
    }
</script>
<!-- <div> -->
<div>
    <div class="tool stats details stats2">
        <p>naughtiest: {naughtiest.name}</p>
        <p>nicest: {nicest.name}</p>
        <p>
            Naughty: {naughtyChildren}
            <progress value={naughtyChildren} max={children.length}></progress>
        </p>
        <p>
            Nice: {niceChildren}
            <progress value={niceChildren} max={children.length}></progress>
        </p>

        <p>total: {children.length}</p>
    </div>
    <div class="tool crud details">
        <input bind:value={name} type="text" placeholder="name" id="name" />
        <input bind:value={deed} type="text" placeholder="deeds" id="deeds" />
        <button on:click={addNewChild} id="add">add</button>
    </div>
    <div class="child-wrapper">
        <div class="child details">
            <!--filter  todo-->
            <p>n</p>
            <p>name</p>
            <p>catg</p>
            <p>deeds</p>
            <p>+</p>
            <p>-</p>
            <p>

{@html icons.trash.toSvg( { class: "feather day1",width: "18px", height: "18px"})}
            </p>
        </div>
        {#each children.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as child, i (child)}
            {@const index = i + 1 + (currentPage - 1) * itemsPerPage - 1}
            <div class="child details">
                <p>{index}</p>
                <p>{child.name}</p>
                <p>{child.category}</p>
                <p>{child.tally}</p>
                <p><button on:click={() => inc(index)}>+</button></p>
                <p><button on:click={() => dec(index)}>-</button></p>
                <p><button on:click={() => del(index)}>
{@html icons.trash.toSvg( { class: "feather btn-transparent",width: "18px", height: "18px"})}

                </button></p>
            </div>
        {/each}
    </div>
    <div class=" control details">
        <button on:click={previousPage}>Previous</button>
        <p>{currentPage}</p>
        <button on:click={nextPage}>Next</button>
    </div>
</div>
<!-- </div> -->
<style>
    .wrapper-for-list{
        height: 100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
   
    .child-wrapper {
        width: 100%;
        flex: 1 0 auto;
        
    }
    .tool {
        width: 100%;
    }
    .tool > * {
        margin: 0.5rem;
    }
    .stats > * {
        display: inline-block;
        padding: 0;
        margin: 0.5rem;
    }
    .stats {
        display: grid;
        grid-template-columns: repeat(5, auto);
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .control {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .details {
        border-bottom: 1px solid var(--stroke);
    }
    progress {
        width: 20%;
        margin: 0;
        padding: 0;
    }

    button,
    .btn {
        padding: 0.2rem 0.5rem;
        background-color: var(--white);
        color: var(--black);
        font-weight: bold;
    }
    button:hover {
        background-color: var(--blue);
        color: var(--white);
        background-attachment: fixed;
    }
    .child {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 2fr 2fr 1.5fr 1fr 1fr 1.8fr;
    }
    .child > * {
        display: flex;
        align-items: center;
        justify-content: center;
        align-items: center;
        padding-left: 0.5rem;
    }
    .child > * {
        border-right: 1px solid var(--stroke);
        margin: 0;
    }
    input {
        border: none;
    }
    .control {
        gap: 1rem;
    }
    
</style>

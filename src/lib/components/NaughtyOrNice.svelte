<script lang="ts">
    import { onMount } from "svelte";
    import { icons } from "feather-icons";
    interface Child {
        name: string;
        tally: number;
        category?: string;
    }
    let name = "";
    let deed = "";
    let children: Child[] = [];
    let currentPage = 1;
    const itemsPerPage = 15;
    let naughtiest= {};
    let nicest= {};

    onMount(async () => {
        const response = await fetch("/children.json");
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
        let naughtiest = children.reduce((prev, current) =>
            prev.tally < current.tally ? prev : current,
        );
        let nicest = children.reduce((prev, current) =>
            prev.tally > current.tally ? prev : current,
        );
        if (currentPage > 1) {
            currentPage--;
        }
    }

    function nextPage() {
        if (currentPage < Math.ceil(children.length / itemsPerPage)) {
            currentPage++;
        }
    }
    function inc(e:any) {
        const index =
            e.target.parentElement.parentElement.children[0].innerText - 1;
        children[index].tally++;
        children[index].category =
            children[index].tally > 0 ? "Nice" : "Naughty";
    }
    function dec(e:any) {
        const index =
            e.target.parentElement.parentElement.children[0].innerText - 1;
        children[index].tally--;
        children[index].category =
            children[index].tally > 0 ? "Nice" : "Naughty";
    }
    function del(i:any) {
        console.log("del function called with index:", i);
        children = children.filter(
            (_, index) => index !== i + (currentPage - 1) * itemsPerPage,
        );
    }
</script>

<div class="wrapper-for-list">
    <div class="title"><h2>Naughty or Nice</h2>
        <a href="https://github.com/SureshPradhana/adventOfSvelte" target="_blank">
        {@html icons.github.toSvg( { class: "feather",width: "18px", height: "18px"})}
    </a></div>
    
    
    <div class="tool stats details stats2">
        <p>naughtiest: {naughtiest.name}</p>
        <p>nicest: {nicest.name}</p>
        <p>Naughty: {children.filter((child) => child.tally < 0).length} <progress
            value={children.filter((child) => child.tally < 0).length}
            max={children.length}
        ></progress></p>
        <p>Nice: {children.filter((child) => child.tally > 0).length} <progress
            value={children.filter((child) => child.tally > 0).length}
            max={children.length}
        ></progress></p>

        <p>total: {children.length}</p>
    </div>
    <div class="tool crud details">
        <input bind:value={name} type="text" placeholder="name" id="name" />
        <input bind:value={deed} type="text" placeholder="deeds" id="deeds" />
        <button on:click={addNewChild} id="add">add</button>
    </div>
    <div class="child details">
        <!--filter  todo-->
        <p>n</p>
        <p>name</p>
        <p>catg</p>
        <p>deeds</p>
        <p>+</p>
        <p>-</p>
        <p>delete</p>
    </div>
    {#each children.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as child, i (i)}
        <div class="child details">
            <p>{i + 1 + (currentPage - 1) * itemsPerPage}</p>
            <p>{child.name}</p>
            <p>{child.category}</p>
            <p>{child.tally}</p>
            <p><button on:click={inc}>+</button></p>
            <p><button on:click={dec}>-</button></p>
            <p><button on:click={() => del(i)}>delete</button></p>
        </div>
    {/each}

    <div class=" control details">
        <button on:click={previousPage}>Previous</button>
        <p>{currentPage}</p>
        <button on:click={nextPage}>Next</button>
    </div>
</div>

<style>
    .title{
        width:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: space-around;
        border-bottom: 1px solid #444444;
        position: relative;
        overflow:hidden;
        line-height: 1;
    }
    .title a {
        /* border-bottom: 1px solid #444444; */
        line-height: 1;
        align-self: center;
        padding:0.5rem;
    }
    h2 {
        width: 100%;
        /* border-bottom: 1px solid #444444; */
        padding: 0.5rem;
        padding-left:2rem;
    }
    h2::before {
        content: "Day 1 ";
        position:absolute;
        top:1rem;
        left:-2rem;
        font-size: 1rem;
        transform: rotate(270deg);
        background-color: white;
        color:#2e2e2e;
        /* padding: 0rem 0.4rem; */
        margin:0 0;
        padding: 0 1rem;
        

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
    .stats{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
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
        border-bottom: 1px solid #444444;
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
        color: #2e2e2e;
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
        /* margin: 0.5rem; */
    }
    .child > * {
        border-right: 1px solid #444444;
        margin: 0;
    }
    input {
        border: none;
    }
    .control {
        gap: 1rem;
        margin-top:auto;
    }
    
</style>

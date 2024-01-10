<script lang="ts">
    import { onMount } from "svelte";
    import { draggable } from '@neodrag/svelte';

    let data: any = [];
    let text: string = "";
    let fontFamily:string = 'Arial';
    let fontSize:string = '16px';
    let fontColor:string = '#fff';
    let borderStyle:string = 'none';
    let items: any = [];
    let selectedImage: any = null;

    for (let i = 1; i <= 11; i++) {
        data.push({
            index: i,
            url: `https://advent.sveltesociety.dev/data/2023/day-twelve/${i}.png`,
        });
    }

    function addText() {
        items.push({ type:"text",text, fontFamily, fontSize, fontColor, borderStyle });
        items=items;
        text = '';
    }
    function addImage() {
        if (selectedImage) {
            items.push({ type: 'image', url: selectedImage });
            items=items;
            console.log(items);
            selectedImage = '';
        }
    }

    function selectImage(url) {
          selectedImage = url;
    }

    onMount(() => {});
</script>

<main class="greetings_and_salutations">
    <div class="card">

    {#each items as item (item)}
        {#if item.type === 'text'}
            <h1 class="dragable" use:draggable={{ axis: 'both' ,bounds:"parent"}}>
            <span  style="font-family: {item.fontFamily}; font-size: {item.fontSize}; color: {item.fontColor}; border: 1px {item.borderStyle};">{item.text}</span>
            </h1>
            {:else if item.type === 'image'}
            <img use:draggable={{ axis: 'both',bounds:"parent" }} src={item.url} alt="item {item.id}"/>
        {/if}
    {/each}

    </div>
    <div class="controls">
        <div class="ele">
            <p>Elements <button on:click={addImage}>Add</button></p>
            <div class="elements">
            {#each data as d (d.index)}
                <img class:selected={selectedImage === d.url} src={d.url} alt="day {d.index}" on:click={() => selectImage(d.url)}/>
            {/each}
            </div>
        </div>
        <div class="text">
            <p>Text <button on:click={addText}>Add</button></p>
            <p> Text preview : <span style="font-family: {fontFamily}; font-size:16px; color: {fontColor}; border: 1px {borderStyle};">{text}</span></p>
            <input bind:value={text} type="text" placeholder="Enter text here" />

            <select bind:value={fontFamily} id="font-family">
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Times New Roman">Times New Roman</option>
                <!-- Add more options as needed -->
            </select>

            <input bind:value={fontSize} type="number" id="font-size" min="1" placeholder="Enter font size" />

            <input bind:value={fontColor} type="color" id="font-color" />

            <select bind:value={borderStyle} id="border-style">
                <option value="none">None</option>
                <option value="solid">Solid</option>
                <option value="dashed">Dashed</option>
                <!-- Add more options as needed -->
            </select>

            
        </div>
    </div>
</main>

<style>
    .greetings_and_salutations {
        display: grid;
        grid-template-columns: 2fr 1fr;
        padding: 0.5rem;
    }
    .card {
        border: 1px solid var(--stroke);
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.2);
        padding: 1rem;
    }
    .card *{
        background-color: transparent;
    }
    .controls {
        height: 100%;
        background-color: var(--stroke);
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
        padding: 1rem;
        display: grid;
        grid-template-rows: auto 1fr;
        
    }
    img.selected {
        border: 1px solid rgb(242, 242, 243);
    }
    .controls div {
        background-color: transparent;
    }
    .controls p {
        background-color: transparent;
    }
    .dragable{
        display: inline-block;
        width:fit-content;
    }
    p{
        margin: 0;
    }
    span{
        padding: 0.5rem;
        background-color: transparent;
    }
    .controls img {
        width:60px;
        height:60px;
        background-color: transparent;
        margin: 0.5rem 0;
        padding: 0.2rem;
    }
    .elements {
        padding: 1rem;
        display: grid;
        grid-template-columns: repeat(4,1fr);
        gap: 0.5rem;
    }
    .text{
        display: grid;
        grid-template-columns: 1fr;
        gap: 0.5rem;
        overflow: hidden;
    }
  
    @media (max-width: 600px) {
        .card{
            min-height: 250px;
        }
        .greetings_and_salutations {
            display: flex;
            flex-direction: column;
        }
    }
</style>

<script>
    //use cookie from static
    import { onMount } from "svelte";
    let progress = 0;
    let imgstr=[];

    function addProgress() {
        if (progress < 100) {
            progress += 1;
        }
        imgstr.push('<img class="image img-30" src="./cookie.0e187f81.png" alt="Your Image">');
        imgstr=imgstr;

    }
    function removeProgress(){
        if (progress > 0) {
            progress -= 1;
        }
        imgstr=imgstr.slice(0,-1);
    }
     

    let mood = "./mood4.svg";
    $: if (progress < 10) {
    mood = "./mood4.svg";
} else if (progress < 50) {
    mood = "./mood2.svg";
} else if (progress < 90) {
    mood = "./mood1.svg";
} else {
    mood = "./mood3.svg";
}
function resetProgress() {
        progress = 0;
        imgstr=[];
        mood="./mood4.png";
    }
</script>
<div class="merry">
    <div class="wrapper">
        <div class="cookies">
            <div class="image-wrapper">
            {#each imgstr as cookie, i}
                {@html cookie}
            {/each}
            </div>
        </div>
        <div class="tools">
            <div class="image-wrapper2">
                <img src="{mood}" class="mood-img"alt="Your Image">
            </div>
            <div class="needle">
                <progress max="100" value={progress}></progress>
            </div>
            <div class="stats">
                <p>total Cookies eaten {progress}</p>
            </div>
            <div class="buttons">
                <button on:click={addProgress}>Add</button>
                <button on:click={removeProgress}>Remove</button>
                <button on:click={resetProgress}>Reset</button>
            </div>
        </div>
    </div>

</div>
<style>
    .merry{
        width:100%;
        height:100%;
    }
    .wrapper{
        height:100%;
        display:grid;
        padding:1rem 1rem;
        grid-template-columns: 2fr 1fr;
    }
    .image-wrapper2{
        display:flex;
        justify-content:center;
        align-items:center;
    }
    .mood-img{
        width:80px;
        height:80px;
        margin:0.5rem;
    }

    .cookies{
        
    }
    
   
    .tools{
        height:100%;
        display:grid;
        grid-template-rows: 1fr auto auto auto;
    }
    .needle {
        width:100%;
    }
    progress {
        width:100%;
        margin:0.2rem;
    }
    button{
        width:100%;
        padding:0.5rem;
        margin:0.2rem;
    }
    .stats{
        display:flex;
        justify-content:space-around;
        align-items:center;
        flex-wrap:wrap;
    }
    @media (max-width: 600px) {
        .wrapper{
            grid-template-columns: 1fr;
            grid-template-rows: 1fr auto;

        }
        .tools{
        }
    }
</style>
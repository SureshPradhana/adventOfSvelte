<script lang="ts">
    import { onMount } from "svelte";
    export let data;
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import SantasMagicalTracker from "./SantasMagicalTracker.svelte";
    let title = "Santa's Magical Tracker";
    let day = "Day 24";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<SantasMagicalTracker {data}/>
</div>
<!-- </div> -->

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



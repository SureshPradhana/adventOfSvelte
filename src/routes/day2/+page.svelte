
<script lang="ts">
    import MerryMunchOMeter from "./MerryMunchOMeter.svelte";
    import { onMount } from "svelte";
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";

    let title = "Merry Munch-O-Meter";
    let day = "Day 2";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
    
<MerryMunchOMeter/>
</div>
<!-- </div> -->
<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
</style>


<script lang="ts">
    import { onMount } from "svelte";
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import JingleBellBalancer from "../day13/JingleBellBalancer.svelte";

    let title = "Jingle Bell Balancer 2.0";
    let day = "Day 13";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<JingleBellBalancer/>
</div>
<!-- </div> -->

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



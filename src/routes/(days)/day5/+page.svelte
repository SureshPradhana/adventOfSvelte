<script lang="ts">
    import { onMount } from "svelte";
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import PresentProgress from "./PresentProgress.svelte";

    let title = "Present Progress";
    let day = "Day 5";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<PresentProgress/>
</div>
<!-- </div> -->

<style>
    .wrapper-for-list{
        /* height:100%; */
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



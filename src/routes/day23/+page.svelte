<script lang="ts">
    import { onMount } from "svelte";
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import ElfNet from "./ElfNet.svelte";

    let title = "ElfNet Social";
    let day = "Day 23";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<ElfNet/>
</div>
<!-- </div> -->

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



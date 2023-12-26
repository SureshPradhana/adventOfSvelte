<script lang="ts">
    import { onMount } from "svelte";
    import Title from "$lib/components/Title.svelte";
    import Days from "$lib/components/Days.svelte";
    import Greeting from "./Greeting.svelte";

    let title = "Pop up! Spreading the holiday cheer";
    let day = "Day 10";

    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";
</script>


<Days />
<div class="wrapper-for-list">
    <Title {title} {day} {githubLink} />
    <Greeting />
</div>

<style>
    .wrapper-for-list {
        height: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
    }
    
</style>

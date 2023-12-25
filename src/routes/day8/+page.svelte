<script lang="ts">
    import { onMount } from "svelte";
    import Title from "$lib/components/Title.svelte";
    import Days from "$lib/components/Days.svelte";
    import Deck from "./Deck.svelte";

    let title = "Santa's Mysterious Deck of Doubles";
    let day = "Day 8";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";
</script>

<!-- <div> -->
<Days />
<div class="wrapper-for-list">
    <Title {title} {day} {githubLink} />
    <Deck />
</div>

<!-- </div> -->

<style>
    .wrapper-for-list {
        height: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
    }
</style>

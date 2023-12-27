<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Days from "$lib/components/Days.svelte";
    import ElfNameGenerator from "./ElfNameGenerator.svelte";

    let title = "Tinsel Transformers";
    let day = "Day 11";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";
</script>

<Days />
<div class="wrapper-for-list">
    <Title {title} {day} {githubLink} />
    <ElfNameGenerator />
</div>

<style>
    .wrapper-for-list {
        height: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
    }
</style>
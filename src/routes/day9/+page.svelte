<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Days from "$lib/components/Days.svelte";
    import SantasFinalCountDown from "./SantasFinalCountDown.svelte";
    let title = "Santa's Final Countdown";
    let day = "Day 9";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";
</script>

<Days />
<div class="wrapper-for-list">
    <Title {title} {day} {githubLink} />
    <SantasFinalCountDown />
</div>

<style>
    .wrapper-for-list {
        height: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
    }
</style>

<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Days from "$lib/components/Days.svelte";
    import GreetingsAndSalutations from "./GreetingsAndSalutations.svelte";

    let title = "Greetings and Salutations";
    let day = "Day 12";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";
</script>

<Days />
<div class="wrapper-for-list">
    <Title {title} {day} {githubLink} />
    <GreetingsAndSalutations />
</div>

<style>
    .wrapper-for-list {
        height: 100%;
        display: grid;
        grid-template-rows: 50px 1fr;
    }
</style>

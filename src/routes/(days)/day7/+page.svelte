<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import MorseMischief from "./MorseMischief.svelte";
    let title = "Morse Mischief";
    let day = "Day 7";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>

<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<MorseMischief/>
</div>

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



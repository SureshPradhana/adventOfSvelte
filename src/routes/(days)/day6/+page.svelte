<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import MisteltoeMetronome from "./MisteltoeMetronome.svelte";

    let title = "Misteltoe Metronome";
    let day = "Day 6";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>

<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<MisteltoeMetronome/>
</div>

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



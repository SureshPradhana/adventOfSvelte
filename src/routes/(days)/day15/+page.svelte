<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import SnowfallSymphony from "./SnowfallSymphony.svelte";

    let title = "Snowfall Symphony";
    let day = "Day 15";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<SnowfallSymphony/>
</div>
<!-- </div> -->

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



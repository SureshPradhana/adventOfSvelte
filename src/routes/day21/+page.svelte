<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import OhWeather from "./OhWeather.svelte";
    import Days from  "$lib/components/Days.svelte";

    let title = "Oh the weather outside is frightful";
    let day = "Day 21";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<OhWeather/>
</div>
<!-- </div> -->

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



<script lang="ts">
    import Title from "$lib/components/Title.svelte";
    import Days from  "$lib/components/Days.svelte";
    import FestiveFunds from "../day17/FestiveFunds.svelte";

    let title = "Festive Funds";
    let day = "Day 17";
    let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";

</script>
<!-- <div> -->
<Days/>
<div class="wrapper-for-list">
<Title {title} {day} {githubLink} />
<FestiveFunds/>
</div>
<!-- </div> -->

<style>
    .wrapper-for-list{
        height:100%;
        display:grid;
        grid-template-rows: 50px 1fr;
    }
  
</style>



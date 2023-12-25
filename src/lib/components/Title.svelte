<script>
    import { icons } from "feather-icons";
    export let title = "Naughty or Nice";
    export let day = "Day 2";
    export let githubLink = "https://github.com/SureshPradhana/adventOfSvelte";
    let dayElement;
    $: if (dayElement && dayElement.parentElement) {
        dayElement.style.width = `${dayElement.parentElement.parentElement.offsetHeight}px`;
    }
</script>

<div class="title">
    <div class="day-wrapper">
        <p bind:this={dayElement} class="day">{day}</p>
    </div>
    <h2>{title}</h2>
    <a href={githubLink} target="_blank">
        {@html icons.github.toSvg({
            class: "feather",
            width: "18px",
            height: "18px",
        })}
    </a>
</div>

<style>
    .day-wrapper {
        width: 50px;
        background-color: #2e2e2e;
        color: white;
        transform: rotate(270deg);
        box-sizing: border-box;
        height: 50px;
    }
    .day {
        width: 100%;
        font-size: 0.8rem;
        /* transform: rotate(270deg); */
        background-color: white;
        color: #2e2e2e;
        margin: 0 auto;
        padding: 0 1rem;
    }
    .title {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: space-around;
        border-bottom: 1px solid #444444;
        position: relative;
        overflow: hidden;
        line-height: 1;
        align-self: start;
    }
    .title a {
        line-height: 1;
        align-self: center;
        padding: 0.5rem;
    }
    h2 {
        width: 100%;
        padding: 0.5rem 0;
    }
    @media (max-width: 600px) {
        h2{
            font-size: 1.2rem;
        }
    }
</style>

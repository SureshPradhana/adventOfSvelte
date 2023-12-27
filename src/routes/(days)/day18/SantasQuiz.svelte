<script lang="ts">
    import { onMount, tick } from "svelte";
    import { fade } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    let isLoading:boolean = false;
    let isQuizStarted :boolean= false;
    let data:any[] = [];
    let i :number= 0;
    let selectedOption:any = null;

    onMount(async () => {
        data = await fetchData();
    });

    async function fetchData() {
        const response = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-eighteen.json",
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    async function loader() {
        isLoading = true;
        isLoading = false;
        isQuizStarted = true;
    }
    function checker(isCorrect, option) {
        selectedOption = option;
        if (isCorrect) {
            setTimeout(() => {
                i++;
            }, 1300);
        } else {
        }
    }
</script>

<div
    class="santa-quiz"
    style="background-image:linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(./quiz6.jpeg)"
>
    {#if !isQuizStarted}
        <div class="first">
            <h1>Are you ready for the quiz?</h1>
            <button on:click={loader}>        
                    Ready
            </button>
        </div>
    {:else}
        <div
            class="quiz-container"
            transition:fade={{ duration: 1000, easing: cubicOut }}
        >
            <h1>Quiz</h1>
            <div class="quiz">
                <div class="question">
                    <p>{data[i].question}</p>
                </div>
                <div class="options">
                    {#each data[i].answers as option, i (option)}
                        <div>
                            <button
                                on:click={() => checker(option.correct, option)}
                                class="option {selectedOption === option
                                    ? option.correct
                                        ? 'correct'
                                        : 'wrong'
                                    : ''}"
                            >
                                {option.text}
                            </button>
                        </div>
                    {/each}
                </div>
            </div>
            <div class="control">
                <button on:click={() => i > 0 && i--}>prev</button>
                <button on:click={() => i < data.length - 1 && i++}>next</button
                >
            </div>
        </div>
    {/if}
</div>

<style>
    
    * {
        font-family: "Caveat", "Mountains of Christmas", "Roboto",
            "Rubik Bubbles", sans-serif;
        background: transparent;
    }
    .santa-quiz {
        font-family: "Caveat", "Mountains of Christmas", "Roboto",
            "Rubik Bubbles", sans-serif;
        height: 100%;
        background-image: linear-gradient(
                rgba(0, 0, 0, 0.5),
                rgba(0, 0, 0, 0.5)
            ),
            url("./quiz2.jpeg");
        background-size: cover;
        background-position: center;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .first {
        display: flex;
        justify-content: space-around;
        align-items: space-around;
        flex-direction: column;
        background: transparent;
        gap: 1rem;
    }
    .santa-quiz h1 {
        font-size: 3rem;
        font-weight: bolder;
        color: #c8ceae;
        text-align: center;
        padding: 1rem;
    }
    .first > button {
        width: 100%;
        height: 50px;
        color: #99ca6d;
        font-size: 3rem;
        font-weight: bold;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        text-align: center;
    }
    .first > button:hover {
        color: rgb(207, 207, 122);
    }
    .quiz-container {
        width: 600px;
        height: auto;
        border-radius: 10px;
        /* background-color: rgba(68, 68, 68, 0.5); */
        margin: 0.5rem;
        padding: 0.5rem;
    }
    .quiz {
        display: grid;
        grid-template-rows: 1fr 1fr;
        font-size: 1.5rem;
    }
    .options {
        font-size: 1.5rem;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }
    .option {
        width: 100%;
        height: 100%;
        font-size: 1.5rem;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        text-align: center;
        color: #c8ceae;
        padding: 0.2rem;
    }
    .option:hover {
        color: rgb(207, 207, 122);
    }
    .question {
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .question > p {
        font-size: 1.5rem;
        text-align: center;
    }
    .control {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .option.correct {
        color: var(--green);
    }
    .option.wrong {
        color: rgb(255, 102, 0);
    }
    .control > button {
        width: 50px;
        height: 30px;
        font-size: 1rem;
        border-radius: 10px;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        text-align: center;
        color: #353535;
        background-color: #dddfdc;
        padding: 0.2rem;
        margin: 0.5rem;
    }
    .control > button:hover {
        color: chocolate;
    }
    @media (max-width: 600px) {
        .quiz-container {
            width: 100%;
        }
    }
</style>

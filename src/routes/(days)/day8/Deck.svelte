<script>
    import { onMount, tick } from "svelte";
    let cards = [];
    let flippedCards = [];
    let matchedCards = [];
    let fastestTime = 0;
    let startTime;
    let time = 0;
    let timerId;
    let canFlip = true;
    function formatTime(milliseconds) {
        let totalSeconds = Math.floor(milliseconds / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    function startTimer() {
        timerId = setInterval(() => {
            let timeTaken = Date.now() - startTime;
            time = formatTime(timeTaken);
        }, 1000);
    }
    function stopTimer() {
        clearInterval(timerId);
    }
    if (matchedCards.length === cards.length) {
        stopTimer();
    }
    onMount(() => {
        startTime = Date.now();
        let cardNumbers = Array.from({ length: 12 }, (_, i) => i + 1);
        cards = cardNumbers.map((card, i) => ({
            id: i,
            card,
            flipped: false,
            matched: false,
        }));
        cards = cards.concat(
            cardNumbers.map((card, i) => ({
                id: i + cardNumbers.length,
                card,
                flipped: false,
                matched: false,
            })),
        );
        cards.sort(() => Math.random() - 0.5);
        startTime = Date.now();
        startTimer();
    });
    async function flip(card) {
        if(!canFlip) return
        card.flipped = !card.flipped;
        cards = [...cards];
        if (flippedCards.length == 0) {
            flippedCards.push(card);
        } else if (flippedCards.length == 1) {
            if (flippedCards[0].card === card.card) {
                flippedCards[0].matched = true;
                card.matched = true;
                matchedCards = [...matchedCards, ...flippedCards, card];
                flippedCards = [];
            } else {
                await tick();
                card.flipped = true;
                flippedCards[0].flipped = false;

                card.flipped = false;
                flippedCards = [];
            }
        }
        console.log(flippedCards);
        console.log(matchedCards);
        console.log(cards);

        if (matchedCards.length === 24) {
            let endTime = Date.now();
            let timeTaken = endTime - startTime;
            if (fastestTime === 0) {
                stopTimer()
                startTime = Date.now();
                fastestTime = timeTaken;
            } else if (timeTaken < fastestTime) {
               stopTimer()
                startTime = Date.now();
                fastestTime = timeTaken;
            }else{
                stopTimer()
            }
        }
    }
</script>

<div class="Deck">
    <div class="game-board">
        {#each cards as card (card.id)}
            <button
                class={card.matched ? "card matched" : "card"}
                on:click={() => {
                    flip(card);
                }}
            >
                {#if card.flipped}
                    <img
                        src={`https://advent.sveltesociety.dev/data/2023/day-eight/${card.card}.png`}
                        alt="card"
                    />
                {:else}
                    <img src="./cardback.png" alt="card back" />
                {/if}
            </button>
        {/each}
    </div>
    <div class="controls">
        <button
            on:click={() => {
                canFlip = true;
                stopTimer();
                cards = cards.map((card) => ({
                    ...card,
                    flipped: false,
                    matched: false,
                }));
                flippedCards = [];
                matchedCards = [];
                startTime = Date.now();
                startTimer();
            }}
        >
            Reset
        </button>
        <button
            on:click={() => {
                canFlip = false;
                stopTimer();
                flippedCards = [];
                matchedCards = [];
                startTime = Date.now();
                cards = cards.map((card) => ({
                    ...card,
                    flipped: true,
                    matched: false,
                }));
            }}
        >
            Reveal
        </button>

        <button
            on:click={() => {
                canFlip = false;
                stopTimer()
                flippedCards = [];
                matchedCards = [];
                startTime = Date.now();
                cards = cards.map((card) => ({
                    ...card,
                    flipped: false,
                    matched: false,
                }));
            }}
        >
            Hide
        </button>

        <div class="timer">
            <p>Time: {time}</p>
            <p>Matched pairs {matchedCards.length/2}/12</p>
            <p>Fastest Time: {formatTime(fastestTime)}</p>
        </div>
    </div>
</div>

<style>
    .Deck {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .game-board {
        width: 400px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 2px;

        height: 400px;
    }
    .game-board>button{
        background-color: transparent;
        margin: 0.2rem;
        padding: 0;
    }
    .card.matched {
        filter: blur(0.5px);
        filter: brightness(0.5);
    }
    .controls{
        margin: 0.5rem;

    }
    .controls > *{
        margin: 0.2rem;
    }

    @media (max-width: 600px) {
        .game-board {
            width: 300px;
            height: 300px;
        }
    }
</style>

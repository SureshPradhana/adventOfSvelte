<script lang="ts">
    import { onMount } from "svelte";
    let value: string = "Helllo World";
    let morse: string = "";
    let audioContext: any;
    let gainNode: any;
    let isMounted: boolean = false;
    let morsefyChar = (char: string): string => {
        switch (char) {
            case "a":
                return "•";
            case "b":
                return "—•••";
            case "c":
                return "—•—•";
            case "d":
                return "—••";
            case "e":
                return "•";
            case "f":
                return "••—•";
            case "g":
                return "—••";
            case "h":
                return "••••";
            case "i":
                return "••";
            case "j":
                return "•———";
            case "k":
                return "—•—";
            case "l":
                return "•—••";
            case "m":
                return "——";
            case "n":
                return "—•";
            case "o":
                return "———";
            case "p":
                return "•——•";
            case "q":
                return "——•—";
            case "r":
                return "•—•";
            case "s":
                return "•••";
            case "t":
                return "—";
            case "u":
                return "••—";
            case "v":
                return "•••—";
            case "w":
                return "•——";
            case "x":
                return "—••—";
            case "y":
                return "—•——";
            case "z":
                return "——••";
            case "1":
                return "•————";
            case "2":
                return "••———";
            case "3":
                return "•••——";
            case "4":
                return "••••—";
            case "5":
                return "•••••";
            case "6":
                return "—••••";
            case "7":
                return "——•••";
            case "8":
                return "———••";
            case "9":
                return "————•";
            case "0":
                return "—————";
            case " ":
                return "/";
            default:
                return "";
        }
    };

    onMount(() => {
        console.log("MorseMischief Mounted");
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        isMounted = true;
    });

    $: if (isMounted) morse = morsefy(value);

    function playDot() {
        let o = audioContext.createOscillator();
        let gainNode = audioContext.createGain();
        gainNode.gain.exponentialRampToValueAtTime(
            0.00001,
            audioContext.currentTime + 0.04,
        );
        gainNode.connect(audioContext.destination);
        o.type = "sine";

        o.connect(gainNode);
        gainNode.gain.exponentialRampToValueAtTime(
            0.00001,
            audioContext.currentTime + 0.1,
        );
        o.frequency.value = 600;
        o.start();
        o.stop(audioContext.currentTime + 0.1);
        console.log("dot");
    }

    function playDash() {
        let o = audioContext.createOscillator();
        let gainNode = audioContext.createGain();
        gainNode.gain.exponentialRampToValueAtTime(
            0.00001,
            audioContext.currentTime + 0.04,
        );
        o.frequency.value = 3520;
        gainNode.connect(audioContext.destination);
        o.type = "square";

        o.connect(gainNode);

        o.start();
        o.stop(audioContext.currentTime + 0.3);
        console.log("dash");
    }

    function playSpace() {
        let o = audioContext.createOscillator();
        let gainNode = audioContext.createGain();
        gainNode.gain.exponentialRampToValueAtTime(
            0.00001,
            audioContext.currentTime + 0.04,
        );
        gainNode.connect(audioContext.destination);
        o.type = "sawtooth";
        o.frequency.value = 1865;
        o.connect(gainNode);
        o.start();
        o.stop(audioContext.currentTime + 0.7);
        console.log("space");
    }

    let currentCharIndex = -1;

function playMorse() {
    let totalTime = 0;

    for (let i = 0; i < morse.length; i++) {
        if (morse[i] === "•") {
            setTimeout(() => {
                currentCharIndex = i;
                playDot();
            }, totalTime);
        } else if (morse[i] === "—") {
            setTimeout(() => {
                currentCharIndex = i;
                playDash();
            }, totalTime);
        } else if (morse[i] === "/") {
            setTimeout(() => {
                currentCharIndex = i;
                playSpace();
            }, totalTime);
        }
        totalTime += 300; // Adjust this value as needed
    }
}   
 function morsefy(text: string): string {
        console.log("morseee");
        let morse = "";
        for (let i = 0; i < text.length; i++) {
            let morsec = morsefyChar(text[i].toLowerCase());

            morse += morsec + " ";
        }
        return morse;
    }
</script>

<div class="morse-mischief">
    <div class="morse-continer">
        <div class="morse-mischief__preview typewriter">
            <p>
            {#each morse.split('') as char, i}
            <span class={i === currentCharIndex ? 'greeno' : ''}>{char}</span>
        {/each}
        </p>
    </div>

        <div class="morse-mischief__morse">
            <input type="text" bind:value class="morse-mischief__input" />
            <button on:click={playMorse}>play</button>
        </div>
    </div>
</div>

<style>
    :global(.greeno) {
        color: var(--green);
    }
    .morse-mischief {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .morse-continer {
        padding: 1rem;
        max-width: 800px;
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    input {
        width: inherit;
        height: 100%;
        font-size: 2rem;
        background-color: transparent;
        border: none;
        border-bottom: 1px solid #fff;
        outline: none;
        color: #fff;
        font-family: monospace;
        text-align: center;
        word-wrap: break-word;
    }
    .morse-mischief__morse {
        width: 100%;
        max-width: 100%;
        min-width: 100%;
        display: flex;
    }
    .morse-mischief__preview {
        background-color: transparent;
    }
    .typewriter p {
        width: auto;
        color: #fff;
        font-family: monospace;
        overflow: hidden; /* Ensures the content is not revealed until the animation */
        margin: 0 auto; /* Gives that scrolling effect as the typing happens */
        letter-spacing: 0.15em; /* Adjust as needed */
        word-wrap: break-word;
        font-size: 1.5rem;
    }
    /* The typing effect */

    button {
        border: none;
        outline: none;
        color: #2e2e2e;
        font-size: 2rem;
        font-family: monospace;
        cursor: pointer;
    }
    button:hover {
        color: #fff;
    }
    @media(max-width: 800px) {
        .morse-mischief__morse{
            display: grid;
            grid-template-rows: 1fr 1fr;
            grid-gap: 1rem;
        }
    }
</style>

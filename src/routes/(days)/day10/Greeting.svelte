<script>
    // import { onMount } from "svelte";
    import ChristmasPopup from "@sureshpradhana/christmas-popup";
    // let show = false;

    // onMount(() => {
    //     setTimeout(() => {
    //         show = true;
    //     }, 12000); 
    // });
</script>

<div class="greeting">
    <ChristmasPopup />
    <div class="npm-link">
       <a href="https://www.npmjs.com/package/@sureshpradhana/christmas-popup" target="_blank">npm link christmas greeting popup</a>
    </div>
    <!-- {#if show}
        <div class="popup">
            
            <img
                src="greetings.svg"
                alt="greeting"
                width="200px"
                height="100px"
                class="greeting-image"
            />
            <h1>Merry Christmas!</h1>
            <p>
                Wishing you a very Merry Christmas and a wonderful New Year. May
                all your dreams for the coming year be fulfilled.
            </p>
            <div class="close-btn">
                <button on:click={() => (show = false)}>X</button>
            </div>
        </div>
    {/if} -->
</div>

<style>
    .greeting {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .npm-link {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 1rem;
    }
    .npm-link a {
        color: white;
        text-decoration: none;
        font-family: "monospace";
        font-size: 1rem;

    }
    .npm-link a:hover {
        color: var(--green);
    }
    /* .greeting {
        width: 100%;
        height: 100%;
    }
    .popup {
        width: 40%;
        height: auto;
        background-color: var(--stroke);
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 100;
        transform: translate(-50%, -50%);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 1rem;
        border-radius: 10px;
    }
    .popup * {
        background-color: transparent;
        color: white;
        font-family: "monospace";
        text-align: center;
    }
    .close-btn {
        position: absolute;
        top:0;
        right:0;
    } */
</style>

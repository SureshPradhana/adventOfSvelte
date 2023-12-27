<!-- ElfNameGenerator.svelte -->
<script lang="ts">
    import { onMount } from "svelte";
    import type { NamesList } from "$lib/index.ts";

    let userFirstName: string = "";
    let userLastName: string = "";
    let elfName: string = "";

    let namesList: NamesList;

    onMount(async () => {
        // Fetch the elf names data
        const response = await fetch(
            "https://advent.sveltesociety.dev/data/2023/day-eleven.json",
        );
        namesList = await response.json();
    });

    function generateElfName() {
        // Ensure user entered both first and last names
        if (!userFirstName || !userLastName) {
            alert("Please enter both first and last names.");
            return;
        }

        // Generate elf name using a deterministic algorithm (simple hash function)
        const hash =
            hashCode(userFirstName.trim()) + hashCode(userLastName.trim());

        console.log(hash);
        const randomFirstName =
            namesList.firstNames[Math.abs(hash) % namesList.firstNames.length];
        const randomLastName =
            namesList.lastNames[Math.abs(hash) % namesList.lastNames.length];
        console.log(randomFirstName, randomLastName);

        elfName = `${randomFirstName} ${randomLastName}`;
    }

    // Simple hash function
    function hashCode(s: string): number {
        let hash = 0;
        for (let i = 0; i < s.length; i++) {
            const char = s.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
</script>

<main class="elf_name_generator">
    <div class="name_generator_box">
        <h1>Elf Name Generator</h1>

        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" bind:value={userFirstName} />

        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" bind:value={userLastName} />

        <button on:click={generateElfName}>Generate Elf Name</button>

        <div>
            <p>Your Elf Name:</p>
            {#if elfName}
                <p class="fancy-text2">🧝🏻 {elfName}</p>
            {:else}
                <p>🧝🏻</p>
            {/if}
        </div>
    </div>
</main>

<style>
    .elf_name_generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    .name_generator_box {
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: center;
        height: 100%;
        margin: 0.5rem;
        padding: 1rem;
    }
    h1 {
        font-size: var(--h5);
        text-align: left;
    }
    .name_generator_box input {
        margin: 0.5rem;
        padding: 0.5rem;
        /* border-radius: 10px; */
        border: 1px solid #ccc;
        width: 100%;
        max-width: 300px;
    }
    .name_generator_box >* {
        margin: 0.5rem;
    }
    .name_generator_box label {
        margin: 0.5rem;
        text-align: left;
    }
    .fancy-text2 {
        font-size: var(--h6);
        font-weight: bold;
        text-align: center;
        color: #b5b5b5;
        font-family: "festive";
    }
</style>

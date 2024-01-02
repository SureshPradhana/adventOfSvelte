<script lang="ts">
    import Popup from "$lib/components/Popup.svelte";
    let value: number = 40;
    let spent: number = 0;
    $: remaining = value - spent;

    interface Gift {
        id: number;
        name: string;
        price: number;
    }

    let gifts :Gift[] = [];
    let name: string = "";
    let price: number = 0;
    let showModal : boolean= false;
    let modalMessage : string= "";

    function addGift() {
        if (value <= 0) {
            modalMessage = "you budget can't be negative";
            showModal = true;
            return;
        }
        if (price < 0) {
            modalMessage = "price can't be negative";
            showModal = true;
            return;
        }
        if (name === "" || price === 0) {
            modalMessage = "name and price can't be empty";
            showModal = true;
            return;
        }
        if (remaining < price) {
            modalMessage = "You don't have enough budget";
            showModal = true;
            return;
        }

        let giftName = name;
        let giftPrice = price;
        gifts = [
            ...gifts,
            { id: gifts.length, name: giftName, price: giftPrice },
        ];
        spent += Number(giftPrice);
        name = "";
        price = 0;
    }
    function closeModal() {
        showModal = false;
    }
</script>

<main class="festive_funds">
    <Popup show={showModal} message={modalMessage} close={() => closeModal()} />

    <div>
        <h1>Total Budget for Gifts</h1>
        <input type="number" bind:value placeholder="Enter your budget" />
    </div>
    <div>
        <p>spent {spent}</p>
        <p>remaining {remaining}</p>
    </div>
    <div>
        <h1>Gifts</h1>
        <input type="text" bind:value={name} placeholder="Enter gift name" />
        <input
            type="number"
            bind:value={price}
            placeholder="Enter gift price"
            min="0"
        />
        <button on:click={() => addGift()}>Add</button>
    </div>

    <div>
        <h1>Gift List</h1>
        <table>
            {#each gifts as gift (gift.id)}
                <tr>
                    <td>{gift.name}</td>
                    <td>{gift.price}</td>
                </tr>
            {/each}
        </table>
    </div>
</main>

<style>
    .festive_funds {
        height: 100%;
        display: grid;
        background-color: red;
    }
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
    }
</style>

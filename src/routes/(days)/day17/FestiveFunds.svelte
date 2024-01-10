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

    let gifts: Gift[] = [];
    let name: string = "";
    let price: number = 0;
    let showModal: boolean = false;
    let modalMessage: string = "";

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

    <div class="one">
        <div>
            <p>Total Budget <input type="number" bind:value placeholder="Enter your budget" /></p>
            
            <p>spent: {spent}</p>
            <p>remaining: {remaining}</p>
        </div>
    </div>

    <div class="two">
        <div class="two-one">
            <p>Gift List</p>
            <table>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                {#each gifts as gift (gift.id)}
                    <tr>
                        <td>{gift.name}</td>
                        <td>{gift.price}</td>
                    </tr>
                {/each}
            </table>
        </div>
        <div class="two-two">
            <p>Add Gift</p>
            <input
                type="text"
                bind:value={name}
                placeholder="Enter gift name"
            />
            <input
                type="number"
                bind:value={price}
                placeholder="Enter gift price"
                min="0"
            />
            <button on:click={() => addGift()}>Add</button>
        </div>
    </div>
</main>

<style>
    .festive_funds {
        height: 100%;
        display: grid;
        grid-template-rows: auto 1fr;
        margin: 0.5rem;
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
    .one {
         padding: 0.2rem;
         border-left: 1px solid var(--stroke);
            border-right: 1px solid var(--stroke);
            border-top: 1px solid var(--stroke);
    }
    .one div{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .one div p{
        display: inline-block;
    }
    .two {
        display: grid;
        grid-template-columns: 2fr 1fr;
        grid-gap: 10px;
        border: 1px solid var(--stroke);
    }
    .two-one {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
    .two-one table {
        border-collapse: collapse;
        width: 100%;
    }
    .two-one table tr {
        text-align: center;
        border-bottom: 1px solid var(--stroke);
        
    }
    .two-one table tr th {
        padding: 10px;
        border-bottom: 1px solid #5b5a5a;
    }
    .two-one table tr td {
        padding: 10px;
    }
    .two-two{
        display: flex;
        flex-direction: column;
        justify-content:flex-start;
        align-items: center;
        /* margin: 0 auto; */
        gap:1rem;
        border-left: 1px solid var(--stroke);
    }
    .two-two p{
     text-align: center;
    }
   
   

</style>

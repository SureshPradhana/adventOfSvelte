<script>
    export let message = '';
    export let show = false;
    export let close = () => {};
</script>

{#if show}
    <div class="modal">
        <p>{message}</p>
        <button on:click={close}>Close</button>
    </div>
{/if}

<style>
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
    z-index: 100;
}

.modal p {
    padding:0.2rem 0.5rem;
}
</style>
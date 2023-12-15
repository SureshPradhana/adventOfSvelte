<script>
    import {data} from "$lib/utils/days";
</script>

<div class="wrapper-for-list">
    <div class="list">
        {#each data as day}
        <div class="list-item">
            <div class="list-item__title">
                <p>{day.title}</p>
            </div>
            <div class="list-item__content">
                <p>{day.ref}</p>
            </div>
            <div class="list-item__link">
                <a href={day.link} target="_blank">Link</a>
            </div>
        </div>
        {/each}
    </div>
</div>

<style>
    .wrapper-for-list {
        
        display: flex;
        justify-content: center;
        align-items: center;
        margin:2rem auto;
    }

    .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        /* gap: 0.5rem; */
        width: 100%;
        /* max-width: 500px; */
    }

    .list-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        width: 90%;
        padding: 0.2rem;
        border-bottom: 1px solid var(--stroke);
        /* border-radius: 5px; */
    }

    .list-item__title {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

   
    .list-item__content {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .list-item__content p {
        color: rgb(193, 88, 50);
    }

    .list-item__link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
    }

    .list-item__link a {
        color: var(--green);
        transition: color 0.2s ease;
    }

    .list-item__link a:hover {
        color: var(--blue);
    }
</style>
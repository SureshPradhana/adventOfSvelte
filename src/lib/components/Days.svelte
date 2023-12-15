<script>
    import {data} from "$lib/utils/days";
</script>

    <div class="list">
        {#each data as day}
        <!-- <div class=""> -->
           
                <a href={day.link} target="_blank" class="list-item">{day.ref}</a>
        <!-- </div> -->
        {/each}
    </div>


<style>
    .list{
        width:50px;
        display: grid;
        margin:0;
        padding: 0;
        height: 100%;
    }
    
    a{
        padding: 0 0.2rem;
        border: 1px solid #2e2e2e;
        background-color: var(--white);
        color: #2e2e2e;
        font-weight: bold;
        font-size: 0.8rem;
        /* line-height: 1rem; */
        align-items: center;
        text-decoration: none;
        display: flex;
        justify-content: center;
    }
    .list-item:hover {
        background-color: var(--blue);
        color: var(--white);
        background-attachment: fixed;
    }
    

    /* .list {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    } */


</style>
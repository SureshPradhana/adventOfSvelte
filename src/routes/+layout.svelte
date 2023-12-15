<script>
    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";
</script>

<Header />
<div class="main-wrapper">
    <div class="title-wrapper">
        <slot />
    </div>
</div>
<Footer />

<style>
    .main-wrapper {
        width: 100vw;
        margin: 1rem auto;
        display: flex;
        justify-content: center;
        flex: 1 0 auto;
    }
    /* .title-wrapper {
        display: flex;
        max-width: 1000px;
        flex-direction: row;
        justify-content: center;
        align-content: center;
        padding:0px;
        margin:0px;
    } */
    .title-wrapper {
        max-width: 1000px;
        width:1000px;
        display: grid;
        grid-template-columns: 50px 1fr;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
</style>

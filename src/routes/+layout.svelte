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
    .title-wrapper {
        max-width: 1000px;
        width: 1000px;
        display: grid;
    }
</style>

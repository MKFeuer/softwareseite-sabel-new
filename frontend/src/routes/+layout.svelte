<script>
    import Header from "./Header.svelte";
    import Footer from "./Footer.svelte";
</script>

<div class="container">
    <Header />
    <slot />
    <Footer />
</div>

<style>
   .container {
        max-width: 90em;
        margin: 0 auto;
    }
</style>

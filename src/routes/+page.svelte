<script>
    import Main from "../lib/component/main.svelte";
    import Navbar from "../lib/component/navbar.svelte";
    import Slide from "../lib/component/slide.svelte";
</script>

<svelte:head>
    <title>gedit3: cell type deconvolution</title>
    <meta charset="utf-8" />
    <meta name="author" content="Clove Taylor" />
    <meta name="description" content="GEDIT3: Fast and free open-source web application for in-silico cell type deconvolution. Generate cell type frequencies without the need for slow and expensive flow cytometry." />
    <meta property="og:description" content="Fast and free open-source web application for in-silico cell type deconvolution. Generate cell type frequencies without the need for slow and expensive flow cytometry." />
    <meta property="og:title" content="GEDIT3: Open-source gene expression deconvolution interactive tool" />
</svelte:head>

<div class="content">
    <Navbar />
    <Main />
</div>

<style lang="scss">
    .content {
        display: flex;
        flex-direction: column;
        height: 100vh;
        max-height: 100vh;
        overflow-y: hidden;
    }
</style>
<script>
    import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Modal } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import geditLogo from '$lib/img/SVG/gedit-logo.svg';
    import Blurb from './blurb.svelte';

    let showAboutModal = false;
    let stats = null;

    onMount(() => {
        fetch("/util/stats.json")
        .then((data) => data.json())
        .then((jsondata) => stats = jsondata)
        .catch((err) => {
            console.log(err);
            stats = null;
        })
    })

</script>


<Modal title={"About"} bind:open={showAboutModal} autoclose outsideclose class="max-w-[55vw]">
    <p><strong>GEDIT v3.0</strong> software written by Brian Nadel and Clove Taylor.</p>
    {#if stats}
        <div class="flex flex-col gap-1 mt-4">
            <span>Total requests made: {stats.total_requests ?? "Unknown"}</span>
            <span>Total analyses performed: {stats.total_runs ?? "Unknown"}</span>
            <span>Total genes counted: {stats.total_genes ?? "Unknown"}</span>
            <span>Total cells counted: {stats.total_cells ?? "Unknown"}</span>
            <span>Total samples counted: {stats.total_samples ?? "Unknown"}</span>
        </div>
    {:else}
        <span>Failed to load stats.</span>
    {/if}
</Modal>

<div class="gradient">
    <Navbar class="py-4" fluid=true>
        <NavBrand href="/" class="flex-col gap-0 items-start h-full">
            <img src={geditLogo} class="logo" alt="gedit3 logo" title="gedit3: the gene expression deconvolution interactive tool"/>
          <!-- <span class="whitespace-nowrap text-4xl font-semibold dark:text-white">gedit<sup>3</sup></span>
          <span class="text-md">the gene expression deconvolution interactive tool</span> -->
        </NavBrand>
        <NavHamburger  />
        <NavUl ulClass="flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 text-lg font-medium">
            <NavLi class="cursor-pointer select-none" on:click={() => showAboutModal = true}>About</NavLi>
            <NavLi href="https://www.biorxiv.org/content/10.1101/728493v2">Read the Paper</NavLi>
            <NavLi href="https://scholar.google.com/scholar?cluster=10492765248119991160&hl=en&as_sdt=0,5#d=gs_cit&t=1719196159912&u=%2Fscholar%3Fq%3Dinfo%3AeGvBbWbKnZEJ%3Ascholar.google.com%2F%26output%3Dcite%26scirp%3D0%26scfhb%3D1%26hl%3Den">Cite GEDIT</NavLi>
        </NavUl>
    </Navbar>
</div>



<style lang="scss">
    .gradient {
        border-image-slice: 1;
        border-bottom: solid 0px;
        box-shadow: 0px 0px 10px 0px #0003;
        border-image-source: linear-gradient(to left, #020055, #811E3B, #FF3C23);
        height: min-content;
        //border-image-source: linear-gradient(to left, #743ad5, #d53a9d);
    }
    .logo {
        height: 50px;
    }
</style>
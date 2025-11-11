<script>
    import Mixture from './mixture.svelte';
    import Reference from './reference.svelte';
    import Results from './results.svelte';
    import Settings from './settings.svelte';
    import Submit from './submit.svelte';
    import Message from './message.svelte';
    import Blurb from './blurb.svelte';
    import { onMount } from 'svelte';

    let isSafari = false;

    onMount(() => {
        isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    })

</script>

<div class="main-container p-5">
    <!-- <Breadcrumb aria-label="Default breadcrumb example">
        <BreadcrumbItem href="/" home>Select mixture</BreadcrumbItem>
        <BreadcrumbItem href="/">Choose reference</BreadcrumbItem>
        <BreadcrumbItem>Flowbite Svelte</BreadcrumbItem>
    </Breadcrumb> -->
    <div class="carousel">
        <div class="content">
            <div class="left">
                <Blurb />
            </div>
            <div class="center">
                <div class="announcement">
                    <Message message={{ type: "announcement" }}>
                        <div>
                            This is the development version of GEDIT 3.0. Please report any bugs to <a class="underline" href="mailto:cloves@stanford.edu">cloves@stanford.edu</a>.
                        </div>
                    </Message>
                </div>
                {#if isSafari}
                    <div class="announcement">
                        <Message message={{ type: "error" }}>
                            <div>
                                This version of GEDIT is not well supported on Safari. Please consider using a different browser.
                            </div>
                        </Message>
                    </div>
                {/if}
                <Mixture />
                <Reference />
                <Settings />
                <Submit />
            </div>
            <div class="right">

            </div>
        </div>
        <Results />
    </div>
</div>

<style lang="scss">
    @import '../style/containers.scss';

    :global(body) {
        overflow: hidden;
    }    
    .main-container {
        height: auto;
        overflow-y: scroll;
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        @apply gap-5;
        .carousel {
            display: flex;
            flex-direction: column;
            justify-content: space-evenly;
            align-items: center;
            //min-height: 70%;
            height: max-content;
            width: 100%;
            .content {
                display: grid;
                grid-template-columns: 1fr 3fr 1fr;
                @media screen and (max-width: 900px) {
                    display: flex;
                    flex-direction: column;
                }
                .left, .right {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                }
            }
        }
    }
    .announcement {
        @include slide;
        @apply px-8 py-4;
    }
</style>
<script>
    import { mixtureMatrix, uploadedMixtureMatrix } from '../../store';
    import Examples from "./examples.svelte";
    import Message from './message.svelte';
    import Slide from "./slide.svelte";
    import Upload from "./upload.svelte";

    import { Alert, Banner, Button, Radio } from 'flowbite-svelte';
    import { Tabs, TabItem } from 'flowbite-svelte';

    import { CheckOutline, DnaOutline, ExclamationCircleOutline, FlagOutline, InfoCircleOutline } from 'flowbite-svelte-icons';
    
    export let next = false;

    const exampleMixtures = [
        {
            "name": "Human Immune Cells",
            "type": "Illumina HT12 beadarray"
        },
        {
            "name": "Human Skin Diseases",
            "type": "Various Platforms"
        }
    ]
    let mixture;

    function updateMixtureFile(file) {
        console.log(file)
        if(file === null) {
            $uploadedMixtureMatrix = null;
            $mixtureMatrix = null;
            return;
        }
        $uploadedMixtureMatrix = {
            "name": file.name,
            "type": "custom",
            "file": file
        }
        $mixtureMatrix = $uploadedMixtureMatrix;
    }

    let errorMsg = null;

</script>

<Slide number="1" header="Select mixture" desc="Select an expression dataset with an unknown cell type mixture">
    <div class="container">
        <div class="tabs">
            <Tabs tabStyle="pill">
                <TabItem open on:click={() => $mixtureMatrix = $uploadedMixtureMatrix}>
                    <h3 slot="title">Upload gene expression data</h3>
                    <div class="tab">
                        <Upload type="mixture" allowMultiple={false} full={true} update={updateMixtureFile} error={(err) => errorMsg = err}/>
                        {#if errorMsg}
                            <Message message={errorMsg} />
                        {/if}
                        <p class="desc">Upload a gene expression matrix where the first column is gene symbols and the first row is sample names. See an example input file <a href="/util/mixtureExample.csv">here</a>.</p>
                    </div>
                </TabItem>
                <TabItem>
                    <h3 slot="title">Use example data</h3>
                    <div class="tab">
                        {#each exampleMixtures as mix}
                            <Radio name="example" custom value={mix} bind:group={mixture} on:click={() => $mixtureMatrix = mix} class="h-full">
                                <div class="inline-flex justify-between items-center p-4 w-full h-full text-gray-500 bg-gray-50 peer-checked:bg-primary-100 rounded-lg border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-700  peer-checked:text-primary-700 peer-checked:outline-4 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                    <div class="w-full">
                                        <div class="w-full text-lg font-semibold flex flex-row flex-grow-0 items-center justify-between">{mix.name ?? ""}<button class="hover:bg-gray-200 dark:bg-gray-600 ml-4 p-1 rounded-md" on:click={() => {showInfoModal = true; modalInfo = mat}}><InfoCircleOutline class="w-5 h-5"/></button></div>
                                        <div class="w-full flex flex-row"><DnaOutline class="w-5 h-5 mr-2" />{mix.type ?? ""}</div>
                                    </div>
                                </div>
                            </Radio>
                        {/each}
                    </div>
                </TabItem>
            </Tabs>
        </div>
        <!-- <div class="next">
            <Button disabled={!next} size="xl" class={`${next ? 'bg-primary-600' : 'bg-gray-500'}`}>Next Step <ArrowRightOutline class="w-5 h-5 ms-2" /></Button>
        </div> -->
    </div>
</Slide>

<style lang="scss">
    .tab, .tabs {
        display: flex;
        flex-direction: column;
        @apply gap-4;
    }
    a {
        text-decoration: underline;
    }
    :global(.desc) {
        @apply text-gray-600 dark:text-gray-500;
    }
    :global([role="tabpanel"]) {
        margin-top: 0;
        @apply px-0;
        background: none !important;
    }
    :global(li[role="presentation"] > .active) {
        @apply text-primary-700 bg-primary-100 font-semibold;
    }
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
    }
    .next {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
    }
</style>
<script>
    import { Radio } from 'flowbite-svelte';
    import { referenceMatrix } from '../../store';
    import { CloseCircleOutline, DnaOutline, InfoCircleOutline, PenOutline, UsersOutline, WandMagicSparklesOutline, XSolid } from 'flowbite-svelte-icons';

    export let name = 'Tabula Sapiens';
    export let mat = {
            name: "Tabula Sapiens",
            author: "Tabula Sapiens",
            type: "scRNA-seq",
            file: null,
            sourceRef: "https://cells.ucsc.edu/?ds=tabula-sapiens+by-organ",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/tabula_sapiens/",
            cellTypes: [],
            selectedCellTypes: [],
            special: "Tabula Sapiens"
    };
    export let updateModal = () => console.log("No modal available");

    export let type = "default";
    export let removeReference = () => console.log("No remover available");

</script>

<Radio name={name} custom value={mat} bind:group={$referenceMatrix} class="h-full">
    <div class="inline-flex justify-between items-center p-4 w-full h-full cursor-pointer rounded-lg outline outline-0 text-purple-600 bg-gray-50 border-gray-200 dark:border-gray-700  
                dark:hover:text-gray-300 peer-checked:bg-purple-100 peer-checked:text-purple-600
                hover:text-purple-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div class="w-full">
            <div class="w-full text-lg font-semibold flex flex-row flex-grow-0 items-center justify-between">
                <div class="w-full flex flex-row items-center">
                    <WandMagicSparklesOutline class="w-6 h-6 mr-2 ml-[-2px]" />Tabula Sapiens
                </div>
                <button class="radio-info hover:bg-gray-200 dark:bg-gray-600 ml-4 p-1 rounded-md" on:click={() => updateModal(mat)}><InfoCircleOutline class="w-5 h-5"/></button>
            </div>
            <div class="w-full flex flex-row">{'24 human tissues'}</div>
        </div>
    </div>
</Radio>
<!-- <DnaOutline class="w-5 h-5 mr-2 ml-[-2px]" /> -->

<style lang='scss'>
    input:checked + div {
        .radio-info:hover {
            @apply bg-purple-200;
        }
    }
</style>

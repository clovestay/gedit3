<script>
    import { Radio } from 'flowbite-svelte';
    import { onMount } from 'svelte';
    import { referenceMatrix, sapiensTissues } from '../../store';

    function updateSelectedTissueCTs(tissue) {
        $referenceMatrix.cellTypes = [...$sapiensTissues[tissue]]
        $referenceMatrix.selectedCellTypes = [...$referenceMatrix.cellTypes]
        $referenceMatrix.dataRef = `http://webtools.mcdb.ucla.edu/Downloads/tabula_sapiens/${tissue}.csv`
    }

</script>

<div class="sapiens mt-8">
    <div class="header">
        <h2 class="text-xl">Tissue Selector</h2>
    </div>
    <div class="card w-[100%]">
        {#if $sapiensTissues}
            <div class="flex flex-row flex-grow-0 gap-2 flex-wrap max-w-[100%]">
                {#each Object.keys($sapiensTissues).sort((a,b) => b.toLowerCase() < a.toLowerCase()) as cell}
                    <Radio custom bind:group={$referenceMatrix.tissue} on:click={(e) => updateSelectedTissueCTs(e.target.value)} value={cell}>
                        <div class="font-normal p-2 w-full px-4 text-gray-500 bg-white rounded-lg border-2 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-purple-600 peer-checked:text-purple-600 hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div class="w-full text-md font-semibold select-none">{cell}</div>
                        </div>
                    </Radio>
                {/each}
            </div>
        {/if}
    </div>
</div>

<style lang='scss'>
    .sapiens {
        display: flex;
        flex-direction: column;
        @apply gap-4;
        .header {
            
        }
    }
</style>

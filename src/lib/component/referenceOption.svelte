<script>
    import { Radio } from 'flowbite-svelte';
    import { referenceMatrix } from '../../store';
    import { CloseCircleOutline, InfoCircleOutline, PenOutline, UsersOutline, XSolid } from 'flowbite-svelte-icons';

    export let name = '';
    export let mat = {};
    export let updateModal = () => console.log("No modal available");

    export let type = "default";
    export let removeReference = () => console.log("No remover available");

</script>

<Radio name={name} custom value={mat} bind:group={$referenceMatrix} class="h-full">
    <div class="inline-flex justify-between items-center p-4 w-full h-full text-gray-500 bg-gray-50 rounded-lg outline outline-0 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:outline-primary-600 peer-checked:text-primary-700 peer-checked:outline-0 peer-checked:bg-primary-100 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
        <div class="w-full">
            <div class="w-full text-lg font-semibold flex flex-row flex-grow-0 items-center justify-between">
                {mat.name}
                {#if type === 'default'}
                    <button class="hover:bg-gray-200 radio-info ml-4 p-1 rounded-md" on:click={() => updateModal(mat)}><InfoCircleOutline class="w-5 h-5"/></button>
                {:else if type === 'custom'}
                    <button class="hover:bg-gray-200 dark:bg-gray-600 ml-4 p-1 rounded-md" on:click={() => removeReference(mat)}><CloseCircleOutline class="w-5 h-5"/></button>
                {/if}
            </div>
            {#if type === 'default'}
                <div class="w-full flex flex-row"><UsersOutline class="w-5 h-5 mr-2" />{mat.author}</div>
            {:else if type === 'custom'}
                <div class="w-full flex flex-row"><PenOutline class="w-5 h-5 mr-2" />{'Custom Reference'}</div>
            {/if}
        </div>
    </div>
</Radio>

<style lang='scss'>
    input:checked + div {
        .radio-info:hover {
            @apply bg-primary-200;
        }
    }
</style>

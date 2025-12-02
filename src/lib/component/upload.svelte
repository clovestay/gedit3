<script>
    import { Dropzone, Spinner } from 'flowbite-svelte';
    import { FileLinesOutline, UploadSolid } from 'flowbite-svelte-icons';
    import { mixtureMatrix } from '../../store';

    export let full = true;
    export let classStr = '';

    export let type;

    export let update;
    export let error = null;

    let loading = false;

    export let allowMultiple = false;
  
    let value = [];
    const dropHandle = (event) => {
        error && error(null)
        value = "";
        event.preventDefault();
        if (event.dataTransfer.items) {
            let item = event.dataTransfer.items[0];
            if(item?.kind === 'file') {
                value = [item.getAsFile().name];
                value = value;
                loadFile(item.getAsFile())
            }
        } else {
            value = event.dataTransfer.files[0]?.name ?? '';
            loadFile(event.dataTransfer.files[0].getAsFile())
        }
    };
  
    const handleChange = (event) => {
        error && error(null)
        event.target.blur()
        // modified to only handle one file
        const files = event.target.files;
        value = [files[0].name];
        value = value;
        loading = true;
        loadFile(files[0])
    };
  
    const showFiles = (files) => {
        if (files.length === 1) return files[0];
        let concat = '';
        files.map((file) => {
            concat += file;
            concat += ',';
            concat += ' ';
        });
    
        if (concat.length > 40) concat = concat.slice(0, 40);
        concat += '...';
        return concat;
    };


    async function loadFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            let text = e.target.result;
            let firstLine = text.split('\n').shift()
            console.log(firstLine)
            if(type === "mixture") {
                // first line is gene symbols
                let genes = text.split('\n')
                let sep = firstLine.split(',').length > firstLine.split('\t').length ? ',' : '\t';
                let numGenes = genes.length - 1;
                let longestGene = Math.max(...genes.map((x) => x.split(sep)[0].length))
                console.log(longestGene)
                if(numGenes <= 2) {
                    error({
                        message: "Unable to detect gene symbols. Make sure the first line of your file consists of HGNC gene symbols, eg. 'CASP9'.",
                        type: "error"
                    })
                    update(null)
                    value = null;
                    loading = false;
                    return false;
                } else if(numGenes < 50) {
                    error({
                        message: `Only ${numGenes} columns detected. Your mixture should contain enough genes to generate a successful signature.`,
                        type: "warning"
                    })
                } else {
                    let numSamples = firstLine.split(sep).length - 1;
                    if(longestGene >= 20) {
                        error({
                            message: `Loaded ${numGenes} genes and ${numSamples} samples.
                            Some gene names longer than expected, make sure the first column contains valid HGNC gene symbols.`,
                            type: "warning"
                        })
                    } else {
                        error({
                            message: `Loaded ${numGenes} genes and ${numSamples} samples.`,
                            type: "success"
                        })
                    }
                }
                update(file)
            }
            if(type === "reference") {
                // first line is cell types
                let cellTypes = firstLine.trim().split(",")
                if(cellTypes.length < firstLine.trim().split("\t").length) {
                    cellTypes = firstLine.trim().split("\t")
                }
                let numCells = cellTypes.length;
                let numGenes = text.split('\n').length;
                if(!firstLine || firstLine === "" || numCells < 1) {
                    error({
                        message: "Unable to detect cell types. Make sure your file is correctly formatted and contains at least 2 cell types.",
                        type: "error"
                    })
                    loading = false;
                    return false;
                } else {
                    if(numGenes < 10) {
                        error({
                            message: `Only ${numGenes} rows detected. Your reference should contain enough genes to generate a successful signature.`,
                            type: "warning"
                        })
                    } else {
                        error({
                            message: `Loaded reference with ${numCells} cells and ${numGenes} genes.`,
                            type: "success"
                        })
                    }
                    cellTypes.shift()
                    update(file, cellTypes)
                }
            }
            loading = false;
        };
        reader.readAsText(file);
    }

  </script>
  
<Dropzone
    id="dropzone"
    on:drop={dropHandle}
    on:dragover={(event) => {
        event.preventDefault();
    }}
    on:change={(event) => handleChange(event)}
    accept=".csv,.tsv,.txt"
    class={classStr}>
    {#if loading}
        <Spinner size={full ? 16 : 10} />
    {:else}
        {#if full}
            {#if (!value || value.length === 0) && !$mixtureMatrix?.file}
                <svg aria-hidden="true" class="mb-3 w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">TSV, CSV, TXT (Max. 50MB)</p>
            {:else}
                <FileLinesOutline class="mb-3 w-10 h-10 text-primary-500"/>
                {#if value.length !== 0}
                    <p>{showFiles(value)}</p>
                {:else}
                    <p>{$mixtureMatrix.name ?? "Uploaded mixture"}</p>
                {/if}
            {/if}
        {/if}
        {#if !full}
            <p class="text-md flex flex-row gap-2"><UploadSolid class="w-5 h-5"/>Upload custom</p>
        {/if}
    {/if}
</Dropzone>
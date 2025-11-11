<script>
    import Examples from "./examples.svelte";
    import Slide from "./slide.svelte";
    import Upload from "./upload.svelte";

    import { Button, Dropzone, Radio, Tooltip } from 'flowbite-svelte';

    import { BookOutline, DnaOutline, InfoCircleOutline, UploadSolid, UsersOutline } from 'flowbite-svelte-icons';
    
    export let next = false;

    import { referenceMatrix } from '../../store.ts';

    const referenceMatrices = [
        {
            name: "LM22",
            author: "Newman et al",
            type: "RNA-seq",
            file: null,
            sourceRef: "https://www.nature.com/articles/nmeth.3337",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/LM22.tsv",
            cellTypes: ["B_cells_naive","B_cells_memory","Plasma_cells","T_cells_CD8","T_cells_CD4_naive","T_cells_CD4_memory_resting","T_cells_CD4_memory_activated","T_cells_follicular_helper","T_cells_regulatory_Tregs","T_cells_gamma_delta","NK_cells_resting","NK_cells_activated","Monocytes","Macrophages_M0","Macrophages_M1","Macrophages_M2","Dendritic_cells_resting","Dendritic_cells_activated","Mast_cells_resting","Mast_cells_activated","Eosinophils","Neutrophils"],
            selectedCellTypes: ["B_cells_naive","B_cells_memory","Plasma_cells","T_cells_CD8","T_cells_CD4_naive","T_cells_CD4_memory_resting","T_cells_CD4_memory_activated","T_cells_follicular_helper","T_cells_regulatory_Tregs","T_cells_gamma_delta","NK_cells_resting","NK_cells_activated","Monocytes","Macrophages_M0","Macrophages_M1","Macrophages_M2","Dendritic_cells_resting","Dendritic_cells_activated","Mast_cells_resting","Mast_cells_activated","Eosinophils","Neutrophils"]
        },
        {
            name: "ImmunoStates",
            author: "Vallania et al",
            type: "RNA-seq",
            file: null,
            sourceRef: "https://www.nature.com/articles/s41467-018-07242-6",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/ImmunoStates.csv",
            cellTypes: ["CD14_positive_monocyte","CD16_positive_monocyte","CD4_positive_alpha_beta_T_cell","CD56bright_natural_killer_cell","CD56dim_natural_killer_cell","CD8_positive_alpha_beta_T_cell","MAST_cell","basophil","eosinophil","gamma_delta_T_cell","hematopoietic_progenitor","macrophage_m0","macrophage_m1","macrophage_m2","memory_B_cell","myeloid_dendritic_cell","naive_B_cell","neutrophil","plasma_cell","plasmacytoid_dendritic_cell"],
            selectedCellTypes: ["CD14_positive_monocyte","CD16_positive_monocyte","CD4_positive_alpha_beta_T_cell","CD56bright_natural_killer_cell","CD56dim_natural_killer_cell","CD8_positive_alpha_beta_T_cell","MAST_cell","basophil","eosinophil","gamma_delta_T_cell","hematopoietic_progenitor","macrophage_m0","macrophage_m1","macrophage_m2","memory_B_cell","myeloid_dendritic_cell","naive_B_cell","neutrophil","plasma_cell","plasmacytoid_dendritic_cell"]
        },
        {
            name: "Blueprint",
            author: "Martens and Stunnenberg",
            type: "RNA-seq",
            file: null,
            sourceRef: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3789449/",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/BluePrintImmuneCellsV2_1-11.csv",
            cellTypes: ["CD14.positive..CD16.negative.classical.monocyte","CD38.negative.naive.B.cell","CD4.positive..alpha.beta.T.cell","cytotoxic.CD56.dim.natural.killer.cell","macrophage","mature.neutrophil","memory.B.cell","memory.CD4.positive.alpha.beta.T.cell","memory.CD8.positive.alpha.beta.T.cell"],
            selectedCellTypes: ["CD14.positive..CD16.negative.classical.monocyte","CD38.negative.naive.B.cell","CD4.positive..alpha.beta.T.cell","cytotoxic.CD56.dim.natural.killer.cell","macrophage","mature.neutrophil","memory.B.cell","memory.CD4.positive.alpha.beta.T.cell","memory.CD8.positive.alpha.beta.T.cell"]
        },
        {
            name: "ENCODE",
            author: "ENCODE Project Consortium",
            type: "RNA-seq",
            file: null,
            sourceRef: "http://www.nature.com/nature/journal/v489/n7414/full/nature11247.html",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/ENCODE_ReferenceDataset_3-3.csv",
            cellTypes: ["aortic.smooth.muscle.cell","articular.chondrocyte.of.knee.joint","bronchial.smooth.muscle.cell","cardiac.ventricle.fibroblast","dermal.cell.papilla.or.fibroblast","endothelial.cell.large.blood.vessel","endothelial.cell.microvascular.mammary.or.endometrial","endothelial.cell.microvascular.non.reproductive","fibroblast.of.arm","fibroblast.of.lung","fibroblast.of.the.aortic.adventitia","hair.follicular.keratinocyte","mammary.epithelial.cell","melanocyte.of.skin","mononuclear.cell","myometrial.cell","osteoblast","pluripotent.MSC-like.cell","PolyA_B.cell_PolyA","PolyA_CD14.positive.monocyte_PolyA","PolyA_fibroblast.of.lung_PolyA","regular.cardiac.myocyte","renal.cortical.epithelial.cell","respiratory.epithelial","smooth.muscle.cell.of.bladder","smooth.muscle.cell.of.the.coronary.artery","smooth.muscle.cell.of.the.pulmonary.artery","smooth.muscle.cell.of.trachea","uterine.smooth.muscle.cell"],
            selectedCellTypes: ["aortic.smooth.muscle.cell","articular.chondrocyte.of.knee.joint","bronchial.smooth.muscle.cell","cardiac.ventricle.fibroblast","dermal.cell.papilla.or.fibroblast","endothelial.cell.large.blood.vessel","endothelial.cell.microvascular.mammary.or.endometrial","endothelial.cell.microvascular.non.reproductive","fibroblast.of.arm","fibroblast.of.lung","fibroblast.of.the.aortic.adventitia","hair.follicular.keratinocyte","mammary.epithelial.cell","melanocyte.of.skin","mononuclear.cell","myometrial.cell","osteoblast","pluripotent.MSC-like.cell","PolyA_B.cell_PolyA","PolyA_CD14.positive.monocyte_PolyA","PolyA_fibroblast.of.lung_PolyA","regular.cardiac.myocyte","renal.cortical.epithelial.cell","respiratory.epithelial","smooth.muscle.cell.of.bladder","smooth.muscle.cell.of.the.coronary.artery","smooth.muscle.cell.of.the.pulmonary.artery","smooth.muscle.cell.of.trachea","uterine.smooth.muscle.cell"]
        },
        {
            name: "Human Body Atlas",
            author: "Su et al",
            type: "Affymetrix U133A/GNF1H",
            file: null,
            sourceRef: "http://www.pnas.org/content/101/16/6062.full",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/HumanBodyAtlas.tsv",
            cellTypes: ["721_B_lymphoblasts","Adipocyte","BDCA4+_DentriticCells","BronchialEpithelialCells","CD105+_Endothelial","CD14+_Monocytes","CD19+_BCells(neg","CD33+_Myeloid","CD34+","CD4+_Tcells","CD56+_NKCells","CD71+_EarlyErythroid","CD8+_Tcells","CardiacMyocytes","Colorectaladenocarcinoma","Leukemia_chronicMyelogenousK-562","Leukemia_promyelocytic-HL-60","Leukemialymphoblastic(MOLT-4)","Lymphoma_burkitts(Daudi)","Lymphoma_burkitts(Raji)","SkeletalMuscle","SmoothMuscle","Spinalcord","TestisGermCell","TestisLeydigCell"],
            selectedCellTypes: ["721_B_lymphoblasts","Adipocyte","BDCA4+_DentriticCells","BronchialEpithelialCells","CD105+_Endothelial","CD14+_Monocytes","CD19+_BCells(neg","CD33+_Myeloid","CD34+","CD4+_Tcells","CD56+_NKCells","CD71+_EarlyErythroid","CD8+_Tcells","CardiacMyocytes","Colorectaladenocarcinoma","Leukemia_chronicMyelogenousK-562","Leukemia_promyelocytic-HL-60","Leukemialymphoblastic(MOLT-4)","Lymphoma_burkitts(Daudi)","Lymphoma_burkitts(Raji)","SkeletalMuscle","SmoothMuscle","Spinalcord","TestisGermCell","TestisLeydigCell"]
        },
        {
            name: "Skin Signatures",
            author: "Swindell et al",
            type: "Affymetrix Genome Plus 2.0/Illumina Human HT-12 V3",
            file: null,
            sourceRef: "https://www.ncbi.nlm.nih.gov/pubmed/23915137",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/Swindell1NKField.csv",
            cellTypes: ["B_cells","Blood_CD34+_cells","Dendritic_cells","Eosinophils","Fibroblasts","Keratinocytes","Lymphatic_endothelial_cells","Macrophages","Monocytes","NK_cells","Neutrophils","Plasma_cells_CD138+","Platelets","Reticulocytes","Subcutaneous_Adipose","T_cells_CD3+","T_cells_CD4+","T_cells_CD8+","T_cells_Gamma_Delta","T_cells_Regulatory","Vascular_Endothelial_Cells"],
            selectedCellTypes: ["B_cells","Blood_CD34+_cells","Dendritic_cells","Eosinophils","Fibroblasts","Keratinocytes","Lymphatic_endothelial_cells","Macrophages","Monocytes","NK_cells","Neutrophils","Plasma_cells_CD138+","Platelets","Reticulocytes","Subcutaneous_Adipose","T_cells_CD3+","T_cells_CD4+","T_cells_CD8+","T_cells_Gamma_Delta","T_cells_Regulatory","Vascular_Endothelial_Cells"]
        },
        {
            name: "Human Primary Cell Atlas",
            author: "Mabbott et al",
            type: "Affymetrix U133 Plus 2.0",
            file: null,
            sourceRef: "http://bmcgenomics.biomedcentral.com/articles/10.1186/1471-2164-14-632",
            dataRef: "http://webtools.mcdb.ucla.edu/Downloads/HPCAOrthogonalSubset.csv",
            cellTypes: ["Endothelial_cells","Fibroblasts","Keratinocytes","M(IFNa)","M1(IFNg)","M2(IL-4)","Macrophage","Monocytes_CD14+CD16-","Monocytes_CD16+CD14-","MSC","Neutrophils","Neutrophils_LPS","NK_cells","Platelets","Schwann_cells","Smooth_muscle_cells","T_cells_(CD4+)","T_cells_(CD8+)","T_cells_(gamma-delta)"],
            selectedCellTypes: ["Endothelial_cells","Fibroblasts","Keratinocytes","M(IFNa)","M1(IFNg)","M2(IL-4)","Macrophage","Monocytes_CD14+CD16-","Monocytes_CD16+CD14-","MSC","Neutrophils","Neutrophils_LPS","NK_cells","Platelets","Schwann_cells","Smooth_muscle_cells","T_cells_(CD4+)","T_cells_(CD8+)","T_cells_(gamma-delta)"]
        },
    ]

    let customMatrices = [];

    import { Modal } from 'flowbite-svelte';
    import ReferenceOption from './referenceOption.svelte';
    import Message from './message.svelte';
    import Tabula from './tabula.svelte';
    import Sapiens from './sapiens.svelte';
    import { onMount } from 'svelte';
    let showInfoModal = false;
    let modalInfo = referenceMatrices[0] ?? null;

    let allowCustomReference = true;

    /** @function
     * @param {Array<string>} files
     */
    function addNewCustomReference(file, types) {
        console.log(file)
        console.log(types)
        // prevent duplicate uploads
        if(customMatrices.filter((x) => x.name === file).length > 0) return;
        let newCustomMatrix = {
            "name": file.name,
            "file": file,
            "type": "custom",
            "cellTypes": types,
            "selectedCellTypes": types
        }
        customMatrices.unshift(newCustomMatrix)
        customMatrices = customMatrices;
        // auto-select uploaded reference
        $referenceMatrix = newCustomMatrix;
    }

    function updateModal(info) {
        modalInfo = info;
        showInfoModal = true;
    }

    function removeReference(mat) {
        console.log(customMatrices)
        customMatrices = [...customMatrices.filter((x) => x.name !== mat.name)]
        console.log(customMatrices)
        message = null;
    }

    let message = null;

</script>

{#if modalInfo.special === "Tabula Sapiens"}
    <Modal title={modalInfo.name ?? ""} bind:open={showInfoModal} autoclose outsideclose class="max-w-[40vw]">
        <p>This is a hierarchical reference of 24 human tissue types, with 471 total cell types, compiled from UCSC Cell Browser data.</p>    
    </Modal>
{:else}
    <Modal title={modalInfo.name ?? ""} bind:open={showInfoModal} autoclose outsideclose class="max-w-[40vw]">
        <p class="text-base flex flex-row items-center leading-relaxed text-gray-500 dark:text-gray-400"><UsersOutline class="w-5 h-5 mr-2" />{`Author: ${modalInfo.author}`}</p>
        <p class="text-base flex flex-row items-center leading-relaxed text-gray-500 dark:text-gray-400"><DnaOutline class="w-5 h-5 mr-2" />{`Assay type: ${modalInfo.type}`}</p>
        <p class="text-base flex flex-row items-center leading-relaxed text-gray-500 dark:text-gray-400"><BookOutline class="w-5 h-5 mr-2" /><a target="_blank" href={modalInfo.sourceRef}>{modalInfo.sourceRef}</a></p>
    </Modal>
{/if}


<Slide number="2" header="Choose reference" desc="Select a reference matrix of cell types to compute against">
    <div class="container">
        <div class="tabs">
            <div class="tab">
                {#if message}
                    <Message message={message} />
                {/if}
                <div class="grid gap-4 w-full md:grid-cols-2">
                    {#if allowCustomReference}
                        <div class="inline-flex justify-between items-center p-0 h-full w-full text-gray-500 bg-white rounded-lg border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:outline-primary-600 peer-checked:text-primary-600 peer-checked:border-none peer-checked:outline peer-checked:outline-4 peer-checked:outline-solid hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <Upload type="reference" allowMultiple={false} full={false} classStr={"w-full h-full"} update={addNewCustomReference} error={(err) => message = err}/>
                        </div>
                        <Tooltip>Upload a reference cell type matrix, where rows are cell types and columns are samples.</Tooltip>
                    {/if}
                    <Tabula updateModal={updateModal}/>
                    {#each customMatrices as mat}
                        <ReferenceOption type="custom" name="custom" mat={mat} removeReference={removeReference}/>
                    {/each}
                    {#each referenceMatrices as mat}
                        <ReferenceOption name="custom" mat={mat} updateModal={updateModal}/>
                        <!-- <Radio name="custom" custom value={mat} bind:group={$referenceMatrix} class="h-full">
                            <div class="inline-flex justify-between items-center p-4 w-full h-full text-gray-500 bg-white rounded-lg outline outline-1 border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-primary-500 peer-checked:outline-primary-600 peer-checked:text-primary-600 peer-checked:outline-4 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div class="w-full">
                                    <div class="w-full text-lg font-semibold flex flex-row flex-grow-0 items-center justify-between">{mat.name}<button class="hover:bg-gray-200 dark:bg-gray-600 ml-4 p-1 rounded-md" on:click={() => {showInfoModal = true; modalInfo = mat}}><InfoCircleOutline class="w-5 h-5"/></button></div>
                                    <div class="w-full flex flex-row"><UsersOutline class="w-5 h-5 mr-2" />{mat.author}</div>
                                </div>
                            </div>
                        </Radio> -->
                    {/each}
                </div>
            </div>
        </div>
    </div>
    {#if $referenceMatrix?.special === "Tabula Sapiens"}
        <Sapiens />
    {/if}
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
    :global(.uploader) {
        > div {
            @apply border-2 border-gray-300 cursor-pointer border-dashed;
        }
    }
    :global(.no-outline) {
        outline: none;
        border: none;
    }
</style>
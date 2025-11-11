import { readonly, writable } from "svelte/store";

// class ReferenceMatrix {

//     constructor() {
//       this.mat = writable({});
//       this.complete = false;
//     }
  
//     update(o) {
//         this.mat.update(o)
//         this.complete = this.mat?.selectedCellTypes?.length !== 0;
//     }

//     subscribe(run) {
//         return this.mat.subscribe(run);
//     }
// }
  
// export const referenceMatrix = new ReferenceMatrix();
type ReferenceMatrix = {
    name: string,
    type: string,
    file?: File,
    author?: string,
    sourceRef?: string,
    dataRef?: string,
    cellTypes: Array<string>,
    selectedCellTypes: Array<string>,
    complete: boolean,
    special?: string
};

export const referenceMatrix = writable<ReferenceMatrix>()
// export const referenceMatrix = writable({
//     name: "name",
//     author: "author",
//     type: "type",
//     sourceRef: "sourceRef",
//     dataRef: "dataRef",
//     celltypes: [],
//     selectedCellTypes: [],
//     complete: false
// });


type MixtureMatrix = {
    name: string,
    type: string,
    file?: File,
    dataRef?: string
};

//export const mixtureMatrix = writable<MixtureMatrix>()
export const mixtureMatrix = writable<MixtureMatrix>();
export const uploadedMixtureMatrix = writable<MixtureMatrix>();

export const collapseInputs = writable(false);

export enum Colormap {
    "IndigoMaterial" = "indigo_material",
    "Rocket" = "rocket",
    "Viridis" = "viridis",
    "Gedit" = "gedit"
}
export enum RankingMetric {
    "Entropy" = "Entropy",
    "Zscore" = "Z-score"
}
export enum Transpose {
    "Cells" = "Cells as columns",
    "Samples" = "Samples as columns"
}

type AdvancedSettings = {
    heatmapClustering: {
        row: boolean,
        column: boolean
    },
    primaryRankingMetric: RankingMetric,
    rowScalingDegree: number,
    signatureGenes: {
        minimum: number,
        average: number
    },
    colormap: Colormap,
    showCellValues: boolean,
    drawCellOutlines: boolean,
    squareCells: boolean,
    transpose: Transpose
}

export const advancedSettings = writable<AdvancedSettings>({
    heatmapClustering: {
        row: true,
        column: true
    },
    primaryRankingMetric: RankingMetric.Entropy,
    rowScalingDegree: 0,
    signatureGenes: {
        minimum: 50,
        average: 50
    },
    colormap: Colormap.Rocket,
    showCellValues: true,
    drawCellOutlines: true,
    squareCells: false,
    transpose: Transpose.Samples,
})

export const customMatrices = writable([])
export const loadingResults = writable(false);

type Message = {
    type: string,
    message: string
}
export const analysisError = writable<Message>(undefined);
export const analysisResult = writable(null);

export const sapiensTissues = writable({
    "bladder": ["t cell","macrophage","myofibroblast cell","bladder urothelial cell","capillary endothelial cell","smooth muscle cell","fibroblast","pericyte cell","mast cell","nk cell","endothelial cell of lymphatic vessel","vein endothelial cell","b cell","plasma cell","plasmacytoid dendritic cell"],
    "blood": ["erythrocyte","cd4-positive- alpha-beta memory t cell","cd8-positive- alpha-beta cytokine secreting effector t cell","classical monocyte","neutrophil","naive b cell","nk cell","memory b cell","type i nk t cell","cd141-positive myeloid dendritic cell","cd8-positive- alpha-beta t cell","plasma cell","t cell","platelet","naive thymus-derived cd4-positive- alpha-beta t cell","non-classical monocyte","hematopoietic stem cell","plasmacytoid dendritic cell","basophil","cd4-positive- alpha-beta t cell","monocyte","plasmablast","cd24 neutrophil","nampt neutrophil","myeloid progenitor","macrophage","granulocyte"],
    "bone_marrow": ["monocyte","plasma cell","hematopoietic stem cell","erythroid progenitor","nk cell","granulocyte","naive b cell","macrophage","myeloid progenitor","memory b cell","cd8-positive- alpha-beta t cell","cd4-positive- alpha-beta t cell","nampt neutrophil","cd24 neutrophil","neutrophil","plasmablast","erythrocyte"],
    "eye": ["conjunctival epithelial cell","monocyte","microglial cell","eye photoreceptor cell","muller cell","fibroblast","t cell","limbal stem cell","retinal blood vessel endothelial cell","epithelial cell of lacrimal sac","corneal keratocyte","b cell","retinal pigment epithelial cell","corneal epithelial cell","limbal stromal cell","melanocyte","retinal bipolar neuron","dendritic cell","plasma cell","lacrimal gland functional unit cell","macrophage","erythroid lineage cell","radial glial cell","ocular surface cell","cd8-positive- alpha-beta t cell","endothelial cell","retina horizontal cell","ciliary body","cd4-positive- alpha-beta t cell","mast cell","adipocyte","retinal ganglion cell"],
    "fat": ["fibroblast","endothelial cell","t cell","macrophage","nk cell","myofibroblast cell","leucocyte","plasma cell","mesenchymal stem cell","smooth muscle cell","neutrophil","mast cell","b cell"],
    "heart": ["cardiac endothelial cell","cardiac muscle cell","hepatocyte","smooth muscle cell","fibroblast of cardiac tissue","macrophage"],
    "kidney": ["kidney epithelial cell","b cell","cd8-positive- alpha-beta t cell","endothelial cell","macrophage","nk cell","cd4-positive helper t cell"],
    "large_intestine": ["cd4-positive- alpha-beta t cell","enterocyte of epithelium of large intestine","monocyte","plasma cell","cd8-positive- alpha-beta t cell","fibroblast","large intestine goblet cell","paneth cell of epithelium of large intestine","b cell","transit amplifying cell of large intestine","mast cell","gut endothelial cell","intestinal crypt stem cell of large intestine","intestinal enteroendocrine cell","neutrophil","intestinal tuft cell","immature enterocyte","intestinal crypt stem cell","mature enterocyte","goblet cell"],
    "liver": ["macrophage","monocyte","endothelial cell of hepatic sinusoid","liver dendritic cell","nk cell","fibroblast","hepatocyte","intrahepatic cholangiocyte","t cell","neutrophil","plasma cell","erythrocyte","endothelial cell"],
    "lung": ["type ii pneumocyte","neutrophil","cd4-positive- alpha-beta t cell","cd8-positive- alpha-beta t cell","nk cell","bronchial vessel endothelial cell","smooth muscle cell","adventitial cell","macrophage","respiratory mucous cell","basophil","classical monocyte","endothelial cell of artery","lung ciliated cell","dendritic cell","respiratory goblet cell","basal cell","plasma cell","b cell","serous cell of epithelium of bronchus","non-classical monocyte","capillary endothelial cell","capillary aerocyte","type i pneumocyte","vein endothelial cell","alveolar fibroblast","endothelial cell of lymphatic vessel","bronchial smooth muscle cell","plasmacytoid dendritic cell","club cell","lung microvascular endothelial cell","vascular associated smooth muscle cell","myofibroblast cell","pericyte cell","mesothelial cell","fibroblast","intermediate monocyte","pulmonary ionocyte"],
    "lymph_node": ["b cell","cd8-positive alpha-beta t cell","t cell","type i nk t cell","cd4-positive alpha-beta t cell","innate lymphoid cell","regulatory t cell","plasma cell","neutrophil","classical monocyte","nk cell","macrophage","endothelial cell","cd141-positive myeloid dendritic cell","cd1c-positive myeloid dendritic cell","intermediate monocyte","hematopoietic stem cell","non-classical monocyte","mast cell","plasmacytoid dendritic cell","stromal cell","erythrocyte","mature conventional dendritic cell","naive b cell","memory b cell","naive thymus-derived cd4-positive- alpha-beta t cell","cd4-positive- alpha-beta memory t cell","cd8-positive- alpha-beta memory t cell","mature nk t cell"],
    "mammary_gland": ["fibroblast of breast","t cell","luminal epithelial cell of mammary gland","macrophage","pericyte cell","vascular associated smooth muscle cell","b cell","vein endothelial cell","basal cell","plasma cell","endothelial cell of artery","endothelial cell of lymphatic vessel","nk cell","mast cell"],
    "muscle": ["endothelial cell of vascular tree","capillary endothelial cell","endothelial cell of lymphatic vessel","mesenchymal stem cell","endothelial cell of artery","pericyte cell","cd4-positive- alpha-beta t cell","skeletal muscle satellite stem cell","macrophage","cd8-positive- alpha-beta t cell","t cell","smooth muscle cell","tendon cell","fast muscle cell","slow muscle cell","mast cell","erythrocyte","mesothelial cell","mature nk t cell"],
    "pancreas": ["pancreatic acinar cell","t cell","endothelial cell","myeloid cell","pancreatic stellate cell","nk cell","fibroblast","b cell","pancreatic ductal cell","plasma cell","pancreatic beta cell","mast cell","pancreatic pp cell","pancreatic alpha cell","pancreatic delta cell"],
    "prostate": ["basal cell of prostate epithelium,epithelial cell,fibroblast,hillock-club cell of prostate epithelium,macrophage,nkt cell,erythroid progenitor,cd8-positive- alpha-beta t cell,cd8b-positive nk t cell,luminal cell of prostate epithelium,endothelial cell,smooth muscle cell,stromal cell,monocyte,t cell,club cell of prostate epithelium,neutrophil,myeloid cell,hillock cell of prostate epithelium,sperm,mast cell"],
    "salivary_gland": ["acinar cell of salivary gland","naive b cell","memory b cell","cd4-positive helper t cell","pericyte cell","nk cell","fibroblast","endothelial cell of lymphatic vessel","adventitial cell","b cell","endothelial cell","monocyte","plasma cell","duct epithelial cell","basal cell","cd8-positive- alpha-beta t cell","neutrophil","t cell","myoepithelial cell","cd4-positive- alpha-beta t cell","macrophage","salivary gland cell","ionocyte"],
    "skin": ["macrophage","stromal cell","cd8-positive- alpha-beta memory t cell","cd141-positive myeloid dendritic cell","t cell","nkt cell","mast cell","muscle cell","cd8-positive- alpha-beta cytotoxic t cell","cd1c-positive myeloid dendritic cell","endothelial cell","cd4-positive- alpha-beta memory t cell","nk cell","naive thymus-derived cd8-positive- alpha-beta t cell","naive thymus-derived cd4-positive- alpha-beta t cell","melanocyte","regulatory t cell","epithelial cell","plasma cell","cd4-positive helper t cell","memory b cell","langerhans cell","naive b cell","smooth muscle cell","cell of skeletal muscle"],
    "small_intestine": ["cd4-positive- alpha-beta t cell","enterocyte of epithelium of small intestine","neutrophil","transit amplifying cell of small intestine","small intestine goblet cell","cd8-positive- alpha-beta t cell","b cell","monocyte","paneth cell of epithelium of small intestine","intestinal tuft cell","plasma cell","mast cell","fibroblast","intestinal enteroendocrine cell","gut endothelial cell","intestinal crypt stem cell of small intestine","intestinal crypt stem cell","immature enterocyte","goblet cell","mature enterocyte","duodenum glandular cell"],
    "spleen": ["cd8-positive- alpha-beta memory t cell","macrophage","naive thymus-derived cd4-positive- alpha-beta t cell","intermediate monocyte","endothelial cell","memory b cell","classical monocyte","neutrophil","naive b cell","plasma cell","cd4-positive- alpha-beta memory t cell","type i nk t cell","naive thymus-derived cd8-positive- alpha-beta t cell","nk cell","innate lymphoid cell","erythrocyte","regulatory t cell","platelet","hematopoietic stem cell","cd141-positive myeloid dendritic cell","cd1c-positive myeloid dendritic cell","plasmacytoid dendritic cell","mature nk t cell","cd8-positive- alpha-beta t cell"],
    "thymus": ["cd4-positive helper t cell","naive regulatory t cell","t follicular helper cell","cd8-positive- alpha-beta cytotoxic t cell","dn4 thymocyte","b cell","medullary thymic epithelial cell","fibroblast","macrophage","vascular associated smooth muscle cell","plasma cell","vein endothelial cell","capillary endothelial cell","endothelial cell of artery","nk cell","erythrocyte","monocyte","endothelial cell of lymphatic vessel","myeloid dendritic cell","dn3 thymocyte","dn1 thymic pro-t cell","innate lymphoid cell","cd8-positive- alpha-beta t cell","memory b cell","naive b cell","mesothelial cell","mature nk t cell","fast muscle cell","dendritic cell","immature natural killer cell","thymocyte","mast cell"],
    "tongue": ["epithelial cell","basal cell","immune cell","fibroblast","vein endothelial cell","pericyte cell","endothelial cell of lymphatic vessel","endothelial cell of artery","capillary endothelial cell","tongue muscle cell","keratinocyte","schwann cell"],
    "trachea": ["macrophage","tracheal goblet cell","fibroblast","endothelial cell","smooth muscle cell","ciliated cell","ionocyte","secretory cell","t cell","basal cell","mast cell","mucus secreting cell","plasma cell","cd8-positive- alpha-beta t cell","serous cell of epithelium of trachea","b cell","cd4-positive- alpha-beta t cell","neutrophil","double-positive- alpha-beta thymocyte","goblet cell","connective tissue cell"],
    "uterus": ["t cell","fibroblast","macrophage","immune cell","pericyte cell","epithelial cell of uterus","endothelial cell","epithelial cell","ciliated epithelial cell","endothelial cell of lymphatic vessel","myometrial cell","nk cell","b cell","vascular associated smooth muscle cell"],
    "vasculature": ["fibroblast","smooth muscle cell","macrophage","pericyte cell","artery endothelial cell","erythrocyte","t cell","mast cell","b cell","nk cell","plasma cell","lymphatic endothelial cell","endothelial cell","epithelial cell"]
})

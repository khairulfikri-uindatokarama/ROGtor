import { Type, Schema } from "@google/genai";

export interface RPSData {
  courseName: string;
  courseCode: string;
  studyProgram: string;
  credits: number;
  semester: string;
  compilationDate: string;
  developerName: string;
  koordinatorField: string;
  kaprodiField: string;
  cpl: string;
  cpmk: string;
  subCpmk: string;
  shortDescription: string;
  bahanKajian: string;
  mainReferences: string;
  supportingReferences: string;
  learningMedia: string;
  evaluationPlan: string;
  weeklyPlan: string;
}

export enum GenerationType {
  CPMK = 'CPMK',
  SUB_CPMK = 'SUB_CPMK',
  DESCRIPTION = 'DESCRIPTION',
  BAHAN_KAJIAN = 'BAHAN_KAJIAN',
  MAIN_REFS = 'MAIN_REFS',
  SUPPORT_REFS = 'SUPPORT_REFS',
  MEDIA = 'MEDIA',
  EVALUATION = 'EVALUATION',
  WEEKLY_PLAN = 'WEEKLY_PLAN',
  SEARCH_REFS = 'SEARCH_REFS',
  SELECT_CPL = 'SELECT_CPL'
}

// --- Schemas ---

export const CPMK_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    cpMKList: {
      type: Type.ARRAY,
      description: "A list of fully formatted CPMK strings in Indonesian.",
      items: { type: Type.STRING }
    }
  },
  required: ["cpMKList"]
};

export const SUB_CPMK_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    subCpmkList: {
      type: Type.ARRAY,
      description: "A list of 8 Sub-CPMK strings formatted using A-B-C-D formula.",
      items: { type: Type.STRING }
    }
  },
  required: ["subCpmkList"]
};

export const DESCRIPTION_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    description: {
      type: Type.STRING,
      description: "A short course description (140-160 words) in Indonesian."
    }
  },
  required: ["description"]
};

export const BAHAN_KAJIAN_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    bahanKajianList: {
      type: Type.ARRAY,
      description: "A list of 8 to 14 detailed study materials or main topics.",
      items: { type: Type.STRING }
    }
  },
  required: ["bahanKajianList"]
};

export const REFERENCE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    formattedReferences: {
      type: Type.ARRAY,
      description: "A list of reference strings formatted according to APA 7th style.",
      items: { type: Type.STRING }
    }
  },
  required: ["formattedReferences"]
};

export const MEDIA_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    mediaString: {
      type: Type.STRING,
      description: "A single, comma-separated string listing 5-7 concise teaching media examples."
    }
  },
  required: ["mediaString"]
};

export const EVALUATION_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    evaluationRows: {
      type: Type.ARRAY,
      description: "A list of rows representing Sub-CPMK mapping to CPLs, Weight, and Weeks.",
      items: {
        type: Type.OBJECT,
        properties: {
          subCpmkIndex: { type: Type.NUMBER, description: "The index number of the Sub-CPMK (1, 2, 3...)" },
          cplMatches: { 
            type: Type.ARRAY, 
            description: "An array of 0 or 1 (integers) indicating if this Sub-CPMK maps to the corresponding CPL index.",
            items: { type: Type.NUMBER } 
          },
          weight: { type: Type.NUMBER, description: "The weight percentage for this Sub-CPMK (e.g., 5, 10, 15)." },
          weeks: { type: Type.NUMBER, description: "Number of weeks allocated (e.g., 1, 2)." }
        },
        required: ["subCpmkIndex", "cplMatches", "weight", "weeks"]
      }
    }
  },
  required: ["evaluationRows"]
};

export const WEEKLY_PLAN_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    weeklyPlan: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          week: { type: Type.NUMBER },
          fullCpmk: { type: Type.STRING },
          indicators: { type: Type.STRING },
          criteriaAndAssessment: { type: Type.STRING },
          learningMethodAndAssignment: { type: Type.STRING },
          materialAndRefs: { type: Type.STRING },
          weight: { type: Type.STRING }
        },
        required: ["week", "fullCpmk", "indicators", "criteriaAndAssessment", "learningMethodAndAssignment", "materialAndRefs", "weight"]
      }
    }
  },
  required: ["weeklyPlan"]
};

export const SELECT_CPL_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    selectedCpl: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of selected CPLs that match the course."
    }
  },
  required: ["selectedCpl"]
};
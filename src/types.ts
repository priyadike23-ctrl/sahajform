export interface SimplifiedField {
  id: string;
  field_name: string;
  original_text: string;
  simplified_explanation: string;
  example_answer: string;
}

export interface SimplifiedForm {
  form_title: string;
  language: 'en' | 'hi';
  detected_purpose: string;
  required_documents: string[];
  fields: SimplifiedField[];
  common_mistakes: string[];
  is_mismatch?: boolean;
  detected_forms?: string[];
}

export interface GlossaryTerm {
  term: string;
  translation: string;
  definition: string;
  example: string;
  category: 'Legal' | 'Identity' | 'Financial' | 'Address';
  definitions?: {
    en: string;
    hi: string;
    mr: string;
    bn: string;
  };
  examples?: {
    en: string;
    hi: string;
    mr: string;
    bn: string;
  };
}

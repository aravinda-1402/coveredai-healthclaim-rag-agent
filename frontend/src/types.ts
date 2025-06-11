export interface Benefits {
  deductible?: string;
  outOfPocketMax?: string;
  coverageDetails?: string[];
  copaysAndCoinsurance?: {
    'Emergency Room'?: string;
    'Inpatient Hospitalization'?: string;
    'Mental Health Counseling'?: string;
    'Outpatient Surgery'?: string;
    'Primary Care Visits'?: string;
    'Specialist Visits'?: string;
    [key: string]: string | undefined;
  };
}

export interface Source {
  document: string;
  text: string;
}

export interface Answer {
  answer: string;
  sources: (string | Source)[];
} 
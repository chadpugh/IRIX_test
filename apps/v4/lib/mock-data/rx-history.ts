export type RxRiskFlag = 'None' | 'Warning' | 'High Risk';

export interface RxRecord {
    id: string;
    applicantId: string;
    drugName: string;
    ndc: string; // National Drug Code
    fillDate: string; // YYYY-MM-DD
    daysSupply: number;
    prescriberType: string;
    riskFlag: RxRiskFlag;
}

export const mockRxHistory: RxRecord[] = [
    { id: 'RX-001', applicantId: 'APP-1001', drugName: 'Lisinopril 10mg', ndc: '00378-0136-01', fillDate: '2026-02-15', daysSupply: 30, prescriberType: 'Primary Care', riskFlag: 'None' },
    { id: 'RX-002', applicantId: 'APP-1001', drugName: 'Atorvastatin 20mg', ndc: '00071-0155-23', fillDate: '2026-01-20', daysSupply: 90, prescriberType: 'Cardiologist', riskFlag: 'None' },
    { id: 'RX-003', applicantId: 'APP-1002', drugName: 'Amoxicillin 500mg', ndc: '00093-3109-01', fillDate: '2026-02-01', daysSupply: 10, prescriberType: 'Urgent Care', riskFlag: 'None' },
    { id: 'RX-004', applicantId: 'APP-1003', drugName: 'Metformin 1000mg', ndc: '00093-7214-01', fillDate: '2026-02-28', daysSupply: 90, prescriberType: 'Endocrinologist', riskFlag: 'Warning' },
    { id: 'RX-005', applicantId: 'APP-1003', drugName: 'Insulin Glargine', ndc: '00088-2220-33', fillDate: '2026-02-10', daysSupply: 30, prescriberType: 'Endocrinologist', riskFlag: 'High Risk' },
    { id: 'RX-006', applicantId: 'APP-1005', drugName: 'Warfarin 5mg', ndc: '00056-0170-70', fillDate: '2026-02-20', daysSupply: 30, prescriberType: 'Cardiologist', riskFlag: 'Warning' },
    { id: 'RX-007', applicantId: 'APP-1005', drugName: 'Oxycodone 15mg', ndc: '00406-0552-01', fillDate: '2026-02-24', daysSupply: 15, prescriberType: 'Pain Management', riskFlag: 'High Risk' },
    { id: 'RX-008', applicantId: 'APP-1006', drugName: 'Levothyroxine 50mcg', ndc: '00074-4552-19', fillDate: '2026-01-15', daysSupply: 30, prescriberType: 'Primary Care', riskFlag: 'None' },
    { id: 'RX-009', applicantId: 'APP-1008', drugName: 'Amlodipine 10mg', ndc: '00069-1530-68', fillDate: '2026-02-05', daysSupply: 90, prescriberType: 'Cardiologist', riskFlag: 'Warning' },
    { id: 'RX-010', applicantId: 'APP-1008', drugName: 'Clopidogrel 75mg', ndc: '00024-5401-31', fillDate: '2026-02-18', daysSupply: 30, prescriberType: 'Cardiologist', riskFlag: 'High Risk' },
];

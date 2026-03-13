export type RiskTier = 'Low' | 'Moderate' | 'High' | 'Critical' | 'Pending';
export type ApplicantStatus = 'Review' | 'Approved' | 'Declined' | 'Pending Info';

export interface Applicant {
    id: string;
    name: string;
    age: number;
    state: string;
    applicationDate: string;
    status: ApplicantStatus;
    riskTier: RiskTier;
    policyAmount: number;
}

export const mockApplicants: Applicant[] = [
    { id: 'APP-1001', name: 'John Doe', age: 45, state: 'IL', applicationDate: '2026-03-01', status: 'Review', riskTier: 'Moderate', policyAmount: 500000 },
    { id: 'APP-1002', name: 'Jane Smith', age: 32, state: 'NY', applicationDate: '2026-03-02', status: 'Approved', riskTier: 'Low', policyAmount: 250000 },
    { id: 'APP-1003', name: 'Robert Johnson', age: 58, state: 'TX', applicationDate: '2026-02-28', status: 'Review', riskTier: 'High', policyAmount: 1000000 },
    { id: 'APP-1004', name: 'Emily Davis', age: 29, state: 'CA', applicationDate: '2026-03-03', status: 'Pending Info', riskTier: 'Pending', policyAmount: 750000 },
    { id: 'APP-1005', name: 'Michael Brown', age: 61, state: 'FL', applicationDate: '2026-02-25', status: 'Declined', riskTier: 'Critical', policyAmount: 2000000 },
    { id: 'APP-1006', name: 'Sarah Wilson', age: 41, state: 'WA', applicationDate: '2026-03-04', status: 'Review', riskTier: 'Moderate', policyAmount: 300000 },
    { id: 'APP-1007', name: 'David Lee', age: 53, state: 'IL', applicationDate: '2026-03-01', status: 'Approved', riskTier: 'Low', policyAmount: 500000 },
    { id: 'APP-1008', name: 'Lisa Taylor', age: 36, state: 'OH', applicationDate: '2026-03-04', status: 'Review', riskTier: 'High', policyAmount: 1500000 },
];

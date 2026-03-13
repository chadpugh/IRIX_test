export interface RiskScoreBreakdown {
    rxScore: number;
    conditionScore: number;
    labScore: number;
}

export interface RiskScoreTrend {
    date: string; // YYYY-MM
    score: number;
}

export interface RiskScore {
    applicantId: string;
    compositeScore: number; // 0-1000 scale
    recentChange: number; // e.g., +12 or -5
    breakdown: RiskScoreBreakdown;
    trend: RiskScoreTrend[];
}

export const mockRiskScores: Record<string, RiskScore> = {
    'APP-1001': {
        applicantId: 'APP-1001',
        compositeScore: 650,
        recentChange: 0,
        breakdown: { rxScore: 200, conditionScore: 300, labScore: 150 },
        trend: [
            { date: '2025-09', score: 620 },
            { date: '2025-12', score: 650 },
            { date: '2026-03', score: 650 }
        ]
    },
    'APP-1002': {
        applicantId: 'APP-1002',
        compositeScore: 210,
        recentChange: -15,
        breakdown: { rxScore: 80, conditionScore: 50, labScore: 80 },
        trend: [
            { date: '2025-09', score: 230 },
            { date: '2025-12', score: 225 },
            { date: '2026-03', score: 210 }
        ]
    },
    'APP-1003': {
        applicantId: 'APP-1003',
        compositeScore: 780,
        recentChange: +45,
        breakdown: { rxScore: 350, conditionScore: 300, labScore: 130 },
        trend: [
            { date: '2025-09', score: 710 },
            { date: '2025-12', score: 735 },
            { date: '2026-03', score: 780 }
        ]
    },
    'APP-1004': {
        applicantId: 'APP-1004',
        compositeScore: 0,
        recentChange: 0,
        breakdown: { rxScore: 0, conditionScore: 0, labScore: 0 },
        trend: []
    },
    'APP-1005': {
        applicantId: 'APP-1005',
        compositeScore: 920,
        recentChange: +120,
        breakdown: { rxScore: 400, conditionScore: 450, labScore: 70 },
        trend: [
            { date: '2025-09', score: 780 },
            { date: '2025-12', score: 800 },
            { date: '2026-03', score: 920 }
        ]
    },
    'APP-1006': {
        applicantId: 'APP-1006',
        compositeScore: 540,
        recentChange: -5,
        breakdown: { rxScore: 180, conditionScore: 210, labScore: 150 },
        trend: [
            { date: '2025-09', score: 550 },
            { date: '2025-12', score: 545 },
            { date: '2026-03', score: 540 }
        ]
    },
    'APP-1007': {
        applicantId: 'APP-1007',
        compositeScore: 180,
        recentChange: -20,
        breakdown: { rxScore: 50, conditionScore: 50, labScore: 80 },
        trend: [
            { date: '2025-09', score: 210 },
            { date: '2025-12', score: 200 },
            { date: '2026-03', score: 180 }
        ]
    },
    'APP-1008': {
        applicantId: 'APP-1008',
        compositeScore: 810,
        recentChange: +10,
        breakdown: { rxScore: 320, conditionScore: 290, labScore: 200 },
        trend: [
            { date: '2025-09', score: 790 },
            { date: '2025-12', score: 800 },
            { date: '2026-03', score: 810 }
        ]
    }
};

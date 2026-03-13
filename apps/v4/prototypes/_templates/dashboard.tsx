import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockApplicants, Applicant } from '@/lib/mock-data/applicants';
import { mockRiskScores } from '@/lib/mock-data/risk-scores';

/**
 * DASHBOARD TEMPLATE
 *
 * Layout: KPI stat cards row → chart/visualization area → summary table
 * Use when: showing a portfolio overview with aggregate metrics on top
 *   and a drill-down data table below
 *
 * Inspired by: clinical summary headers (vitals, key metrics) + data table below
 */

export default function DashboardTemplate() {
    const [searchTerm, setSearchTerm] = useState('');

    // CUSTOMIZE: Compute your own aggregate KPI values
    const totalApplicants = mockApplicants.length;
    const criticalCount = mockApplicants.filter(a => a.riskTier === 'Critical').length;
    const highCount = mockApplicants.filter(a => a.riskTier === 'High').length;
    const pendingReview = mockApplicants.filter(a => a.status === 'Review').length;

    const avgScore = Object.values(mockRiskScores)
        .filter(s => s.compositeScore > 0)
        .reduce((acc, s) => acc + s.compositeScore, 0) /
        Object.values(mockRiskScores).filter(s => s.compositeScore > 0).length;

    const filteredApplicants = mockApplicants.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 space-y-6 max-w-7xl mx-auto">

            {/* Page Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Portfolio Overview</h1>
                    <p className="text-muted-foreground mt-1">Aggregate risk metrics across all applicants</p>
                </div>
                <div className="flex gap-2">
                    {/* CUSTOMIZE: Add your header actions */}
                    <Button variant="outline">Export Report</Button>
                    <Button>New Applicant</Button>
                </div>
            </div>

            {/* KPI Row */}
            {/* CUSTOMIZE: Swap these stats for your own domain metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Total Applicants</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-irix-primary">{totalApplicants}</div>
                        <p className="text-xs text-muted-foreground mt-1">Active in portfolio</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Avg Composite Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{avgScore.toFixed(0)}</div>
                        <p className="text-xs text-muted-foreground mt-1">0–1000 scale</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Critical / High</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-600">{criticalCount + highCount}</div>
                        <p className="text-xs text-muted-foreground mt-1">{criticalCount} critical • {highCount} high</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-amber-600">{pendingReview}</div>
                        <p className="text-xs text-muted-foreground mt-1">Awaiting underwriter action</p>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            {/* CUSTOMIZE: Replace placeholders with Recharts components using trend data */}
            <div className="grid gap-4 md:grid-cols-7">
                <Card className="md:col-span-4">
                    <CardHeader>
                        <CardTitle>Score Trend Over Time</CardTitle>
                        <CardDescription>Average composite score by month</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[280px] flex items-center justify-center border border-dashed rounded-lg bg-muted/5 text-muted-foreground">
                        {/* CUSTOMIZE: Use Recharts LineChart with mockRiskScores[x].trend data */}
                        Chart placeholder — prompt the AI to render a Recharts line chart here
                    </CardContent>
                </Card>

                <Card className="md:col-span-3">
                    <CardHeader>
                        <CardTitle>Risk Distribution</CardTitle>
                        <CardDescription>Applicants by risk tier</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* CUSTOMIZE: Replace with a Recharts PieChart or bar chart */}
                        <div className="space-y-3">
                            {(['Low', 'Moderate', 'High', 'Critical', 'Pending'] as const).map(tier => {
                                const count = mockApplicants.filter(a => a.riskTier === tier).length;
                                const pct = (count / totalApplicants * 100).toFixed(0);
                                return (
                                    <div key={tier} className="flex items-center gap-3">
                                        <Badge
                                            variant={tier === 'Critical' ? 'destructive' : tier === 'High' ? 'default' : 'secondary'}
                                            className="w-20 justify-center"
                                        >
                                            {tier}
                                        </Badge>
                                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${
                                                    tier === 'Critical' ? 'bg-red-500' :
                                                    tier === 'High' ? 'bg-orange-500' :
                                                    tier === 'Moderate' ? 'bg-amber-400' :
                                                    tier === 'Low' ? 'bg-green-500' : 'bg-gray-400'
                                                }`}
                                                style={{ width: `${pct}%` }}
                                            />
                                        </div>
                                        <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Data Table */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>Applicant List</CardTitle>
                        <Input
                            placeholder="Search name or ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-[250px]"
                        />
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* CUSTOMIZE: Adjust columns */}
                                <TableHead>Applicant</TableHead>
                                <TableHead>State</TableHead>
                                <TableHead>Risk Tier</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Composite Score</TableHead>
                                <TableHead>Policy Amount</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplicants.map((applicant: Applicant) => {
                                const score = mockRiskScores[applicant.id];
                                return (
                                    <TableRow key={applicant.id}>
                                        <TableCell>
                                            <div className="font-medium">{applicant.name}</div>
                                            <div className="text-xs text-muted-foreground">{applicant.id}</div>
                                        </TableCell>
                                        <TableCell>{applicant.state}</TableCell>
                                        <TableCell>
                                            <Badge variant={
                                                applicant.riskTier === 'Critical' ? 'destructive' :
                                                applicant.riskTier === 'High' ? 'default' : 'secondary'
                                            }>
                                                {applicant.riskTier}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{applicant.status}</TableCell>
                                        <TableCell>
                                            <span className="font-mono">{score?.compositeScore || '—'}</span>
                                            {score && score.recentChange !== 0 && (
                                                <span className={`ml-1 text-xs ${score.recentChange > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                                    {score.recentChange > 0 ? '↑' : '↓'}{Math.abs(score.recentChange)}
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell>${applicant.policyAmount.toLocaleString()}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm">View</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Pagination */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div>Showing 1–{filteredApplicants.length} of {mockApplicants.length} applicants</div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>Previous</Button>
                    <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
            </div>
        </div>
    );
}

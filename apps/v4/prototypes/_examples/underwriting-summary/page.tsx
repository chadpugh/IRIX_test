import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockApplicants } from '@/lib/mock-data/applicants';
import { mockRiskScores } from '@/lib/mock-data/risk-scores';
import { mockRxHistory } from '@/lib/mock-data/rx-history';

export default function UnderwritingSummaryExample() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);

    // KPIs
    const totalReview = mockApplicants.filter(a => a.status === 'Review').length;
    const criticalCount = mockApplicants.filter(a => a.riskTier === 'Critical').length;
    const avgRxScore = Math.round(
        Object.values(mockRiskScores).reduce((acc, curr) => acc + curr.breakdown.rxScore, 0) /
        Object.keys(mockRiskScores).length
    );

    // Table Data
    const filteredApplicants = mockApplicants.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Detail Data
    const selectedApplicant = selectedApplicantId ? mockApplicants.find(a => a.id === selectedApplicantId) : null;
    const selectedScore = selectedApplicantId ? mockRiskScores[selectedApplicantId] : null;
    const selectedRx = selectedApplicantId ? mockRxHistory.filter(rx => rx.applicantId === selectedApplicantId) : [];

    return (
        <div className="flex h-screen overflow-hidden bg-background">

            {/* Main Column */}
            <div className={`flex flex-col h-full overflow-y-auto p-6 transition-all duration-300 ${selectedApplicantId ? 'w-1/2 border-r' : 'w-full'}`}>

                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Underwriting Dash</h1>
                    <div className="flex gap-2">
                        <Button variant="outline">Refresh Data</Button>
                        <Button>Export Queue</Button>
                    </div>
                </div>

                {/* KPI Row */}
                <div className="grid gap-4 md:grid-cols-3 mb-8">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold">{totalReview}</div>
                            <p className="text-xs text-muted-foreground mt-1">Applications waiting</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Critical Risk</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-red-600">{criticalCount}</div>
                            <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Rx Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-irix-primary">{avgRxScore}</div>
                            <p className="text-xs text-muted-foreground mt-1">Portfolio average (Max 500)</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters */}
                <div className="flex items-center gap-2 mb-4">
                    <Input
                        placeholder="Search applicants..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full max-w-sm"
                    />
                    <Button variant="secondary">Filter Options</Button>
                </div>

                {/* Data Table */}
                <Card className="flex-1 overflow-hidden flex flex-col">
                    <CardContent className="p-0 flex-1 overflow-auto">
                        <Table>
                            <TableHeader className="sticky top-0 bg-background z-10 border-b">
                                <TableRow>
                                    <TableHead>Applicant</TableHead>
                                    <TableHead>Risk</TableHead>
                                    <TableHead>Score</TableHead>
                                    {!selectedApplicantId && <TableHead>Status</TableHead>}
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredApplicants.map((applicant) => {
                                    const score = mockRiskScores[applicant.id]?.compositeScore || 0;
                                    return (
                                        <TableRow
                                            key={applicant.id}
                                            className={`cursor-pointer ${selectedApplicantId === applicant.id ? 'bg-muted/50' : ''}`}
                                            onClick={() => setSelectedApplicantId(applicant.id)}
                                        >
                                            <TableCell>
                                                <div className="font-medium text-irix-primary">{applicant.name}</div>
                                                <div className="text-xs text-muted-foreground">{applicant.state} • {applicant.age}y</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={applicant.riskTier === 'Critical' ? 'destructive' : applicant.riskTier === 'High' ? 'default' : 'secondary'}>
                                                    {applicant.riskTier}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="font-medium">{score}</TableCell>
                                            {!selectedApplicantId && <TableCell>{applicant.status}</TableCell>}
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setSelectedApplicantId(applicant.id); }}>
                                                    View
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {/* Detail Panel Column */}
            {selectedApplicantId && selectedApplicant && (
                <div className="w-1/2 flex flex-col h-full bg-muted/5 border-l">
                    <div className="p-6 border-b bg-background flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-bold">{selectedApplicant.name}</h2>
                                <Badge variant={selectedApplicant.riskTier === 'Critical' ? 'destructive' : 'secondary'}>
                                    {selectedApplicant.riskTier} Risk
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{selectedApplicant.id} • App Date: {selectedApplicant.applicationDate}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => setSelectedApplicantId(null)}>
                            <span className="sr-only">Close</span>
                            {/* simple X icon via SVG */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">

                        {/* Score Breakdown */}
                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-lg">Risk Score Analysis</CardTitle>
                                <CardDescription>Composite: <strong className="text-foreground">{selectedScore?.compositeScore}</strong></CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-3 gap-4 border rounded-lg p-4 bg-background">
                                    <div className="text-center border-r">
                                        <p className="text-xs text-muted-foreground mb-1">Rx Score</p>
                                        <p className="text-2xl font-semibold text-irix-primary">{selectedScore?.breakdown.rxScore}</p>
                                    </div>
                                    <div className="text-center border-r">
                                        <p className="text-xs text-muted-foreground mb-1">Condition</p>
                                        <p className="text-2xl font-semibold text-irix-primary">{selectedScore?.breakdown.conditionScore}</p>
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs text-muted-foreground mb-1">Lab</p>
                                        <p className="text-2xl font-semibold text-irix-primary">{selectedScore?.breakdown.labScore}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Deep Dive Tabs */}
                        <Tabs defaultValue="rx" className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="rx">Prescription Log</TabsTrigger>
                                <TabsTrigger value="decision">Underwriter Action</TabsTrigger>
                            </TabsList>

                            <TabsContent value="rx" className="mt-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-md">Rx History</CardTitle>
                                        <CardDescription>{selectedRx.length} records found</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {selectedRx.length > 0 ? selectedRx.map(rx => (
                                            <div key={rx.id} className="flex justify-between items-start pb-4 border-b last:border-0 last:pb-0">
                                                <div>
                                                    <div className="font-medium">{rx.drugName}</div>
                                                    <div className="text-xs text-muted-foreground">Filled: {rx.fillDate} • {rx.daysSupply} days</div>
                                                </div>
                                                {rx.riskFlag !== 'None' && (
                                                    <Badge variant={rx.riskFlag === 'High Risk' ? 'destructive' : 'secondary'} className="text-[10px]">
                                                        {rx.riskFlag}
                                                    </Badge>
                                                )}
                                            </div>
                                        )) : (
                                            <p className="text-sm text-muted-foreground">No Rx records for this applicant.</p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="decision" className="mt-4">
                                <Card>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium">Policy Request: ${selectedApplicant.policyAmount.toLocaleString()}</p>
                                            <p className="text-sm text-muted-foreground">Based on the {selectedApplicant.riskTier} risk profile and composite score of {selectedScore?.compositeScore}, a formal review decision is required.</p>
                                        </div>
                                        <div className="flex gap-2 w-full pt-4">
                                            <Button className="flex-1" variant="outline">Request Med Records</Button>
                                            <Button className="flex-1" variant="default">Approve Case</Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                    </div>
                </div>
            )}
        </div>
    );
}

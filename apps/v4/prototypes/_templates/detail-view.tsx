import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { mockApplicants } from '@/lib/mock-data/applicants';
import { mockRiskScores } from '@/lib/mock-data/risk-scores';
import { mockRxHistory } from '@/lib/mock-data/rx-history';

/**
 * DETAIL VIEW TEMPLATE
 *
 * Layout: breadcrumb header → two-column grid (wide left + narrow right)
 * Use when: showing a single record's full detail with metadata sidebar
 *
 * Inspired by: "Criteria Detail" view — evaluations on left, versions/history on right
 */

export default function DetailViewTemplate() {
    // CUSTOMIZE: Set the applicant to display, or accept via props / URL param
    const currentId = 'APP-1003';
    const applicant = mockApplicants.find(a => a.id === currentId)!;
    const score = mockRiskScores[currentId];
    const rxRecords = mockRxHistory.filter(rx => rx.applicantId === currentId);

    // CUSTOMIZE: Define version history for the right column
    const versionHistory = [
        { version: 5, status: 'Staged', product: 'Clinical-Default', updated: '02/12/2026' },
        { version: 4, status: 'Production', product: 'Clinical-Default', updated: '01/05/2026' },
        { version: 3, status: 'Production', product: 'Clinical-Default', updated: '12/19/2025' },
        { version: 2, status: 'Production', product: 'Clinical-Default', updated: '11/23/2025' },
        { version: 1, status: 'Production', product: 'Clinical-Default', updated: '11/01/2025' },
    ];

    return (
        <div className="p-6 max-w-7xl mx-auto space-y-6">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-irix-primary">
                <span className="hover:underline cursor-pointer">Risk Identification</span>
                <span className="text-muted-foreground">/</span>
                <span className="hover:underline cursor-pointer">{applicant.state}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">{applicant.name}</span>
            </div>

            {/* Page Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{applicant.name}: Case {applicant.id}</h1>
                    <div className="flex items-center gap-3 mt-2">
                        <span className="text-sm text-muted-foreground">Version</span>
                        <Badge variant="secondary">5 (Staged)</Badge>
                    </div>
                </div>
                <Button variant="outline" className="text-irix-primary">Revert to Previous</Button>
            </div>

            {/* Two-Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* LEFT COLUMN — Primary Content (2/3 width) */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Details Section */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-muted-foreground w-24">Risk Tier:</span>
                                <div className="flex gap-2">
                                    <Badge variant={applicant.riskTier === 'Critical' ? 'destructive' : applicant.riskTier === 'High' ? 'default' : 'secondary'}>
                                        {applicant.riskTier}
                                    </Badge>
                                </div>
                                <span className="ml-auto text-sm text-muted-foreground">
                                    Ranked {score?.compositeScore > 700 ? '1st' : score?.compositeScore > 500 ? '2nd' : '3rd'}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Evaluations / Grouped Data Sections */}
                    {/* CUSTOMIZE: Replace with your domain-specific grouped data */}
                    {rxRecords.length > 0 && (
                        <Card>
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                        Prescriptions
                                    </CardTitle>
                                    <Badge variant="outline" className="text-xs">{rxRecords.length} records</Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {rxRecords.map((rx) => (
                                        <div key={rx.id} className="border rounded-lg p-4 space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium">{rx.drugName}</span>
                                                {rx.riskFlag !== 'None' && (
                                                    <Badge variant={rx.riskFlag === 'High Risk' ? 'destructive' : 'secondary'}>
                                                        {rx.riskFlag}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="grid grid-cols-3 gap-4 text-sm">
                                                <div>
                                                    <span className="text-muted-foreground">NDC</span>
                                                    <p>{rx.ndc}</p>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Prescriber</span>
                                                    <p>{rx.prescriberType}</p>
                                                </div>
                                                <div>
                                                    <span className="text-muted-foreground">Fill Date</span>
                                                    <p>{rx.fillDate}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}

                    {/* Score Breakdown */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Risk Score Breakdown
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold text-irix-primary">{score?.breakdown.rxScore}</div>
                                    <p className="text-sm text-muted-foreground mt-1">Rx Score</p>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold text-irix-primary">{score?.breakdown.conditionScore}</div>
                                    <p className="text-sm text-muted-foreground mt-1">Condition Score</p>
                                </div>
                                <div className="text-center p-4 border rounded-lg">
                                    <div className="text-2xl font-bold text-irix-primary">{score?.breakdown.labScore}</div>
                                    <p className="text-sm text-muted-foreground mt-1">Lab Score</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Action Footer */}
                    <div className="flex gap-3 pt-2">
                        {/* CUSTOMIZE: Replace with your domain actions */}
                        <Button>Edit Staged Criteria</Button>
                        <Button variant="destructive">Delete Staged Version</Button>
                        <Button variant="outline">Go Back to Previous View</Button>
                    </div>
                </div>

                {/* RIGHT COLUMN — Metadata Sidebar (1/3 width) */}
                <div className="space-y-6">

                    {/* Active Versions */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Active Versions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-xs">Version</TableHead>
                                        <TableHead className="text-xs">Status</TableHead>
                                        <TableHead className="text-xs">Updated</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {versionHistory.map((v) => (
                                        <TableRow key={v.version}>
                                            <TableCell>
                                                <span className="text-irix-primary cursor-pointer hover:underline font-medium">
                                                    {v.version}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <span className="text-sm">{v.status}</span>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {v.updated}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div className="p-3 text-xs text-muted-foreground text-center">
                                {versionHistory.length} total items
                            </div>
                        </CardContent>
                    </Card>

                    {/* Version History Log */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Version History
                            </CardTitle>
                            <CardDescription>Changes to risk factor logic</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {/* CUSTOMIZE: Display your own event timeline */}
                            <div className="space-y-3 text-sm">
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <span>
                                        <span className="text-irix-primary cursor-pointer hover:underline">Staged (v5)</span>
                                        {' '}created <span className="text-muted-foreground">02/12/2026</span>
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <span>
                                        <span className="text-irix-primary cursor-pointer hover:underline">Staged v4</span>
                                        {' '}promoted as Production v4 <span className="text-muted-foreground">01/05/2026</span>
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <span>
                                        <span className="text-irix-primary cursor-pointer hover:underline">Staged v3</span>
                                        {' '}created <span className="text-muted-foreground">12/19/2025</span>
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground">•</span>
                                    <span>
                                        <span className="text-irix-primary cursor-pointer hover:underline">Production v2</span>
                                        {' '}released <span className="text-muted-foreground">11/01/2025</span>
                                    </span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Application Summary */}
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                                Applicant Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Age</span>
                                <span className="font-medium">{applicant.age} yrs</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">State</span>
                                <span className="font-medium">{applicant.state}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Policy Amount</span>
                                <span className="font-medium">${applicant.policyAmount.toLocaleString()}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <span className="font-medium">{applicant.status}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">App Date</span>
                                <span className="font-medium">{applicant.applicationDate}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

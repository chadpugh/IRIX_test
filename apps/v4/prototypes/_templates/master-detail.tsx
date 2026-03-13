import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockApplicants, Applicant } from '@/lib/mock-data/applicants';
import { mockRiskScores } from '@/lib/mock-data/risk-scores';
import { mockRxHistory } from '@/lib/mock-data/rx-history';

/**
 * MASTER-DETAIL TABLE TEMPLATE
 *
 * Layout: tab filters → search bar with active filter chips → expandable
 *   parent rows with nested child rows
 * Use when: viewing grouped/hierarchical data where parent rows expand to
 *   show related child records
 *
 * Inspired by: "Insights" view — rules expand to show nested insight rows,
 *   tab filters, search, bulk actions
 */

export default function MasterDetailTemplate() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['APP-1003', 'APP-1005']));
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        setExpandedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleSelect = (id: string) => {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    // CUSTOMIZE: Adjust filter logic
    const filteredApplicants = mockApplicants.filter(applicant => {
        const matchesSearch = applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            applicant.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = activeTab === 'all' ||
            (activeTab === 'review' && applicant.status === 'Review') ||
            (activeTab === 'approved' && applicant.status === 'Approved') ||
            (activeTab === 'declined' && applicant.status === 'Declined');
        return matchesSearch && matchesTab;
    });

    return (
        <div className="p-6 space-y-4 max-w-7xl mx-auto">

            {/* Page Header */}
            {/* CUSTOMIZE: Breadcrumb + Page Title */}
            <div className="flex items-center gap-2 text-sm text-irix-primary mb-1">
                <span className="hover:underline cursor-pointer">Client Product</span>
                <span className="text-muted-foreground">/</span>
                <span className="hover:underline cursor-pointer">AAA-FULL</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">Insights</span>
            </div>

            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold tracking-tight">AAA-FULL Insights</h1>
                <div className="flex gap-2">
                    <Badge variant="outline" className="text-sm py-1 px-3">Production</Badge>
                    <Badge className="text-sm py-1 px-3 bg-irix-primary">Stage</Badge>
                </div>
            </div>

            {/* Tab Filters + Search Bar */}
            <div className="flex flex-col gap-3">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="review">In Review</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                        <TabsTrigger value="declined">Declined</TabsTrigger>
                    </TabsList>
                </Tabs>

                <div className="flex items-center gap-3">
                    <Input
                        placeholder="Search by rule..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-xs"
                    />

                    {/* Active Filter Chips */}
                    {/* CUSTOMIZE: Add your own filter chips */}
                    {selectedIds.size > 0 && (
                        <Badge variant="secondary" className="text-xs">
                            {selectedIds.size} Items Selected ✕
                        </Badge>
                    )}

                    <div className="ml-auto flex gap-2">
                        {selectedIds.size > 0 && (
                            <>
                                <Button variant="outline" size="sm">Edit Selected Items</Button>
                                <Button size="sm">Save Changes</Button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Expandable Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {/* CUSTOMIZE: Define your column headers */}
                                <TableHead className="w-[40px]"></TableHead>
                                <TableHead className="w-[40px]"></TableHead>
                                <TableHead>Applicant ID</TableHead>
                                <TableHead>Risk Tier</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Composite Score</TableHead>
                                <TableHead>Rx Score</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredApplicants.map((applicant: Applicant) => {
                                const isExpanded = expandedIds.has(applicant.id);
                                const isSelected = selectedIds.has(applicant.id);
                                const score = mockRiskScores[applicant.id];
                                const rxRecords = mockRxHistory.filter(rx => rx.applicantId === applicant.id);

                                return (
                                    <React.Fragment key={applicant.id}>
                                        {/* Parent Row */}
                                        <TableRow className={isExpanded ? 'bg-muted/30' : ''}>
                                            <TableCell>
                                                <button
                                                    onClick={() => toggleExpand(applicant.id)}
                                                    className="text-muted-foreground hover:text-foreground"
                                                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                                                >
                                                    {isExpanded ? '▾' : '▸'}
                                                </button>
                                            </TableCell>
                                            <TableCell>
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => toggleSelect(applicant.id)}
                                                    className="rounded border-muted-foreground/30"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-semibold">{applicant.name}</div>
                                                <div className="text-xs text-muted-foreground">{applicant.id}</div>
                                            </TableCell>
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
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono">{score?.breakdown.rxScore || '—'}</span>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button variant="ghost" size="sm">View Detail</Button>
                                            </TableCell>
                                        </TableRow>

                                        {/* Nested Child Rows */}
                                        {isExpanded && rxRecords.map((rx) => (
                                            <TableRow key={rx.id} className="bg-muted/10 border-l-4 border-l-irix-primary/30">
                                                <TableCell></TableCell>
                                                <TableCell>
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-muted-foreground/30"
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <span className="text-irix-primary cursor-pointer hover:underline text-sm">
                                                        {rx.drugName}
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {rx.riskFlag !== 'None' && (
                                                        <Badge variant={rx.riskFlag === 'High Risk' ? 'destructive' : 'secondary'} className="text-xs">
                                                            {rx.riskFlag}
                                                        </Badge>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {rx.prescriberType}
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {rx.fillDate}
                                                </TableCell>
                                                <TableCell className="text-sm">
                                                    {rx.daysSupply} day supply
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <span className="text-green-600">✓</span>
                                                </TableCell>
                                            </TableRow>
                                        ))}

                                        {/* Empty expanded state */}
                                        {isExpanded && rxRecords.length === 0 && (
                                            <TableRow className="bg-muted/10 border-l-4 border-l-irix-primary/30">
                                                <TableCell></TableCell>
                                                <TableCell colSpan={6} className="text-sm text-muted-foreground italic">
                                                    No prescription records
                                                </TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{filteredApplicants.length} total items</span>
                <div className="flex gap-3">
                    <Button variant="ghost" size="sm">Hide ⊘</Button>
                    <Button variant="ghost" size="sm">Collapse ↤</Button>
                </div>
            </div>
        </div>
    );
}

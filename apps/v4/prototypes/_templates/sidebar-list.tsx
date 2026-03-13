import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { mockApplicants, Applicant } from '@/lib/mock-data/applicants';
import { mockRiskScores } from '@/lib/mock-data/risk-scores';

/**
 * SIDEBAR LIST TEMPLATE
 *
 * Layout: persistent sidebar navigation + main content area with data table
 * Use when: browsing a flat list of records with section-based navigation
 *
 * Inspired by: "All Rules" view — sidebar nav groups, search, sortable table
 */

// CUSTOMIZE: Define your own sidebar navigation sections
const sidebarSections = [
    {
        label: 'RISK FACTORS',
        items: [
            { label: 'Identification', active: true },
            { label: 'Insights', active: false },
            { label: 'Clinical Builder', active: false },
            { label: 'Parameters', active: false },
            { label: 'Impact Testing', active: false },
            { label: 'Search All', active: false },
        ],
    },
    {
        label: 'ADMINISTRATION',
        items: [
            { label: 'Internal Users', active: false },
            { label: 'Dashboard Config', active: false },
            { label: 'Product Config', active: false },
        ],
    },
];

export default function SidebarListTemplate() {
    const [searchTerm, setSearchTerm] = useState('');

    // CUSTOMIZE: Adjust filtering logic for your dataset
    const filteredApplicants = mockApplicants.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex h-screen overflow-hidden bg-background">

            {/* Sidebar Navigation */}
            <div className="w-[220px] border-r bg-muted/10 flex flex-col h-full">
                <div className="p-4 border-b">
                    <h2 className="font-semibold text-sm text-irix-primary">Interpretation Engine</h2>
                </div>

                <ScrollArea className="flex-1">
                    <div className="p-3 space-y-6">
                        {sidebarSections.map((section) => (
                            <div key={section.label}>
                                <p className="text-[11px] font-semibold text-muted-foreground tracking-wider mb-2">
                                    {section.label}
                                </p>
                                <div className="space-y-0.5">
                                    {section.items.map((item) => (
                                        <button
                                            key={item.label}
                                            className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                                                item.active
                                                    ? 'bg-irix-primary/10 text-irix-primary font-medium'
                                                    : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">

                {/* Page Header */}
                <div className="p-6 pb-0">
                    <div className="flex items-center justify-between mb-1">
                        <h1 className="text-2xl font-bold tracking-tight">Risk Identification</h1>
                        <div className="flex gap-2">
                            {/* CUSTOMIZE: Replace with your action buttons */}
                            <Button variant="outline">Bulk Download</Button>
                            <Button variant="outline">Bulk Upload</Button>
                            <Button>Add New Risk Factor</Button>
                        </div>
                    </div>
                    <h2 className="text-lg text-muted-foreground mb-4">All Rules</h2>

                    {/* Search */}
                    <Input
                        placeholder="Search label..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="max-w-sm mb-4"
                    />
                </div>

                {/* Data Table */}
                <div className="flex-1 overflow-auto px-6 pb-6">
                    <Card>
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        {/* CUSTOMIZE: Define your column headers */}
                                        <TableHead className="w-[40px]">
                                            <input type="checkbox" className="rounded border-muted-foreground/30" />
                                        </TableHead>
                                        <TableHead>Risk Factors</TableHead>
                                        <TableHead>Evaluation(s)</TableHead>
                                        <TableHead className="text-right">All Child Criteria Statuses</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredApplicants.map((applicant: Applicant) => {
                                        const score = mockRiskScores[applicant.id];
                                        return (
                                            <TableRow key={applicant.id}>
                                                <TableCell>
                                                    <input type="checkbox" className="rounded border-muted-foreground/30" />
                                                </TableCell>
                                                <TableCell>
                                                    <span className="font-medium text-irix-primary cursor-pointer hover:underline">
                                                        {applicant.name}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-sm text-muted-foreground">
                                                    {applicant.state} • Score: {score?.compositeScore || 'N/A'}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-1">
                                                        <Badge variant="outline" className="text-xs">
                                                            Prod {Math.floor(Math.random() * 18) + 1}
                                                        </Badge>
                                                        <Badge variant="secondary" className="text-xs">
                                                            Staged {Math.floor(Math.random() * 12) + 1}
                                                        </Badge>
                                                        <Badge variant="outline" className="text-xs text-muted-foreground">
                                                            Drafts {Math.floor(Math.random() * 12)}
                                                        </Badge>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                        <span>{filteredApplicants.length} total items</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

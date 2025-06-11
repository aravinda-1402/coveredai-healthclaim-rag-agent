import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DocumentArrowUpIcon, XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface PlanData {
  label: string;
  file: File | null;
  summary?: {
    deductibles: {
      individual: string;
      family: string;
    };
    outOfPocketMax: {
      individual: string;
      family: string;
    };
    copays: {
      primaryCare: string;
      specialist: string;
      emergencyRoom: string;
      urgentCare: string;
    };
    prescriptionCoverage: string;
    mentalHealthCoverage: string;
  };
}

const MultiPlanComparison: React.FC = () => {
  const [plans, setPlans] = useState<PlanData[]>([
    { label: '', file: null },
    { label: '', file: null },
    { label: '', file: null },
  ]);
  const [showDifferencesOnly, setShowDifferencesOnly] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (index: number, file: File | null) => {
    const newPlans = [...plans];
    newPlans[index].file = file;
    setPlans(newPlans);
  };

  const handleLabelChange = (index: number, label: string) => {
    const newPlans = [...plans];
    newPlans[index].label = label;
    setPlans(newPlans);
  };

  const handleRemoveFile = (index: number) => {
    const newPlans = [...plans];
    newPlans[index] = { label: '', file: null };
    setPlans(newPlans);
  };

  const hasAllRequiredFiles = () => plans.filter(p => p.file && p.label).length >= 2;

  const compareValues = (values: string[]) => {
    const valid = values.filter(Boolean);
    return valid.length > 0 && !valid.every(v => v === valid[0]);
  };

  const uploadFiles = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      plans.forEach((plan, idx) => {
        if (plan.file && plan.label) {
          formData.append(`file${idx}`, plan.file);
          formData.append(`label${idx}`, plan.label);
        }
      });

      const response = await fetch('http://localhost:5000/api/compare-plans', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to upload');
      }

      const data = await response.json();
      const newPlans = plans.map((plan, i) => ({ ...plan, summary: data[i]?.summary }));
      setPlans(newPlans);
    } catch (err: any) {
      alert(err?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  };

  const tableRows = [
    { label: 'Individual Deductible', getValue: (p: PlanData) => p.summary?.deductibles.individual || '' },
    { label: 'Family Deductible', getValue: (p: PlanData) => p.summary?.deductibles.family || '' },
    { label: 'Individual Out-of-Pocket Max', getValue: (p: PlanData) => p.summary?.outOfPocketMax.individual || '' },
    { label: 'Family Out-of-Pocket Max', getValue: (p: PlanData) => p.summary?.outOfPocketMax.family || '' },
    { label: 'Primary Care Copay', getValue: (p: PlanData) => p.summary?.copays.primaryCare || '' },
    { label: 'Specialist Copay', getValue: (p: PlanData) => p.summary?.copays.specialist || '' },
    { label: 'Emergency Room Copay', getValue: (p: PlanData) => p.summary?.copays.emergencyRoom || '' },
    { label: 'Urgent Care Copay', getValue: (p: PlanData) => p.summary?.copays.urgentCare || '' },
    { label: 'Prescription Coverage', getValue: (p: PlanData) => p.summary?.prescriptionCoverage || '' },
    { label: 'Mental Health Coverage', getValue: (p: PlanData) => p.summary?.mentalHealthCoverage || '' },
  ];

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ mt: 2, boxShadow: 'sm', borderRadius: 2 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, backgroundColor: 'primary.50' }}>Benefit</TableCell>
            {plans.map((plan, i) =>
              plan.label ? (
                <TableCell key={i} sx={{ fontWeight: 600, backgroundColor: 'primary.50' }}>
                  {plan.label}
                </TableCell>
              ) : null
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableRows.map((row, i) => {
            const values = plans.map(row.getValue);
            const highlight = compareValues(values);
            if (showDifferencesOnly && !highlight) return null;
            return (
              <TableRow 
                key={i} 
                sx={{ 
                  backgroundColor: highlight ? 'warning.50' : undefined,
                  '&:hover': { backgroundColor: highlight ? 'warning.100' : 'action.hover' }
                }}
              >
                <TableCell sx={{ fontWeight: 500 }}>{row.label}</TableCell>
                {plans.map((plan, j) =>
                  plan.label ? (
                    <TableCell key={j} sx={{ color: highlight ? 'warning.900' : 'text.primary' }}>
                      {row.getValue(plan)}
                    </TableCell>
                  ) : null
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', p: { xs: 2, sm: 4 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 700,
          background: 'linear-gradient(45deg, #2563eb, #4f46e5)',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}
      >
        <DocumentArrowUpIcon style={{ width: 32, height: 32, color: '#2563eb' }} />
        Insurance Plan Comparison
      </Typography>

      <Card sx={{ mb: 4, borderRadius: 2, boxShadow: 'sm' }}>
        <CardContent sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
            Upload Insurance Plans (PDF)
          </Typography>
          
          <Grid container spacing={3}>
            {plans.map((plan, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  variant="outlined" 
                  sx={{ 
                    p: 2,
                    borderColor: plan.file ? 'primary.200' : 'grey.200',
                    backgroundColor: plan.file ? 'primary.50' : 'background.paper',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      borderColor: 'primary.300',
                      backgroundColor: plan.file ? 'primary.100' : 'grey.50'
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      label={`Plan ${index + 1} Name`}
                      fullWidth
                      size="small"
                      value={plan.label}
                      onChange={(e) => handleLabelChange(index, e.target.value)}
                      sx={{ 
                        '& .MuiOutlinedInput-root': {
                          backgroundColor: 'background.paper'
                        }
                      }}
                    />
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button
                      variant="outlined"
                      component="label"
                      fullWidth
                      size="small"
                      sx={{
                        borderStyle: 'dashed',
                        height: '40px'
                      }}
                    >
                      {plan.file ? plan.file.name : 'Choose PDF'}
                      <input
                        type="file"
                        accept=".pdf"
                        hidden
                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                      />
                    </Button>
                    
                    {plan.file && (
                      <Tooltip title="Remove file">
                        <IconButton 
                          size="small" 
                          onClick={() => handleRemoveFile(index)}
                          sx={{ 
                            backgroundColor: 'error.50',
                            '&:hover': { backgroundColor: 'error.100' }
                          }}
                        >
                          <XMarkIcon style={{ width: 20, height: 20, color: '#ef4444' }} />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              onClick={uploadFiles}
              disabled={!hasAllRequiredFiles() || loading}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: 2,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: 'primary.600',
                '&:hover': {
                  backgroundColor: 'primary.700'
                }
              }}
              startIcon={loading ? <CircularProgress size={20} /> : <ArrowPathIcon style={{ width: 20, height: 20 }} />}
            >
              {loading ? 'Comparing Plans...' : 'Compare Plans'}
            </Button>
            
            {!hasAllRequiredFiles() && (
              <Typography variant="body2" color="text.secondary">
                Please upload at least 2 plans to compare
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {plans.some(p => p.summary) && (
        <>
          <Box sx={{ mb: 2 }}>
            <FormControlLabel
              control={
                <Checkbox 
                  checked={showDifferencesOnly} 
                  onChange={e => setShowDifferencesOnly(e.target.checked)}
                  sx={{ 
                    color: 'primary.600',
                    '&.Mui-checked': {
                      color: 'primary.600'
                    }
                  }}
                />
              }
              label={
                <Typography sx={{ fontWeight: 500, color: 'text.primary' }}>
                  Show Differences Only
                </Typography>
              }
            />
          </Box>
          {renderTable()}
        </>
      )}
    </Box>
  );
};

export default MultiPlanComparison;

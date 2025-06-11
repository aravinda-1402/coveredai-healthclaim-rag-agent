import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';

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

  const hasAllRequiredFiles = () => {
    return plans.filter(plan => plan.file && plan.label).length >= 2;
  };

  const compareValues = (values: string[]) => {
    const validValues = values.filter(v => v);
    return validValues.length > 0 && !validValues.every(v => v === validValues[0]);
  };

  const uploadFiles = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      plans.forEach((plan, index) => {
        if (plan.file && plan.label) {
          formData.append(`file${index}`, plan.file);
          formData.append(`label${index}`, plan.label);
        }
      });

      const response = await fetch('/api/compare-plans', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const data = await response.json();
      const newPlans = plans.map((plan, index) => ({
        ...plan,
        summary: data[index]?.summary,
      }));
      setPlans(newPlans);
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderComparisonTable = () => {
    const rows = [
      {
        label: 'Individual Deductible',
        getValue: (plan: PlanData) => plan.summary?.deductibles.individual || '',
      },
      {
        label: 'Family Deductible',
        getValue: (plan: PlanData) => plan.summary?.deductibles.family || '',
      },
      {
        label: 'Individual Out-of-Pocket Max',
        getValue: (plan: PlanData) => plan.summary?.outOfPocketMax.individual || '',
      },
      {
        label: 'Family Out-of-Pocket Max',
        getValue: (plan: PlanData) => plan.summary?.outOfPocketMax.family || '',
      },
      {
        label: 'Primary Care Copay',
        getValue: (plan: PlanData) => plan.summary?.copays.primaryCare || '',
      },
      {
        label: 'Specialist Copay',
        getValue: (plan: PlanData) => plan.summary?.copays.specialist || '',
      },
      {
        label: 'Emergency Room Copay',
        getValue: (plan: PlanData) => plan.summary?.copays.emergencyRoom || '',
      },
      {
        label: 'Urgent Care Copay',
        getValue: (plan: PlanData) => plan.summary?.copays.urgentCare || '',
      },
      {
        label: 'Prescription Coverage',
        getValue: (plan: PlanData) => plan.summary?.prescriptionCoverage || '',
      },
      {
        label: 'Mental Health Coverage',
        getValue: (plan: PlanData) => plan.summary?.mentalHealthCoverage || '',
      },
    ];

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Benefit</TableCell>
              {plans.map((plan, index) => (
                plan.label && <TableCell key={index}>{plan.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, rowIndex) => {
              const values = plans.map(plan => row.getValue(plan));
              const hasDifferences = compareValues(values);
              
              if (showDifferencesOnly && !hasDifferences) {
                return null;
              }

              return (
                <TableRow 
                  key={rowIndex}
                  sx={{ backgroundColor: hasDifferences ? '#fff3e0' : 'inherit' }}
                >
                  <TableCell>{row.label}</TableCell>
                  {plans.map((plan, planIndex) => (
                    plan.label && (
                      <TableCell key={planIndex}>
                        {row.getValue(plan)}
                      </TableCell>
                    )
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Compare Insurance Plans
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        {plans.map((plan, index) => (
          <Box key={index} sx={{ mb: 2, display: 'flex', gap: 2 }}>
            <TextField
              label={`Plan ${index + 1} Label`}
              value={plan.label}
              onChange={(e) => handleLabelChange(index, e.target.value)}
              size="small"
            />
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
              style={{ alignSelf: 'center' }}
            />
          </Box>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          onClick={uploadFiles}
          disabled={!hasAllRequiredFiles() || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Compare Plans'}
        </Button>
      </Box>

      {plans.some(plan => plan.summary) && (
        <>
          <FormControlLabel
            control={
              <Checkbox
                checked={showDifferencesOnly}
                onChange={(e) => setShowDifferencesOnly(e.target.checked)}
              />
            }
            label="Show Differences Only"
          />
          {renderComparisonTable()}
        </>
      )}
    </Box>
  );
};

export default MultiPlanComparison; 
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

type AlertCardProps={
    message: string,
    severity: 'error' | 'info' | 'success' | 'warning'
}

export default function AlertCard({ message, severity }: AlertCardProps) {
  return (
    <Stack sx={{mx: 'auto', width:'50%' }} spacing={2}>
      <Alert severity={ severity || 'info'}>{message || 'Alert!!'}</Alert>
    </Stack>
  );
}
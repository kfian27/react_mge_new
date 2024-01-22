import { Box, styled, useTheme } from '@mui/material';
import Breadcrumb from 'app/components/Breadcrumb';
import SimpleCard from 'app/components/SimpleCard';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: {
    margin: '16px',
  },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '16px',
    },
  },
}));

const AppEchart = () => {
  const theme = useTheme();
  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Charts', path: '/charts' }, { name: 'Echarts' }]} />
      </Box>

      <SimpleCard title="Doughnut Chart"></SimpleCard>

      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Line Chart"></SimpleCard>

      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Comparison Chart"></SimpleCard>

      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Area Chart"></SimpleCard>
    </Container>
  );
};

export default AppEchart;

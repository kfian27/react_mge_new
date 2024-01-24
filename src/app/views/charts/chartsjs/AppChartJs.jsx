import { Box, styled, useTheme } from '@mui/material';
import Breadcrumb from 'app/components/Breadcrumb';
import SimpleCard from 'app/components/SimpleCard';
import DoughnutChart from './Doughnut';
import BarChart from './Bar';
import LineChart from './Line';
import AreaChart from './Area';
import { faker } from '@faker-js/faker';

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

const AppChartJs = () => {
  const theme = useTheme();
  const dataDoughnut = {
    labels: ['no', 'ni', 'nu'],
    responsive: true,
    datasets: [
      {
        data: [10, 62, 28],
        backgroundColor: [
          theme.palette.primary.dark,
          theme.palette.primary.main,
          theme.palette.primary.light,
        ],
      },
    ],
  };

  const optionsBar = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    ],
  };

  const dataArea = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        borderColor: theme.palette.primary.main,
        backgroundColor: theme.palette.primary.main,
      },
    ],
  };

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Charts', path: '/charts' }, { name: 'Chartjs' }]} />
      </Box>

      <SimpleCard title="Doughnut Chart">
        <DoughnutChart data={dataDoughnut} height={350} />
      </SimpleCard>

      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Bar Chart">
        <BarChart data={dataBar} height={350} options={optionsBar} />
      </SimpleCard>

      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Line Chart">
        <LineChart data={dataBar} height={350} options={optionsBar} />
      </SimpleCard>

      <Box sx={{ py: '12px' }} />

      <SimpleCard title="Area Chart">
        <AreaChart data={dataArea} height={350} options={optionsBar} />
      </SimpleCard>
    </Container>
  );
};

export default AppChartJs;

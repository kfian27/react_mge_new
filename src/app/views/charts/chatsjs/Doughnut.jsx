import { useTheme } from '@mui/system';
import { Doughnut } from 'react-chartjs-2';

const DoughnutChart = ({ height, color = [] }) => {
  const theme = useTheme();
  const data = {
    labels: ['Google', 'Facebook', 'Others'],
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: [
          theme.palette.primary.dark,
          theme.palette.primary.main,
          theme.palette.primary.light,
        ],
      },
    ],
  };
};

export default DoughnutChart;

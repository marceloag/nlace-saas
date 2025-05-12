import { useState } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { formatChartYAxis, formatDate } from '@/lib/utils';

const ChartSection = ({
  tokenUsageData,
  conversationsData,
  timeRangeOptions,
  chartMetricOptions
}) => {
  const [timeRange, setTimeRange] = useState('14d');
  const [chartMetric, setChartMetric] = useState('tokens');

  // Get the appropriate data based on the selected metric
  const getChartData = () => {
    if (chartMetric === 'tokens') {
      return tokenUsageData;
    } else if (chartMetric === 'conversations') {
      return conversationsData;
    }
    // Datos de ejemplo para usuarios activos
    return [
      {
        date: '2024-04-01',
        count: 8
      },
      {
        date: '2024-04-02',
        count: 10
      },
      {
        date: '2024-04-03',
        count: 9
      },
      {
        date: '2024-04-04',
        count: 12
      },
      {
        date: '2024-04-05',
        count: 11
      },
      {
        date: '2024-04-06',
        count: 7
      },
      {
        date: '2024-04-07',
        count: 6
      },
      {
        date: '2024-04-08',
        count: 13
      },
      {
        date: '2024-04-09',
        count: 14
      },
      {
        date: '2024-04-10',
        count: 16
      },
      {
        date: '2024-04-11',
        count: 15
      },
      {
        date: '2024-04-12',
        count: 14
      },
      {
        date: '2024-04-13',
        count: 10
      },
      {
        date: '2024-04-14',
        count: 8
      }
    ];
  };

  // Colores personalizados para el gráfico
  const chartColors = {
    area: 'var(--primary)',
    areaFill: 'url(#greenGradient)',
    stroke: 'var(--primary)',
    grid: 'rgba(20, 184, 116, 0.1)',
    tooltip: 'rgba(20, 184, 116, 0.05)'
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Uso y Actividad</CardTitle>
            <CardDescription>
              Análisis detallado del uso del sistema
            </CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-full sm:w-[120px]">
                <SelectValue placeholder="Periodo" />
              </SelectTrigger>
              <SelectContent>
                {timeRangeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={chartMetric} onValueChange={setChartMetric}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Métrica" />
              </SelectTrigger>
              <SelectContent>
                {chartMetricOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" className="ml-auto sm:ml-0">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={getChartData()}>
              <defs>
                <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--primary)"
                    stopOpacity={0.4}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--primary)"
                    stopOpacity={0.01}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.grid}
                opacity={0.4}
              />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fontSize: 12 }}
                stroke="var(--muted-foreground)"
                axisLine={{ stroke: 'var(--border)' }}
              />
              <YAxis
                tickFormatter={(value) => formatChartYAxis(value, chartMetric)}
                tick={{ fontSize: 12 }}
                stroke="var(--muted-foreground)"
                axisLine={{ stroke: 'var(--border)' }}
              />
              <Tooltip
                formatter={(value) => [
                  `${value} ${
                    chartMetric === 'tokens'
                      ? 'tokens'
                      : chartMetric === 'conversations'
                      ? 'conversaciones'
                      : 'usuarios'
                  }`,
                  ''
                ]}
                labelFormatter={(label) => formatDate(label)}
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  borderRadius: '0.5rem',
                  padding: '0.75rem'
                }}
                itemStyle={{ color: 'var(--primary)' }}
                labelStyle={{ fontWeight: 'bold', color: 'var(--foreground)' }}
              />
              <Area
                type="monotone"
                dataKey="count"
                name={
                  chartMetric === 'tokens'
                    ? 'Tokens'
                    : chartMetric === 'conversations'
                    ? 'Conversaciones'
                    : 'Usuarios'
                }
                stroke={chartColors.stroke}
                strokeWidth={2}
                fill={chartColors.areaFill}
                activeDot={{
                  r: 6,
                  stroke: 'var(--background)',
                  strokeWidth: 2,
                  fill: 'var(--primary)'
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartSection;

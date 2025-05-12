'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';

const defaultColors = ['#3b82f6', '#10b981', '#f59e0b'];

export default function FlexibleChart({
  data,
  indexKey,
  valueKeys,
  colors = defaultColors,
  title = '',
  orientation = 'vertical'
}) {
  const chartColors =
    Array.isArray(colors) && colors.length > 0 ? colors : defaultColors;

  return (
    <ChartContainer
      config={{}}
      className="h-[300px] w-full bg-white rounded-md p-2"
      title={title}
    >
      <ResponsiveContainer width="100%" height="100%">
        {orientation === 'vertical' ? (
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              dataKey={indexKey}
              type="category"
              width={80}
              tickFormatter={(value) =>
                String(value).length > 10
                  ? `${String(value).substring(0, 8)}...`
                  : String(value)
              }
            />
            <Tooltip />
            <Legend />
            {valueKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={chartColors[index % chartColors.length]}
                radius={[0, 4, 4, 0]}
              />
            ))}
          </BarChart>
        ) : (
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey={indexKey}
              tickFormatter={(value) =>
                String(value).length > 10
                  ? `${String(value).substring(0, 8)}...`
                  : String(value)
              }
            />
            <YAxis type="number" />
            <Tooltip />
            <Legend />
            {valueKeys.map((key, index) => (
              <Bar
                key={key}
                dataKey={key}
                fill={colors[index % colors.length]}
                radius={[4, 4, 0, 0]}
              />
            ))}
          </BarChart>
        )}
      </ResponsiveContainer>
    </ChartContainer>
  );
}

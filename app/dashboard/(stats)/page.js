'use client';
import { Plus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Metrics from '@/components/dashboard/Metrics';
import ChartSection from '@/components/dashboard/ChartSection';

import { Button } from '@/components/ui/button';

export default function Stats() {
  const [activeTab, setActiveTab] = useState('overview');
  const chartMetricOptions = [
    { value: 'tokens', label: 'Tokens utilizados' },
    { value: 'conversations', label: 'Conversaciones' },
    { value: 'users', label: 'Usuarios activos' }
  ];
  const timeRangeOptions = [
    { value: '7d', label: '7 días' },
    { value: '14d', label: '14 días' },
    { value: '30d', label: '30 días' },
    { value: '90d', label: '90 días' },
    { value: '1y', label: '1 año' }
  ];
  const tokenUsageData = [
    { date: '2024-04-01', count: 3200 },
    { date: '2024-04-02', count: 2800 },
    { date: '2024-04-03', count: 3500 },
    { date: '2024-04-04', count: 4100 },
    { date: '2024-04-05', count: 3800 },
    { date: '2024-04-06', count: 2200 },
    { date: '2024-04-07', count: 1900 },
    { date: '2024-04-08', count: 3600 },
    { date: '2024-04-09', count: 3400 },
    { date: '2024-04-10', count: 4200 },
    { date: '2024-04-11', count: 3900 },
    { date: '2024-04-12', count: 3500 },
    { date: '2024-04-13', count: 2700 },
    { date: '2024-04-14', count: 3000 }
  ];
  const conversationsData = [
    { date: '2024-04-01', count: 22 },
    { date: '2024-04-02', count: 19 },
    { date: '2024-04-03', count: 25 },
    { date: '2024-04-04', count: 28 },
    { date: '2024-04-05', count: 24 },
    { date: '2024-04-06', count: 16 },
    { date: '2024-04-07', count: 14 },
    { date: '2024-04-08', count: 26 },
    { date: '2024-04-09', count: 23 },
    { date: '2024-04-10', count: 29 },
    { date: '2024-04-11', count: 27 },
    { date: '2024-04-12', count: 25 },
    { date: '2024-04-13', count: 18 },
    { date: '2024-04-14', count: 21 }
  ];

  return (
    <div className="container px-8 py-6 max-w-7xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Panel Principal</h1>
          <p className="text-muted-foreground">
            Analiza el rendimiento y gestiona tus agentes de IA
          </p>
        </div>
        <Button className="bg-azulElectrico-400">
          <Plus className="mr-2 h-4 w-4" /> Nuevo Agente
        </Button>
      </div>
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid w-full grid-cols-2 md:w-auto md:inline-flex">
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="agents">Agentes</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Resumen de Metricas */}
          <Metrics
            activeConversations={12}
            totalUsers={100}
            totalTokensUsed={50000}
            tokenLimit={100000}
            activeAgentsCount={5}
          />
          {/* Estadisticas Grafica */}
          <ChartSection
            tokenUsageData={tokenUsageData}
            conversationsData={conversationsData}
            timeRangeOptions={timeRangeOptions}
            chartMetricOptions={chartMetricOptions}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

'use client'
import { Plus } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Metrics from '@/components/dashboard/Metrics'
import ChartSection from '@/components/dashboard/ChartSection'
import AgentsTab from '@/components/dashboard/AgentsTab'
import { Button } from '@/components/ui/button'

export default function Stats() {
  const [activeTab, setActiveTab] = useState('overview')
  const chartMetricOptions = [
    { value: 'tokens', label: 'Tokens utilizados' },
    { value: 'conversations', label: 'Conversaciones' },
    { value: 'users', label: 'Usuarios activos' }
  ]
  const timeRangeOptions = [
    { value: '7d', label: '7 días' },
    { value: '14d', label: '14 días' },
    { value: '30d', label: '30 días' },
    { value: '90d', label: '90 días' },
    { value: '1y', label: '1 año' }
  ]
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
  ]
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
  ]
  const agents = [
    {
      id: 'a1',
      name: 'Revisor de Contratos',
      description: 'Asistente para revisión y análisis de contratos legales',
      type: 'document-review',
      category: 'finance',
      status: 'active',
      model: 'gpt-4',
      companyId: 'c1',
      knowledgeBases: ['kb1'],
      integrations: ['i1', 'i2'],
      createdAt: '2024-03-15T12:00:00Z',
      updatedAt: '2024-04-10T15:30:00Z',
      conversationCount: 245,
      avatar: '/lovable-uploads/7c7da80b-8043-4bd7-99ad-1d832e95d4da.png'
    },
    {
      id: 'a2',
      name: 'Generador de Reportes',
      description: 'Analiza datos y genera reportes detallados para la empresa',
      type: 'data-analysis',
      category: 'technology',
      status: 'active',
      model: 'gpt-4',
      companyId: 'c1',
      knowledgeBases: ['kb2'],
      integrations: ['i3'],
      createdAt: '2024-02-20T10:00:00Z',
      updatedAt: '2024-04-08T11:15:00Z',
      conversationCount: 189
    },
    {
      id: 'a3',
      name: 'Creador de Notas de Pago',
      description: 'Crea y gestiona documentos de pago y facturas',
      type: 'document-review',
      category: 'finance',
      status: 'inactive',
      model: 'gpt-3.5-turbo',
      companyId: 'c3',
      knowledgeBases: [],
      integrations: [],
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-03-05T14:20:00Z',
      conversationCount: 89
    },
    {
      id: 'a4',
      name: 'Asesor Técnico',
      description: 'Proporciona asesoramiento técnico para operaciones mineras',
      type: 'customer-support',
      category: 'technology',
      status: 'configuring',
      model: 'claude-3',
      companyId: 'c1',
      knowledgeBases: ['kb3'],
      integrations: ['i4'],
      createdAt: '2024-03-25T08:30:00Z',
      updatedAt: '2024-04-12T17:00:00Z',
      conversationCount: 127
    },
    {
      id: 'a5',
      name: 'Seguimiento de Proyecto',
      description: 'Monitorea y actualiza el estado de proyectos mineros',
      type: 'data-analysis',
      category: 'technology',
      status: 'active',
      model: 'gpt-4',
      companyId: 'c2',
      knowledgeBases: ['kb4'],
      integrations: ['i1'],
      createdAt: '2024-02-05T14:00:00Z',
      updatedAt: '2024-04-01T10:45:00Z',
      conversationCount: 314
    },
    {
      id: 'a6',
      name: 'Asistente de Investigación',
      description:
        'Investiga tendencias y oportunidades en la industria minera',
      type: 'research',
      category: 'technology',
      status: 'active',
      model: 'gemini-pro',
      companyId: 'c1',
      knowledgeBases: [],
      integrations: ['i5'],
      createdAt: '2024-03-01T11:30:00Z',
      updatedAt: '2024-04-10T09:10:00Z',
      conversationCount: 76
    }
  ]
  const currentCompany = {
    id: 'c1',
    name: 'Nlace',
    plan: 'enterprise',
    logo: '', // Removed logo URL to use the Building icon
    description: 'Principal productor de cobre en Chile y el mundo'
  }

  return (
    <div className="container px-8 py-6 max-w-full animate-fade-in">
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

        <TabsContent value="agents" className="space-y-6">
          <AgentsTab agents={agents} companyName={currentCompany?.name} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

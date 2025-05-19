import AgentCard from '@/components/dashboard/AgentCard'

const AgentsTab = ({ agents, companyName }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-xl font-semibold">Tus Agentes</h2>
          <p className="text-muted-foreground">
            {agents.length} agentes configurados para{' '}
            {companyName || 'tu empresa'}
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard key={agent.id} agent={agent} />
        ))}
      </div>
    </div>
  )
}

export default AgentsTab

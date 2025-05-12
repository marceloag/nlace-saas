import { MetricsCard } from '@/components/MetricsCard';
import { MessageSquare, Users, CreditCard, Activity } from 'lucide-react';

const Metrics = ({
  activeConversations,
  totalUsers,
  totalTokensUsed,
  tokenLimit,
  activeAgentsCount
}) => {
  // Calculate token usage percentage
  const tokenPercentage = Math.round((totalTokensUsed / tokenLimit) * 100);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricsCard
        title="Conversaciones Abiertas"
        value={activeConversations}
        icon={<MessageSquare className="h-4 w-4" />}
        trend={{
          value: 8,
          positive: true
        }}
      />
      <MetricsCard
        title="Usuarios Registrados"
        value={totalUsers}
        icon={<Users className="h-4 w-4" />}
        trend={{
          value: 5,
          positive: true
        }}
      />
      <MetricsCard
        title="Tokens Utilizados"
        value={`${(totalTokensUsed / 1000).toFixed(1)}K`}
        description={`${tokenPercentage}% del límite`}
        icon={<CreditCard className="h-4 w-4" />}
        trend={{
          value: 12,
          positive: true
        }}
      />
      <MetricsCard
        title="Agentes Activos"
        value={activeAgentsCount}
        icon={<Activity className="h-4 w-4" />}
        trend={{
          value: 2,
          positive: true
        }}
      />
    </div>
  );
};

export default Metrics;

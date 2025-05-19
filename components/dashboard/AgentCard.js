import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  BarChart,
  Book,
  FileText,
  MessagesSquare,
  Search,
  Settings,
  FileSearch,
  Plug,
  Lock,
  HelpCircle,
  ClipboardCheck,
  FileSignature,
  Headphones,
  GitPullRequest
} from 'lucide-react'

const AgentCard = ({ agent, onClick }) => {
  // Instead of using functions that might not be defined properly,
  // we'll use the agent's properties directly
  const knowledgeBasesCount = agent.knowledgeBases?.length || 0
  const integrationsCount = agent.integrations?.length || 0
  const conversations = agent.conversationCount || 0

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'inactive':
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
      case 'configuring':
        return 'bg-amber-500/10 text-amber-500 border-amber-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'retail':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20'
      case 'food':
        return 'bg-orange-500/10 text-orange-500 border-orange-500/20'
      case 'technology':
        return 'bg-purple-500/10 text-purple-500 border-purple-500/20'
      case 'finance':
        return 'bg-green-500/10 text-green-500 border-green-500/20'
      case 'entertainment':
        return 'bg-pink-500/10 text-pink-500 border-pink-500/20'
      default:
        return 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    }
  }

  const getAgentIcon = (type, name) => {
    // Asignar iconos específicos por nombre de agente
    if (name === 'Revisor de Contratos')
      return <FileSignature className="h-6 w-6" />
    if (name === 'Generador de Reportes')
      return <BarChart className="h-6 w-6" />
    if (name === 'Creador de Notas de Pago')
      return <ClipboardCheck className="h-6 w-6" />
    if (name === 'Asesor Técnico') return <Headphones className="h-6 w-6" />
    if (name === 'Seguimiento de Proyecto')
      return <GitPullRequest className="h-6 w-6" />

    // Si no hay una correspondencia específica, usar el tipo
    switch (type) {
      case 'data-analysis':
        return <BarChart className="h-6 w-6" />
      case 'content-creation':
        return <FileText className="h-6 w-6" />
      case 'document-review':
        return <FileSearch className="h-6 w-6" />
      case 'customer-support':
        return <MessagesSquare className="h-6 w-6" />
      case 'research':
        return <Search className="h-6 w-6" />
      case 'custom':
      default:
        return <Settings className="h-6 w-6" />
    }
  }

  const translateAgentType = (type) => {
    switch (type) {
      case 'data-analysis':
        return 'análisis de datos'
      case 'content-creation':
        return 'creación de contenido'
      case 'document-review':
        return 'revisión de documentos'
      case 'customer-support':
        return 'atención al cliente'
      case 'research':
        return 'investigación'
      case 'custom':
        return 'personalizado'
      default:
        return type.replace('-', ' ')
    }
  }

  const translateCategory = (category) => {
    switch (category) {
      case 'retail':
        return 'retail'
      case 'food':
        return 'alimentación'
      case 'technology':
        return 'tecnología'
      case 'finance':
        return 'finanzas'
      case 'entertainment':
        return 'entretenimiento'
      case 'other':
        return 'otros'
      default:
        return category
    }
  }

  const translateStatus = (status) => {
    switch (status) {
      case 'active':
        return 'activo'
      case 'inactive':
        return 'inactivo'
      case 'configuring':
        return 'configurando'
      default:
        return status
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all duration-300 border animate-fade-in h-full flex flex-col">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
              {getAgentIcon(agent.type, agent.name)}
            </div>
            <div>
              <h3 className="font-medium text-lg line-clamp-1">{agent.name}</h3>
              <div className="flex flex-wrap gap-1 mt-1">
                <Badge className={`capitalize ${getStatusColor(agent.status)}`}>
                  {translateStatus(agent.status)}
                </Badge>
                <Badge
                  className={`capitalize ${getCategoryColor(agent.category)}`}
                >
                  {translateCategory(agent.category)}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {agent.description}
        </p>

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted/50 p-2 rounded flex flex-col">
            <div className="flex items-center mb-1">
              <MessagesSquare className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Conversaciones</p>
            </div>
            <p className="font-medium">{conversations}</p>
          </div>
          <div className="bg-muted/50 p-2 rounded flex flex-col">
            <div className="flex items-center mb-1">
              <BarChart className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Éxito</p>
            </div>
            <p className="font-medium">
              {Math.floor(Math.random() * 30) + 70}%
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Recursos asociados:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {knowledgeBasesCount > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Book className="h-3 w-3" />
                <span>{knowledgeBasesCount} KB</span>
              </Badge>
            )}
            {integrationsCount > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Plug className="h-3 w-3" />
                <span>{integrationsCount} integraciones</span>
              </Badge>
            )}
            {conversations > 0 && (
              <Badge variant="outline" className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>{Math.floor(conversations * 0.8)}K tokens</span>
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full flex gap-2">
          <Button onClick={onClick} variant="outline" className="w-full">
            Gestionar
          </Button>
          {conversations > 0 && (
            <Button
              variant="secondary"
              className="flex items-center gap-1"
              onClick={() => console.log('Chat con', agent.name)}
            >
              <MessagesSquare className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}

export default AgentCard

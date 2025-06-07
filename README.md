# NLACE - Sistema de Agentes con RAG para Gestión del Conocimiento

NLACE es una plataforma SaaS basada en Next.js que implementa un sistema de agentes con Retrieval Augmented Generation (RAG) para la gestión del conocimiento. El sistema permite a los agentes tomar acciones a través del Model Context Protocol (MCP), interactuando con servicios externos y bases de conocimiento.

## Tecnologías Utilizadas

### Frontend
- **Next.js**: Framework React para renderizado del lado del servidor y generación de sitios estáticos
- **Tailwind CSS**: Framework de utilidades CSS para diseño rápido y responsivo
- **Radix UI**: Componentes de interfaz de usuario accesibles y sin estilos
- **Zustand**: Biblioteca ligera de gestión de estado

### Backend y AI
- **AI SDK**: SDK para integrar modelos de IA como OpenAI y Anthropic
- **Pinecone**: Base de datos vectorial para almacenamiento y búsqueda de embeddings
- **MCP (Model Context Protocol)**: Protocolo para permitir que los modelos de IA interactúen con herramientas externas
- **Supabase**: Base de datos PostgreSQL con autenticación y almacenamiento

### Modelos de IA
- **OpenAI (GPT-4o)**: Para procesamiento de texto y generación de respuestas
- **Anthropic (Claude 3.5 Sonnet)**: Para procesamiento de documentos PDF y generación de respuestas
- **Embeddings de OpenAI**: Para vectorización de texto y búsqueda semántica

## Características Principales

- **Sistema RAG**: Recuperación y generación aumentada para respuestas basadas en conocimiento
- **Agentes de IA**: Agentes que pueden tomar decisiones y ejecutar acciones
- **MCP (Model Context Protocol)**: Permite a los agentes interactuar con servicios externos
- **Integración con Metricool**: Programación de publicaciones en redes sociales
- **Generación de imágenes y gráficos**: Capacidad para crear contenido visual
- **Base de conocimiento vectorial**: Almacenamiento y recuperación eficiente de información

## Configuración del Entorno

Crea un archivo `.env.local` con las siguientes variables:

```
NEXT_PUBLIC_URL=http://localhost:3000
PINECONE_API_KEY=tu_clave_api_de_pinecone
NEXT_PUBLIC_METRICOOL_USER_TOKEN=tu_token_de_metricool
NEXT_PUBLIC_METRICOOL_USER_ID=tu_id_de_usuario_metricool
NEXT_PUBLIC_METRICOOL_BLOG_ID=tu_id_de_blog_metricool
```

## Instalación y Ejecución

1. Clona el repositorio

```bash
git clone https://github.com/tu-usuario/nlace-saas.git
cd nlace-saas
```

2. Instala las dependencias

```bash
npm install
# o
yarn install
```

3. Ejecuta el servidor de desarrollo

```bash
npm run dev
# o
yarn dev
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador

## Estructura del Proyecto

```
/
├── app/                    # Directorio principal de Next.js App Router
│   ├── actions/            # Acciones del servidor
│   ├── api/                # Rutas de API
│   │   ├── chat/           # Endpoint para el chat con IA
│   │   └── mcp/            # Endpoints para MCP (Model Context Protocol)
│   │       └── dice/       # Ejemplo de herramienta MCP (dados)
│   ├── auth/               # Rutas de autenticación
│   ├── dashboard/          # Interfaz principal de la aplicación
│   └── page.js             # Página principal
├── components/             # Componentes React reutilizables
├── context/                # Contextos de React
├── lib/                    # Utilidades y funciones
│   ├── ai/                 # Funcionalidades de IA
│   │   ├── embeddings.js   # Generación y búsqueda de embeddings
│   │   └── tools/          # Herramientas para los agentes de IA
│   │       ├── getKnowledgeBase.js  # Herramienta RAG para consultar la base de conocimiento
│   │       ├── generateChart.js     # Generación de gráficos
│   │       ├── generateImage.js     # Generación de imágenes
│   │       ├── generatePosts.js     # Generación de publicaciones
│   │       └── getWeather.js        # Obtención de información meteorológica
├── mcp/                    # Configuración de MCP
├── prisma/                 # Esquema de Prisma para la base de datos
├── public/                 # Archivos estáticos
├── stores/                 # Tiendas de estado (Zustand)
└── utils/                  # Utilidades generales
```

## Cómo Funciona

1. **Sistema RAG**: Cuando un usuario hace una pregunta, el sistema busca información relevante en la base de conocimiento utilizando embeddings y Pinecone.

2. **Agentes de IA**: Los agentes procesan la consulta junto con la información recuperada y generan una respuesta contextualmente relevante.

3. **MCP (Model Context Protocol)**: Permite a los agentes ejecutar acciones como programar publicaciones en redes sociales, generar imágenes o crear gráficos.

4. **Integración con Servicios Externos**: El sistema puede interactuar con servicios como Metricool para programar publicaciones en redes sociales.

## Contribución

Si deseas contribuir al proyecto, por favor:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/nueva-caracteristica`)
3. Haz commit de tus cambios (`git commit -am 'Añadir nueva característica'`)
4. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un nuevo Pull Request

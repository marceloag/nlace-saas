'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { MessageSquarePlus } from 'lucide-react'
import Loading from '@/components/ui/Loading'
// MDX
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
// tools components
import Posts from '@/components/tools/Posts'
import Weather from '@/components/tools/Weather'
import ChartGen from '@/components/tools/ChartGen'
// TEST CHART

const components = {
  h1: (props) => {
    return (
      <h1 className=" text-gray-600 dark:text-gray-200 text-3xl font-bold mt-4 mb-2">
        {props.children}
      </h1>
    )
  }
}

function MdxContent({ content }) {
  const [mdxSource, setMdxSource] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const prepareMdx = async () => {
      try {
        const serialized = await serialize(content)
        setMdxSource(serialized)
      } catch (error) {
        console.error('Error serializing MDX:', error)
      } finally {
        setIsLoading(false)
      }
    }

    prepareMdx()
  }, [content])

  if (isLoading) return <p>Cargando...</p>
  if (!mdxSource) return <p>{content}</p>

  return (
    <MDXRemote
      {...mdxSource}
      className="prose-sm lg:prose-xl"
      components={components}
    />
  )
}

function MessageContent({ content }) {
  const isMdxLike =
    content.includes('#') ||
    content.includes('```') ||
    content.includes('**') ||
    content.includes('<')

  if (isMdxLike) {
    return <MdxContent content={content} />
  }
  return <p>{content}</p>
}

function ChatMessages({ messages, status, selectedAgent }) {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', delay: 100 })
  }, [messages, status])

  const handleSave = () => {
    console.log('Guardando...')
  }

  return (
    <div
      id="mensajes"
      className="w-[90%] mx-auto flex flex-col flex-1 min-w-0 overflow-y-auto overscroll-contain max-h-[calc(100vh-250px)] pt-7 no-scrollbar"
    >
      <span className="absolute bottom-0 right-4 text-[.6em] text-gray-400">
        Current Status: {status}
      </span>
      {messages && messages.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full p-6 text-center">
          <div className="w-32 h-32 bg-apple-50 rounded-full flex items-center justify-center mb-6 shadow-md">
            <MessageSquarePlus className="h-16 w-16 text-apple-600" />
          </div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-3">
            Comienza una nueva conversación
          </h3>
          <p className="text-gray-500 max-w-md">
            Escribe un mensaje abajo para iniciar una conversación con el agente
            de{' '}
            <span className="font-medium text-apple-600">
              {selectedAgent || ''}
            </span>
            .
          </p>
        </div>
      )}

      {messages.map((message, id) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          key={message.id || id}
          className={`relative flex flex-col items-start ${
            message.role === 'user' ? 'items-end' : ''
          }`}
        >
          {/* <div>
            {message?.experimental_attachments
              ?.filter((attachment) =>
                attachment?.contentType?.startsWith('image/')
              )
              .map((attachment, index) => (
                <Image
                  key={`${message.id}-${index}`}
                  src={attachment.url}
                  width={500}
                  height={500}
                  alt={attachment.name ?? `attachment-${index}`}
                />
              ))}
          </div> */}
          <div
            className={`prose prose-sm max-w-[80%] mensajecontent rounded-2xl px-4 m-2 drop-shadow-sm bg-[#F1F5F9] ${
              message.role === 'user'
                ? 'bg-apple-700 text-white'
                : 'bg-[#F1F5F9] text-gray-700 max-w-[60%]'
            }`}
          >
            {message.parts?.map((part, index) => {
              // console.log('Part:', part);
              const { type } = part
              if (type === 'text') {
                return (
                  <div key={index} id="Text">
                    <MessageContent content={part.text} />
                  </div>
                )
              }

              if (type === 'tool-invocation') {
                const { toolInvocation } = part
                const { toolName, toolCallId, state } = toolInvocation
                if (state === 'partial-call') {
                  console.log('Partial Tool invocation:', toolName)
                  return (
                    <div key={toolCallId} id="ToolCall">
                      {toolName === 'generatePosts' && <Posts />}
                    </div>
                  )
                }
                if (state === 'call') {
                  console.log('Tool invocation:', toolInvocation)
                  return (
                    <div key={toolCallId} id="ToolCall">
                      {/* {toolName} */}
                      {toolName === 'generatePosts' && <Posts />}
                    </div>
                  )
                }
                if (state === 'result') {
                  const { result, toolName, toolCallId, state } = toolInvocation
                  return (
                    <div key={toolCallId} id="ToolResult" className="mt-4">
                      {toolName === 'getWeather' && (
                        <Weather weatherAtLocation={result} />
                      )}
                      {toolName === 'generatePosts' && <Posts posts={result} />}
                      {toolName === 'generateChart' && (
                        <ChartGen
                          data={result.data}
                          indexKey="key"
                          valueKeys={result.valueKeys}
                          title={result.title}
                          orientation={result.orientation}
                          colors={result.colors}
                        />
                      )}
                    </div>
                  )
                }
              }
            })}
          </div>
        </motion.div>
      ))}
      {status === 'submitted' &&
        messages.length > 0 &&
        messages[messages.length - 1].role === 'user' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-row items-start justify-start h-auto mb-10 gap-6"
          >
            <div className="mensajecontent bg-white rounded-2xl p-4 m-2 drop-shadow-sm ">
              <Loading />
            </div>
          </motion.div>
        )}
      <div ref={messagesEndRef} />
    </div>
  )
}

export default ChatMessages

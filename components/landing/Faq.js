import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

export default function Faq() {
  // const { language } = useLanguage();
  const language = 'es';

  const faqs = {
    es: [
      {
        question: '¿Qué es NLACE AI Studio?',
        answer:
          'NLACE AI Studio es una plataforma segura que permite a las empresas crear y gestionar agentes de inteligencia artificial personalizados, sin compartir datos con terceros ni depender de modelos públicos.'
      },
      {
        question:
          '¿Qué hace diferente a NLACE AI Studio de otras soluciones de IA?',
        answer:
          'A diferencia de otras soluciones, NLACE AI Studio garantiza total privacidad y control sobre los datos, una implementación rápida sin fricciones y una flexibilidad total para adaptar la IA a los objetivos de cada empresa.'
      },
      {
        question: '¿Es seguro usar NLACE AI Studio?',
        answer:
          'Sí. La plataforma está diseñada para garantizar la privacidad total de los datos, entrenando agentes de IA con información interna sin exponerla a terceros.'
      },
      {
        question: '¿Qué tipos de integraciones ofrece?',
        answer:
          'NLACE AI Studio se integra fácilmente con herramientas como Metricool, HubSpot, CRMs, plataformas de marketing y sistemas internos de las empresas. Además, es compatible con todos los modelos de lenguaje grandes (LLM) disponibles en el mercado, lo que significa que no estás limitado a OpenAI ni a ningún proveedor específico.'
      },
      {
        question: '¿Cuánto tiempo toma la implementación?',
        answer:
          'Depende de la complejidad del proyecto, pero en la mayoría de los casos, la implementación es rápida y sin fricciones, permitiendo ver resultados en poco tiempo.'
      },
      {
        question:
          '¿Necesito conocimientos avanzados en IA para usar NLACE AI Studio?',
        answer:
          'No. NLACE AI Studio está diseñado para ser intuitivo y fácil de usar, permitiendo que cualquier empresa pueda implementar IA sin necesidad de conocimientos técnicos avanzados.'
      },
      {
        question: '¿En qué sectores se puede aplicar NLACE AI Studio?',
        answer:
          'NLACE AI Studio es ideal para empresas B2B y B2C en tecnología, marketing, servicio al cliente, ventas, e-commerce, salud, finanzas, y más.'
      },
      {
        question: '¿Cómo puedo acceder a NLACE AI Studio?',
        answer:
          'Actualmente estamos en fase Alpha cerrada. Puedes registrarte en la lista de espera para obtener acceso anticipado y probarlo antes que nadie.'
      },
      {
        question: '¿Cuáles son los costos de NLACE AI Studio?',
        answer:
          'Los costos varían según el plan y las necesidades de cada empresa. Contamos con opciones escalables que se adaptan a diferentes requerimientos.'
      },
      {
        question: '¿Ofrecen soporte y acompañamiento?',
        answer:
          'Sí. Nuestro equipo de expertos te guiará en la implementación y optimización de tu agente de IA para que obtengas los mejores resultados.'
      }
    ],
    en: [
      {
        question: 'What is NLACE AI Studio?',
        answer:
          'NLACE AI Studio is a secure platform that allows companies to create and manage custom artificial intelligence agents, without sharing data with third parties or relying on public models.'
      },
      {
        question:
          'What makes NLACE AI Studio different from other AI solutions?',
        answer:
          "Unlike other solutions, NLACE AI Studio guarantees total privacy and control over data, rapid implementation without friction, and complete flexibility to adapt AI to each company's objectives."
      },
      {
        question: 'Is it safe to use NLACE AI Studio?',
        answer:
          'Yes. The platform is designed to ensure total data privacy, training AI agents with internal information without exposing it to third parties.'
      },
      {
        question: 'What types of integrations does it offer?',
        answer:
          "NLACE AI Studio easily integrates with tools like Metricool, HubSpot, CRMs, marketing platforms, and companies' internal systems. It's also compatible with all large language models (LLM) available in the market, which means you're not limited to OpenAI or any specific provider."
      },
      {
        question: 'How long does implementation take?',
        answer:
          'It depends on the complexity of the project, but in most cases, implementation is quick and frictionless, allowing you to see results in a short time.'
      },
      {
        question: 'Do I need advanced AI knowledge to use NLACE AI Studio?',
        answer:
          'No. NLACE AI Studio is designed to be intuitive and easy to use, allowing any company to implement AI without the need for advanced technical knowledge.'
      },
      {
        question: 'In which sectors can NLACE AI Studio be applied?',
        answer:
          'NLACE AI Studio is ideal for B2B and B2C companies in technology, marketing, customer service, sales, e-commerce, healthcare, finance, and more.'
      },
      {
        question: 'How can I access NLACE AI Studio?',
        answer:
          'We are currently in a closed Alpha phase. You can register on the waiting list to get early access and try it before anyone else.'
      },
      {
        question: 'What are the costs of NLACE AI Studio?',
        answer:
          'Costs vary according to the plan and the needs of each company. We have scalable options that adapt to different requirements.'
      },
      {
        question: 'Do you offer support and guidance?',
        answer:
          'Yes. Our team of experts will guide you in implementing and optimizing your AI agent to get the best results.'
      }
    ]
  };

  return (
    <section className="py-12 md:py-20 bg-[#1D1D1D]">
      <div className="container max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12">
          {language === 'es'
            ? 'Preguntas Frecuentes'
            : 'Frequently Asked Questions'}
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs[language].map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-[#2A2A2A] rounded-lg overflow-hidden border-none"
            >
              <AccordionTrigger className="py-5 px-6 text-white hover:no-underline hover:bg-[#333333] transition-colors">
                <span className="text-left font-medium">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5 pt-2 text-[#9E9E9E]">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <p className="text-[#9E9E9E] text-center mt-8">
          {language === 'es'
            ? 'Si tienes más dudas, '
            : 'If you have more questions, '}
          <a
            href="https://nlace.com/contacto"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#9E9E9E] underline hover:text-white transition-colors"
          >
            {language === 'es' ? 'contáctanos' : 'contact us'}
          </a>
          {language === 'es'
            ? ' y con gusto te ayudaremos.'
            : " and we'll be happy to help you."}
        </p>
      </div>
    </section>
  );
}

import { login, signup, loginWithGoogle } from './actions';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Globe, Shield, Zap, BarChart, CreditCard, Rocket } from 'lucide-react';
import FAQ from '@/components/landing/Faq';
import HubspotForm from '@/components/Hubspot';
import Link from 'next/link';

export default function LoginPage({ searchParams }) {
  const error = searchParams.error;
  const language = searchParams.language || 'es';
  return (
    <div className="min-h-screen bg-[#212121] text-white">
      {/* HEADER */}
      <header className="container max-w-6xl mx-auto py-8 px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center">
            {/* Logo para móvil */}
            <div className="flex items-bottom">
              <img
                src="https://nlace.com/hubfs/nlace_black.svg"
                alt="NLACE"
                className="h-12 brightness-0 invert"
              />
              <span className="text-2xl font-semibold text-white ml-3 py-0 my-[20px]">
                AI Studio
              </span>
            </div>
          </div>
          <div className="mt-4 md:mt-0">
            <Select value={'es '}>
              <SelectTrigger className="w-36 bg-transparent border-[#4D4D4D] text-[#9E9E9E]">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <SelectValue>
                    {language === 'es' ? 'Español' : 'English'}
                  </SelectValue>
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>
      {/* HERO */}
      <section className="container max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
              {language === 'es'
                ? 'Inteligencia artificial aplicada para tu empresa'
                : 'Applied artificial intelligence for your business'}
            </h1>

            <p className="text-lg text-[#9E9E9E] max-w-xl mb-8">
              {language === 'es'
                ? 'NLACE AI Studio ofrece a empresas un entorno seguro para crear y gestionar agentes de inteligencia artificial adaptados a sus necesidades.'
                : 'NLACE AI Studio offers businesses a secure environment to create and manage artificial intelligence agents tailored to their needs.'}
            </p>

            <form>
              <button
                className="bg-white px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150  border-b-8 border-solid drop-shadow-md mt-6 w-auto self-center"
                formAction={loginWithGoogle}
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span className="text-gray-800">Inicia sesión con Google</span>
              </button>
            </form>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="bg-[#2A2A2A] p-6 rounded-xl shadow-lg">
              <img
                src="/captura-studio.png"
                alt="Dashboard Analytics"
                className="w-full max-w-md rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
      {/*  Carrusel */}
      <div className="w-full border-t border-b border-[#3A3A3A] py-12 overflow-hidden">
        <div className="relative flex overflow-x-hidden">
          <div className="w-full xl:w-2/3 xl:mx-auto flex items-center justify-around flex-row object-contain">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
              alt="OpenAI"
              className="h-8 opacity-70 brightness-0 invert"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/f/f0/Google_Bard_logo.svg"
              alt="Gemini"
              className="h-8 opacity-70 brightness-0 invert"
            />
            <img
              src="/langchain.svg"
              alt="Langchain"
              className="h-12 opacity-70 brightness-0 invert"
            />
            <img
              src="/n8n.svg"
              alt="n8n"
              className="h-10 opacity-70 brightness-0 invert"
            />
            <img
              src="/metricool.svg"
              alt="Metricool"
              className="h-8 opacity-70 brightness-0 invert"
            />
          </div>
        </div>
      </div>

      {/* Dashboard Preview - Reemplazado por YouTube Embed */}
      <section className="py-12 md:py-24 bg-[#212121]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="bg-[#FAEAD7] rounded-xl p-6 md:p-8 shadow-lg flex items-end">
            <div className="w-full max-w-4xl mx-auto rounded-lg shadow-lg overflow-hidden">
              <img
                alt="NLACE AI Studio Dashboard"
                className="w-full h-auto"
                src="captura-studio-dashboard.png"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-[#1A1A1A]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#2A7DDA]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-[#2A7DDA]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'es'
                  ? 'Total privacidad y control'
                  : 'Total privacy and control'}
              </h3>
              <p className="text-[#9E9E9E] text-base leading-relaxed">
                {language === 'es'
                  ? 'Tus datos son solo tuyos. Entrenamos la IA con tu información interna sin compartir nada con terceros ni depender de modelos públicos.'
                  : 'Your data is only yours. We train AI with your internal information without sharing anything with third parties or relying on public models.'}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#A347F0]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-[#A347F0]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'es'
                  ? 'Implementación rápida y sin fricciones'
                  : 'Fast and frictionless implementation'}
              </h3>
              <p className="text-[#9E9E9E] text-base leading-relaxed">
                {language === 'es'
                  ? 'Nuestros agentes se integran con las herramientas que ya usas, como Metricool, para que empieces a ver resultados de inmediato.'
                  : 'Our agents integrate with tools you already use, like Metricool, so you can start seeing results right away.'}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#F5AF2C]/10 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <CreditCard className="h-8 w-8 text-[#F5AF2C]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                {language === 'es'
                  ? 'Flexibilidad total para escalar'
                  : 'Total flexibility to scale'}
              </h3>
              <p className="text-[#9E9E9E] text-base leading-relaxed">
                {language === 'es'
                  ? 'Cada empresa es única. Adaptamos la IA a tus objetivos, ayudándote a automatizar procesos, mejorar la experiencia del cliente y optimizar tu operación.'
                  : 'Every company is unique. We adapt AI to your goals, helping you automate processes, improve customer experience, and optimize your operation.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* Alpha Access Section */}
      <section className="py-24 bg-[#212121]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-4 flex items-center">
                <div className="bg-[#A347F0]/10 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Rocket className="h-6 w-6 text-[#A347F0]" />
                </div>
                {language === 'es' ? 'Únete al alpha' : 'Join the alpha'}
              </h2>
              <h3 className="text-2xl text-[#9E9E9E] mb-4">
                {language === 'es' ? 'Acceso anticipado' : 'Early access'}
              </h3>
              <p className="text-[#9E9E9E] text-lg leading-relaxed">
                {language === 'es'
                  ? 'Estamos en Alpha cerrada, únete a la lista de espera y sé de los primeros en probarlo.'
                  : "We're in closed Alpha, join the waitlist and be among the first to try it."}
              </p>
            </div>

            <div className="flex justify-center">
              <div className="bg-[#E3F4EC] p-8 rounded-xl max-w-md w-full shadow-lg">
                {/* HubSpot Form integration */}
                <HubspotForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#3A3A3A] bg-[#1A1A1A]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img
                src="https://nlace.com/hubfs/nlace_black.svg"
                alt="NLACE"
                className="h-7 brightness-0 invert"
              />
              <p className="text-[#9E9E9E] mt-3">
                © {new Date().getFullYear()} NLACE.{' '}
                {language === 'es'
                  ? 'Todos los derechos reservados'
                  : 'All rights reserved'}
                .
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <div className="flex gap-8">
                <a
                  href="https://nlace.com/politica"
                  className="text-[#9E9E9E] hover:text-white"
                >
                  {language === 'es'
                    ? 'Política de Privacidad'
                    : 'Privacy Policy'}
                </a>
                <a
                  href="https://nlace.com/condiciones"
                  className="text-[#9E9E9E] hover:text-white"
                >
                  {language === 'es' ? 'Términos de Uso' : 'Terms of Use'}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

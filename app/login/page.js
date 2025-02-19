import { login, signup, loginWithGoogle } from './actions';
import HubspotForm from '@/components/Hubspot';

export default function LoginPage({ searchParams }) {
  const error = searchParams.error;
  return (
    <div className="grid md:grid-cols-6 grid-cols-1">
      <div className="flex flex-col items-center justify-center h-screen px-10 shadow-lg col-span-4">
        <div className="flex flex-col xl:max-w-[50%] w-auto">
          <img
            src="/nlace_black.svg"
            alt="Nlace Logo"
            className="w-32 inline mb-2"
          />
          <h1 className="text-4xl font-black py-2 leading-4">
            AI Agents Studio
          </h1>
          <hr className="h-1 text-slate-400 w-full my-3"></hr>
          <h2 className="text-lg font-light py-2 font-extralight text-slate-800">
            Crea, entrena y automatiza agentes de IA para tu marca
          </h2>
          <p className="text-justify">
            Optimiza tu estrategia digital con{' '}
            <b className="font-bold">Agents Studio</b>, la plataforma que te
            permite crear agentes de inteligencia artificial personalizados,
            entrenados con bases de conocimiento privadas y diseñados para
            potenciar la generación de contenido, análisis de datos y
            automatización de procesos. Sin compartir información con terceros,
            con total seguridad y flexibilidad.
          </p>
          <ul className="my-4">
            <li className="ml-2 mt-4">
              <h3 className="text-md font-semibold">
                ✅ 100% Privado y Seguro Tus datos son tuyos.
              </h3>
              Entrenamos agentes con bases de conocimiento privadas sin exponer
              tu información a modelos de terceros como ChatGPT u otros LLM.
            </li>
            <li className="ml-2 mt-4">
              <h3 className="text-md font-semibold">
                ✅ Integración Personalizada.
              </h3>
              Conéctate con las herramientas que ya usas. Agents Studio se
              adapta a tu flujo de trabajo y se integra con plataformas como
              Metricool para la gestión de redes sociales.
            </li>
            <li className="ml-2 mt-4">
              <h3 className="text-md font-semibold">
                ✅ Flexibilidad y Especialización.
              </h3>
              Cada agente es único. Los entrenamos según las necesidades de tu
              marca para generar contenido alineado a tu estrategia y optimizar
              la productividad de tu equipo.
            </li>
          </ul>
          <form>
            <button
              className="bg-white px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150  border-b-8 border-solid border-gray-800 drop-shadow-md mt-6 w-auto self-center"
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
        <div className="flex flex-row gap-4 absolute bottom-4">
          <a
            href="https://nlace.com/politica"
            className="px-3 py-2 rounded-sm text-gray-500 dark:text-gray-200 border-solid border-b-[2px] border-gray-300 dark:border-gray-700 mt-8  hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xs"
            target="_blank"
          >
            Politica de Privacidad
          </a>
          <a
            href="https://nlace.com/condiciones"
            className="px-3 py-2 rounded-sm text-gray-500 dark:text-gray-200 border-solid border-b-[2px] border-gray-300 dark:border-gray-700 mt-8  hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-xs"
            target="_blank"
          >
            Condiciones de Uso
          </a>
        </div>
      </div>
      <div className="col-span-2 flex flex-cols items-center justify-center w-full min-h-screen bg-gray-200">
        <HubspotForm />
        <form></form>
      </div>
    </div>
  );
}

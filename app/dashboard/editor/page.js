import DatePicker from '@/components/DatePicker';
import HourPicker from '@/components/HourPicker';
import {
  Facebook,
  XTwitter,
  Instagram,
  LinkedIn
} from '@/components/icons/Icons';

function Editor() {
  const posts = [
    {
      texto:
        '¿Sabías que el futuro de la tecnología está impulsado por la Inteligencia Artificial? 🤖 Aprende más sobre cómo la IA está transformando nuestras vidas. #Innovación #IA',
      hashtags: '#Tecnología #InteligenciaArtificial #Futuro',
      fecha_publicacion: '2025-01-10',
      hora_publicacion: '09:00'
    },
    {
      texto:
        '¡Emprender es un viaje lleno de retos y aprendizajes! 💼🚀 Hoy compartimos 3 consejos para iniciar tu propio negocio. 👇 #Motivación #Emprendedores',
      hashtags: '#Negocios #Innovación #Emprendimiento',
      fecha_publicacion: '2025-01-11',
      hora_publicacion: '12:30'
    },
    {
      texto:
        'Conoce las mejores prácticas de desarrollo web para este 2025. 🌐💻 ¡Optimiza tu código y mejora la experiencia de usuario! #DesarrolloWeb #UI',
      hashtags: '#Programación #UX #Innovación',
      fecha_publicacion: '2025-01-12',
      hora_publicacion: '15:45'
    },
    {
      texto:
        'La educación es clave para construir un mejor futuro. 📚✨ Reflexionemos sobre la importancia del aprendizaje continuo. ¿Qué estás aprendiendo este año? #Educación #Crecimiento',
      hashtags: '#Aprendizaje #Inspiración #Futuro',
      fecha_publicacion: '2025-01-13',
      hora_publicacion: '08:00'
    },
    {
      texto:
        '¿Estás listo para llevar tus proyectos al siguiente nivel? 💡 Descubre cómo implementar metodologías ágiles para lograrlo. #GestiónDeProyectos #MetodologíasÁgiles',
      hashtags: '#Scrum #Kanban #Innovación',
      fecha_publicacion: '2025-01-14',
      hora_publicacion: '10:15'
    }
  ];
  return (
    <div className="bg-transparent m-0 p-0 after:via-gray-50 after:via-40% w-full xl:w-8/12 after:absolute after:w-full after:z-50 after:pb-10 after:bg-gradient-to-b after:flex  after:from-gray-50 after:to-transparent ">
      <h1 className="text-3xl font-thin">📝 Editar Posts</h1>
      {posts.map((post, index) => (
        <div
          key={index}
          className="mb-4 transition-all duration-300 ease-in-out"
        >
          <div className="flex flex-col justify-center items-start px-8 opacity-50 focus-within:opacity-100 transition-opacity duration-300">
            <textarea className="group w-full h-auto min-h-20 resize-none p-4  shadow-md focus:outline-none transition-all duration-300 ease-in-out border-solid border-[1px] border-gray-400 mt-4 outline-none focus:border-violet-950/70 focus:border-solid focus:border-[1px] rounded-lg text-gray-600">
              {post.texto}
            </textarea>
            <div className="flex flex-row items-center justify-between w-full">
              <div className="flex flex-row items-center gap-4">
                <Facebook />
                <XTwitter />
                <Instagram />
                <LinkedIn />
              </div>
              <div className="py-2 flex flex-row items-center gap-4">
                <DatePicker fecha_publicacion={post.fecha_publicacion} />
                <HourPicker hora_publicacion={post.hora_publicacion} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Editor;

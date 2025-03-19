import type { Route } from './+types/index';
import { Button } from '~/components/ui/button';
import { FaUserPlus, FaArrowRightToBracket } from 'react-icons/fa6';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { USER_ID_KEY } from '~/utils/constants';
import { motion } from 'motion/react'


export function meta({ }: Route.MetaArgs) {
  return [
    { title: 'Educación sustentable' },
    { name: 'description', content: 'Educación sustentable' },
  ];
}

export default function Index() {
  //navigation
  const navigate = useNavigate();

  //effects
  useEffect(() => {
    if (localStorage.getItem(USER_ID_KEY) !== null) navigate('/home');
  }, []);

  return (
    <main className='flex flex-col items-center overflow-x-hidden'>
      <img
        className='h-96 object-cover w-full'
        src='https://cdn0.ecologiaverde.com/es/posts/5/7/4/que_es_la_educacion_ambiental_concepto_y_objetivos_1475_600.jpg'
        alt='educacion sustentable'
      />

      <h1 className='text-3xl sm:text-4xl font-bold px-2 my-4'>Educación sustentable</h1>

      <p className='px-5 sm:px-10 lg:px-40 text-justify font-medium'>
        La educación sustentable no solo busca transmitir conocimientos, sino
        también fomentar un cambio profundo en nuestra manera de percibir y
        actuar en el mundo. A través de la sensibilización, podemos inspirar a
        las generaciones presentes y futuras a adoptar hábitos más responsables,
        comprender la interconexión entre el ser humano y su entorno, y tomar
        decisiones que beneficien tanto a la comunidad como al planeta. Es un
        compromiso con la sostenibilidad que comienza en las aulas, pero cuyo
        impacto puede transformar sociedades enteras. 🌱🌍
      </p>

      {/* Buttons */}
      <h2 className='px-2 sm:px-10 lg:px-20 text-center text-lg font-semibold mt-10 mb-3'>
        Regístrate ahora y accede a contenido exclusivo sobre desarrollo humano
        y sostenibilidad. Inspírate, aprende y transforma tu mundo
      </h2>
      <article className='z-1 w-full flex gap-4 md:gap-10 justify-center'>
        <Button
          className='px-8 h-12 md:px-16 lg:px-22 bg-green-800 hover:bg-green-900 hover:scale-105 delay-75 transition-all'
          onClick={() => navigate('/register')}
        >
          <div className='w-22 flex gap-2 items-center justify-center'>
            <FaUserPlus />
            Registrarse
          </div>
        </Button>

        <Button
          className='px-8 h-12 md:px-16 lg:px-22 bg-green-800 hover:bg-green-900 hover:scale-105 delay-75 transition-all'
          onClick={() => navigate('/login')}

        >
          <div className='w-22 flex gap-2 items-center justify-center'>
            <FaArrowRightToBracket />
            Iniciar Sesión
          </div>
        </Button>
      </article>

      {/* Images */}
      <motion.article
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 1 }}
        transition={{
          duration: 0.5,
        }}
        className='w-full flex flex-col lg:flex-row justify-center items-center gap-2 sm:gap-6 my-10 px-5 md:px-10'
      >
        <div className='flex-1 flex justify-center items-center'>
          <div className='flex flex-col gap-4'>
            <h3 className='text-xl font-semibold text-center'>
              Lecturas que Inspiran Sostenibilidad
            </h3>
            <p className='lg indent-2 text-justify sm:px-10'>
              Explora algunos de los libros esenciales que tenemos disponibles,
              como <span className='font-semibold'>Sostenibilidad Local</span>
              ,&nbsp;
              <span className='font-semibold'>
                La Sostenibilidad del Desarrollo
              </span>
              ,&nbsp;
              <span className='font-semibold'>
                La Sostenibilidad y el Turismo&nbsp;
              </span>
              entre otros. Estas lecturas ofrecen perspectivas valiosas y
              prácticas sobre el desarrollo humano y la sostenibilidad,
              ayudándote a tomar acciones conscientes hacia un mundo más
              equilibrado y responsable.
            </p>
          </div>
        </div>

        <div className='flex flex-1 gap-4 sm:gap-0 lg:gap-5 overflow-x-scroll overflow-y-hidden sm:overflow-hidden lg:overflow-x-auto'>
          <img
            className='w-7/12 sm:w-56 lg:w-96 lg:h-72 h-56 rounded-lg object-contain'
            src='https://ia800502.us.archive.org/view_archive.php?archive=/31/items/m_covers_0013/m_covers_0013_51.zip&file=0013519133-M.jpg'
            alt='planeta saludable'
            draggable={false}
          />
          <img
            className='w-7/12 sm:w-56 lg:w-96 lg:h-72  h-56 rounded-lg object-contain'
            src='https://covers.openlibrary.org/b/olid/OL19387708M-M.jpg'
            alt='planeta saludable'
            draggable={false}
          />
          <img
            className='w-7/12 sm:w-56 lg:w-96 lg:h-72  h-56 rounded-lg object-contain'
            src='https://ia800502.us.archive.org/view_archive.php?archive=/31/items/m_covers_0013/m_covers_0013_55.zip&file=0013555485-M.jpg'
            alt='planeta saludable'
            draggable={false}
          />
        </div>
      </motion.article>

      <footer className='flex p-2 lg:p-8 mt-10 w-full bg-slate-50 justify-center items-center'>
        <p className='font-semibold'>
          © 2025 Educación Sustentable. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}

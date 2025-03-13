import type { Route } from './+types/index';
import { Button } from '~/components/ui/button';
import { FaUserPlus, FaArrowRightToBracket } from 'react-icons/fa6';
import { useState } from 'react';
import { LoginForm } from './_components/loginForm';
import { AnimatePresence } from 'motion/react';

export function meta({}: Route.MetaArgs) {
  return [
    { title: 'Educación sustentable' },
    { name: 'description', content: 'Educación sustentable' },
  ];
}

export default function Index() {
  //states
  const [showLogin, setShowLogin] = useState<boolean>(false);

  return (
    <main
      className={`${showLogin && 'overflow-hidden'} flex flex-col items-center`}
    >
      <AnimatePresence>
        {showLogin && <LoginForm setShowLogin={setShowLogin} />}
      </AnimatePresence>
      <img
        className='h-96 object-cover w-full'
        src='https://cdn0.ecologiaverde.com/es/posts/5/7/4/que_es_la_educacion_ambiental_concepto_y_objetivos_1475_600.jpg'
        alt='educacion sustentable'
      />

      <h1 className='text-4xl font-bold my-4'>Educación sustentable</h1>

      <p className='px-20 lg:px-40 text-justify font-medium'>
        La educación sustentable no solo busca transmitir conocimientos, sino
        también fomentar un cambio profundo en nuestra manera de percibir y
        actuar en el mundo. A través de la sensibilización, podemos inspirar a
        las generaciones presentes y futuras a adoptar hábitos más responsables,
        comprender la interconexión entre el ser humano y su entorno, y tomar
        decisiones que beneficien tanto a la comunidad como al planeta. Es un
        compromiso con la sostenibilidad que comienza en las aulas, pero cuyo
        impacto puede transformar sociedades enteras. 🌱🌍
      </p>

      {/* Images  */}
      <article className='flex justify-center items-center gap-2 sm:gap-6 my-5'>
        <img
          className='w-7/12  sm:w-56 lg:w-96 lg:h-72 grow border-2 h-56 rounded-lg object-cover hover:scale-105 delay-75 transition-all'
          src='https://www.anahuac.mx/mexico/sites/default/files/noticias/FRS_Educacion_ambiental.jpg'
          alt='planeta saludable'
        />

        <img
          className='w-7/12 sm:w-56 lg:w-96 lg:h-72 grow border-2 h-56 rounded-lg object-cover hover:scale-105 delay-75 transition-all'
          src='https://todoingenierias.com/wp-content/uploads/educacion-ambiental-y-sostenibilidad.jpg'
          alt='educación'
        />
      </article>

      {/* Buttons */}
      <article className='z-1 w-full flex gap-4 md:gap-10 mt-10 justify-center'>
        <Button className='px-8 h-12 md:px-16 lg:px-22 bg-green-800 hover:bg-green-900 hover:scale-105 delay-75 transition-all'>
          <div className='w-22 flex gap-2 items-center justify-center'>
            <FaUserPlus />
            Registrarse
          </div>
        </Button>

        <Button
          className='px-8 h-12 md:px-16 lg:px-22 bg-green-800 hover:bg-green-900 hover:scale-105 delay-75 transition-all'
          onClick={() => setShowLogin(true)}
        >
          <div className='w-22 flex gap-2 items-center justify-center'>
            <FaArrowRightToBracket />
            Iniciar Sesión
          </div>
        </Button>
      </article>

      <footer className='flex p-8 w-full  bg-slate-50'>
        <p className='font-semibold'>
          © 2025 Educación Sustentable. Todos los derechos reservados.
        </p>
      </footer>
    </main>
  );
}

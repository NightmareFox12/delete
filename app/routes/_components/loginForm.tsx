import { Label } from '@radix-ui/react-label';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { cn } from '~/lib/utils';
import { motion } from 'motion/react';
import { Link, NavLink } from 'react-router';

type LoginFormProps = {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
} & React.ComponentPropsWithoutRef<'div'>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=' bg-slate-50/70 gap-6 fixed inset-0 z-10'
      onClick={() => props.setShowLogin(false)}
    >
      <div
        className={cn(
          'flex flex-col fixed inset-0 justify-center items-center',
          className
        )}
        {...props}
      >
        <Card
          className='w-96 sm:w-7/12 md:w-6/12 z-20'
          onClick={(e) => e.stopPropagation()}
        >
          <CardHeader>
            <CardTitle className='text-2xl'>Iniciar Sesión</CardTitle>
            <CardDescription>Ingresa tu correo y contraseña</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Correo Electrónico</Label>
                <Input
                  id='email'
                  type='email'
                  placeholder='jose@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
                <Input
                  id='password'
                  placeholder='********'
                  type='password'
                  required
                />
              </div>
              <Button type='submit' className='w-full'>
                Iniciar Sesión
              </Button>
              <Button variant='outline' className='w-full'>
                Login with Google
              </Button>
            </div>
            <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <Link to='/register'>Registrarse</Link>
              {/* <a href='/register' className='underline underline-offset-4'>
              </a> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

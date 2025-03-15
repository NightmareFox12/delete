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
import { Link, useNavigate } from 'react-router';
import {
  FaArrowRightToBracket,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from 'react-icons/fa6';
import { useState } from 'react';
import { API_URL, LOG_IN_KEY } from '~/utils/constants';
import { toast, Toaster } from 'sonner';

type LoginFormProps = {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
} & React.ComponentPropsWithoutRef<'div'>;

export function LoginForm({ className, ...props }: LoginFormProps) {
  const navigate = useNavigate();

  //states
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  //functions
  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const req = await fetch(`${API_URL}/log-in`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          email: props.email,
          password: props.password,
        }),
      });

      const res = await req.json();

      if (res.message !== undefined) toast.error(res.message);
      else {
        localStorage.setItem(LOG_IN_KEY, props.email);
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className=' bg-slate-50/70 gap-6 fixed inset-0 z-10'
      onClick={() => props.setShowLogin(false)}
    >
      <Toaster position='bottom-center' richColors={true} />
      <div
        className={cn(
          'flex flex-col fixed inset-0 justify-center items-center',
          className
        )}
        {...props}
      >
        <Card
          className='w-96 sm:w-7/12 md:w-6/12 lg:w-4/12 z-20'
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
                  value={props.email}
                  onChange={(e) => props.setEmail(e.target.value)}
                  placeholder='jose@example.com'
                  required
                />
              </div>
              <div className='grid gap-2'>
                {/* <div className='flex items-center'>
                  <Label htmlFor='password'>Contraseña</Label>
                  <a
                    href='#'
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div> */}

                <div className='flex w-full items-center'>
                  <Input
                    id='password'
                    placeholder='********'
                    value={props.password}
                    onChange={(e) => props.setPassword(e.target.value)}
                    type={showPassword ? 'text' : 'password'}
                    required
                  />
                  <Button
                    variant='link'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </div>
              <Button
                type='submit'
                className='w-full bg-green-800 hover:bg-green-900'
                onClick={() => handleLogin()}
                disabled={
                  props.email.length < 2 ||
                  props.password.length < 2 ||
                  isLoading
                }
              >
                <div className='flex gap-2 items-center'>
                  {isLoading ? (
                    <FaSpinner className='animate-spin' />
                  ) : (
                    <FaArrowRightToBracket />
                  )}
                  Iniciar Sesión
                </div>
              </Button>
            </div>
            <div className='mt-4 text-sm flex gap-1 items-center justify-center'>
              <p>¿No tienes una cuenta?</p>
              <Link to='/register' className='underline underline-offset-4'>
                Registrarse
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}

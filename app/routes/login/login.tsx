import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import type { Route } from "./+types/login";
import { Label } from "@radix-ui/react-label";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Link, useNavigate } from "react-router";
import { FaArrowLeft, FaArrowRightToBracket, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa6";
import { useState } from "react";
import { API_URL, USER_ID_KEY } from "~/utils/constants";
import { Toaster, toast } from "sonner";

export function meta({ }: Route.MetaArgs) {
  return [{ title: 'Iniciar sesión' }];
}

const Login = () => {
  const navigate = useNavigate();

  //states
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

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
          email,
          password,
        }),
      });

      const res = await req.json();

      if (res.message !== undefined) toast.error(res.message);
      else {
        localStorage.setItem(USER_ID_KEY, res.userID.toString());
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className='flex flex-col items-center'>
      <Toaster richColors={true} position='bottom-center' />

      <div className='relative flex w-full p-3'>
        <Link to='/'>
          <Button variant='ghost' className='rounded-full border size-12'>
            <FaArrowLeft className='w-16' />
          </Button>
        </Link>
      </div>

      <section className="w-full mt-22 flex justify-center">
        <Card className='w-96 sm:w-7/12 md:w-6/12 lg:w-6/12'>
          <CardHeader>
            <CardTitle className='text-2xl text-center'>Iniciar Sesión</CardTitle>
            <CardDescription className='text-center'>Ingresa tu correo y contraseña</CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-2'>
                <Label htmlFor='email'>Correo Electrónico</Label>
                <Input
                  id='email'
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                  email.length < 2 ||
                  password.length < 2 ||
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
              <Link to='/register' className='text-green-800 hover:text-green-900 underline'>
                Registrarse
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

    </main>
  )
};

export default Login;


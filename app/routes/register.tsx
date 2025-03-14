import { Label } from '@radix-ui/react-label';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import type { Route } from './+types';
import { FaArrowLeft } from 'react-icons/fa6';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Registro' }];
}

const Register = () => {
  //functions
  const handleCreateUser = async () => {
    try {
      console.log('pisao')
      const req = await fetch('http://localhost:3000/create-user', {
        method: 'POST',
        body: JSON.stringify({
          name: 'juan',
          jose: 'pedro',
        }),
      });

      const res = await req.json();

      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className='flex flex-col items-center'>
      <div className='relative flex w-full p-3'>
        <Link to='/'>
          <Button variant='ghost' className='rounded-full border size-12'>
            <FaArrowLeft className='w-16' />
          </Button>
        </Link>
      </div>

      <Card className='w-96 sm:w-7/12 md:w-6/12 z-20'>
        <CardHeader>
          <CardTitle className='text-2xl'>Registro</CardTitle>
          <CardDescription>Ingresa tu correo y contraseña</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Name */}
          <div className='flex flex-col gap-6'>
            <div className='grid gap-2'>
              <Label htmlFor='name'>Nombres</Label>
              <Input
                id='name'
                type='text'
                placeholder='Jose'
                required
                autoComplete='off'
              />
            </div>
            {/* LastName  */}
            <div className='grid gap-2'>
              <Label htmlFor='lastName'>Apellidos</Label>
              <Input
                id='lastName'
                type='text'
                placeholder='Rebolledo'
                required
                autoComplete='off'
              />
            </div>
            {/* Email */}
            <div className='grid gap-2'>
              <Label htmlFor='email'>Correo Electrónico</Label>
              <Input
                id='email'
                type='email'
                placeholder='jose@example.com'
                required
              />
            </div>

            {/* Password  */}
            <div className='grid gap-2'>
              <div className='flex items-center'>
                <Label htmlFor='password'>Contraseña</Label>
              </div>
              <Input
                id='password'
                placeholder='********'
                type='password'
                required
              />
            </div>

            <Button className='w-full mt-5 bg-green-800 hover:bg-green-900 delay-75 transition-all' onClick={ handleCreateUser}>
              Registrarse
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Register;

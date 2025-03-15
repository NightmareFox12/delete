import { Toaster, toast } from 'sonner';

import { FaArrowLeft, FaEye, FaEyeSlash, FaSpinner } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Link, useNavigate } from 'react-router';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { AnimatePresence, motion } from 'motion/react';
import {
  emailSchema,
  lastNameSchema,
  nameSchema,
  passwordSchema,
} from '~/utils/schemas';
import type { Route } from '../index/+types';
import { API_URL } from '~/utils/constants';

export function meta({}: Route.MetaArgs) {
  return [{ title: 'Registro' }];
}

const Register = () => {
  const navigate = useNavigate();

  //states
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [nameError, setNameError] = useState<string>('');
  const [lastNameError, setLastNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registerLoader, setRegisterLoader] = useState<boolean>(false);

  //functions
  const handleCreateUser = async () => {
    try {
      setRegisterLoader(true);
      const req = await fetch(`${API_URL}/create-user`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
          password,
        }),
      });

      const res = await req.json();

      if (res.message !== undefined)
        toast.error(res.message, { richColors: true });

      if (res.success !== undefined) {
        localStorage.setItem('login', 'true');
        navigate('/home');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setRegisterLoader(false);
    }
  };

  //effects
  useEffect(() => {
    const result = nameSchema.safeParse(name);

    if (!result.success) setNameError(result.error.errors[0].message);
    else setNameError('');
  }, [name]);

  useEffect(() => {
    const result = lastNameSchema.safeParse(lastName);

    if (!result.success) setLastNameError(result.error.errors[0].message);
    else setLastNameError('');
  }, [lastName]);

  useEffect(() => {
    const result = lastNameSchema.safeParse(lastName);

    if (!result.success) setLastNameError(result.error.errors[0].message);
    else setLastNameError('');
  }, [lastName]);

  useEffect(() => {
    const result = emailSchema.safeParse(email);

    if (!result.success) setEmailError(result.error.errors[0].message);
    else setEmailError('');
  }, [email]);

  useEffect(() => {
    const result = passwordSchema.safeParse(password);

    if (!result.success) setPasswordError(result.error.errors[0].message);
    else setPasswordError('');
  }, [password]);

  return (
    <>
      <Toaster position='bottom-center' />
      <main className='flex flex-col items-center'>
        <div className='relative flex w-full p-3'>
          <Link to='/'>
            <Button variant='ghost' className='rounded-full border size-12'>
              <FaArrowLeft className='w-16' />
            </Button>
          </Link>
        </div>

        <Card className='w-96 sm:w-7/12 md:w-6/12 lg:w-6/12 z-20 outline-1 shadow-xl p-5'>
          <CardHeader>
            <CardTitle className='text-2xl text-center'>Registro</CardTitle>
            {/* <CardDescription>Ingresa tu correo y contraseña</CardDescription> */}
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-6'>
              {/* Name */}
              <div className='grid gap-2'>
                <Label htmlFor='name'>
                  Nombre <span className='text-red-400 font-bold'>*</span>
                </Label>
                <div>
                  <Input
                    id='name'
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Jose'
                    required
                    autoComplete='off'
                    autoCapitalize='words'
                  />
                  <AnimatePresence>
                    {name.length > 0 && nameError !== '' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='font-bold text-sm text-red-500 ps-2 pt-1'
                      >
                        {nameError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* LastName  */}
              <div className='grid gap-2'>
                <Label htmlFor='lastName'>
                  Apellido <span className='text-red-400 font-bold'>*</span>
                </Label>
                <div>
                  <Input
                    id='lastName'
                    type='text'
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder='Rebolledo'
                    required
                    autoComplete='off'
                    autoCapitalize='words'
                  />
                  <AnimatePresence>
                    {lastName.length > 0 && lastNameError !== '' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='font-bold text-sm text-red-500 ps-2 pt-1'
                      >
                        {lastNameError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Email */}
              <div className='grid gap-2'>
                <Label htmlFor='email'>
                  Correo Electrónico
                  <span className='text-red-400 font-bold'>*</span>
                </Label>
                <div>
                  <Input
                    id='email'
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='jose@example.com'
                    required
                  />
                  <AnimatePresence>
                    {email.length > 0 && emailError !== '' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='font-bold text-sm text-red-500 ps-2 pt-1'
                      >
                        {emailError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Password  */}
              <div className='grid gap-2'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>
                    Contraseña <span className='text-red-400 font-bold'>*</span>
                  </Label>
                </div>
                <div>
                  <div className='flex'>
                    <Input
                      id='password'
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='********'
                      required
                    />
                    <Button
                      variant='ghost'
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {password.length > 0 && passwordError !== '' && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='font-bold text-sm text-red-500 ps-2 pt-1'
                      >
                        {passwordError}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <Button
                className='w-full mt-5 bg-green-800 hover:bg-green-900 delay-75 transition-all'
                onClick={handleCreateUser}
                disabled={
                  nameError !== '' ||
                  lastNameError !== '' ||
                  emailError !== '' ||
                  passwordError !== '' ||
                  registerLoader
                }
              >
                <div className='flex gap-2 items-center'>
                  {registerLoader && <FaSpinner className='animate-spin' />}
                  Registrarse
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Register;

import { Toaster, toast } from "sonner";

import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaSpinner,
  FaUserPlus,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Link, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { AnimatePresence, motion } from "motion/react";
import {
  emailSchema,
  lastNameSchema,
  nameSchema,
  passwordSchema,
} from "~/utils/schemas";
import type { Route } from "../index/+types";
import { API_URL, USERS_KEY, USER_ID_KEY } from "~/utils/constants";
import { Calendar } from "~/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Registro" }];
}

import { es } from "date-fns/locale";
import { format } from "date-fns";

const Register = () => {
  const navigate = useNavigate();

  //states
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    new Date(2010, 1, 1)
  );
  const [password, setPassword] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [birthDateError, setBirthDateError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registerLoader, setRegisterLoader] = useState<boolean>(false);
  const [isEmailExist, setIsEmailExist] = useState<boolean>(false);

  //functions
  const handleCreateUser = async () => {
    try {
      setRegisterLoader(true);
      const req = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          lastName,
          email,
          birthDate: birthDate?.toISOString().split("T")[0],
          password,
        }),
      });

      const res = await req.json();

      if (res.message !== undefined) {
        toast.error(res.message, { richColors: true });

        if (res.message.includes("El correo electrónico ya existe")) {
          setIsEmailExist(true);
        }
      }

      if (res.userID !== undefined) {
        localStorage.setItem(USER_ID_KEY, res.userID.toString());
        //save user in localStoage
        const usersSaved = JSON.parse(localStorage.getItem(USERS_KEY) || "[]");

        usersSaved.push({
          userID: res.userID,
          name,
          lastName,
          email,
        });
        localStorage.setItem(USERS_KEY, JSON.stringify(usersSaved));

        navigate("/home");
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
    else setNameError("");
  }, [name]);

  useEffect(() => {
    const result = lastNameSchema.safeParse(lastName);

    if (!result.success) setLastNameError(result.error.errors[0].message);
    else setLastNameError("");
  }, [lastName]);

  useEffect(() => {
    const result = lastNameSchema.safeParse(lastName);

    if (!result.success) setLastNameError(result.error.errors[0].message);
    else setLastNameError("");
  }, [lastName]);

  useEffect(() => {
    const result = emailSchema.safeParse(email);

    if (!result.success) setEmailError(result.error.errors[0].message);
    else setEmailError("");
  }, [email]);

  useEffect(() => {
    if (!birthDate) setBirthDateError("La fecha de nacimiento es obligatoria");
    else setBirthDateError("");
  }, [birthDate]);

  useEffect(() => {
    const result = passwordSchema.safeParse(password);

    if (!result.success) setPasswordError(result.error.errors[0].message);
    else setPasswordError("");
  }, [password]);

  return (
    <>
      <Toaster position="bottom-center" />
      <main className="flex flex-col items-center">
        <div className="relative flex w-full p-3">
          <Link to="/">
            <Button variant="ghost" className="rounded-full border size-12">
              <FaArrowLeft className="w-16" />
            </Button>
          </Link>
        </div>

        <Card className="w-96 sm:w-7/12 md:w-6/12 lg:w-6/12 z-20 outline-1 shadow-xl p-5 mt-10">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Registro</CardTitle>
            {/* <CardDescription>Ingresa tu correo y contraseña</CardDescription> */}
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                {/* Name */}
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    Nombre <span className="text-red-400 font-bold">*</span>
                  </Label>
                  <div>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jose"
                      required
                      autoComplete="off"
                      autoCapitalize="words"
                    />
                    <AnimatePresence>
                      {name.length > 0 && nameError !== "" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-bold text-sm text-red-500 ps-2 pt-1"
                        >
                          {nameError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* LastName  */}
                <div className="grid gap-2">
                  <Label htmlFor="lastName">
                    Apellido <span className="text-red-400 font-bold">*</span>
                  </Label>
                  <div>
                    <Input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Rebolledo"
                      required
                      autoComplete="off"
                      autoCapitalize="words"
                    />
                    <AnimatePresence>
                      {lastName.length > 0 && lastNameError !== "" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-bold text-sm text-red-500 ps-2 pt-1"
                        >
                          {lastNameError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    Correo Electrónico
                    <span className="text-red-400 font-bold">*</span>
                  </Label>
                  <div>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jose@example.com"
                      autoComplete="username"
                      required
                    />
                    <AnimatePresence>
                      {email.length > 0 && emailError !== "" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-bold text-sm text-red-500 ps-2 pt-1"
                        >
                          {emailError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* BirthDate */}
                <div className="grid gap-2">
                  <Label htmlFor="birthDate">
                    Fecha de Nacimiento
                    <span className="text-red-400 font-bold">*</span>
                  </Label>
                  <div>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Input
                          id="birthDate"
                          type="text"
                          value={
                            birthDate
                              ? format(birthDate, "dd/MM/yyyy")
                              : ""
                          }
                          placeholder="dd/mm/yyyy"
                          autoComplete="off"
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <div className="absolute ms-20 opacity-0 w-[85px] flex justify-center items-center mt-2 z-20">
                          <Select
                            onValueChange={(year) =>
                              setBirthDate(new Date(parseInt(year), 1, 1))
                            }
                            defaultValue={birthDate?.getFullYear().toString()}
                          >
                            <SelectTrigger className="cursor-pointer border-1 ">
                              <SelectValue
                                placeholder={birthDate
                                  ?.getFullYear()
                                  .toString()}
                              />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from(
                                {
                                  length:
                                    new Date(2010, 1).getFullYear() -
                                    new Date(1930, 1).getFullYear() +
                                    1,
                                },
                                (_, index) => {
                                  const year =
                                    new Date(1930, 1).getFullYear() + index;
                                  return (
                                    <SelectItem
                                      onSelect={() => {
                                        setBirthDate(new Date(year, 1, 1));
                                      }}
                                      key={year}
                                      value={year.toString()}
                                    >
                                      {year}
                                    </SelectItem>
                                  );
                                }
                              )}
                            </SelectContent>
                          </Select>
                        </div>
                        <Calendar
                          className="select-none"
                          mode="single"
                          fixedWeeks
                          locale={es}
                          selected={birthDate}
                          onSelect={setBirthDate}
                          toYear={2010}
                          fromYear={1930}
                          month={birthDate}
                        />
                      </PopoverContent>
                    </Popover>
                    <AnimatePresence>
                      {birthDate === undefined && birthDateError && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-bold text-sm text-red-500 ps-2 pt-1"
                        >
                          {birthDateError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Password  */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">
                      Contraseña{" "}
                      <span className="text-red-400 font-bold">*</span>
                    </Label>
                  </div>
                  <div>
                    <div className="flex">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="********"
                        autoComplete="current-password"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>

                    <AnimatePresence>
                      {password.length > 0 && passwordError !== "" && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="font-bold text-sm text-red-500 ps-2 pt-1"
                        >
                          {passwordError}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  className="w-full mt-5 bg-green-800 hover:bg-green-900 delay-75 transition-all"
                  onClick={handleCreateUser}
                  disabled={
                    nameError !== "" ||
                    lastNameError !== "" ||
                    emailError !== "" ||
                    birthDateError !== "" ||
                    passwordError !== "" ||
                    registerLoader
                  }
                >
                  <div className="flex gap-2 items-center">
                    {registerLoader ? (
                      <>
                        <FaSpinner className="animate-spin" />
                        Cargando...
                      </>
                    ) : (
                      <>
                        <FaUserPlus />
                        Registrarse
                      </>
                    )}
                  </div>
                </Button>
              </div>
            </form>
            <AnimatePresence>
              {isEmailExist && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center mt-5"
                >
                  ¿Ya tienes una cuenta?{" "}
                  <Link
                    to="/login"
                    className="text-green-800 hover:text-green-900 underline"
                  >
                    Iniciar sesión
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </main>
    </>
  );
};

export default Register;

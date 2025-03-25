import { Toaster, toast } from "sonner";

import { FaEye, FaEyeSlash, FaSpinner, FaUserPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
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
import { API_URL, USERS_KEY, USER_ID_KEY } from "~/utils/constants";

type FormRegisterProps = {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  getUsers: () => Promise<void>;
};
const FormRegister = ({ setShowForm, getUsers }: FormRegisterProps) => {
  //states
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [lastNameError, setLastNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [registerLoader, setRegisterLoader] = useState<boolean>(false);

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
          password,
        }),
      });

      const res = await req.json();

      if (res.message !== undefined) {
        toast.error(res.message, { richColors: true });
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
        //clear inputs
        setName("");
        setLastName("");
        setEmail("");
        setPassword("");
        toast.success("¡Usuario creado exitosamente!");
        await getUsers();
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
    const result = passwordSchema.safeParse(password);

    if (!result.success) setPasswordError(result.error.errors[0].message);
    else setPasswordError("");
  }, [password]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setShowForm(false)}
      className="absolute w-screen h-screen bg-slate-950/50 z-20"
    >
      <Toaster position="bottom-center" />
      <section className="w-full h-full flex flex-col justify-center items-center">
        <Card
          onClick={(e) => e.stopPropagation()}
          className="w-96 sm:w-7/12 md:w-6/12 lg:w-5/12 z-20 outline-1 shadow-xl p-5 mt-10"
        >
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

                <Button
                  type="submit"
                  className="w-full mt-5 bg-green-800 hover:bg-green-900 delay-75 transition-all"
                  onClick={handleCreateUser}
                  disabled={
                    nameError !== "" ||
                    lastNameError !== "" ||
                    emailError !== "" ||
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
          </CardContent>
        </Card>
      </section>
    </motion.div>
  );
};

export default FormRegister;

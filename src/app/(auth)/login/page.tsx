"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form"
import { useRouter } from 'next/navigation';

interface Inputs {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  useEffect(() => {
    if (errors.email || errors.password) {
      setApiError(false);
    }
  }, [errors.password , errors.email]);

  const Login: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        if (result.email === "") {
          setApiError(true);
          return;
        }

        router.push("/");
      } else {	
				console.log(response);
        if (response.status === 400) {
          setApiError(true);
        }else{
          throw new Error("Ошибка сервера");
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <section className="flex justify-center h-screen px-2">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl mt-10">Войти</h1>
        <h4 className="text-gray-600 mb-8">пожалуйста, войдите в аккаунт, чтобы продолжить</h4>
        <form className="flex flex-col items-start w-full h-full gap-y-2" onSubmit={handleSubmit(Login)}> 
          <label className="flex flex-col w-full relative pb-5">
            <span>Логин</span>
            <input 
              className="input" 
              type="text" 
              placeholder="логин" 
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })} 
            />
            {errors.email?.type === "pattern" && <span className="error-left">Неверный формат email</span>}
            {errors.email?.type === "required" && <span className="error-left">Обязательное поле</span>}
            {apiError && <span className="error-left">Неверный логин или пароль</span>}
          </label>
          <label className="flex flex-col w-full relative pb-5">
            <span>Пароль</span>
            <input 
              className="input" 
              type="password"  
              placeholder="пароль" 
              {...register("password", { required: true })} 
            />
            {errors.password && <span className="error-left">Обязательное поле</span>}
            {apiError && <span className="error-left">Неверный логин или пароль</span>}
          </label>
          <button className="btn-primary" type="submit">Войти</button>
        </form>
      </div>
    </section>
  );
}
"use client"
import { useState, useEffect } from "react";
import type { User } from "@prisma/client";
import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  password: string;
  confirm: string;
}

function PasswordForm({user}: {user: User}) {
  const [apiError, setApiError] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors }} = useForm<Inputs>();

  useEffect(() => {
    if (errors.confirm || errors.password) {
      setApiError(false);
    }
  }, [errors.password , errors.confirm]);
  
  const create: SubmitHandler<Inputs> = async (data) => {

    if(data.password !== data.confirm){
      setApiError(true);
      return;
    }

    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("id", user.id.toString());
  
    try {
      const response = await fetch("/api/confirm", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        const result = await response.text();
        console.log(result);
        location.href = "/login";
      } else {
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
    <form onSubmit={handleSubmit(create)}>
      <div className="flex flex-col gap-y-2 pb-5 relative">
        <label htmlFor="email" className="block mt-4">Новый пароль</label>
        <input 
          type="password" 
          className="input" 
          style={{"width": "300px"}}
          {...register("password", { required: true, minLength: 5, maxLength: 20 })} 
        />
        {errors.password?.type === "required" && <span className="error-left">Обязательное поле</span>}
        {errors.password?.type === "minLength" && <span className="error-left">Минимум 5 символов</span>}
        {errors.password?.type === "maxLength" && <span className="error-left">Максимум 20 символов</span>}
        {apiError && <span className="error-left">Пароли отличаются</span>}
      </div>
      <div className="flex flex-col gap-y-2 pb-5 relative">
        <label htmlFor="email" className="block mt-4">Повторить пароль</label>
        <input 
          type="password"
          className="input" 
          style={{"width": "300px"}}
          {...register("confirm", { required: true})} 
        />
        {errors.confirm?.type === "required" && <span className="error-left">Обязательное поле</span>}
        {apiError && <span className="error-left">Пароли отличаются</span>}
      </div>
      <button type="submit" className="btn mt-4" style={{"width": "300px"}} >Создать</button>
    </form>
  );
}

export default PasswordForm;
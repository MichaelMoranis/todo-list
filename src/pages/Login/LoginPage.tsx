import { Link, useNavigate } from "react-router-dom";
import perfil from "../../assets/perfil.png";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormState {
  email: string;
  password: string;
  username: string
}

export default function LoginPage() {
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm<FormState>();
  const [error, setError] = useState<string | null>(null)

 async function handleSubmitInput({username, password}: FormState) {
   try {
    const response = await fetch('http://localhost:3333/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify({
        username, 
        password
      })
    })
    const data = await response.json()
     const token = data.token
     console.log(data)
    
         // Armazena o token e navega apenas se ele existir
    if (token) {
      localStorage.setItem("token", token);
      navigate("/app");
    } else {
      setError("dados invalidos, tente novamente")
    }
    
   } catch(error) {
    console.log("erro ao fazer login")
    setError("ocorreu um erro no login, tente novamente mais tarde !!!")
  }
  }

  return (
    <main className="flex  justify-center overflow-hidden">
      <div className="bg-zinc-200 rounded-md items-center h-full mt-4 w-96 p-4 m-2 shadow-slate-900  shadow-md">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 my-4">
            <h2 className="flex gap-4 text-3xl font-semibold">
              <img src={perfil} alt="foto perfil" className="h-8 w-8" />
              Login
            </h2>
            <h4>digite seus dados de acesso no campo abaixo</h4>
          </div>
          <form
            className="flex flex-col justify-center  gap-2"
            onSubmit={handleSubmit(handleSubmitInput)}
          >
            <label htmlFor="username">seu nome</label>
            <input
              className="border rounded-md p-2 w-full text-base py-1 focus:outline-none focus>:ring-0 focus:border-gray-600"
              placeholder="seu nome"
              {...register("username")}
              required
            />
            <label htmlFor="email">email</label>
            <input
              className="border rounded-md p-2 w-full text-base py-1 focus:outline-none focus>:ring-0 focus:border-gray-600"
              placeholder="email"
              required
              {...register("email")}
            />
            <label htmlFor="senha">senha</label>
            <input
              type="password"
              id="senha"
              placeholder="senha"
              required
              {...register("password")}
              className="border rounded-md p-2 w-full text-base py-1 focus:outline-none focus>:ring-0 focus:border-gray-600"
            />
             {error && <div className="flex justify-center bg-red-100 text-red-700 p-2 rounded-md mb-4">{error}</div>}
            <button
              type="submit"
              className="border rounded-md p-2 w-full my-6 bg-indigo-600 text-white font-semibold text-xl"
            >
              acessar
            </button>
          </form>
          <p className="text-indigo-600 ">
            ainda não tem uma conta, 
            <Link to="/register" className="underline font-bold mx-2">registre-se.</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

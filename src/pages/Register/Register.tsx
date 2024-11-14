import { Link, useNavigate } from "react-router-dom";
import perfil from "../../assets/perfil.png";
import { useForm } from "react-hook-form";
import { useState } from "react";


interface FormState {
  email: string;
  password: string;
  username: string,
}

export default function Register() {
  const { register, handleSubmit } = useForm<FormState>();
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  // funcao para adicionar elementos na lista
  async function handleSubmitInput(newText: FormState) {
    console.log(newText)
    const newUser = {
      username: newText.username,  // O texto para o nome de usuário
      email: newText.email, // Email do novo usuário
      password: newText.password,  // Senha do novo usuário
    };

    try {
      const response = await fetch(
        "http://localhost:3333/register",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        },
      );

      if (!response.ok) {
        setError("erro ao realizar novo cadastro")
        throw new Error(`Erro: ${response.statusText}`);
      } else {
        navigate("/login")

      }
      // Certifique-se de que SetInput esteja definido e faça sentido no contexto
    } catch (error) {
      console.error("Erro ao fazer cadastro:", error);
    }

  }

  return (
    <main className="flex items-center  justify-center overflow-hidden">
      <div className="bg-zinc-200 rounded-md items-center h-full mt-4 w-96 p-4">
        <div className="flex flex-col h-full">
          <div className="flex flex-col gap-4 my-2">
            <h2 className="flex  gap-4 text-3xl font-semibold">
              <img src={perfil} alt="foto perfil" className="h-8 w-8" />
              TodoApp
            </h2>
            <h1 className="text-xl block font-semibold">preencha os dados e cadastre-se!</h1>
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
            {error && <div className="flex bg-red-200 text-red-700 border-red-950 p-2 justify-center">{error}</div>}
            <button
              type="submit"
              className="border rounded-md p-2 w-full bg-indigo-600 text-white font-semibold text-xl my-4"
            >
              entrar
            </button>
          </form>
          <p className="text-indigo-600">
            ja tem uma conta, faça seu <Link to="/login" className="underline font-bold">login</Link>
          </p>
        </div>
      </div>
    </main>
  );
}

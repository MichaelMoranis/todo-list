export default function LoginPage() {
  return (
    <main className="flex  justify-center  min-h-screen  bg-zinc-200">
      <div className="flex flex-col items-center w-full gap-2 max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl pt-4">
        <div className="flex flex-col justify-center items-center">
          <h2>TodoApp</h2>
          <h1>seja bem vindo !!</h1>
        </div>
        <form className="flex flex-col justify-center gap-2">
          <label htmlFor="email">email</label>
          <input placeholder="email" />
          <label htmlFor="senha">senha</label>
          <input placeholder="senha" />
          <button>entrar</button>
        </form>
        <p>ainda não tem uma conta, cadastre-se!!</p>
      </div>
    </main >
  )
}

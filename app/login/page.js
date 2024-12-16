import { login, signup, loginWithGoogle } from "./actions";

export default function LoginPage() {
  return (
    <div>
      <form>
        <div className='flex items-center justify-center h-screen dark:bg-gray-800'>
          <button
            className='px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150'
            formAction={loginWithGoogle}
          >
            <img
              className='w-6 h-6'
              src='https://www.svgrepo.com/show/475656/google-color.svg'
              loading='lazy'
              alt='google logo'
            />
            <span>Inicia sesión con Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}

import { login, signup, loginWithGoogle } from './actions';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  return (
    <div>
      <form>
        {error && (
          <div className="error-message text-red-500 border-[1px] border-solid w-96 px-4 py-2 mb-2">
            {error}
          </div>
        )}
        <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-50 gap-8">
          <img src="/nlace_black.svg" alt="Nlace Logo" className=" w-48" />
          <button
            className="bg-white px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150  border-b-8 border-solid border-gray-800 drop-shadow-md"
            formAction={loginWithGoogle}
          >
            <img
              className="w-6 h-6"
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              loading="lazy"
              alt="google logo"
            />
            <span className="text-gray-800">Inicia sesión con Google</span>
          </button>
        </div>
      </form>
    </div>
  );
}

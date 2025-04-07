'use client'; // This is a global CSS file
import { useState } from 'react';
import { login, signup, loginWithGoogle } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AtSign, Eye, EyeOff, Lock } from 'lucide-react';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue
// } from '@/components/ui/select';
// import { Globe, Shield, Zap, BarChart, CreditCard, Rocket } from 'lucide-react';
// import FAQ from '@/components/landing/Faq';
// import HubspotForm from '@/components/Hubspot';
// import Link from 'next/link';

export default function LoginPage({ searchParams }) {
  const error = searchParams.error;
  const language = searchParams.language || 'es';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen w-full flex flex-col bg-brand-dark">
      <div className="md:hidden h-[20vh] relative overflow-hidden">
        <img
          src="/login-img.png"
          alt="Modern art with statue"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 to-transparent"></div>
      </div>
      <div className="flex flex-col md:flex-row flex-1 h-[80vh] md:h-auto">
        {/* Columna de la izquierda - Imagen (en desktop) */}
        <div className="hidden md:block md:w-1/2 relative overflow-hidden">
          <img
            src="/login-img.png"
            alt="Modern art with statue"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/50 to-transparent"></div>
        </div>

        {/* Columna de la derecha - Login */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-brand-blue flex-1">
          <div className="w-full max-w-md">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold mb-2 bg-brand-dark text-brand-light px-4 py-2 inline-block rounded font-heading">
                NLACE AI Studio
              </h1>
              <p className="text-brand-light/80 font-sans">
                {language === 'es'
                  ? 'Inicia sesión para acceder a tus agentes de IA'
                  : 'Sign in to access your AI agents'}
              </p>
            </div>

            <div className="space-y-6">
              {/* Email login form */}
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-brand-light">
                      {language === 'es' ? 'Correo electrónico' : 'Email'}
                    </Label>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="nombre@ejemplo.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 border-brand-light/20 text-brand-light focus:border-brand-orange bg-brand-light"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password" className="text-brand-light">
                        {language === 'es' ? 'Contraseña' : 'Password'}
                      </Label>
                      <button
                        type="button"
                        // onClick={onOpenResetDialog}
                        className="text-sm text-brand-pink hover:underline"
                      >
                        {language === 'es'
                          ? '¿Olvidaste la contraseña?'
                          : 'Forgot password?'}
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 pr-10 border-brand-light/20 text-brand-light focus:border-brand-orange bg-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-2.5 text-gray-400"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  {language === 'es' ? 'Iniciar sesión' : 'Sign in'}
                </Button>
              </form>
              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-brand-light/20"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-brand-dark px-2 text-brand-light/60">
                    {language === 'es' ? 'O continuar con' : 'Or continue with'}
                  </span>
                </div>
              </div>
              {/* Google login button */}
              <form>
                <button
                  className="bg-white px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150  border-b-8 border-solid drop-shadow-md mt-6 w-full flex-row items-center justify-center self-center mx-auto"
                  formAction={loginWithGoogle}
                >
                  <img
                    className="w-6 h-6"
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    loading="lazy"
                    alt="google logo"
                  />
                  <span className="text-gray-800">Continuar con Google</span>
                </button>
              </form>
            </div>

            {/* Sign up link */}
            <div className="mt-6 text-center text-sm text-brand-light/70">
              <p>
                {language === 'es'
                  ? '¿No tienes una cuenta? '
                  : "Don't have an account? "}
                <a
                  href="#"
                  className="font-medium text-brand-pink hover:underline"
                >
                  {language === 'es' ? 'Regístrate' : 'Sign up'}
                </a>
              </p>
            </div>

            {/* Password Reset Dialog */}
          </div>
        </div>
      </div>
    </div>
  );
}

// app/dashboard/page.js
'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { getUserDataAndPermissionsClient } from '@/app/actions/userClientActions'
import { useUserStore } from '@/stores/userStore'
import NewChat from '@/components/chat/newChat'
import Loading from '@/components/ui/Loading'
import AccountSwitcher from '@/components/AccountSwitch'

export default function PrivatePage() {
  const supabaseClient = createClient()
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const setUser = useUserStore((state) => state.setUser)
  const userAccounts = useUserStore((state) => state.accounts)
  const setUserAccounts = useUserStore((state) => state.setAccounts)
  const setPermisos = useUserStore((state) => state.setPermisos)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const checkAuthAndFetchData = async () => {
      try {
        if (user) {
          // console.log('Usuario ya en store:', user);
          setLoading(false)
          return
        }
        const {
          data: { session }
        } = await supabaseClient.auth.getSession()

        if (!session) {
          router.push('/login')
          return
        }
        await new Promise((resolve) => setTimeout(resolve, 500))
        const userData = await getUserDataAndPermissionsClient()

        setUser(userData.user)
        setUserAccounts(userData.accounts)
        setPermisos(userData.permisos)
      } catch (error) {
        console.error('Error al inicializar:', error)
        setError(error.message)

        if (error.message === 'No user is logged in') {
          router.push('/login')
        }
      } finally {
        setLoading(false)
      }
    }

    checkAuthAndFetchData()

    // Configurar el listener para cambios en la autenticación
    const {
      data: { subscription }
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      // console.log('Evento de autenticación:', event);

      if (event === 'SIGNED_IN') {
        checkAuthAndFetchData()
      } else if (event === 'SIGNED_OUT') {
        setUser(null)
        setUserAccounts([])
        setPermisos([])
        router.push('/login')
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [router, setUser, setUserAccounts, setPermisos, user])

  if (loading) {
    return (
      <div className="grid place-items-center h-screen w-full">
        <div>
          <Loading />
        </div>
      </div>
    )
  }

  if (error && error !== 'No user is logged in') {
    return (
      <div className="grid place-items-center h-screen w-full">
        <div className="text-center">
          <p className="text-red-500">Error: {error}</p>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Volver al login
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <header className="flex flex-col border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 justify-between pl-4">
        <div className="w-full flex items-center justify-between p-4">
          <h1 className="text-xl font-bold truncate">Agente</h1>
          {userAccounts && userAccounts.length > 0 && <AccountSwitcher />}
        </div>
      </header>
      {user && <NewChat />}
    </>
  )
}

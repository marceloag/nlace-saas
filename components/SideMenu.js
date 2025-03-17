'use client';
import { logout } from '@/app/actions/auth';
import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import {
  ConfigurationIcon,
  DashboardIcon,
  LogoutIcon,
  AccountsIcon,
  RobotIcon
} from '@/components/icons/Icons';
import { useUserStore } from '@/stores/userStore';

function SideMenu() {
  const userData = useUserStore((state) => state.user);
  const permisos = useUserStore((state) => state.permisos);
  const logoutStore = useUserStore((state) => state.logoutStore);

  const handleLogout = async () => {
    try {
      logoutStore();
      await logout();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };
  return (
    <aside className="w-14 shadow-md h-screen flex flex-col gap-2 py-2 px-2 items-center justify-between bg-white fixed left-0 top-0 z-50">
      <figure className="rounded-full overflow-hidden border-[2px] border-solid border-pink-100 w-full aspect-square">
        {}
        <img
          src={userData?.user.user_metadata.picture ?? '/avatar-default.webp'}
          className="aspect-square w-full"
          alt="Avatar"
        />
      </figure>
      <div className="items-center flex flex-col gap-6 text-gray-700">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Link href="/dashboard">
                <DashboardIcon />
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Volver al Dashboard</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {permisos?.includes('0') && (
          <>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/cuentas">
                    <RobotIcon />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Agentes</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/usuarios">
                    <AccountsIcon />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Usuarios</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link href="/dashboard/configuracion">
                    <ConfigurationIcon />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Configuración</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </>
        )}
      </div>
      <div className="flex flex-col gap-2 py-2">
        <button onClick={handleLogout}>
          <LogoutIcon />
        </button>
      </div>
    </aside>
  );
}

export default SideMenu;

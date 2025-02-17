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
  AddAccountIcon,
  ConfigurationIcon,
  DashboardIcon,
  LogoutIcon,
  AccountsIcon,
  RobotIcon
} from '@/components/icons/Icons';

function SideMenu({ userData, permisos }) {
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error en logout:', error);
    }
  };
  return (
    <aside className="w-14 shadow-md h-screen flex flex-col gap-2 py-2 px-2 items-center justify-between bg-white fixed left-0 top-0 z-50">
      <figure className="rounded-full overflow-hidden border-[2px] border-solid border-pink-100 w-full">
        <img
          src={userData.user_metadata.picture}
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
        {permisos.includes('0') && (
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

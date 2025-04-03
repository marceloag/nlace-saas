import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

export default async function DashboardLayout({ children }) {
  return (
    <section className="flex flex-row bg-gray-50">
      <SideMenu />
      <main className="flex flex-1 flex-col ml-9 min-h-screen">
        <Header />
        <div className="flex flex-1 flex-col w-full justify-start h-[80%] relative">
          {children}
        </div>
      </main>
    </section>
  );
}

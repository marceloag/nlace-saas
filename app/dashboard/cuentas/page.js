import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditIcon } from '@/components/icons/Icons';

export async function getAccounts() {
  const supabase = await createClient();
  const { data: accounts, error } = await supabase.from('cuentas').select('*');
  if (error) throw error;
  return accounts;
}

async function Cuentas() {
  const accounts = await getAccounts();
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="items-start justify-start flex flex-row title">
          🤖 Agentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Link
          href="/dashboard/crear-cuenta"
          className="mb-2 mx-auto w-full flex justify-center"
        >
          <Button>Crear Nuevo Agente</Button>
        </Link>
        <ul>
          {accounts.map((account) => (
            <li
              key={account.id}
              className="w-full py-4 px-2 border-[1px] border-solid border-gray-200 justify-between flex flex-row items-center rounded-sm hover:bg-gray-50"
            >
              <section className="flex flex-row gap-4 items-center">
                <div className="rounded-full border-2 border-solid border-slate-900">
                  <img
                    src={account.avatar}
                    alt={account.nombre}
                    className="w-8 h-8 rounded-full"
                  />
                </div>
                {account.nombre}
              </section>
              <div className="items-center flex flex-row gap-4">
                <Link
                  href={`/dashboard/cuenta/${account.slug}`}
                  className="btn btn-sm btn-primary"
                >
                  <svg
                    height="24"
                    width="24"
                    id="_x32_"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                    fill="#888888"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path
                          className="st0"
                          d="M511.58,252.219c-0.403-1.756-0.807-2.737-1.17-3.647c-0.727-1.7-1.424-2.982-2.239-4.437 c-3.006-5.228-7.831-12.308-14.444-21.216c-9.872-13.273-23.469-30.09-38.871-46.686c-15.417-16.596-32.518-32.938-49.93-45.279 c-24.624-17.426-48.569-30.976-73.091-40.184C307.33,81.555,282.246,76.77,256,76.785c-26.246-0.015-51.33,4.77-75.836,13.986 c-24.53,9.207-48.466,22.758-73.09,40.176c-25.899,18.407-51.401,45.729-71.098,69.459c-9.825,11.866-18.106,22.798-24.078,31.325 c-2.999,4.272-5.403,7.926-7.254,11.011c-0.933,1.567-1.716,2.966-2.468,4.533c-0.38,0.799-0.744,1.622-1.147,2.777 c-0.198,0.585-0.412,1.265-0.609,2.167c-0.19,0.91-0.412,2.033-0.42,3.781c0.008,1.741,0.229,2.872,0.42,3.781 c0.395,1.756,0.807,2.729,1.17,3.646c0.728,1.701,1.424,2.983,2.239,4.43c3.006,5.229,7.831,12.316,14.444,21.223 c9.864,13.274,23.469,30.098,38.871,46.695c15.417,16.596,32.519,32.93,49.93,45.27c24.624,17.426,48.561,30.969,73.09,40.184 c24.506,9.208,49.59,14.001,75.836,13.985c26.246,0.016,51.33-4.777,75.836-13.985c24.522-9.216,48.466-22.758,73.091-40.176 c25.898-18.408,51.401-45.729,71.098-69.46c9.824-11.865,18.106-22.797,24.078-31.325c2.998-4.279,5.402-7.926,7.254-11.019 c0.934-1.566,1.717-2.966,2.468-4.525c0.372-0.799,0.744-1.622,1.147-2.785c0.198-0.585,0.412-1.257,0.609-2.159 c0.19-0.91,0.412-2.04,0.42-3.781C511.992,254.252,511.771,253.129,511.58,252.219z M256,377.487 c-67.103,0-121.486-54.392-121.486-121.486c0-67.079,54.383-121.486,121.486-121.486c67.103,0,121.486,54.407,121.486,121.486 C377.486,323.095,323.103,377.487,256,377.487z"
                        />
                        <path
                          className="st0"
                          d="M286.415,250.384c-6.376,1.171-12.902-1.092-17.166-5.965c-4.271-4.888-5.648-11.644-3.631-17.814l7.911-24.19 c-5.522-1.804-11.399-2.8-17.53-2.8c-31.15,0-56.392,25.233-56.392,56.384c0,31.15,25.242,56.4,56.392,56.4 c31.151,0,56.392-25.25,56.392-56.4c0-3.496-0.364-6.914-0.973-10.235L286.415,250.384z"
                        />
                      </g>
                    </g>
                  </svg>
                </Link>
                <Link
                  href={`/dashboard/editar-cuenta/${account.slug}`}
                  className="btn btn-sm btn-primary"
                >
                  <EditIcon width="1.5em" height="1.5em" />
                </Link>
                <button className="btn btn-sm btn-danger">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#888888"
                      d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zm2.692-3q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144"
                    ></path>
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

export default Cuentas;

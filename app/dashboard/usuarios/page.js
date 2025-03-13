import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { EditIcon } from '@/components/icons/Icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import UserForm from '@/components/users/CreateUser';
import EditUser from '@/components/users/EditUser';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

async function getUsers() {
  const supabase = await createClient();
  const { data: accounts, error } = await supabase.from('usuarios').select('*');
  if (error) throw error;
  return accounts;
}

async function getAccounts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('cuentas').select('*');
  if (error) throw error;
  return data;
}

async function Usuarios() {
  const usuarios = await getUsers();
  const cuentas = await getAccounts();
  const supabase = await createClient();
  const {
    data: { session }
  } = await supabase.auth.getSession();

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="items-start justify-start flex flex-row">
            👨‍💻 Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[180px]">Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((usuario) => (
                <TableRow key={usuario.id}>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.email}</TableCell>
                  <TableCell className="flex flex-row justify-end">
                    <Dialog>
                      <DialogTrigger asChild>
                        <EditIcon width="1.5em" height="1.5em" />
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[800px]">
                        <EditUser userId={usuario.id} />
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-end mt-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button>Agregar Usuario</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <UserForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default Usuarios;

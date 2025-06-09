import Link from 'next/link'
import { createClient } from '@/utils/supabase/server'
import { EditIcon } from '@/components/icons/Icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import UserForm from '@/components/users/CreateUser'
import EditUser from '@/components/users/EditUser'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'

let supabaseClient = null
async function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = await createClient()
  }
  return supabaseClient
}

async function getTableData(tableName) {
  const supabase = await getSupabaseClient()

  if (tableName === 'organizaciones') {
    const { data: organizaciones, error: cuentasError } = await supabase.rpc(
      'obtener_organizaciones_con_integrantes'
    )
    if (cuentasError) throw cuentasError
    console.log(organizaciones.activa)
    return organizaciones
  } else {
    const { data, error } = await supabase.from(tableName).select('*')
    if (error) throw error
    return data
  }
}

async function Usuarios() {
  const supabase = await getSupabaseClient()
  const [
    usuarios,
    organizaciones,
    cuentas,
    {
      data: { session }
    }
  ] = await Promise.all([
    getTableData('usuarios'),
    getTableData('organizaciones'),
    getTableData('cuentas'),
    supabase.auth.getSession()
  ])

  return (
    <>
      <Tabs defaultValue="organizaciones">
        <TabsList>
          <TabsTrigger value="organizaciones">Organizaciones</TabsTrigger>
          <TabsTrigger value="usuarios">Usuarios</TabsTrigger>
        </TabsList>

        <TabsContent value="organizaciones">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="items-start justify-start flex flex-row title">
                👨 Organizaciones
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="flex-1">Nombre</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Usuarios</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {organizaciones.map((organizacion) => (
                    <TableRow key={organizacion.id}>
                      <TableCell>{organizacion.nombre}</TableCell>
                      <TableCell>
                        {organizacion.activa == true ? 'Activa' : 'Inactiva'}
                      </TableCell>
                      <TableCell>{organizacion.total_integrantes}</TableCell>
                      <TableCell className="flex flex-row justify-end">
                        <Dialog>
                          <DialogTrigger asChild>
                            <EditIcon width="1.5em" height="1.5em" />
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[800px]">
                            <EditUser userId={organizacion.id} />
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
                    <Button>Agregar Organización</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <UserForm />
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="usuarios">
          <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="items-start justify-start flex flex-row title">
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
        </TabsContent>
      </Tabs>
    </>
  )
}

export default Usuarios

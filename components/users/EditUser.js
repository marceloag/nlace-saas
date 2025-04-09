'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import {
  updateAccount,
  getAccounts,
  getUser
} from '../../app/actions/usuarios';
import { Toaster, toast } from 'sonner';

export default function EditUser({ userId }) {
  const [userData, setUserData] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      const data = await getAccounts();
      const userQuery = await getUser(userId);
      console.log(userQuery);
      setFormData({
        name: userQuery.nombre,
        email: userQuery.email,
        selectedAccounts: userQuery.permisos.map(Number)
      });
      setAccounts(data);
      setLoading(false);
    };
    fetchAccounts();
  }, [userId]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    selectedAccounts: []
  });

  // Estado para mensajes de error
  const [errors, setErrors] = useState({});

  // Manejador de cambios en inputs de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Manejador para checkbox de cuentas
  const handleAccountToggle = (accountId) => {
    setFormData((prev) => {
      const selectedAccounts = prev.selectedAccounts.includes(accountId)
        ? prev.selectedAccounts.filter((id) => id !== accountId)
        : [...prev.selectedAccounts, accountId];

      return {
        ...prev,
        selectedAccounts
      };
    });
    // Limpiar error de cuentas si existe
    if (errors.accounts) {
      setErrors((prev) => ({
        ...prev,
        accounts: ''
      }));
    }
  };

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido';
    }

    if (formData.selectedAccounts.length === 0) {
      newErrors.accounts = 'Debe seleccionar al menos una cuenta';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      await updateAccount(formData, userId);
      toast.success('Usuario actualizado');
    } catch (error) {
      console.log(error);
      setErrors((prev) => ({
        ...prev,
        submit: 'Error al guardar el usuario'
      }));
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="title">
          Editar Usuario {userData.nombre}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Toaster />
        {loading && <p>Cargando...</p>}
        {!loading && (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de nombre */}
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>

            {/* Campo de correo */}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'border-red-500' : ''}
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>

            {/* Selección de cuentas */}
            <div className="space-y-2">
              <Label>Permisos de Cuentas</Label>
              <div className="grid grid-cols-2 gap-4">
                {accounts.map((account) => (
                  <div key={account.id} className="flex items-start space-x-2">
                    <Checkbox
                      id={`account-${account.id}`}
                      checked={formData.selectedAccounts.includes(account.id)}
                      onCheckedChange={() => handleAccountToggle(account.id)}
                    />
                    <Label htmlFor={`account-${account.id}`}>
                      {account.nombre}
                    </Label>
                  </div>
                ))}
              </div>
              {errors.accounts && (
                <span className="text-sm text-red-500">{errors.accounts}</span>
              )}
            </div>

            {/* Mensaje de error general */}
            {errors.submit && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.submit}</AlertDescription>
              </Alert>
            )}

            {/* Botón de envío */}
            <Button type="submit" className="w-full">
              Modificar Usuario
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

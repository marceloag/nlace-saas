'use client'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  createOrganization,
  getOrganizations
} from '../../app/actions/organizations'
import { AlertCircle } from 'lucide-react'

export default function OrganizationForm() {
  const [accounts, setAccounts] = useState([])
  const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     const data = await getAccounts()
  //     setAccounts(data)
  //   }
  //   fetchAccounts()
  // }, [])

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    descripcion: '',
    sitio_web: '',
    activa: false
  })

  // Estado para mensajes de error
  const [errors, setErrors] = useState({})

  // Manejador de cambios en inputs de texto
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    // Limpiar error cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  // Validación del formulario
  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Correo electrónico inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)

    if (!validateForm()) {
      return
    }

    try {
      await createOrganization(formData)

      setFormData({
        name: '',
        descripcion: '',
        sitio_web: '',
        activa: false,
        email: ''
      })
      // Revalidar path para obtener los usuarios actualizados
    } catch (error) {
      console.log(error)
      setErrors((prev) => ({
        ...prev,
        submit: 'Error al guardar la organización'
      }))
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="title">Crear Nueva Organización</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Campo de nombre */}
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Organización</Label>
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
            <Label htmlFor="email">Correo Electrónico de Contacto</Label>
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

          {/* Campo de logo */}
          {/* <div className="space-y-2">
            <input
              id="logo"
              type="file"
              name="logo"
              accept="image/*"
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  logo: e.target.files[0]
                }))
              }
              className={errors.logo ? 'border-red-500' : ''}
            />
            {errors.logo && (
              <span className="text-sm text-red-500">{errors.logo}</span>
            )}
          </div> */}

          {/* Campo de sitio web */}
          <div className="space-y-2">
            <Label htmlFor="sitio_web">Sitio Web</Label>
            <Input
              id="sitio_web"
              name="sitio_web"
              value={formData.sitio_web}
              onChange={handleInputChange}
              className={errors.sitio_web ? 'border-red-500' : ''}
            />
            {errors.sitio_web && (
              <span className="text-sm text-red-500">{errors.sitio_web}</span>
            )}
          </div>

          {/* Campo de descripcion */}
          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Input
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              className={errors.descripcion ? 'border-red-500' : ''}
            />
            {errors.descripcion && (
              <span className="text-sm text-red-500">{errors.descripcion}</span>
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
          <Button className="w-full" type="submit">
            Crear Organización
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

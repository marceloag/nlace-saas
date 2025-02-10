'use client';

import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button } from '@/components/ui/button';
import { createClient } from '@supabase/supabase-js';

function FileUploader({ accountSlug, accessToken }) {
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      global: { headers: { Authorization: `Bearer ${accessToken}` } }
    }
  );

  async function uploadToSupabase(file) {
    const cleanFileName = file.name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-zA-Z0-9\-_.]/g, ' ');
    const fileName = `${accountSlug}/${Date.now()}-${cleanFileName}`;

    const { data, error } = await supabase.storage
      .from('kb-cuentas')
      .upload(fileName, file);

    if (error) {
      throw new Error(`Error uploading file: ${error.message}`);
    }

    return data;
  }

  const onDrop = useCallback((acceptedFiles) => {
    setFilesUploaded((prev) => [...prev, ...acceptedFiles]);
    setError(null);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf']
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (filesUploaded.length === 0) {
        throw new Error('Por favor, selecciona al menos un archivo.');
      }

      const formData = new FormData();
      await Promise.all(filesUploaded.map((file) => uploadToSupabase(file)));

      // const result = await uploadFiles(formData);

      // if (!result.success) {
      //throw new Error(result.error || 'Error al subir los archivos');
      // }

      setFilesUploaded([]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <svg
              className="animate-spin h-6 w-6 text-primary mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0c-4.418 0-8 3.582-8 8z"
              ></path>
            </svg>
            <p className="text-center text-sm text-gray-700">
              Subiendo archivos...
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6" id="crearcuentaform">
        <div className="space-y-2">
          <div
            {...getRootProps()}
            className="bg-gray-50 rounded-t-md w-full h-54 grid place-content-center transition-all duration-200 border-solid border-[1px] border-gray-100 hover:border-solid hover:border-[#95a9fc] hover:border-[1px] cursor-pointer p-4"
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <input {...getInputProps()} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="currentColor"
              >
                <path d="m11.966 20-.004-8m7.863 5c4.495-3.16.475-7.73-3.706-7.73C13.296-1.732-3.265 7.368 4.074 15.662" />
                <path d="m15.144 14.318-3.182-3.182-3.182 3.182" />
              </svg>
              {isDragActive ? (
                <p>Suelta los archivos aquí ...</p>
              ) : (
                <p className="text-center">
                  Arrastra archivos para subirlos a la base de conocimiento 🧠
                </p>
              )}
              <small className="text-xs text-gray-500">Archivos .pdf</small>
            </div>
          </div>

          {error && (
            <div className="px-4 py-2 text-red-500 text-sm">{error}</div>
          )}

          {filesUploaded.length > 0 && (
            <div className="px-4 py-2">
              <h4 className="text-sm font-mono mb-1 font-bold">
                Archivos a subir:
              </h4>
              <ul>
                {filesUploaded.map((file) => (
                  <li key={file.name} className="text-sm font-mono">
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Subiendo...' : 'Subir Archivos'}
        </Button>
      </form>
    </>
  );
}

export default FileUploader;

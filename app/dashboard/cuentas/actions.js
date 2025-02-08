'use server';

import { createClient } from '@/utils/supabase/server';

export async function uploadFiles(formData) {
  const supabase = await createClient();
  const filesUploaded = [];
  const files = formData.getAll('files');

  try {
    for (const file of files) {
      if (file && file.size > 0) {
        // Sanitize file name
        const cleanFileName = file.name
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[^a-zA-Z0-9\-_.]/g, ' ');

        // Create a unique file name
        const fileName = `${Date.now()}-${cleanFileName}`;

        // Convert file to buffer
        const buffer = await file.arrayBuffer();

        // Upload file to storage
        const { data, error } = await supabase.storage
          .from('kb-cuentas')
          .upload(fileName, buffer);

        if (error) {
          throw new Error(`Error uploading file: ${error.message}`);
        }

        // Store successful upload info
        filesUploaded.push({
          originalName: file.name,
          storagePath: fileName,
          size: file.size,
          type: file.type
        });
      }
    }

    return { success: true, files: filesUploaded };
  } catch (error) {
    console.error('Upload error:', error);
    return { success: false, error: error.message };
  }
}

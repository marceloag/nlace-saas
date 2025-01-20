'use client';

import { downloadFile } from '@/utils/supaFunctions';

function DownloadFileButton({ file }) {
  return <button onClick={() => downloadFile(file)}>Download</button>;
}

export default DownloadFileButton;

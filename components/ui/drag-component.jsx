'use client';

import { useState } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export function DragUpload({ files, setFiles }) {
  const [file, setFile] = useState(null);
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      setFile(droppedFile);
    }
  };
  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFiles(selectedFile);
    }
  };
  const handleRemoveFile = () => {
    setFiles(null);
  };
  return (
    <Card className="w-full max-w-full">
      <CardHeader>
        <CardTitle>Knowledge Base</CardTitle>
        <CardDescription>
          Arrastra los archivos para el Knoledge Base de la cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          className={`cursor-pointer flex flex-row h-48 w-full items-center justify-center rounded-md border-2 border-dashed transition-colors ${
            file
              ? 'border-primary'
              : 'border-muted-foreground hover:border-primary'
          }`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {files ? (
            <div className="flex items-center gap-4">
              <div className="flex-1 truncate">
                <p className="font-medium">{files[0].path}</p>
                <p className="text-muted-foreground">{files[0].size} bytes</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-muted-foreground hover:text-red-500"
              >
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <div className="space-y-2 text-center flex flex-row gap-2">
              <UploadIcon className="h-8 w-8 text-muted-foreground" />
              <p className="text-muted-foreground">
                Arrastra tus archivo PDF aquí
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function UploadIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

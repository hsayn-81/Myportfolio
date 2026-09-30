"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X, FileText, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  endpoint: "imageUploader" | "resumeUploader";
  value: string;
  onChange: (url: string) => void;
  label: string;
}

export default function FileUpload({ endpoint, value, onChange, label }: FileUploadProps) {
  if (value) {
    const isPdf = value.endsWith(".pdf") || endpoint === "resumeUploader";

    return (
      <div className="space-y-2">
        <label className="block text-xs font-medium text-zinc-400">{label}</label>
        <div className="relative inline-flex items-center gap-3 p-3 bg-zinc-950 border border-zinc-800 rounded-lg group">
          {isPdf ? (
            <div className="flex items-center gap-2 text-zinc-200 text-xs">
              <FileText className="w-5 h-5 text-red-400" />
              <span className="font-mono truncate max-w-[200px]">Uploaded Resume PDF</span>
            </div>
          ) : (
            <div className="relative w-20 h-20 rounded-md overflow-hidden bg-zinc-800 border border-zinc-700">
              <img
                src={value}
                alt="Uploaded"
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => onChange("")}
            className="p-1 rounded-full bg-red-950/80 hover:bg-red-900 text-red-300 transition-colors cursor-pointer"
            title="Remove file"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-zinc-400 mb-1">{label}</label>
      <div className="border border-dashed border-zinc-800 rounded-lg bg-zinc-950/50 hover:bg-zinc-950 transition-colors p-2">
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            if (res && res[0]) {
              onChange(res[0].url);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`Upload failed: ${error.message}`);
          }}
          appearance={{
            button: "bg-zinc-100 text-zinc-900 text-xs font-medium px-3 py-1.5 rounded-md hover:bg-white cursor-pointer mt-2",
            label: "text-xs text-zinc-400 hover:text-zinc-300",
            allowedContent: "text-[10px] text-zinc-600 mt-1",
            container: "border-none p-2 flex flex-col items-center justify-center min-h-[100px]",
          }}
        />
      </div>
    </div>
  );
}
"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { X } from "lucide-react";

interface MultiFileUploadProps {
  endpoint: "galleryUploader";
  values: string[];
  onChange: (urls: string[]) => void;
  label: string;
}

export default function MultiFileUpload({ endpoint, values, onChange, label }: MultiFileUploadProps) {
  const handleRemove = (urlToRemove: string) => {
    onChange(values.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-medium text-zinc-400">{label}</label>
      
      {/* Grid لعرض الصور المرفوعة */}
      {values.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-2">
          {values.map((url, idx) => (
            <div key={idx} className="relative w-16 h-16 rounded-md overflow-hidden bg-zinc-800 border border-zinc-700">
              <img src={url} alt={`upload-${idx}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute -top-1 -right-1 p-1 bg-red-600 text-white rounded-full scale-75 hover:scale-90 transition-transform"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* زر الرفع */}
      <div className="border border-dashed border-zinc-800 rounded-lg bg-zinc-950/50 hover:bg-zinc-950 transition-colors p-2">
        <UploadDropzone
          endpoint={endpoint}
          onClientUploadComplete={(res: any) => {
            if (res) {
              const newUrls = res.map((r: any) => r.ufsUrl || r.url);
              onChange([...values, ...newUrls]);
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
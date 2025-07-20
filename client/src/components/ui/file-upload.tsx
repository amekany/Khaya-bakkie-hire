import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onUpload: (file: File) => void;
  onRemove?: () => void;
  currentImageUrl?: string;
  className?: string;
  accept?: string;
  placeholder?: string;
}

export function FileUpload({ 
  onUpload, 
  onRemove, 
  currentImageUrl, 
  className, 
  accept = "image/*",
  placeholder = "Upload Image"
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0 && files[0].type.startsWith('image/')) {
      onUpload(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onUpload(files[0]);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("relative", className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {currentImageUrl ? (
        <div className="relative group">
          <img
            src={currentImageUrl}
            alt="Uploaded"
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={triggerFileSelect}
                className="bg-white/90 hover:bg-white text-gray-900"
              >
                <Upload className="h-4 w-4 mr-2" />
                Change
              </Button>
              {onRemove && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={onRemove}
                  className="bg-red-500/90 hover:bg-red-500 text-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={triggerFileSelect}
          className={cn(
            "border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-gray-400 hover:bg-gray-50",
            isDragging && "border-blue-500 bg-blue-50",
            "flex flex-col items-center justify-center min-h-[200px]"
          )}
        >
          <Image className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-600 mb-2 font-medium">{placeholder}</p>
          <p className="text-sm text-gray-500">
            Drag and drop or click to select
          </p>
        </div>
      )}
    </div>
  );
}

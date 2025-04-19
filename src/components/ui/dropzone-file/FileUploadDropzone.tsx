"use client"

import { DragEvent, InputHTMLAttributes, RefCallback } from "react"
import { Loader2 } from "lucide-react"

interface FileUploadDropzoneProps {
  isLoading: boolean
  isDraggingOver: boolean
  displayError: boolean
  onDragEnter: (event: DragEvent<HTMLLabelElement>) => void
  onDragLeave: (event: DragEvent<HTMLLabelElement>) => void
  onDragOver: (event: DragEvent<HTMLLabelElement>) => void
  onDrop: (event: DragEvent<HTMLLabelElement>) => void
  inputProps: InputHTMLAttributes<HTMLInputElement> & {
    ref?: RefCallback<HTMLInputElement>
  }
}

export const FileUploadDropzone = ({
  isLoading,
  isDraggingOver,
  displayError,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  inputProps,
}: FileUploadDropzoneProps) => {
  const dropZoneBaseClasses =
    "flex-1 cursor-pointer rounded-md border-2 border-dashed py-4 px-8 text-center text-gray-700 dark:text-gray-300 transition duration-200 ease-in-out flex items-center justify-center min-h-[80px]"
  const dropZoneDefaultBorder = "border-gray-400 dark:border-gray-600"
  const dropZoneHoverClasses = "hover:bg-gray-100 dark:hover:bg-gray-700/30"
  const dropZoneErrorClasses =
    "border-red-500 dark:border-red-400 bg-red-50/50 dark:bg-red-900/20"
  const dropZoneLoadingClasses =
    "cursor-not-allowed opacity-60 bg-gray-100 dark:bg-gray-800"
  const dropZoneDraggingClasses =
    "bg-blue-100 dark:bg-blue-900/40 border-blue-500 dark:border-blue-400 ring-2 ring-blue-300 ring-offset-1"

  const dropZoneClasses = `${dropZoneBaseClasses} ${
    isLoading
      ? dropZoneLoadingClasses
      : isDraggingOver
        ? dropZoneDraggingClasses
        : displayError
          ? dropZoneErrorClasses
          : `${dropZoneDefaultBorder} ${dropZoneHoverClasses}`
  }`

  return (
    <div className="mb-4 flex items-center px-3.5">
      <label
        htmlFor="file-upload-input"
        className={dropZoneClasses}
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        <span className="pointer-events-none flex flex-col items-center">
          {isLoading ? (
            <>
              <Loader2 className="mb-2 h-5 w-5 animate-spin" />
              Yuklanmoqda...
            </>
          ) : isDraggingOver ? (
            <span>Bu yerga tashlang</span>
          ) : (
            <span>Bosing, yoki tashlang</span>
          )}
        </span>
        <input
          hidden
          type="file"
          id="file-upload-input"
          accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          {...inputProps}
        />
      </label>
    </div>
  )
}

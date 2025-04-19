"use client"

import React, { useState, useCallback, useEffect } from "react"
import { useStartEdit } from "./hooks/useStartEdit"
import {
  FileUploadDropzone,
  ErrorMessage,
  FilePreview,
  SubmitButton,
} from "../ui/dropzone-file"

export const StartEdit = () => {
  const {
    register,
    handleSubmit,
    formState,
    onSubmit,
    handleFileChange: processFile,
    isLoading,
    fileError: processingError,
    setValue,
    trigger,
  } = useStartEdit()

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState(false)

  const {
    ref,
    onChange: rhfOnChange,
    name,
    ...restRegister
  } = register("file", {
    validate: {
      required: (files: FileList | null) =>
        (files && files.length > 0) || "Iltimos, fayl tanlang.",
    },
  })

  const handleDragEnter = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (event.dataTransfer.items?.length > 0) {
        setIsDraggingOver(true)
      }
    },
    []
  )

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!event.currentTarget.contains(event.relatedTarget as Node)) {
        setIsDraggingOver(false)
      }
    },
    []
  )

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (!isDraggingOver) {
        setIsDraggingOver(true)
      }
    },
    [isDraggingOver]
  )

  const handleDrop = useCallback(
    async (event: React.DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDraggingOver(false)

      if (isLoading) return

      const files = event.dataTransfer.files
      if (files?.length > 0) {
        const file = files[0]
        setValue("file", files, { shouldDirty: true })
        setSelectedFileName(file.name)
        await processFile({
          target: { files },
        } as unknown as React.ChangeEvent<HTMLInputElement>)
        await trigger()
      }
    },
    [isLoading, processFile, setValue, trigger, setSelectedFileName]
  )

  const handleChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      if (isLoading) return
      await rhfOnChange(event)
      setSelectedFileName(event.target.files?.[0]?.name || null)
      await processFile(event)
      await trigger("file")
    },
    [isLoading, processFile, rhfOnChange, trigger]
  )

  const handleClearFile = useCallback(() => {
    setSelectedFileName(null)
    setValue("file", null, { shouldValidate: true, shouldDirty: true })
    const fileInput = document.getElementById(
      "file-upload-input"
    ) as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }, [setValue])

  useEffect(() => {
    console.log("FormState Changed:", {
      isValid: formState.isValid,
      errors: formState.errors,
      isDirty: formState.isDirty,
      isSubmitting: formState.isSubmitting,
      isLoading,
    })
  }, [formState, isLoading])

  const displayError = formState.errors.file?.message || processingError

  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h1 className="text-3xl font-bold text-center">JanobMuharrir 📖</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl"
      >
        <div className="relative w-full p-3 bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg transition duration-300 ease-in-out">
          <div className="p-3.5">
            <div className="mb-3 flex justify-center p-3.5 text-xl font-semibold leading-tight">
              {isLoading ? "Yuklanmoqda..." : "Fayl yuklang"}
            </div>

            <p className="mb-4 px-3.5 text-center text-sm leading-tight text-gray-600 dark:text-gray-400">
              Faqat{" "}
              <code className="font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                .txt
              </code>{" "}
              yoki{" "}
              <code className="font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                .docx
              </code>{" "}
              turidagi fayllarni yuklash mumkin.
            </p>

            <FileUploadDropzone
              isLoading={isLoading}
              isDraggingOver={isDraggingOver}
              displayError={!!displayError}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              inputProps={{
                ...restRegister,
                name,
                ref,
                onChange: handleChange,
                disabled: isLoading,
              }}
            />

            <ErrorMessage message={displayError} className="mb-4" />
            <FilePreview
              fileName={selectedFileName}
              onClear={handleClearFile}
              isLoading={isLoading}
              error={processingError}
            />
          </div>
        </div>

        <SubmitButton
          isLoading={isLoading}
          isValid={formState.isValid}
          isSubmitting={formState.isSubmitting}
        />
      </form>
    </div>
  )
}

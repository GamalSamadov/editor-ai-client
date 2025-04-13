"use client"

import React, {
  useState,
  useCallback,
  ChangeEvent,
  DragEvent,
  useEffect,
} from "react"
import { useStartEdit } from "./hooks/useStartEdit"
import { Loader2 } from "lucide-react"

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
    getValues,
  } = useStartEdit()

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false)

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

  const handleDragEnter = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      if (
        Array.from(event.dataTransfer.items).some(
          (item) => item.kind === "file"
        )
      ) {
        setIsDraggingOver(true)
      }
    }
  }, [])

  const handleDragLeave = useCallback((event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    event.stopPropagation()
    const relatedTarget = event.relatedTarget as Node
    if (!event.currentTarget.contains(relatedTarget)) {
      setIsDraggingOver(false)
    }
  }, [])

  const handleDragOver = useCallback(
    (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()
      event.dataTransfer.dropEffect = "copy"
      if (
        !isDraggingOver &&
        Array.from(event.dataTransfer.items).some(
          (item) => item.kind === "file"
        )
      ) {
        setIsDraggingOver(true)
      }
    },
    [isDraggingOver]
  )

  const handleDrop = useCallback(
    async (event: DragEvent<HTMLLabelElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDraggingOver(false)

      if (isLoading) return

      const files = event.dataTransfer.files

      if (files && files.length > 0) {
        const file = files[0]

        setValue("file", files, { shouldDirty: true })

        setSelectedFileName(file.name)

        const syntheticEvent = {
          target: { files },
        } as unknown as ChangeEvent<HTMLInputElement>

        try {
          await processFile(syntheticEvent)
        } catch {
        } finally {
          await trigger()
        }
      } else {
        setValue("file", null, { shouldValidate: true })
      }
    },
    [setValue, processFile, isLoading, trigger, setSelectedFileName]
  )

  const combinedOnChangeHandler = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (isLoading) return

      await rhfOnChange(event)

      const file = event.target.files && event.target.files[0]
      setSelectedFileName(file ? file.name : null)

      try {
        await processFile(event)
      } catch {
      } finally {
        await trigger("file")
      }
    },
    [rhfOnChange, processFile, isLoading, trigger, setSelectedFileName]
  )

  const handleClearFile = useCallback(() => {
    console.log("Clear: Clearing file")
    setSelectedFileName(null)
    setValue("file", null, { shouldValidate: true, shouldDirty: true })
    const fileInput = document.getElementById("file-upload-input")
    if (fileInput instanceof HTMLInputElement) {
      fileInput.value = ""
    }
    console.log(
      "Clear: After clearing",
      getValues("file"),
      formState.errors,
      formState.isValid
    )
  }, [setValue, getValues, formState])

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-xl">
        <div className="relative w-full p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 rounded-lg shadow-lg transition duration-300 ease-in-out">
          <div className="p-3.5">
            <div className="mb-3 flex justify-center p-3.5 text-xl font-semibold leading-tight">
              {isLoading ? "Processing File..." : "Upload or Drop a File"}
            </div>

            <p className="mb-4 px-3.5 text-center text-sm leading-tight text-gray-600 dark:text-gray-400">
              Select a{" "}
              <code className="font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                .txt
              </code>{" "}
              or{" "}
              <code className="font-mono text-xs bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded">
                .docx
              </code>{" "}
              file, or drag and drop it onto the area below.
            </p>

            <div className="mb-4 flex items-center px-3.5">
              <label
                htmlFor="file-upload-input"
                className={dropZoneClasses}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <span className="pointer-events-none flex flex-col items-center">
                  {isLoading ? (
                    <>
                      <Loader2 className="mb-2 h-5 w-5 animate-spin" />
                      Loading...
                    </>
                  ) : isDraggingOver ? (
                    <span>Drop file here</span>
                  ) : (
                    <span>Choose File or Drag Here</span>
                  )}
                </span>
                <input
                  hidden
                  type="file"
                  id="file-upload-input"
                  accept=".txt,.docx,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  {...restRegister}
                  name={name}
                  ref={ref}
                  onChange={combinedOnChangeHandler}
                  disabled={isLoading}
                />
              </label>
            </div>

            {displayError && !isLoading && (
              <p className="mb-4 px-3.5 -mt-2 text-center text-sm text-red-600 dark:text-red-400">
                {displayError}
              </p>
            )}

            {selectedFileName && !processingError && !isLoading && (
              <div className="relative mt-1 mx-3.5 flex items-center rounded-lg bg-green-100/50 dark:bg-green-900/30 p-3 border border-green-300 dark:border-green-700">
                <div className="flex-1 font-light overflow-hidden whitespace-nowrap text-ellipsis pr-2 text-sm text-gray-800 dark:text-gray-200">
                  <p title={selectedFileName}>{selectedFileName}</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearFile}
                  disabled={isLoading}
                  className="ml-2 flex h-[24px] w-[24px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-500/20 dark:bg-gray-700/40 font-bold text-xs text-gray-800 dark:text-gray-200 transition hover:bg-red-500/80 dark:hover:bg-red-600/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Remove selected file"
                >
                  {" "}
                  X{" "}
                </button>
              </div>
            )}
            {processingError && !isLoading && (
              <div className="relative mt-1 mx-3.5 flex items-center rounded-lg bg-red-100/50 dark:bg-red-900/30 p-3 border border-red-300 dark:border-red-700">
                <p className="flex-1 text-sm text-red-700 dark:text-red-300">
                  {processingError}
                </p>
                {selectedFileName && (
                  <button
                    type="button"
                    onClick={handleClearFile}
                    disabled={isLoading}
                    className="ml-2 flex h-[24px] w-[24px] flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-500/20 dark:bg-gray-700/40 font-bold text-xs text-gray-800 dark:text-gray-200 transition hover:bg-red-500/80 dark:hover:bg-red-600/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Remove selected file"
                  >
                    {" "}
                    X{" "}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6">
        <button
          type="submit"
          disabled={isLoading || !formState.isValid || formState.isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {(isLoading || formState.isSubmitting) && (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          )}
          {isLoading
            ? "Processing..."
            : formState.isSubmitting
              ? "Submitting..."
              : "Submit"}
        </button>
      </div>
    </form>
  )
}

import mammoth from "mammoth"

export const readFileContent = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      return reject("No file provided.")
    }

    const reader = new FileReader()

    reader.onerror = () => {
      reject(`Error reading file: ${file.name}`)
    }

    reader.onload = async (loadEvent) => {
      try {
        if (file.name.endsWith(".txt") || file.type === "text/plain") {
          if (typeof loadEvent.target?.result === "string") {
            resolve(loadEvent.target.result)
          } else {
            reject(`Could not read .txt file as text: ${file.name}`)
          }
        } else if (
          file.name.endsWith(".docx") ||
          file.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          if (loadEvent.target?.result instanceof ArrayBuffer) {
            const result = await mammoth.extractRawText({
              arrayBuffer: loadEvent.target.result,
            })
            resolve(result.value || "")
          } else {
            reject(
              `Unexpected result type when reading .docx file: ${file.name}`
            )
          }
        } else {
          reject(
            `Unsupported file type: ${file.name}. Only .txt or .docx are supported.`
          )
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown processing error"
        reject(`Error processing file ${file.name}: ${message}`)
      }
    }

    if (file.name.endsWith(".txt") || file.type === "text/plain") {
      reader.readAsText(file)
    } else if (
      file.name.endsWith(".docx") ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      reader.readAsArrayBuffer(file)
    } else {
      reject(
        `Unsupported file type: ${file.name}. Only .txt or .docx are supported.`
      )
    }
  })
}

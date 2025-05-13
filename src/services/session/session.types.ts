export enum EJobStatus {
  PENDING = "PENDING",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  ERROR = "ERROR",
}

export enum ESessionType {
  TRANSCRIBE = "TRANSCRIBE",
  EDIT = "EDIT",
}

interface IJob {
  id: string
  status: EJobStatus
  finalText: string | null
  sessionId: string | null
  createdAt: Date
  updatedAt: Date
}
export interface ISession {
  id: string
  completed: boolean
  url?: string | null
  text?: string | null
  prompt?: string | null
  title?: string | null
  userId: string | null
  jobId: string | null
  jobs: IJob[] | null
  type: ESessionType
  createdAt: Date
  updatedAt: Date
}

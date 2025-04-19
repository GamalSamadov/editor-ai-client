import { EJobStatus, ISession } from "@/services/session/session.types"

export function isRunning(session: ISession) {
  if (!session.jobs || session.jobs.length === 0) {
    return false
  }

  return session.jobs.some((job) => job.status === EJobStatus.RUNNING)
}

export function isCompleted(session: ISession) {
  if (!session.jobs || session.jobs.length === 0) {
    return false
  }

  return session.completed
}

export function isError(session: ISession) {
  if (!session.jobs || session.jobs.length === 0) {
    return false
  }

  return session.jobs.some((job) => job.status === EJobStatus.ERROR)
}

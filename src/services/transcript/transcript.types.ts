export enum ETranscriptionJobStatus {
	PENDING = 'PENDING',
	RUNNING = 'RUNNING',
	COMPLETED = 'COMPLETED',
	ERROR = 'ERROR',
}

interface ISession {
	id: string
	createdAt: Date
	updatedAt: Date
	completed: boolean
	userId: string | null
}

export interface ITranscript {
	id: string
	url: string
	status: ETranscriptionJobStatus
	downloadedTitle: string | null
	finalTranscript: string | null
	session: ISession
	createdAt: Date
	updatedAt: Date
}

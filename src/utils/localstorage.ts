export interface Question {
	text: string
	options: string[]
	correctAnswerIndex: number
}

export interface Quiz {
	title: string
	questions: Question[]
}

const QUIZZES_KEY = 'quizzes'

export const getQuizzes = (): Quiz[] => {
	const quizzes = localStorage.getItem(QUIZZES_KEY)
	console.log(quizzes)

	return quizzes ? JSON.parse(quizzes) : []
}

export const saveQuiz = (quiz: Quiz): void => {
	const quizzes = getQuizzes()
	quizzes.push(quiz)
	localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes))
}

export const updateQuiz = (index: number, updateQuiz: Quiz): void => {
	const quizzes = getQuizzes()
	quizzes[index] = updateQuiz
	localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes))
}

export const deleteQuiz = (index: number): void => {
	const quizzes = getQuizzes()
	quizzes.splice(index, 1)
	localStorage.setItem(QUIZZES_KEY, JSON.stringify(quizzes))
}

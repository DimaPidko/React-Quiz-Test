import React, { useState } from 'react'
import { Quiz } from '../../utils/localstorage'

const QuizTaker: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState<number[]>([])
	const [score, setScore] = useState<number | null>(null)

	const answerQuestion = (answerIndex: number) => {
		const newAnswers = [...answers, answerIndex]
		setAnswers(newAnswers)

		if (currentQuestionIndex === quiz.questions.length - 1) {
			const correctAnswers = quiz.questions.reduce((acc, question, index) => {
				return acc + (question.correctAnswerIndex === newAnswers[index] ? 1 : 0)
			}, 0)
			setScore(correctAnswers)
		} else {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		}
	}

	if (score !== null) {
		return (
			<div>
				Ваш результат: {score} из {quiz.questions.length}
			</div>
		)
	}

	const currentQuestion = quiz.questions[currentQuestionIndex]

	return (
		<div>
			<h2>{quiz.title}</h2>
			<p>{currentQuestion.text}</p>
			{currentQuestion.options.map((option, index) => (
				<button key={index} onClick={() => answerQuestion(index)}>
					{option}
				</button>
			))}
		</div>
	)
}

export default QuizTaker
export {}

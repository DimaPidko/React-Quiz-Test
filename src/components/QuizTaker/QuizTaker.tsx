import React, { useEffect, useState } from 'react'
import { Quiz } from '../../utils/localstorage'

const QuizTaker: React.FC<{ quiz: Quiz }> = ({ quiz }) => {
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [answers, setAnswers] = useState<number[]>([])
	const [score, setScore] = useState<number | null>(null)
	const [timeTaken, setTimeTaken] = useState<number>(0)
	const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

	useEffect(() => {
		const newTimer = setInterval(() => {
			setTimeTaken(prevTime => prevTime + 1)
		}, 1000)

		setTimer(newTimer)

		return () => clearInterval(newTimer)
	}, [])

	const answerQuestion = (answerIndex: number) => {
		const newAnswers = [...answers, answerIndex]
		setAnswers(newAnswers)

		if (currentQuestionIndex === quiz.questions.length - 1) {
			const correctAnswers = quiz.questions.reduce((acc, question, index) => {
				return acc + (question.correctAnswerIndex === newAnswers[index] ? 1 : 0)
			}, 0)
			setScore(correctAnswers)
			if (timer) {
				clearInterval(timer)
			}
		} else {
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		}
	}

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60)
		const secs = seconds % 60
		return `Минут ${minutes}: Секунд: ${secs < 10 ? '0' : ''}${secs}`
	}

	if (score !== null) {
		return (
			<div>
				Ваш результат: {score} из {quiz.questions.length}
				<div>Время прохождения: {formatTime(timeTaken)}</div>
			</div>
		)
	}

	const currentQuestion = quiz.questions[currentQuestionIndex]

	return (
		<div>
			<h2>{quiz.title}</h2>
			<p>Время: {formatTime(timeTaken)}</p>
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

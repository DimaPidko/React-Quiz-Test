import React from 'react'

interface ResultViewerProps {
	quizTitle: string
	questions: { text: string; correctAnswer: string; userAnswer: string }[]
	score: number
}

const ResultViewer: React.FC<ResultViewerProps> = ({
	quizTitle,
	questions,
	score,
}) => {
	return (
		<div>
			<h2>Результаты викторины: {quizTitle}</h2>
			<p>
				Ваш результат: {score} из {questions.length}
			</p>
			<ul>
				{questions.map((question, index) => (
					<li key={index}>
						<p>Вопрос: {question.text}</p>
						<p>Ваш ответ: {question.userAnswer}</p>
						<p>Правильный ответ: {question.correctAnswer}</p>
					</li>
				))}
			</ul>
		</div>
	)
}

export default ResultViewer
export {}

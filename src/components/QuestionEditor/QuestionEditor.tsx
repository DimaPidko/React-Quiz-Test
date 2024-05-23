// src/components/QuestionEditor/QuestionEditor.tsx

import React from 'react'
import { Question } from '../../utils/localstorage'

interface QuestionEditorProps {
	question: Question
	index: number
	updateQuestion: (index: number, question: Question) => void
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({
	question,
	index,
	updateQuestion,
}) => {
	const updateText = (text: string) => {
		const updatedQuestion = { ...question, text }
		updateQuestion(index, updatedQuestion)
	}

	const updateOption = (optionIndex: number, option: string) => {
		const options = [...question.options]
		options[optionIndex] = option
		updateQuestion(index, { ...question, options })
	}

	const addOption = () => {
		const options = [...question.options, '']
		updateQuestion(index, { ...question, options })
	}

	const updateCorrectAnswerIndex = (correctAnswerIndex: number) => {
		updateQuestion(index, { ...question, correctAnswerIndex })
	}

	return (
		<div>
			<input
				type='text'
				value={question.text}
				onChange={e => updateText(e.target.value)}
				placeholder='Текст вопроса'
			/>
			{question.options.map((option, optionIndex) => (
				<div key={optionIndex}>
					<input
						type='text'
						value={option}
						onChange={e => updateOption(optionIndex, e.target.value)}
						placeholder='Вариант ответа'
					/>
					<input
						type='radio'
						name={`correctAnswer-${index}`}
						checked={question.correctAnswerIndex === optionIndex}
						onChange={() => updateCorrectAnswerIndex(optionIndex)}
					/>{' '}
					Правильный ответ
				</div>
			))}
			<button onClick={addOption}>Добавить вариант ответа</button>
		</div>
	)
}

export default QuestionEditor
export {}

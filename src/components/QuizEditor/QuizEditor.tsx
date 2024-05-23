import React, { useState } from 'react'
import { Quiz, Question } from '../../utils/localstorage'
import QuestionEditor from '../QuestionEditor/QuestionEditor'

interface QuizEditorProps {
	quiz?: Quiz
	onSave: (quiz: Quiz) => void
}

const QuizEditor: React.FC<QuizEditorProps> = ({ quiz, onSave }) => {
	const [title, setTitle] = useState(quiz ? quiz.title : '')
	const [questions, setQuestions] = useState<Question[]>(
		quiz ? quiz.questions : []
	)

	const addQuestion = () => {
		setQuestions([
			...questions,
			{ text: '', options: [], correctAnswerIndex: 0 },
		])
	}

	const updateQuestion = (index: number, updatedQuestion: Question) => {
		const newQuestions = [...questions]
		newQuestions[index] = updatedQuestion
		setQuestions(newQuestions)
	}

	const handleSaveQuiz = () => {
		const updatedQuiz: Quiz = { title, questions }
		onSave(updatedQuiz)
	}

	return (
		<div>
			<input
				type='text'
				value={title}
				onChange={e => setTitle(e.target.value)}
				placeholder='Название викторины'
			/>
			<button onClick={addQuestion}>Добавить вопрос</button>
			<button onClick={handleSaveQuiz}>Сохранить викторину</button>
			{questions.map((question, index) => (
				<QuestionEditor
					key={index}
					question={question}
					index={index}
					updateQuestion={updateQuestion}
				/>
			))}
		</div>
	)
}

export default QuizEditor
export {}

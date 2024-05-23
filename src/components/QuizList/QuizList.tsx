import React, { useEffect, useState } from 'react'
import {
	getQuizzes,
	deleteQuiz,
	saveQuiz,
	Quiz,
} from '../../utils/localstorage'
import QuizEditor from '../QuizEditor/QuizEditor'
import QuizTaker from '../QuizTaker/QuizTaker'

const QuizList: React.FC = () => {
	const [quizzes, setQuizzes] = useState<Quiz[]>([])
	const [editingQuizIndex, setEditingQuizIndex] = useState<number | null>(null)
	const [isCreating, setIsCreating] = useState<boolean>(false)
	const [takingQuizIndex, setTakingQuizIndex] = useState<number | null>(null)

	useEffect(() => {
		setQuizzes(getQuizzes())
	}, [])

	const handleDelete = (index: number) => {
		deleteQuiz(index)
		setQuizzes(getQuizzes())
	}

	const handleEdit = (index: number) => {
		setEditingQuizIndex(index)
	}

	const handleSaveQuiz = (updatedQuiz: Quiz) => {
		if (editingQuizIndex !== null) {
			const newQuizzes = [...quizzes]
			newQuizzes[editingQuizIndex] = updatedQuiz
			setQuizzes(newQuizzes)
			setEditingQuizIndex(null)
		} else {
			saveQuiz(updatedQuiz)
			setQuizzes(getQuizzes())
			setIsCreating(false)
		}
	}

	const handleCreateQuiz = () => {
		setIsCreating(true)
		setEditingQuizIndex(null)
	}

	const handleTakeQuiz = (index: number) => {
		setTakingQuizIndex(index)
	}

	if (editingQuizIndex !== null || isCreating) {
		return (
			<QuizEditor
				quiz={editingQuizIndex !== null ? quizzes[editingQuizIndex] : undefined}
				onSave={handleSaveQuiz}
			/>
		)
	}

	if (takingQuizIndex !== null) {
		return <QuizTaker quiz={quizzes[takingQuizIndex]} />
	}

	return (
		<div>
			<h1>Список викторин</h1>
			<button onClick={handleCreateQuiz}>Добавить викторину</button>
			<ul>
				{quizzes.map((quiz, index) => (
					<li key={index}>
						<span
							onClick={() => handleTakeQuiz(index)}
							style={{ cursor: 'pointer' }}
						>
							{quiz.title}
						</span>

						<button onClick={() => handleDelete(index)}>Удалить</button>
						<button onClick={() => handleEdit(index)}>Редактировать</button>
					</li>
				))}
			</ul>
		</div>
	)
}

export default QuizList
export {}

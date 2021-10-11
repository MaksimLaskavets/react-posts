import React from 'react'
import { useState } from 'react'
import MyButton from './UI/Button/MyButton'
import MyInput from './UI/Input/MyInput'





function PostForm({ create }) {
	const [post, setPost] = useState({ title: '', body: '' })

	const addNewPost = (e) => {
		// предотвращает обновление страницы при нажатии на кнопку Создать пост
		e.preventDefault()
		const newPost = {
			...post, id: Date.now()
		}
		create(newPost)
		// очищает инпуты после создания нового поста
		setPost({ title: '', body: '' })
	}
	return (

		<form>
			{/* управляемый компонент */}
			<MyInput
				value={post.title}
				type='text'
				placeholder='Название поста'
				onChange={e => setPost({ ...post, title: e.target.value })}
			/>

			<MyInput
				value={post.body}
				type='text'
				placeholder='Описание поста'
				onChange={e => setPost({ ...post, body: e.target.value })} />


			<MyButton onClick={addNewPost}>Создать пост</MyButton>
		</form>

	)
}

export default PostForm
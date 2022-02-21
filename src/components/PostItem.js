import React from 'react'
import MyButton from './UI/Button/MyButton'
import {useHistory} from 'react-router-dom'



function PostItem(props) {
const router = useHistory()

	return (
		<div className='post'>
			<div className='post__content'>
				<strong>{props.post.id}.{props.post.title}</strong>
				<div>{props.post.body}</div>
			</div>
			<div className='post__btns'>
			<MyButton style={{backgroundColor:"rgba(179, 125, 55, 0.932)"}}
			 onClick={() => router.push(`/posts/${props.post.id}`)}
			 >
					Открыть
				</MyButton>
				<MyButton onClick={() => props.remove(props.post)}>
					Удалить
				</MyButton>
			</div>
		</div >

	)
}

export default PostItem
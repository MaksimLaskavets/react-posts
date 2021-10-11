import { useState, useRef, useMemo, useEffect } from "react";
import React from 'react'
import PostItem from '../components/PostItem'
import ClassCounter from '../components/ClassCounter'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import MyButton from "../components/UI/Button/MyButton";
import MyInput from "../components/UI/Input/MyInput";
import MySelect from "../components/UI/Select/MySelect";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import PostService from "../API/PostService";
import Pagination from "../components/UI/Pagination/Pagination";
import { usePosts } from "../hooks/usePosts";
import Loader from "../components/UI/Loader/Loader.jsx"
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { getPagesArray } from "../utils/pages";
import axios from 'axios'
import { useObserver } from "../hooks/useObserver";




function Posts() {


	const [posts, setPosts] = useState([]);
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	let pagesArray = getPagesArray(totalPages)
	const lastElement = useRef()

	
	const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
		const response = await PostService.getAll(limit, page)
		setPosts([...posts,...response.data])
		const totalCount = (response.headers['x-total-count']);
		setTotalPages(getPageCount(totalCount, limit))
	})


useObserver(lastElement,page<totalPages,isPostsLoading, ()=>{
	setPage(page+1)
})
	useEffect(() => {
		fetchPosts(limit, page)
	}, [page,limit])

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

	const createPost = (newPost) => {
		setPosts([...posts, newPost])
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id))
	}


	const changePage = (page) => {
		setPage(page)
	}

	return (
		<div className="App">

			<MyButton
				style={{ marginTop: 30 }}
				onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal
				visible={modal}
				setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px 0px' }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter} />
				<MySelect
				value={limit}
				onChange={(value)=>setLimit(value)}
				defaultValue='Количество элементов на странице'
				options={[
					{value:5, name:'5'},
					{value:10, name:'10'},
					{value:25, name:'15'},
					{value:-1, name:'Показать все'},
					
				]}
				
				/>
			{postError &&
				<h1>Произошла ошибка {postError}</h1>}
				 <PostList remove={removePost} posts={sortedAndSearchedPosts} title={'Посты про JS'} />
				 <div ref ={lastElement}style={{height:20,backgroundColor:'red'}}></div>
			{isPostsLoading &&
			 <div style={{ display: "flex", justifyContent: "center", marginTop: '50px' }}><Loader /></div>
			}
			<Pagination
				page={page}
				totalPages={totalPages}
				changePage={changePage}
			/> 

		</div >
	);
}

export default Posts;
import About from "../pages/About";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";
import Login from "../pages/login";


export const privateRoutes=[
	{path:'/about', component: About, exact:true},
	{path:'/posts', component: Posts, exact:true},
	{path:'/posts/:id', component: PostIdPage, exact:true}, 
]

export const publicRoutes=[
	{path:'/login', component: Login, exact:true},
	
]








// <Route path='/about'>
// 			<About/>
// 		</Route>
// 		<Route exact path='/posts'>
// 			<Posts/>
// 		</Route>
// 		{/* Здесь ":" и далее название параметра (id),исполльзуется чтобы маршрут динамически изменялся, 
// 		те при нажатии на какойлибо компонент с его id маршрут будет меняться, а так как несколько маршрутов
// 		 включают в себя posts, чтобы роутер воспринимал их как разные указываем exact */}
// 		<Route exact path='/posts/:id'>
// 			<PostIdPage/>
// 		</Route>
// 		<Route path='/error'>
// 			<Error/>
// 		</Route>
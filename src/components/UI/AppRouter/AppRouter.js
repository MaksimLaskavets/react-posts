import React, { useContext } from 'react'
import { Route,Switch,Redirect} from 'react-router-dom'
import About from '../../../pages/About'
import Error from '../../../pages/Error';
import Posts from '../../../pages/Posts'
import PostIdPage from '../../../pages/PostIdPage';
import { privateRoutes, publicRoutes } from '../../../router';
import { AuthContext } from '../../../context';
import Loader from '../Loader/Loader';



function AppRouter() {



const{isAuth,isLoading} = useContext(AuthContext)

if(isLoading){
	return <Loader/>
}

	return (
		isAuth ?
		<Switch>
		{privateRoutes.map(route=>
			<Route
			path={route.path}
			component={route.component}
			exact={route.exact}
			key={route.path}
			/>
		)}
<Redirect to='/posts'/>
		</Switch>
		:
		  <Switch>
		{publicRoutes.map(route=>
			<Route
			path={route.path}
			component={route.component}
			exact={route.exact}
			key={route.path}

			/>
		)}
<Redirect to='/login'/>
		</Switch>
	)
}
export default AppRouter
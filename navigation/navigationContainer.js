import React ,{useEffect , useRef} from 'react';
import ProductNavigator from './productNavigation';
import {useSelector} from 'react-redux';
import {NavigationActions} from 'react-navigation'

const NavigationContainer = (props) => {
    const navRef = useRef();
    const isAuth = useSelector(state => !!state.auth.token)

    useEffect(() => {
        
       if (isAuth){
           //here we want to say if isAuh is true then only render productNavigation and we cant do props because the
           //that only work when it under the drawer or navigation so we are using here use reerence
           //dispatch here is a navigation function not dispatch of hooks or react
           navRef.current.dispatch(NavigationActions.navigate({routeName: 'Authentication'}))
       }
    }, [isAuth])
    return <ProductNavigator ref = {navRef}/>

}

export default NavigationContainer
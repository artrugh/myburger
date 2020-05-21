import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems'
import NavigationItem from './NavigationItem/NavigationItem'

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() =>
        wrapper = shallow(<NavigationItems />));

    it('should render 2 <NavigationItem /> elements if not auth', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })

    it('should render 3 <NavigationItem /> elements if auth', () => {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })

    it('should render logout <NavigationItem /> elements if auth', () => {
        wrapper.setProps({ isAuth: true })
        expect(wrapper.contains(<NavigationItem link='/logout'>Logout</NavigationItem>)).toEqual(true)
    })

    it('should render auth <NavigationItem /> elements if not auth', () => {
        wrapper.setProps({ isAuth: false })
        expect(wrapper.contains(<NavigationItem link='/auth'>Authenticate</NavigationItem>)).toEqual(true)
    })

})
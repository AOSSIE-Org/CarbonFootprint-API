import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import ProfilePicture from '../components/Profile/ProfilePicture'
import Sidebar from '../components/Profile/Sidebar'
import InputData from '../components/Profile/InputData'
import DailyDetails from '../components/Profile/DailyDetails';

afterEach(cleanup)

it('renders ProfilePicture component without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<ProfilePicture />, div)
})

it('compare snapshot of ProfilePicture component', () => {
	const { asFragment } = render(<ProfilePicture />)
	expect(asFragment(<ProfilePicture />)).toMatchSnapshot()
})

it('renders Sidebar component without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<Router><Sidebar /></Router>, div)
})

it('compare snapshot of Sidebar component', () => {
	const { asFragment } = render(<Router><Sidebar />)</Router>)
	expect(asFragment(<Router><Sidebar /></Router>)).toMatchSnapshot()
})

it('renders DailyDetails component without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<DailyDetails />, div)
})

it('renders InputData component without crashing', () => {
	const div = document.createElement('div');
	ReactDOM.render(<InputData />, div)
})


// it('checking functionality of DailyDetails Component', () => {
// 	const { getByTestId } = render(<DailyDetails />)
// 	fireEvent.click(getByTestId('plus-button'))
// 	expect(<InputData />).toBeInTheDocument
// })





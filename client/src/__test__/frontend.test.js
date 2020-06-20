import React from 'react'
import ReactDOM, { unmountComponentAtNode } from 'react-dom'
import { shallow } from 'enzyme'
import { BrowserRouter as Router } from 'react-router-dom'
import { render, cleanup, fireEvent } from '@testing-library/react'
import ProfilePicture from '../components/Profile/ProfilePicture'
import Sidebar from '../components/Profile/Sidebar'
import InputData from '../components/Profile/InputData'
import DailyDetails from '../components/Profile/DailyDetails';

afterEach(cleanup)
beforeAll(() => {
  global.fetch = jest.fn();
});

// mocking props 
const rawdata = {
  applianceTypes: [],
  poultryTypes: [],
  flightTypes: [],
  vehicleTypes: [],
  trainTypes: []
}

describe('Snapshot tests and rendering component without crashing', () => {
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

  it('renders InputData component without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<InputData rawdata={rawdata} />, div)
  })
})


describe('functionality tests', () => {
  it('checking functionality of DailyDetails Component', (done) => {
    const wrapper = shallow(<DailyDetails />, { disableLifecycleMethods: true });
    expect(wrapper.instance().state.calculation.length).toBe(0);
    wrapper.find('Icon').simulate('click')
    wrapper.find('Icon').simulate('click')
    expect(wrapper.instance().state.calculation.length).toBe(2);

    const spyDidMount = jest.spyOn(DailyDetails.prototype, "componentDidMount");
    fetch.mockImplementation(() => {
      return Promise.resolve({
        status: 200,
        json: () => {
          return Promise.resolve({
            apikey: 'dummy apikey 41c65600-78fe-590f-9fed-144d4c667973'
          });
        }
      });
    });

    const didMount = wrapper.instance().componentDidMount()
    expect(spyDidMount).toHaveBeenCalled();
    didMount.then(() => {
      // updating the wrapper
      wrapper.update();
      expect(wrapper.instance().state.apikey).toBe('dummy apikey 41c65600-78fe-590f-9fed-144d4c667973')
      spyDidMount.mockRestore();
      fetch.mockClear();
      done();
    })
  })

  // it('checking functionality of InputData component', () => {
  //   const wrapper = shallow(<InputData rawdata={rawdata} />);
  //   expect(wrapper.find('Select').exists()).toBeTruthy();
  // })
})






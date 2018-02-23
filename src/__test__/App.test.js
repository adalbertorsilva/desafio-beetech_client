import React from 'react'
import App from '../components/App'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })
jest.mock('../ApiClient')

describe ('App', () => {

  describe('Raw App', () => {
    const wrapper = shallow(<App />)
    it('should display form', () => {
      expect(wrapper.find('form').length).toBe(1)
    })

    it('should display a select inside the form', () => {
      expect(wrapper.find('form select').length).toBe(1)
    })

    it('should display 4 inputs inside the form', () => {
      expect(wrapper.find('form input').length).toBe(4)
    })

    it('should display a button inside the form', () => {
      expect(wrapper.find('form button').exists()).toBeTruthy()
    })

    it('should display a ModalPanel component', () => {
      expect(wrapper.find('ModalPanel').exists()).toBeTruthy()
    })

    it('should display a ModalPanel component with no inputs', () => {
      expect(wrapper.find('ModalPanel input').exists()).toBeFalsy()
    })

    it('should display a ModalPanel component with no inputs', () => {
      expect(wrapper.find('ModalPanel button').exists()).toBeFalsy()
    })
  })

  describe('Updated App',() => {

    it('should disable form button component', async () => {
      const wrapper = mount(<App />)
      await wrapper.find('form').simulate('submit')
      await wrapper.update()
      expect(wrapper.find('#simulationButton').prop('disabled')).toBeTruthy()
    })

    it('should display a ModalPanel button component', async () => {
      const wrapper = mount(<App />)
      await wrapper.find('form').simulate('submit')
      await wrapper.update()
      expect(wrapper.find('ModalPanel button').exists()).toBeTruthy()
    })
  
    it('should display a ModalPanel inputs components', async () => {
      const wrapper = mount(<App />)
      await wrapper.find('form').simulate('submit')
      await wrapper.update()
      expect(wrapper.find('ModalPanel input').length).toBe(3)
    })
  
    it('should hide ModalPanel components after submition on itself', async () => {
      const wrapper = mount(<App />)
      await wrapper.find('form').simulate('submit')
      await wrapper.update()
      expect(wrapper.find('ModalPanel button').exists()).toBeTruthy()
      expect(wrapper.find('ModalPanel input').exists()).toBeTruthy()
      await wrapper.find('ModalPanel form').simulate('submit')
      await wrapper.update()

      expect(wrapper.find('ModalPanel input').exists()).toBeFalsy()
      expect(wrapper.find('ModalPanel button').exists()).toBeFalsy()
    })

    it('should enable form button components after ModalPanel submition', async () => {
      const wrapper = mount(<App />)
      await wrapper.find('form').simulate('submit')
      await wrapper.update()
      expect(wrapper.find('ModalPanel button').exists()).toBeTruthy()
      expect(wrapper.find('ModalPanel input').exists()).toBeTruthy()
      await wrapper.find('ModalPanel form').simulate('submit')
      await wrapper.update()

      expect(wrapper.find('#simulationButton').prop('disabled')).toBeFalsy()
    })

    it('should  display a value on callValue input after submition', async () => {
      const wrapper = mount(<App />)
      wrapper.setState({originValue: 11, destinyValue: 16, durationValue: 40})
      await wrapper.find('form').simulate('submit')
      await wrapper.update()
      expect(wrapper.find('#callValue').prop('value')).toBe(99)
    })
  })
})





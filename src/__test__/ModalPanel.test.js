import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import ModalPanel from '../components/ModalPanel'
import Adapter from 'enzyme-adapter-react-16'
import { wrap } from 'module';

Enzyme.configure({ adapter: new Adapter() })

describe('Modal Panel', () => {
  describe('Raw ModalPanel', () => {

    const wrapper = shallow(<ModalPanel />)
    it('should display 0 inputs', () => {
      expect(wrapper.find('input').length).toBe(0)
    })
  
    it('should display no button', () => {
      expect(wrapper.find('button').length).toBe(0)
    })
  })
  
  describe('Updated ModalPanel', () => { 
    const wrapper = shallow(<ModalPanel />)
    wrapper.setProps({show: true})
    wrapper.update()
  
    it('should display 3 inputs', () => {
      expect(wrapper.find('input').length).toBe(3)
    })
    
    it('should display 1 button', () => {
      expect(wrapper.find('button').length).toBe(1)
    })
  })
})
import React, { Component } from 'react'
import ApiClient from '../ApiClient'
import '../style/App.css'

class ModalPanel extends Component {

    constructor (props) {
      super(props)

        this.apiClient = new ApiClient()
        this.state = {
          areaCodeValue: '',
          nameValue: '',
          emailValue: ''
        }

      this.handleChange = this.handleChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (event) {
      const target = event.target
      this.setState({[target.name]: event.target.value})
    }

    createRequestBodyObject () {
      return {
        areaCode: this.state.areaCodeValue,
        name: this.state.nameValue,
        email: this.state.emailValue
      }
    }

    async handleSubmit (event) {
      event.preventDefault()
      this.apiClient.postClient(this.createRequestBodyObject())
      this.props.renderingHandler(false)
    }

    render () {
      if (!this.props.show) {
        return null
      }

      return (
        <div>
          <form onSubmit={this.handleSubmit}>

              <h4> DDD não contrado, por favor preencha o formulário para futuras notificações </h4>
              <input type='number' id='inputAreaCode' name='areaCodeValue' required='true' onChange={this.handleChange} value={this.state.areaCodeValue} placeholder='DDD'/>

              <input type='text' id='inputName' name='nameValue' required='true' onChange={this.handleChange} value={this.state.nameValue} placeholder='Nome completo'/>

              <input type='text' id='inputEmail' name='emailValue' required='true' onChange={this.handleChange} value={this.state.emailValue} placeholder='Email'/>

              <button className='enabled-button' >Enviar</button>
          </form>
        </div>
      )
    }
}

export default ModalPanel

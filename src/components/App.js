import React, { Component } from 'react'
import ModalPanel from './ModalPanel'
import ApiClient from '../ApiClient'
import '../style/App.css'

class App extends Component {

  constructor (props) {
    super(props)
    this.apiClient = new ApiClient()
    this.state = {
      plans: [],
      planValue: '',
      originValue: '',
      destinyValue: '',
      durationValue: '',
      callValue: '',
      renderModalPanel: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleModalPanelRendering = this.handleModalPanelRendering.bind(this)
  }

  handleChange (event) {
    event.preventDefault()
    const target = event.target
    this.setState({[target.name]: event.target.value})
  }

  createRequestBodyObject () {
    return {
      plan: this.state.planValue,
      origin: this.state.originValue,
      destiny: this.state.destinyValue,
      duration: this.state.durationValue
    }
  }

  async handleSubmit (event) {
    event.preventDefault()
    const data = await this.apiClient.postSimulation(this.createRequestBodyObject())
    this.setState({callValue: data.callValue})
    this.handleModalPanelRendering(data.showClientModal)
  }

  handleModalPanelRendering (renderModalPanel) {
    this.setState({renderModalPanel})
  }

  async componentDidMount () {
    this.setState({plans: await this.apiClient.getPlans()})
  }

  getPlansOptions () {
    return this.state.plans.map(plan =>
      <option key={plan._id} value={plan._id}> {`Fale mais ${plan.minutes} minutos`} </option>
    )
  }

  render() {
    return (
      <div className='app'>
        <form onSubmit={this.handleSubmit} className='form'>
          <select value={this.state.planValue} name='planValue' onChange={this.handleChange} id='planSelect' disabled={this.state.renderModalPanel}>
            <option value = {null} >
              Selecione um plano...
            </option>
            {this.getPlansOptions()}
          </select>

          <input type='number' id='inputOrigin' name='originValue' required='true' readOnly={this.state.renderModalPanel} onChange={this.handleChange} value={this.state.originValue} placeholder='DDD de origem'/>

          <input type='number' id='inputDestiny' name='destinyValue' required='true' readOnly={this.state.renderModalPanel} onChange={this.handleChange} value={this.state.destinyValue} placeholder='DDD de destino'/>

          <input type='number' id='inputDuration' name='durationValue' required='true' readOnly={this.state.renderModalPanel} onChange={this.handleChange} value={this.state.durationValue} placeholder='Duração da chamada'/>

          <button id='simulationButton' className={this.state.renderModalPanel ? 'disabled-button':'enabled-button'} disabled={this.state.renderModalPanel} >Simular Chamada</button>

          <input type='number' id='callValue' readOnly='true' value={this.state.callValue} placeholder='Valor da chamada'/>

        </form>

        <br/>

        <ModalPanel id='clientModal' renderingHandler={this.handleModalPanelRendering} show={this.state.renderModalPanel}/>

      </div>
    )
  }
}

export default App

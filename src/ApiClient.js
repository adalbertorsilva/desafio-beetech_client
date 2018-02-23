class ApiClient {

  constructor () {
    this.headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }

  async getPlans () {
    const response = await fetch(`https://evening-crag-52215.herokuapp.com/plans`)
    return await response.json()
  }

  async postSimulation (simulationPayload) {
    const payload = {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(simulationPayload)
    }
    const response = await  fetch(`https://evening-crag-52215.herokuapp.com/simulations`, payload)
    return await response.json()
  }

  async postClient (clientPayload) {
    const payload = {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(clientPayload)
    }
    await  fetch(`https://evening-crag-52215.herokuapp.com/clients`, payload)
  }
}

export default ApiClient
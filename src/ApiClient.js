class ApiClient {

  constructor () {
    this.headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
  }

  async getPlans () {
    const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/plans`)
    return await response.json()
  }

  async postSimulation (simulationPayload) {
    const payload = {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(simulationPayload)
    }
    const response = await  fetch(`${process.env.REACT_APP_API_BASE_URL}/simulations`, payload)
    return await response.json()
  }

  async postClient (clientPayload) {
    const payload = {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(clientPayload)
    }
    await  fetch(`${process.env.REACT_APP_API_BASE_URL}/clients`, payload)
  }
}

export default ApiClient
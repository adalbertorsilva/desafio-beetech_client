class ApiClient {

  constructor () {
    this.headers = {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    }
    this.url = 'https://desafio-beetech.herokuapp.com'
  }

  async getPlans () {
    const response = await fetch(`${this.url}/plans`)
    return await response.json()
  }

  async postSimulation (simulationPayload) {
    const payload = {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(simulationPayload)
    }
    const response = await  fetch(`${this.url}/simulations`, payload)
    return await response.json()
  }

  async postClient (clientPayload) {
    const payload = {
      method: 'post',
      headers: this.headers,
      body: JSON.stringify(clientPayload)
    }
    await  fetch(`${this.url}/clients`, payload)
  }
}

export default ApiClient
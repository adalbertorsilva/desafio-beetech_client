class ApiClient {
  constructor () {}

  getPlans () {
    return [{
        _id: '5a8ebf138da6e50a804a4321',
        minutes: 30
      }]
  }

  postSimulation (payload) {
    return !payload.origin ? {callValue: 0, showClientModal: true} : {callValue: 99, showClientModal: false}
  }

  postClient (clientPayload) {
    console.log('----------------- Client persisted -----------------')
  }
}

export default ApiClient
import Axios from 'axios'

const paySubscription = () => {
  return Axios.get(`${process.env.REACT_APP_API_URL}/payment`)
}

const PaymentService = {
    paySubscription
}

export default PaymentService
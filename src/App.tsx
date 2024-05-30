import axios from 'axios';
import './App.css';
import { useReducer } from 'react';



const api = axios.create({
  baseURL:'https://api.mercadopago.com'
})


api.interceptors.request.use(
  async (config: any): Promise<any> => {
    const token = process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC
    config.headers.Authorization = `Bearer ${token}` 

    return config
})



const formReduce = (state:any, event:any) => {
  return{
    ...state,
    [event.name]: event.value
  }
}

function App() {

  const [formData, setFormData] = useReducer(formReduce,{})


  const handleChange = (event:any) => {
    setFormData({
      name: event.target.name,
      value: event.target.value
    })
  }


  const handleSubmit = (event: any) => {
    event.preventDefault()

    const body = {
      "transaction_amount": 10,
      "description":"produto",
      "payment_method_id":"pix",
      "payer":{
        "email":"lucaswilianr.s@gmail.com",
        "first_name":"",
        "last_name":"",
        "identification":{
          "type":"cpf",
          "number":"61526577330"
        },
        "notification_url":"https://httpdump.io/v5d2z"
      }
    }

    console.log(formData)

    api.post("v1/payments", body).then(response =>{

    }).catch(err => {
      alert(err)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        API PIX Mercado Pago

        <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input onChange={handleChange} name='email'/>
        </div>
        <div>
          <label>Nome</label>
          <input onChange={handleChange} name='nome'/>
        </div>
        <div>
          <label>Cpf</label>
          <input onChange={handleChange} name='cpf'/>
        </div>
        <div>
          <button type='submit'>Pagar</button>
        </div>
        
      </form>
      </header>
      
    </div>
  );
}

export default App;

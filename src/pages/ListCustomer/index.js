import React ,{ useEffect, useState} from 'react'
import Header from '../../components/template/Header'
import CustomerList from '../../components/cliente/CustomerList'
import { baseUrl} from '../../environments'
import axios from 'axios'

function ListCustomer(props) {
    const URL = `${baseUrl}/customer`
    const [clientes, setClientes] = useState([])

    useEffect(() => {
        getClientes()
    },[])

    const getClientes = () => {
        axios.get(`${URL}`).then((response) => {
            setClientes(response.data)
        })
    }

    const deleteCliente = (id) => {
        axios.delete(`${URL}/${id}`).then((response) => {
            getClientes()
        })
    }

    return(
        <>
            <Header/>
            <CustomerList delete={deleteCliente} list={clientes} />       
        </>
    )
}
export default ListCustomer
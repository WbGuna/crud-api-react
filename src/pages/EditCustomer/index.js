import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Header from '../../components/template/Header'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { baseUrl } from '../../environments'

function EditCustomer(props) {

    const URL = `${baseUrl}/customer`
    const { id } = useParams()
    const [cliente, setCliente] = useState({})  
    const [states, setStates] = useState([])
    const [successRegister, SetSuccessRegister] = useState(false)

    useEffect(() => {
        getClientes()
        getStates()
    }, [])

    console.log(id)
    const setClientes = () => {
        axios.put(`${URL}/${id}`, cliente)
        .then((response) => {
            setCliente(response.data)
            SetSuccessRegister(true)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const getClientes = () => {
        axios.get(`${URL}/${id}`)
        .then((response) => {
            setCliente(response.data)
         
        })
        .catch((e) => {
            console.error(e)
        })
        
    }

    const getStates = () => {
        axios.get(`${baseUrl}/states`)
            .then((response) => {
                setStates(response.data)
            })
    }

    return (
        <>
            <Header />
            <Container>
                <Row>
                    <Col><h1>Cadastro de Usuário</h1></Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Nome:</Form.Label>
                                <Form.Control type="text"
                                    value={cliente.name}
                                    onChange={(event) => { setCliente({ ...cliente, name: event.target.value }) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="age">
                                <Form.Label>Idade:</Form.Label>
                                <Form.Control type="text"
                                    value={cliente.age}
                                    onChange={(event) => { setCliente({ ...cliente, age: event.target.value }) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="document">
                                <Form.Label>CPF:</Form.Label>
                                <Form.Control type="text"
                                    value={cliente.document}
                                    onChange={(event) => { setCliente({ ...cliente, document: event.target.value }) }} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="tel">
                                <Form.Label>Telefone:</Form.Label>
                                <Form.Control type="text"
                                    value={cliente.tel}
                                    onChange={(event) => { setCliente({ ...cliente, tel: event.target.value }) }} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Estado</Form.Label>
                                <Form.Select
                                    onChange={(event) => { setCliente({ ...cliente, state: event.target.value }) }}>
                                    <option>Selecione um estado</option>
                                    {
                                        states.map((item) => {
                                            return (
                                                <option key={item.id} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </Form.Select>
                            </Form.Group>
                            {successRegister ? <h3>Cliente Alterado com sucesso</h3> : ''}
                            <Button variant="success" className="my-5" onClick={ setClientes}>Alterar Cliente</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default EditCustomer
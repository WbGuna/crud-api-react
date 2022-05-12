import React, { useState } from 'react'
import { Container, ListGroup, Row, 
        Col, Button, Modal, 
        Alert} from 'react-bootstrap'
import { Link } from "react-router-dom" 
import { AiFillCheckCircle} from "react-icons/ai"
    
function CustomerList(props) {

    const clientes = props.list || []
    const [cliente, setCliente] = useState({});

    const [showEdit, setShowEdit] = useState(false);
    const [successDelete, setSuccessDelete] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    const taskDone = (task) => {
        return (
            <Button variant={task.done ? 'success' : 'info'}
                onClick={() => { task.done ? props.peddingTask(task) : props.doneTask(task) }}>
                {task.done ? 'Concluído' : 'Concluir'}
            </Button>
        )
    }

    const renderCliente = () => {
        return clientes.map((user) => {
            return (
                <ListGroup.Item key={user.id}>
                    <Row className="itemTask">
                        <Col xs={6} md={8}>
                           Nome: {user.name} <br/>
                           Idade: {user.age} <br/>
                           Telefone: {user.tel}
                        </Col>
                        <Col>
                            <Link to={`/editCustomer/` + user.id}>EditCustomer</Link>
                           
                            <Button className="mx-3" variant="secondary"
                                onClick={() => {
                                    setCliente(user)
                                    handleShowEdit()
                                }}>
                                Deletar
                            </Button>
                        </Col>
                    </Row>
                </ListGroup.Item>
            )
        })
    }

    return (
        <Container>
            {
                successDelete
                    ?
                    <Alert key='success' variant='success'>
                        <AiFillCheckCircle size="30" /> Cliente apagado com suceso
                    </Alert>
                    :
                    ''
            }

            <Row>
                <Col>
                    <ListGroup variant="flush">
                        {renderCliente()}
                    </ListGroup>
                </Col>
            </Row>

            {/* //modal delete in*/}
            <Modal show={showEdit} onHide={handleCloseEdit}>
                <Modal.Header closeButton>
                    <Modal.Title>Excluir Cliente</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Deseja deletar o Cliente: <strong>{cliente.name}</strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEdit}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => {
                        props.delete(cliente.id)
                        handleCloseEdit()
                        setSuccessDelete(true)
                        setTimeout(() => {
                            setSuccessDelete(false)
                        }, 3000)
                        }
                    }>
                        Apagar
                    </Button>
                </Modal.Footer>
            </Modal> {/* //modal delete out*/}
        </Container>
    )
}

export default CustomerList
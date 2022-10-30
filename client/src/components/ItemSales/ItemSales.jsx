import React from 'react'
import s from './itemSales.module.css'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/esm/Button'
import { useDispatch, useSelector } from 'react-redux'
/* import { deliveryStatus } from '../../store/actions/actions' */
import image from '../../utils/images/vector.jpg'
import axios from 'axios'
import { getUserSales } from '../../store/actions/actions'
import ModaleDetail from '../ModaleDetail/ModaleDetail'

export default function ItemSales ({ name, envio, totalAmount, paymentMethod, date, deliveryId, buyId }) {
  /* const {  } = props */
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  return (
    <Row className='w-75 bg-light p-3 mb-0 border-bottom rounded-4 fs-4 mt-5'>
      <Row className='border-bottom mb-4'>
        <Col>
          Fecha: {date?.slice(0, 10)}
        </Col>
        <Col>
          #{buyId}
        </Col>
      </Row>
      <Row>
        <Col className={s.image}>
          <img className='img-fluid' src={image} alt={image} />
        </Col>
        <Col className={s.dataContainer}>
          <Row>
            <Col>Metodo de pago:</Col>
            <Col>
              {paymentMethod}
            </Col>
          </Row>
          <Row>
            <Col>
              Nombre del comprador:
            </Col>
            <Col>
              {name}
            </Col>
          </Row>
          <Row>
            <Col>
              Estado del envio:
            </Col>
            <Col className={envio !== 'RECIBIDO' ? s.status : s.statusSuccess}>
              {envio}
            </Col>
          </Row>
        </Col>
        <Col>
          $ {totalAmount / 100}
        </Col>
        <Col className='d-flex flex-column justify-content-start align-items-end gap-3'>
          <Row>
            <ModaleDetail
              className={s.button}
              buttonText='Ver Venta'
              title='Detalle Venta'
              link='/userSales'
              createAcc
            />
          </Row>
          {envio === 'PENDIENTE'
            ? <div className='row'>
              <Button
                className={s.button}
                onClick={async () => {
                  const data = {
                    status: 'ENVIADO'
                  }
                  /* dispatch(deliveryStatus(deliveryId, 'ENVIADO')) */
                  const delivery = await axios.put(`https://e-winespf.herokuapp.com/delivery/${deliveryId}`, data)
                  if (delivery) {
                    dispatch(getUserSales(user.id))
                  }
                }}
              >
                Despachar envio
              </Button>
              </div>  //eslint-disable-line
            : null}
        </Col>
      </Row>
    </Row>
  )
}

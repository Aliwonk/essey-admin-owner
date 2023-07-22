/* eslint-disable no-nested-ternary */
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { React, useEffect, useState } from 'react';
import { Button, Card, Col, Form, NavLink, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/loader';
import { fetchAccrueCashack, fetchCreatePlan, fetchGetListPlans } from './slice/async';

const BonusPlans = () => {
  const dispatch = useDispatch();
  const { currentUser, user } = useSelector((state) => state.auth);
  const { plans, isLoading, isAccrue } = useSelector((state) => state.plans);
  const [values, setValues] = useState({
    name: '',
    conditions: null,
    writeoff: null,
    cashback: null,
  });
  const [valuesAccrue, setValuesAccrue] = useState({
    client: '',
    amount: null,
    message: '',
  });
  const title = 'Программа лояльности';
  const description = 'Страница программа лояльности';

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(
        fetchGetListPlans({
          shopId: currentUser.list_shop[0].id,
          token: user.token,
        })
      );
    }
  }, [currentUser, dispatch, user]);

  useEffect(() => {
    if (isAccrue) {
      alert('Баллы начислены');
    }
  }, [isAccrue]);

  function handelChange(event, form = 'plan') {
    if (form === 'plan') {
      setValues({
        ...values,
        [event.target.name]: event.target.value,
      });
    } else {
      setValuesAccrue({
        ...valuesAccrue,
        [event.target.name]: event.target.value,
      });
    }
  }

  function onSubmit() {
    const checkEl = Object.keys(values).every((key) => {
      return values[key] !== null;
    });

    if (checkEl) {
      if (Object.keys(currentUser).length > 0) {
        dispatch(
          fetchCreatePlan({
            shopId: currentUser.list_shop[0].id,
            token: user.token,
            data: values,
          })
        );
      }
    } else {
      alert('Не заполнен данные');
    }
  }

  function onAccrue() {
    if (Object.keys(currentUser).length > 0) {
      dispatch(
        fetchAccrueCashack({
          client: valuesAccrue.client,
          token: user.token,
          data: { shopId: currentUser.list_shop[0].id, ...valuesAccrue },
        })
      );
    }
  }

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Дашборд</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}
        </Row>
      </div>

      <Row>
        <Col xl="4">
          <h2 className="small-title">Ваши программы</h2>
          {plans.length !== 0 ? (
            plans.map((plan, index) => {
              return (
                <>
                  <Card className="mb-3" key={index}>
                    <Card.Body>
                      <Row className="mb-3">
                        <Col>
                          <div className="mb-1 d-flex align-items-center text-alternate text-middle lh-1-25">Название</div>
                          <div className="text-primary cta-5">{plan.name}</div>
                        </Col>
                        <Col>
                          <div className="mb-1 d-flex align-items-center text-alternate text-middle lh-1-25">Условие</div>
                          <div className="text-primary cta-5">{plan.conditions} руб</div>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <div className="mb-1 d-flex align-items-center text-alternate text-middle lh-1-25">Списание</div>
                          <div className="text-primary cta-5">{plan.writeoff} %</div>
                        </Col>
                        <Col>
                          <div className="mb-1 d-flex align-items-center text-alternate text-middle lh-1-25">Кешбек</div>
                          <div className="text-primary cta-5">{plan.cashback} %</div>
                        </Col>
                      </Row>
                      <Row style={{ paddingLeft: 10 }}>
                        <Form.Check checked={plan.active} value={plan.active} className="mt-3" type="switch" id="custom-switch" label="Активный" />
                      </Row>
                    </Card.Body>
                  </Card>
                </>
              );
            })
          ) : !isLoading ? (
            <div>Отсутсвует</div>
          ) : (
            <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Loader
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '25px',
                  height: '35px',
                }}
                styleImg={{
                  width: '250%',
                  height: '250%',
                }}
              />
            </div>
          )}
        </Col>

        <Col xl="8">
          <Col className="mb-4">
            <h2 className="small-title">Начислить баллы клиенту</h2>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <Form.Label>Номер телеофона</Form.Label>
                  <Form.Control
                    placeholder="Введите номер телефона клиента"
                    type="text"
                    defaultValue="0"
                    value={valuesAccrue.client}
                    onChange={(e) => handelChange(e, 'accrue')}
                    name="client"
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Количество</Form.Label>
                  <Form.Control
                    placeholder="Количество баллов"
                    value={valuesAccrue.amount}
                    onChange={(e) => handelChange(e, 'accrue')}
                    name="amount"
                    type="number"
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Сообщение</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Введите сообщение"
                    value={valuesAccrue.message}
                    onChange={(e) => handelChange(e, 'accrue')}
                    name="message"
                  />
                </div>
              </Card.Body>
            </Card>
            <Button className="mt-3" onClick={() => onAccrue()}>
              {!isLoading ? (
                <>Начислить</>
              ) : (
                <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '15px',
                      height: '15px',
                    }}
                    styleImg={{
                      width: '250%',
                      height: '250%',
                    }}
                  />
                </div>
              )}
            </Button>
          </Col>
          <Col>
            <h2 className="small-title">Добавить программу</h2>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <Form.Label>Название</Form.Label>
                  <Form.Control placeholder="Введите название" type="text" defaultValue="0" value={values.name} onChange={(e) => handelChange(e)} name="name" />
                </div>
                <div className="mb-3">
                  <Form.Label>Условие</Form.Label>
                  <Form.Control
                    placeholder="С какой суммы начнет действовать"
                    value={values.conditions}
                    onChange={(e) => handelChange(e)}
                    name="conditions"
                    type="number"
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Списание</Form.Label>
                  <Form.Control placeholder="Процент списание баллов" value={values.writeoff} onChange={(e) => handelChange(e)} name="writeoff" type="number" />
                </div>
                <div className="mb-3">
                  <Form.Label>Кешбек</Form.Label>
                  <Form.Control placeholder="Процент кешбек" value={values.cashback} onChange={(e) => handelChange(e)} name="cashback" type="number" />
                </div>
              </Card.Body>
            </Card>
            <Button className="mt-3" onClick={() => onSubmit()}>
              {!isLoading ? (
                <>Сохранить</>
              ) : (
                <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Loader
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '15px',
                      height: '15px',
                    }}
                    styleImg={{
                      width: '250%',
                      height: '250%',
                    }}
                  />
                </div>
              )}
            </Button>
          </Col>
        </Col>
      </Row>
    </>
  );
};

export default BonusPlans;

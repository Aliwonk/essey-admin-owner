/* eslint-disable no-nested-ternary */
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { React, useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/loader';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { fetchAccrueCashack, fetchCreatePlan, fetchGetListPlans, fetchUpdatePlan, fetchWriteOffCashack } from './slice/async';

const BonusPlans = () => {
  const dispatch = useDispatch();
  const { currentUser, user } = useSelector((state) => state.auth);
  const { plans, isLoading, isAccrue, isWriteOff } = useSelector((state) => state.plans);
  const [values, setValues] = useState({
    name: '',
    conditions: null,
    writeoff: null,
    cashback: null,
  });
  const [valuesCashback, setValuesCashback] = useState({
    client: '',
    amount: null,
    message: '',
  });
  const [stateActivePlan, setStateActivePlan] = useState();
  const title = 'Бонусы компании';
  const description = 'Страница бонусов компании';

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
    } else if (isAccrue === false) {
      alert('При начислении баллов произошла ошибка');
    }
    if (isWriteOff) {
      alert('Баллы списаны');
    } else if (isWriteOff === false) {
      alert('При списании баллов произошла ошибка');
    }
  }, [isAccrue, isWriteOff]);

  function handelChange(event, form = 'plan') {
    switch (form) {
      case 'accrue/writeoff':
        setValuesCashback({
          ...valuesCashback,
          [event.target.name]: event.target.value,
        });
        break;
      default:
        setValues({
          ...values,
          [event.target.name]: event.target.value,
        });
        break;
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

  function onCashback(type) {
    if (Object.keys(currentUser).length > 0) {
      if (type === 'accrue') {
        dispatch(
          fetchAccrueCashack({
            client: valuesCashback.client,
            token: user.token,
            data: { shopId: currentUser.list_shop[0].id, ...valuesCashback },
          })
        );
      } else if (type === 'writeoff') {
        dispatch(
          fetchWriteOffCashack({
            client: valuesCashback.client,
            token: user.token,
            data: { shopId: currentUser.list_shop[0].id, ...valuesCashback },
          })
        );
      }
    }
  }

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back " to="/">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle fs-7 mb-1 ms-1">Дашборд</span>
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
          <h2 className="small-title">Бонусы</h2>
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
                        <Form.Check
                          checked={plan.active}
                          value={plan.active}
                          onClick={(e) => {
                            dispatch(
                              fetchUpdatePlan({
                                shopId: currentUser.list_shop[0].id,
                                token: user.token,
                                data: { active: e.target.checked },
                              })
                            );
                          }}
                          className="mt-3"
                          type="switch"
                          id="custom-switch"
                          label="Активный"
                        />
                      </Row>
                    </Card.Body>
                  </Card>
                </>
              );
            })
          ) : !isLoading.plans ? (
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
          {/* <Col className="mb-4">
            <h2 className="small-title">Списать баллы</h2>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <Form.Label>Номер телефона</Form.Label>
                  <Form.Control
                    placeholder="Введите номер телефона клиента"
                    type="text"
                    defaultValue="0"
                    value={valuesWriteOff.client}
                    onChange={(e) => handelChange(e, 'writeoff')}
                    name="client"
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Количество</Form.Label>
                  <Form.Control
                    placeholder="Количество баллов"
                    value={valuesWriteOff.amount}
                    onChange={(e) => handelChange(e, 'writeoff')}
                    name="amount"
                    type="number"
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Сообщение</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Введите сообщение"
                    value={valuesWriteOff.message}
                    onChange={(e) => handelChange(e, 'writeoff  ')}
                    name="message"
                  />
                </div>
              </Card.Body>
            </Card>
            <Button className="mt-3" onClick={() => onAccrue()}>
              {!isLoading ? (
                <>Списать</>
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
          </Col> */}
          <Col className="mb-4">
            <h2 className="small-title">Начислить/списать баллы</h2>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <Form.Label>Номер телефона</Form.Label>
                  <Form.Control
                    placeholder="Введите номер телефона клиента"
                    type="text"
                    defaultValue="0"
                    value={valuesCashback.client}
                    onChange={(e) => handelChange(e, 'accrue/writeoff')}
                    name="client"
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Количество</Form.Label>
                  <Form.Control
                    placeholder="Количество баллов"
                    value={valuesCashback.amount}
                    onChange={(e) => handelChange(e, 'accrue/writeoff')}
                    name="amount"
                    type="number"
                  />
                </div>
                <div className="mb-3">
                  <Form.Label>Сообщение</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Введите сообщение"
                    value={valuesCashback.message}
                    onChange={(e) => handelChange(e, 'accrue/writeoff')}
                    name="message"
                  />
                </div>
              </Card.Body>
            </Card>
            <Button className="mt-3" onClick={() => onCashback('accrue')}>
              {!isLoading.accrue ? (
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
            <Button style={{ marginLeft: 10 }} className="mt-3" onClick={() => onCashback('writeoff')}>
              {!isLoading.writeOff ? (
                <>Списать</>
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
            <h2 className="small-title">Добавить бонусную программу</h2>
            <Card>
              <Card.Body>
                <div className="mb-3">
                  <Form.Label>Название</Form.Label>
                  <Form.Control
                    placeholder="Введите название статуса"
                    type="text"
                    defaultValue="0"
                    value={values.name}
                    onChange={(e) => handelChange(e)}
                    name="name"
                  />
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
                  <Form.Label>Покрытие счета</Form.Label>
                  <Form.Control placeholder="Процент покрытие счета" value={values.writeoff} onChange={(e) => handelChange(e)} name="writeoff" type="number" />
                </div>
                <div className="mb-3">
                  <Form.Label>Кешбек</Form.Label>
                  <Form.Control placeholder="Процент кешбек" value={values.cashback} onChange={(e) => handelChange(e)} name="cashback" type="number" />
                </div>
              </Card.Body>
            </Card>
            <Button className="mt-3" onClick={() => onSubmit()}>
              {!isLoading.plans ? (
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

import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Card, Form } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from 'utils/date';
import { DEFAUTL_BACKEND_URL } from 'config';
import Loader from 'components/loader';
import { fetchGetOrder, fetchUpdateOrder } from '../slice/async';

const OrdersDetail = () => {
  const dispatch = useDispatch();
  const { order, isLoading, isUpdate } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);
  const title = 'Заказ';
  const description = 'Страница заказа';
  const { id } = useParams();
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(
      fetchGetOrder({
        id,
        token: user.token,
      })
    );
    console.log(1);
  }, [dispatch, id, user, isUpdate]);

  useEffect(() => {
    console.log(order);
  }, [order]);

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/orders">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Список заказов</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          {order.status !== 'Отменен' && (
            <>
              <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
                <Dropdown className="w-100 w-md-auto">
                  <Dropdown.Toggle className="w-100 w-md-auto" variant="outline-primary">
                    Изменить статус
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {order.status !== 'Принят' && (
                      <Dropdown.Item
                        onClick={() => {
                          if (Object.keys(user).length > 0) {
                            dispatch(
                              fetchUpdateOrder({
                                id,
                                token: user.token,
                                status: 'Принят',
                              })
                            );
                            dispatch(
                              fetchGetOrder({
                                id,
                                token: user.token,
                              })
                            );
                          }
                        }}
                      >
                        Принят
                      </Dropdown.Item>
                    )}
                    {order.status !== 'Отправлен' && <Dropdown.Item>Отправлен</Dropdown.Item>}
                    {order.status !== 'Доставлен' && <Dropdown.Item>Доставлен</Dropdown.Item>}
                  </Dropdown.Menu>
                </Dropdown>
                {/* <Dropdown className="ms-1">
              <Dropdown.Toggle className="btn-icon btn-icon-only dropdown-toggle-no-arrow" variant="outline-primary">
                <CsLineIcons icon="more-horizontal" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>Edit</Dropdown.Item>
                <Dropdown.Item>View Invoice</Dropdown.Item>
                <Dropdown.Item>Track Package</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
              </Col>
            </>
          )}
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8" xxl="9">
          {/* Status Start */}
          <h2 className="small-title">Информация</h2>
          {!isLoading ? (
            <>
              <Row className="g-2 mb-5">
                <Col sm="6">
                  <Card className="sh-13 sh-lg-15 sh-xl-14">
                    <Card.Body className="h-100 py-3 d-flex align-items-center">
                      <Row className="g-0 align-items-center">
                        <Col xs="auto" className="pe-3">
                          <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                            <CsLineIcons icon="tag" className="text-primary" />
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex align-items-center lh-1-25">Id заказа</div>
                          <div className="text-primary">{order.id}</div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card className="sh-13 sh-lg-15 sh-xl-14">
                    <Card.Body className="h-100 py-3 d-flex align-items-center">
                      <Row className="g-0 align-items-center">
                        <Col xs="auto" className="pe-3">
                          <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                            <CsLineIcons icon="clipboard" className="text-primary" />
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex align-items-center lh-1-25">Статус</div>
                          <div className="text-primary">{order.status}</div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card className="sh-13 sh-lg-15 sh-xl-14">
                    <Card.Body className="h-100 py-3 d-flex align-items-center">
                      <Row className="g-0 align-items-center">
                        <Col xs="auto" className="pe-3">
                          <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                            <CsLineIcons icon="calendar" className="text-primary" />
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex align-items-center lh-1-25">Дата создания</div>
                          <div className="text-primary">
                            {getDate(order.createdDate).date} {getDate(order.createdDate).time}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card className="sh-13 sh-lg-15 sh-xl-14">
                    <Card.Body className="h-100 py-3 d-flex align-items-center">
                      <Row className="g-0 align-items-center">
                        <Col xs="auto" className="pe-3">
                          <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                            <CsLineIcons icon="phone" className="text-primary" />
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex align-items-center lh-1-25">Номер телефона</div>
                          <div className="text-primary">{order.client && order.client.phone}</div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm="6">
                  <Card className="sh-13 sh-lg-15 sh-xl-14">
                    <Card.Body className="h-100 py-3 d-flex align-items-center">
                      <Row className="g-0 align-items-center">
                        <Col xs="auto" className="pe-3">
                          <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                            <CsLineIcons icon="pin" className="text-primary" />
                          </div>
                        </Col>
                        <Col>
                          <div className="d-flex align-items-center lh-1-25">Адрес доставки</div>
                          <div className="text-primary">
                            {order.self_delivery && 'Cамовывоз: '}
                            {order.address}
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                {order.status === 'Отменен' && (
                  <Col sm="6">
                    <Card className="sh-13 sh-lg-15 sh-xl-14">
                      <Card.Body className="h-100 py-3 d-flex align-items-center">
                        <Row className="g-0 align-items-center">
                          <Col xs="auto" className="pe-3">
                            <div className="border border-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                              <CsLineIcons icon="close" className="text-primary" />
                            </div>
                          </Col>
                          <Col>
                            <div className="d-flex align-items-center lh-1-25">Причина отмены</div>
                            <div className="text-primary">{order.comment}</div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                )}
              </Row>
            </>
          ) : (
            <div style={{ display: 'flex', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
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
          {/* Status End */}

          {/* Cart Start */}
          <h2 className="small-title">Корзина</h2>
          {!isLoading ? (
            <Card className="mb-5">
              <Card.Body>
                <div className="mb-5">
                  {Object.keys(order).length > 0 &&
                    order.goods.map((goods, index) => {
                      return (
                        <>
                          <Row className="g-0 sh-9 mb-3">
                            <Col xs="auto">
                              <img src={`${DEFAUTL_BACKEND_URL}${goods.goods.goods_images[0].path}`} className="card-img rounded-md h-100 sw-13" alt="thumb" />
                            </Col>
                            <Col>
                              <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                                <Row className="g-0 h-100 align-items-start align-content-center">
                                  <Col xs="12" className="d-flex flex-column mb-2">
                                    <div>{goods.name}</div>
                                    <div className="text-muted text-small">{goods.goods.category}</div>
                                  </Col>
                                  <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                                    <Row className="g-0">
                                      <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                                        <span>{goods.count}</span>
                                        <span className="text-muted ms-1 me-1">x</span>
                                        <span>{goods.price}</span>
                                      </Col>
                                      <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                                        <span>{goods.price * goods.count} руб</span>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </div>
                            </Col>
                          </Row>
                        </>
                      );
                    })}
                  {/* <Row className="g-0 sh-9 mb-3">
                  <Col xs="auto">
                    <img src="/img/product/small/product-2.webp" className="card-img rounded-md h-100 sw-13" alt="thumb" />
                  </Col>
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-100 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-2">
                          <div>Ruisreikäleipä</div>
                          <div className="text-muted text-small">Multigrain</div>
                        </Col>
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <span>3</span>
                              <span className="text-muted ms-1 me-1">x</span>
                              <span>
                                <span className="text-small">$</span>
                                2.75
                              </span>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>
                                <span className="text-small">$</span>
                                8.25
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 sh-9 mb-3">
                  <Col xs="auto">
                    <img src="/img/product/small/product-3.webp" className="card-img rounded-md h-100 sw-13" alt="thumb" />
                  </Col>
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-100 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-2">
                          <div>Cornbread</div>
                          <div className="text-muted text-small">Sourdough</div>
                        </Col>
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <span>2</span>
                              <span className="text-muted ms-1 me-1">x</span>
                              <span>
                                <span className="text-small">$</span>
                                7.50
                              </span>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>
                                <span className="text-small">$</span>
                                15.00
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 sh-9 mb-3">
                  <Col xs="auto">
                    <img src="/img/product/small/product-4.webp" className="card-img rounded-md h-100 sw-13" alt="thumb" />
                  </Col>
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-100 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-2">
                          <div>Yeast Karavai</div>
                          <div className="text-muted text-small">Sourdough</div>
                        </Col>
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <span>3</span>
                              <span className="text-muted ms-1 me-1">x</span>
                              <span>
                                <span className="text-small">$</span>
                                6.25
                              </span>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>
                                <span className="text-small">$</span>
                                18.75
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 sh-9 mb-3">
                  <Col xs="auto">
                    <img src="/img/product/small/product-5.webp" className="card-img rounded-md h-100 sw-13" alt="thumb" />
                  </Col>
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-100 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-2">
                          <div>Bammy</div>
                          <div className="text-muted text-small">Sourdough</div>
                        </Col>
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <span>3</span>
                              <span className="text-muted ms-1 me-1">x</span>
                              <span>
                                <span className="text-small">$</span>
                                2.50
                              </span>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>
                                <span className="text-small">$</span>
                                7.50
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
                <Row className="g-0 sh-9 mb-3">
                  <Col xs="auto">
                    <img src="/img/product/small/product-6.webp" className="card-img rounded-md h-100 sw-13" alt="thumb" />
                  </Col>
                  <Col>
                    <div className="ps-4 pt-0 pb-0 pe-0 h-100">
                      <Row className="g-0 h-100 align-items-start align-content-center">
                        <Col xs="12" className="d-flex flex-column mb-2">
                          <div>Zopf</div>
                          <div className="text-muted text-small">Whole Wheat</div>
                        </Col>
                        <Col xs="12" className="d-flex flex-column mb-md-0 pt-1">
                          <Row className="g-0">
                            <Col xs="6" className="d-flex flex-row pe-2 align-items-end text-alternate">
                              <span>1</span>
                              <span className="text-muted ms-1 me-1">x</span>
                              <span>
                                <span className="text-small">$</span>
                                4.50
                              </span>
                            </Col>
                            <Col xs="6" className="d-flex flex-row align-items-end justify-content-end text-alternate">
                              <span>
                                <span className="text-small">$</span>
                                4.50
                              </span>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row> */}
                </div>
                <div>
                  <Row className="g-0 mb-2">
                    <Col xs="auto" className="ms-auto ps-3 text-muted">
                      Итого
                    </Col>
                    <Col xs="auto" className="sw-13 text-end">
                      <span>
                        {/* <span className="text-small text-muted">$</span> */}
                        {order.amount} руб
                      </span>
                    </Col>
                  </Row>
                  {/* <Row className="g-0 mb-2">
                  <Col xs="auto" className="ms-auto ps-3 text-muted">
                    Shipping
                  </Col>
                  <Col xs="auto" className="sw-13 text-end">
                    <span>
                      <span className="text-small text-muted">$</span>
                      12.50
                    </span>
                  </Col>
                </Row> */}
                  <Row className="g-0 mb-2">
                    <Col xs="auto" className="ms-auto ps-3 text-muted">
                      Кешбек
                    </Col>
                    <Col xs="auto" className="sw-13 text-end">
                      <span>{order.cashback}</span>
                    </Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto" className="ms-auto ps-3 text-muted">
                      Общая сумма
                    </Col>
                    <Col xs="auto" className="sw-13 text-end">
                      <span>{order.amount + order.cashback} руб</span>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <div style={{ display: 'flex', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
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
          {/* Cart End */}

          {/* Activity Start */}
          {/* <h2 className="small-title">Activity</h2>
          <Card className="mb-5">
            <Card.Body>
              <Row className="g-0">
                <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                  <div className="w-100 d-flex sh-1" />
                  <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                    <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                  </div>
                  <div className="w-100 d-flex h-100 justify-content-center position-relative">
                    <div className="line-w-1 bg-separator h-100 position-absolute" />
                  </div>
                </Col>
                <Col className="mb-4">
                  <div className="h-100">
                    <div className="d-flex flex-column justify-content-start">
                      <div className="d-flex flex-column">
                        <Button variant="link" className="p-0 pt-1 heading text-start">
                          Delivered
                        </Button>
                        <div className="text-alternate">21.12.2021</div>
                        <div className="text-muted mt-1">
                          Jujubes tootsie roll liquorice cake jelly beans pudding gummi bears chocolate cake donut. Jelly-o sugar plum fruitcake bonbon bear
                          claw cake cookie chocolate bar. Tiramisu soufflé apple pie.
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-0">
                <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                  <div className="w-100 d-flex sh-1 position-relative justify-content-center">
                    <div className="line-w-1 bg-separator h-100 position-absolute" />
                  </div>
                  <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                    <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                  </div>
                  <div className="w-100 d-flex h-100 justify-content-center position-relative">
                    <div className="line-w-1 bg-separator h-100 position-absolute" />
                  </div>
                </Col>
                <Col className="mb-4">
                  <div className="h-100">
                    <div className="d-flex flex-column justify-content-start">
                      <div className="d-flex flex-column">
                        <Button variant="link" className="p-0 pt-1 heading text-start">
                          Shipped
                        </Button>
                        <div className="text-alternate">15.10.2021</div>
                        <div className="text-muted mt-1">Chocolate apple pie powder tart chupa chups bonbon. Donut biscuit chocolate cake pie topping. </div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
              <Row className="g-0">
                <Col xs="auto" className="sw-1 d-flex flex-column justify-content-center align-items-center position-relative me-4">
                  <div className="w-100 d-flex sh-1 position-relative justify-content-center">
                    <div className="line-w-1 bg-separator h-100 position-absolute" />
                  </div>
                  <div className="rounded-xl shadow d-flex flex-shrink-0 justify-content-center align-items-center">
                    <div className="bg-gradient-light sw-1 sh-1 rounded-xl position-relative" />
                  </div>
                  <div className="w-100 d-flex h-100 justify-content-center position-relative" />
                </Col>
                <Col>
                  <div className="h-100">
                    <div className="d-flex flex-column justify-content-start">
                      <div className="d-flex flex-column">
                        <Button variant="link" className="p-0 pt-1 heading text-start">
                          Order Received
                        </Button>
                        <div className="text-alternate">08.06.2021</div>
                        <div className="text-muted mt-1">Chocolate apple pie powder tart chupa chups bonbon. Donut biscuit chocolate cake pie topping.</div>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card> */}
          {/* Activity End */}
        </Col>

        <Col xl="4" xxl="3">
          {/* Address Start */}
          <h2 className="small-title">Адрес</h2>
          {!isLoading ? (
            <Card className="mb-5">
              <Card.Body className="mb-n5">
                <div className="mb-5">
                  <p className="text-small text-muted mb-2">КЛИЕНТ</p>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="user" size="17" className="text-primary" />
                      </div>
                    </Col>
                    <Col className="text-alternate">
                      {order.client && order.client.lastName} {order.client && order.client.firstName}
                    </Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="phone" size="17" className="text-primary" />
                      </div>
                    </Col>
                    <Col className="text-alternate">{order.client && order.client.phone}</Col>
                  </Row>
                </div>
                {/* <div className="mb-5">
                <p className="text-small text-muted mb-2">SHIPPING ADDRESS</p>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="user" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">Blaine Cottrell</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="pin" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">4 Glamis Avenue, Strathmore Park, Wellington 6022, New Zealand</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="phone" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">+6443884455</Col>
                </Row>
              </div> */}
                {/* <div className="mb-5">
                <p className="text-small text-muted mb-2">BILLING ADDRESS</p>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="user" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">Blaine Cottrell</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="pin" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">4 Glamis Avenue, Strathmore Park, Wellington 6022, New Zealand</Col>
                </Row>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="phone" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">+6443884455</Col>
                </Row>
              </div> */}
                {/* <div className="mb-5">
                <p className="text-small text-muted mb-2">PAYMENT (CREDIT CARD)</p>
                <Row className="g-0 mb-2">
                  <Col xs="auto">
                    <div className="sw-3 me-1">
                      <CsLineIcons icon="credit-card" size="17" className="text-primary" />
                    </div>
                  </Col>
                  <Col className="text-alternate">3452 42** **** 4251</Col>
                </Row>
              </div> */}
              </Card.Body>
            </Card>
          ) : (
            <div style={{ display: 'flex', width: '100%', height: 50, alignItems: 'center', justifyContent: 'center' }}>
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
          {/* Address End */}

          {/* START CANCEL ORDER */}
          {order.status !== 'Отменен' && (
            <Col>
              <h2 className="small-title">Отмена</h2>
              <Card>
                <Card.Body>
                  <p className="text-small text-muted mb-2">ПРИЧИНА ОТМЕНЫ</p>
                  <Form.Control as="textarea" rows={4} value={comment} onChange={(e) => setComment(e.target.value)} />
                  <Button
                    className="mt-3"
                    onClick={() => {
                      if (comment !== '') {
                        dispatch(
                          fetchUpdateOrder({
                            id,
                            token: user.token,
                            status: 'Отменен',
                            comment,
                          })
                        );
                      } else {
                        // eslint-disable-next-line no-alert
                        alert('Заполните причину отмены');
                      }
                    }}
                  >
                    Отменить заказ
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          )}
          {/* END CANCEL ORDER */}
        </Col>
      </Row>
    </>
  );
};

export default OrdersDetail;

import React, { useEffect } from 'react';
import { Row, Col, Dropdown, Card, Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Rating from 'react-rating';
import { NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import PerformanceChart from './components/PerformanceChart';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.auth);
  const title = 'Дашборд';
  const description = 'Страница дашборд';

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title Start */}
      <div className="page-title-container">
        <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
          <span className="align-middle text-small ms-1">&nbsp;</span>
        </NavLink>
        <h1 className="mb-0 pb-0 display-4" id="title">
          Здравствуйте, {currentUser.lastName}!
        </h1>
      </div>
      {/* Title End */}

      {/* Stats Start */}
      <div className="d-flex">
        {/* <Dropdown>
          <Dropdown.Toggle className="small-title p-0 align-top h-auto me-2" variant="link">
          Сегодняшний
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>Еженедельно</Dropdown.Item>
            <Dropdown.Item>Ежемесячно</Dropdown.Item>
            <Dropdown.Item>Годовой</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
        {/* <h2 className="small-title">Статистика</h2> */}
      </div>
      <Row className="mb-5 g-2">
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="dollar" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">Прибыль</div>
              <div className="text-primary cta-4">$ 315.20</div>
            </Card.Body>
          </Card>
        </Col>
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="cart" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">Заказы</div>
              <div className="text-primary cta-4">16</div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="server" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">Сессий</div>
              <div className="text-primary cta-4">463</div>
            </Card.Body>
          </Card>
        </Col> */}
        <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="user" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">Клиенты</div>
              <div className="text-primary cta-4">17</div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="arrow-top-left" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">Возврат</div>
              <div className="text-primary cta-4">2</div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col xs="6" md="4" lg="2">
          <Card className="h-100 hover-scale-up cursor-pointer">
            <Card.Body className="d-flex flex-column align-items-center">
              <div className="sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center border border-primary mb-4">
                <CsLineIcons icon="message" className="text-primary" />
              </div>
              <div className="mb-1 d-flex align-items-center text-alternate text-small lh-1-25">Комментарии</div>
              <div className="text-primary cta-4">5</div>
            </Card.Body>
          </Card>
        </Col> */}
      </Row>
      {/* Stats End */}

      <Row>
        {/* Recent Orders Start */}
        <Col xl="6" className="mb-5">
          <h2 className="small-title">Недавние заказы</h2>
          <Card className="mb-2 sh-15 sh-md-6">
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col xs="10" md="4" className="d-flex align-items-center mb-3 mb-md-0 h-md-100">
                  <NavLink to="/orders/detail" className="body-link stretched-link">
                    Заказ #54129
                  </NavLink>
                </Col>
                <Col xs="2" md="3" className="d-flex align-items-center text-muted mb-1 mb-md-0 justify-content-end justify-content-md-start">
                  <Badge bg="outline-primary" className="me-1">
                    В ожидании
                  </Badge>
                </Col>
                <Col xs="12" md="2" className="d-flex align-items-center mb-1 mb-md-0 text-alternate">
                  <span>
                    <span className="text-small">$</span>
                    17.35
                  </span>
                </Col>
                <Col xs="12" md="3" className="d-flex align-items-center justify-content-md-end mb-1 mb-md-0 text-alternate">
                  Сегодня - 13:20
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-2 sh-15 sh-md-6">
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col xs="10" md="4" className="d-flex align-items-center mb-3 mb-md-0 h-md-100">
                  <NavLink to="/orders/detail" className="body-link stretched-link">
                    Заказ #54128
                  </NavLink>
                </Col>
                <Col xs="2" md="3" className="d-flex align-items-center text-muted mb-1 mb-md-0 justify-content-end justify-content-md-start">
                  <Badge bg="outline-secondary" className="me-1">
                    Отправленный
                  </Badge>
                </Col>
                <Col xs="12" md="2" className="d-flex align-items-center mb-1 mb-md-0 text-alternate">
                  <span>
                    <span className="text-small">$</span>
                    145.20
                  </span>
                </Col>
                <Col xs="12" md="3" className="d-flex align-items-center justify-content-md-end mb-1 mb-md-0 text-alternate">
                  Сегодня - 11:32
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-2 sh-15 sh-md-6">
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col xs="10" md="4" className="d-flex align-items-center mb-3 mb-md-0 h-md-100">
                  <NavLink to="/orders/detail" className="body-link stretched-link">
                    Заказ #54127
                  </NavLink>
                </Col>
                <Col xs="2" md="3" className="d-flex align-items-center text-muted mb-1 mb-md-0 justify-content-end justify-content-md-start">
                  <Badge bg="outline-secondary" className="me-1">
                    Отправленный
                  </Badge>
                </Col>
                <Col xs="12" md="2" className="d-flex align-items-center mb-1 mb-md-0 text-alternate">
                  <span>
                    <span className="text-small">$</span>
                    110.85
                  </span>
                </Col>
                <Col xs="12" md="3" className="d-flex align-items-center justify-content-md-end mb-1 mb-md-0 text-alternate">
                  Сегодня - 11:20
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-2 sh-15 sh-md-6">
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col xs="10" md="4" className="d-flex align-items-center mb-3 mb-md-0 h-md-100">
                  <NavLink to="/orders/detail" className="body-link stretched-link">
                    Заказ #54126
                  </NavLink>
                </Col>
                <Col xs="2" md="3" className="d-flex align-items-center text-muted mb-1 mb-md-0 justify-content-end justify-content-md-start">
                  <Badge bg="outline-primary" className="me-1">
                    В ожидании
                  </Badge>
                </Col>
                <Col xs="12" md="2" className="d-flex align-items-center mb-1 mb-md-0 text-alternate">
                  <span>
                    <span className="text-small">$</span>
                    58.00
                  </span>
                </Col>
                <Col xs="12" md="3" className="d-flex align-items-center justify-content-md-end mb-1 mb-md-0 text-alternate">
                  Сегодня - 10:20
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-2 sh-15 sh-md-6">
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col xs="10" md="4" className="d-flex align-items-center mb-3 mb-md-0 h-md-100">
                  <NavLink to="/orders/detail" className="body-link stretched-link">
                    Заказ #54125
                  </NavLink>
                </Col>
                <Col xs="2" md="3" className="d-flex align-items-center text-muted mb-1 mb-md-0 justify-content-end justify-content-md-start">
                  <Badge bg="outline-primary" className="me-1">
                    В ожидании
                  </Badge>
                </Col>
                <Col xs="12" md="2" className="d-flex align-items-center mb-1 mb-md-0 text-alternate">
                  <span>
                    <span className="text-small">$</span>
                    22.05
                  </span>
                </Col>
                <Col xs="12" md="3" className="d-flex align-items-center justify-content-md-end mb-1 mb-md-0 text-alternate">
                  Сегодня - 07:30
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-2 sh-15 sh-md-6">
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col xs="10" md="4" className="d-flex align-items-center mb-3 mb-md-0 h-md-100">
                  <NavLink to="/orders/detail" className="body-link stretched-link">
                    Заказ #54124
                  </NavLink>
                </Col>
                <Col xs="2" md="3" className="d-flex align-items-center text-muted mb-1 mb-md-0 justify-content-end justify-content-md-start">
                  <Badge bg="outline-quaternary" className="me-1">
                    Доставленный
                  </Badge>
                </Col>
                <Col xs="12" md="2" className="d-flex align-items-center mb-1 mb-md-0 text-alternate">
                  <span>
                    <span className="text-small">$</span>
                    14.25
                  </span>
                </Col>
                <Col xs="12" md="3" className="d-flex align-items-center justify-content-md-end mb-1 mb-md-0 text-alternate">
                  Понедельник - 17:30
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        {/* Recent Orders End */}

        {/* Performance Start */}
        {/* <Col xl="6" className="mb-5">
          <h2 className="small-title">Производительность</h2>
          <Card className="sh-45 h-xl-100-card">
            <Card.Body className="h-100">
              <div className="h-100">
                <PerformanceChart />
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* Performance End */}
      </Row>

      {/* <Row> */}
      {/* <Col xs="12" className="col-xxl"> */}
      {/* <Row> */}
      {/* Activity Start */}
      {/* <Col xxl="6" className="mb-5">
              <h2 className="small-title">Активность</h2>
              <Card className="sh-35">
                <Card.Body className="scroll-out">
                  <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'leave' }, overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="h-100">
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Регистрация нового пользователя</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">18 декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">добавлено 3 новых продукта</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">18 декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="square" className="text-secondary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Товара нет в наличии: Хлебные палочки</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">16 Декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="square" className="text-secondary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Страница категории вернула ошибку</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">15 Декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">14 товаров добавлено</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">15 декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="hexagon" className="text-tertiary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Новая распродажа:ВКУСНЫЙ АЛТАЙ</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">15 декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="hexagon" className="text-tertiary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Новая распродажа: ВКУСНЫЙ АЙДЫШ</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">15 декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="triangle" className="text-warning align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Получил тикет в поддержку</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">15 Декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="hexagon" className="text-tertiary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Новая распродажа: ДЕНЬГИ</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">13 Декабрь</div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col className="col-auto">
                        <div className="sw-3 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="hexagon" className="text-tertiary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column ps-3 pe-4 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Новая распродажа: НОУТБУКИ</div>
                          </div>
                        </div>
                      </Col>
                      <Col className="col-auto">
                        <div className="d-inline-block d-flex justify-content-end align-items-center h-100">
                          <div className="text-muted ms-2 mt-n1 lh-1-25">12 декабрь</div>
                        </div>
                      </Col>
                    </Row>
                  </OverlayScrollbarsComponent>
                </Card.Body>
              </Card>
            </Col> */}
      {/* Activity End */}

      {/* Recent Reviews Start */}
      {/* <Col xxl="6" className="mb-5">
              <h2 className="small-title">Последние отзывы</h2>
              <Card className="sh-35">
                <Card.Body className="scroll-out">
                  <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'leave' }, overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="h-100">
                    <Row className="g-0 sh-10 mb-3">
                      <Col className="col-auto">
                        <NavLink to="/products/detail">
                          <img src="/img/product/small/product-1.webp" className="card-img rounded-md h-100 sw-8" alt="thumb" />
                        </NavLink>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="mb-1">
                              <NavLink to="/products/detail" className="body-link">
                              Содовый хлеб
                              </NavLink>{' '}
                              <span className="text-muted">от</span>{' '}
                              <NavLink to="/customers/detail" className="body-link">
                              Кэтлин Берта
                              </NavLink>
                            </div>
                            <div className="text-small text-muted text-truncate mb-1">
                            Шоколадный батончик марципановый марципановый морковный торт имбирное печенье мороженое. Мороженое датский сахарный сливовый бисквитный пудинг порошок
                               суфле пончик миндальное печенье.
                            </div>
                            <Rating
                              initialRating={5}
                              emptySymbol={<i className="cs-star text-primary" />}
                              fullSymbol={<i className="cs-star-full text-primary" />}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 sh-10 mb-3">
                      <Col className="col-auto">
                        <NavLink to="/products/detail">
                          <img src="/img/product/small/product-2.webp" className="card-img rounded-md h-100 sw-8" alt="thumb" />
                        </NavLink>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="mb-1">
                              <NavLink to="/products/detail" className="body-link">
                              Бармбрек
                              </NavLink>{' '}
                              <span className="text-muted">от</span>{' '}
                              <NavLink to="/customers/detail" className="body-link">
                                Юша Алтай
                              </NavLink>
                            </div>
                            <div className="text-small text-muted text-truncate mb-1">Медвежий коготь сладкая лакрица мармелад. Медвежий коготь из имбирных пряников.</div>
                            <Rating
                              initialRating={5}
                              emptySymbol={<i className="cs-star text-primary" />}
                              fullSymbol={<i className="cs-star-full text-primary" />}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 sh-10 mb-3">
                      <Col className="col-auto">
                        <NavLink to="/products/detail">
                          <img src="/img/product/small/product-3.webp" className="card-img rounded-md h-100 sw-8" alt="thumb" />
                        </NavLink>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="mb-1">
                              <NavLink to="/products/detail" className="body-link">
                              Штирер Брот
                              </NavLink>{' '}
                              <span className="text-muted">от</span>{' '}
                              <NavLink to="/customers/detail" className="body-link">
                                Балдан Айдыш
                              </NavLink>
                            </div>
                            <div className="text-small text-muted text-truncate mb-1">леденцы чупа-чупс.</div>
                            <Rating
                              initialRating={5}
                              emptySymbol={<i className="cs-star text-primary" />}
                              fullSymbol={<i className="cs-star-full text-primary" />}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 sh-10 mb-3">
                      <Col className="col-auto">
                        <NavLink to="/products/detail">
                          <img src="/img/product/small/product-4.webp" className="card-img rounded-md h-100 sw-8" alt="thumb" />
                        </NavLink>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="mb-1">
                              <NavLink to="/products/detail" className="body-link">
                              Содовый хлеб
                              </NavLink>{' '}
                              <span className="text-muted">от</span>{' '}
                              <NavLink to="/customers/detail" className="body-link">
                              Кэтлин Берта
                              </NavLink>
                            </div>
                            <div className="text-small text-muted text-truncate mb-1">
                            Шоколадный батончик марципановый марципановый морковный торт имбирное печенье мороженое. Мороженое датский сахарный сливовый бисквитный пудинг порошок
                               суфле пончик миндальное печенье.
                            </div>
                            <Rating
                              initialRating={5}
                              emptySymbol={<i className="cs-star text-primary" />}
                              fullSymbol={<i className="cs-star-full text-primary" />}
                            />
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </OverlayScrollbarsComponent>
                </Card.Body>
              </Card>
            </Col> */}
      {/* Recent Reviews End */}
      {/* </Row> */}
      {/* </Col> */}
      {/* Tips Start */}
      {/* <Col xs="12" xxl="auto" className="mb-5">
          <h2 className="small-title">Советы</h2>
          <Card className="h-100-card sw-xxl-40">
            <Card.Body className="d-flex flex-column justify-content-between align-items-start">
              <div>
                <div className="cta-3">Больше продаж?</div>
                <div className="mb-3 cta-3 text-primary">Добавить новые продукты!</div>
                <div className="text-muted mb-4">
                  Чизкейк шоколадно-морковный пирог пирог леденец яблочный пирог лимонный крем леденец.
                  <br />
                  Овсяный пирог с лимонными каплями, пирог с жевательной резинкой, хлопок.
                </div>
              </div>
              <NavLink to="/products/list" className="btn btn-icon btn-icon-start btn-outline-primary stretched-link">
                <CsLineIcons icon="plus" />
                <span>Добавить продукты</span>
              </NavLink>
            </Card.Body>
          </Card>
        </Col> */}
      {/* Tips End */}
      {/* </Row> */}

      {/* <Row className="gx-4 gy-5"> */}
      {/* Top Selling Items Start */}

      {/* <Col xl="6">
          <h2 className="small-title">Самые продаваемые товары</h2>
          <div className="mb-n2">
            <Card className="mb-2">
              <Row className="g-0 sh-14 sh-md-10">
                <Col className="col-auto">
                  <NavLink to="/products/detail">
                    <img src="/img/product/small/product-1.webp" alt="alternate text" className="card-img card-img-horizontal sw-11" />
                  </NavLink>
                </Col>
                <Col>
                  <Card.Body className="pt-0 pb-0 h-100">
                    <Row className="g-0 h-100 align-content-center">
                      <Col md="6" className="d-flex align-items-center mb-2 mb-md-0">
                        <NavLink to="/products/detail">Холермус</NavLink>
                      </Col>
                      <Col md="3" className="d-flex align-items-center text-muted text-medium">
                        Мультизерновые
                      </Col>
                      <Col md="3" className="d-flex align-items-center justify-content-md-end text-muted text-medium">
                        4.024 Продажи
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="mb-2">
              <Row className="g-0 sh-14 sh-md-10">
                <Col className="col-auto">
                  <NavLink to="/products/detail">
                    <img src="/img/product/small/product-2.webp" alt="alternate text" className="card-img card-img-horizontal sw-11" />
                  </NavLink>
                </Col>
                <Col>
                  <Card.Body className="pt-0 pb-0 h-100">
                    <Row className="g-0 h-100 align-content-center">
                      <Col md="6" className="d-flex align-items-center mb-2 mb-md-0">
                        <NavLink to="/products/detail">Руисрейкалейпя</NavLink>
                      </Col>
                      <Col md="3" className="d-flex align-items-center text-muted text-medium">
                        Закваска
                      </Col>
                      <Col md="3" className="d-flex align-items-center justify-content-md-end text-muted text-medium">
                        2.701 Продажи
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="mb-2">
              <Row className="g-0 sh-14 sh-md-10">
                <Col className="col-auto">
                  <NavLink to="/products/detail">
                    <img src="/img/product/small/product-3.webp" alt="alternate text" className="card-img card-img-horizontal sw-11" />
                  </NavLink>
                </Col>
                <Col>
                  <Card.Body className="pt-0 pb-0 h-100">
                    <Row className="g-0 h-100 align-content-center">
                      <Col md="6" className="d-flex align-items-center mb-2 mb-md-0">
                        <NavLink to="/products/detail">Бармбрек</NavLink>
                      </Col>
                      <Col md="3" className="d-flex align-items-center text-muted text-medium">
                        Цельнозерновой
                      </Col>
                      <Col md="3" className="d-flex align-items-center justify-content-md-end text-muted text-medium">
                        1.972 Продажи
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
            <Card className="mb-2">
              <Row className="g-0 sh-14 sh-md-10">
                <Col className="col-auto">
                  <NavLink to="/products/detail">
                    <img src="/img/product/small/product-4.webp" alt="alternate text" className="card-img card-img-horizontal sw-11" />
                  </NavLink>
                </Col>
                <Col>
                  <Card.Body className="pt-0 pb-0 h-100">
                    <Row className="g-0 h-100 align-content-center">
                      <Col md="6" className="d-flex align-items-center mb-2 mb-md-0">
                        <NavLink to="/products/detail">Сырный свиток</NavLink>
                      </Col>
                      <Col md="3" className="d-flex align-items-center text-muted text-medium">
                        Цельнозерновой
                      </Col>
                      <Col md="3" className="d-flex align-items-center justify-content-md-end text-muted text-medium">
                        1.543 Продажи
                      </Col>
                    </Row>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        </Col> */}
      {/* Top Selling Items End */}

      {/* Top Search Terms Start */}
      {/* <Col xl="6">
          <h2 className="small-title">Популярные поисковые запросы</h2>
          <Card className="sh-35 h-xl-100-card">
            <Card.Body className="h-100 scroll-out">
              <OverlayScrollbarsComponent
                options={{ scrollbars: { autoHide: 'leave' }, overflowBehavior: { x: 'hidden', y: 'scroll' } }}
                className="h-100 mb-n2"
              >
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Цельнозерновой хлеб</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">847</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>белый хлеб</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">753</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Хлеб на закваске</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">721</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Дынный хлеб</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">693</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Безглютеновый хлеб</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">431</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>нарезанный цельнозерновой хлеб</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">381</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Фасованный хлеб Алтайский</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">310</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Бармовый торт</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">301</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Лаваш</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">288</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Тафтановый торт</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">219</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>хлебная палочка</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">184</Badge>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-between mb-2">
                  <div className="d-flex flex-column">
                    <div>Штирер Брот</div>
                  </div>
                  <div className="d-flex">
                    <Badge bg="outline-secondary">175</Badge>
                  </div>
                </div>
              </OverlayScrollbarsComponent>
            </Card.Body>
          </Card>
        </Col> */}
      {/* Top Search Terms End */}
      {/* </Row> */}
    </>
  );
};

export default Dashboard;

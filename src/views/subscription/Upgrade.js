import React from 'react';
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const Upgrade = () => {
  const title = 'Подписка';
  const description = 'Страница подписки';

  return (
    <>
      <HtmlHead title={title} description={description} />
      <Col>
        {/* Title Start */}
        <Col className="col-auto mb-3 mb-sm-0 me-auto">
          <a className="muted-link pb-1 d-inline-block hidden breadcrumb-back" href="/profile">
            <CsLineIcons icon="chevron-left" size="13" />
            <span className="align-middle fs-7 mb-1 ms-1">Профиль</span>
          </a>
          <h1 className="mb-0 pb-0 display-4 mb-3" id="title">
            Подписка
          </h1>
        </Col>
        {/* Title End */}

        {/* Prices Start */}
        <Row className="row-cols-1 row-cols-lg-3 g-2 mb-5">
          <Col>
            <Card className="h-100 hover-scale-up">
              <Card.Body className="pb-0">
                {/* <Badge pill bg="primary" className="me-1 position-absolute s-2 t-n2 z-index-1">
                  SALE
                </Badge> */}
                <div className="d-flex flex-column align-items-center mb-4">
                  <div className="bg-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center mb-2">
                    <CsLineIcons icon="building" className="text-white" />
                  </div>
                  <div className="cta-4 text-primary mb-1">Lite</div>
                  {/* <div className="text-muted sh-3 line-through">$ 3000</div> */}
                  <div className="display-4">1300 руб</div>
                  <div className="text-small text-muted mb-1">В месяц</div>
                </div>
                <p className="text-alternate text-center mb-4">Базовые функции для введения микробизнеса</p>
              </Card.Body>
              <Card.Footer className="pt-0 border-0">
                <div className="mb-4">
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="cart" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество товаров: 50</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="support" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Техническая поддержка</Col>
                  </Row>
                  {/* <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="coin" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Баллы за вступление</Col>
                  </Row> */}
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="coin" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Кешбек/Скидка</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="tag" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество бонусных программ: 1</Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <Button variant="foreground" className="btn-icon btn-icon-start hover-outline stretched-link">
                    <CsLineIcons icon="chevron-right" /> <span>Подписаться</span>
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 hover-scale-up">
              <Card.Body className="pb-0">
                {/* <Badge pill bg="primary" className="me-1 position-absolute s-2 t-n2 z-index-1">
                  SALE
                </Badge> */}
                <div className="d-flex flex-column align-items-center mb-4">
                  <div className="bg-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center mb-2">
                    <CsLineIcons icon="building" className="text-white" />
                  </div>
                  <div className="cta-4 text-primary mb-1">Standart</div>
                  {/* <div className="text-muted sh-3 line-through">$ 3000</div> */}
                  <div className="display-4">3000 руб</div>
                  <div className="text-small text-muted mb-1">В месяц</div>
                </div>
                <p className="text-alternate text-center mb-4">Базовые и дополнительные функции для бизнеса</p>
              </Card.Body>
              <Card.Footer className="pt-0 border-0">
                <div className="mb-4">
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="cart" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество товаров: 300</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="news" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество новостей и акций: 20. Публикация в день: 2</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="coin" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Начисление баллов вручную</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="tag" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество бонусных программ: 3</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="plus" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Все функции предыдущего тарифа: Lite</Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <Button variant="foreground" className="btn-icon btn-icon-start hover-outline stretched-link">
                    <CsLineIcons icon="chevron-right" /> <span>Подписаться</span>
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col>
            <Card className="h-100 hover-scale-up">
              <Card.Body className="pb-0">
                <div className="d-flex flex-column align-items-center mb-4">
                  <div className="bg-primary sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center mb-2">
                    <CsLineIcons icon="building-large" className="text-white" />
                  </div>
                  <div className="cta-4 text-primary mb-1">Pro</div>
                  {/* <div className="text-muted sh-3" /> */}
                  <div className="display-4">6000 руб</div>
                  <div className="text-small text-muted mb-1">В месяц</div>
                </div>
                <p className="text-alternate text-center mb-4">Все функции сервиса</p>
              </Card.Body>
              <Card.Footer className="pt-0 border-0">
                <div className="mb-4">
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="cart" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество товаров: 600</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="news" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество новостей и акций: 35. Публикация в день: 3</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="tag" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Количество бонусных программ: 6</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="invoice" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Отправка новостей и акций для всех клиентов сервиса. Количество: 5. Публикация в день: 2</Col>
                  </Row>
                  <Row className="g-0 mb-2">
                    <Col xs="auto">
                      <div className="sw-3 me-1">
                        <CsLineIcons icon="plus" className="d-inline-block text-primary align-top" size="17" />
                      </div>
                    </Col>
                    <Col className="lh-1-25 text-alternate">Все функции предыдущего тарифа: Lite и Standart</Col>
                  </Row>
                </div>
                <div className="d-flex justify-content-center">
                  <Button variant="foreground" className="btn-icon btn-icon-start hover-outline stretched-link">
                    <CsLineIcons icon="chevron-right" /> <span>Подписаться</span>
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        {/* Prices End */}

        {/* Features Start */}
        {/* <h2 className="small-title">Features</h2>
        <Row className="row-cols-1 row-cols-xl-2 g-2 mb-5">
          <Col>
            <Card className="h-100">
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/icon-performance.webp" className="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="performance" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading stretched-link mb-2 d-inline-block">
                      High Availability
                    </NavLink>
                    <p>Caramels sesame snaps apple pie fruitcake cheesecake topping lemon drops gummi bears icing. Chocolate cake bonbon tootsie.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/icon-configure.webp" className="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="performance" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading stretched-link mb-2 d-inline-block">
                      Resource Efficiency
                    </NavLink>
                    <p>Sesame lemon drops snaps apple bonbon tootsie pie fruitcake cheesecake topping lemon drops gummi bears icing topping.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/icon-database.webp" className="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="performance" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading stretched-link mb-2 d-inline-block">
                      Easy Scalability
                    </NavLink>
                    <p>Cheesecake topping lemon drops gummi bears icing. Chocolate cake bonbon tootsie. Pie gummies pie fruitcake dessert powder.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card className="h-100">
              <Card.Body>
                <Row className="g-0">
                  <Col xs="12" sm="auto" className="pe-4 d-flex justify-content-center">
                    <img src="/img/illustration/icon-experiment.webp" className="w-auto sw-md-14 sw-xl-11 img-fluid theme-filter" alt="performance" />
                  </Col>
                  <Col xs="12" className="col-sm">
                    <NavLink to="#" className="heading stretched-link mb-2 d-inline-block">
                      Streamline Operations
                    </NavLink>
                    <p>Apple pie fruitcake cheesecake topping lemon drops gummi bears icing. Chocolate cake bonbon tootsie.</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row> */}
        {/* Features End */}

        {/* Compare Start */}
        {/* <h2 className="small-title">Compare</h2>
        <Row className="g-2">
          <Col xs="3" className="d-none d-xl-block">
            <Card className="no-shadow bg-transparent">
              <Card.Body className="px-0">
                <div className="h-auto sh-xl-8 mb-3 mb-xl-0" />
                <ul className="list-unstyled">
                  <li className="mb-5">Cookie bonbon</li>
                  <li className="mb-5">Lemon drops</li>
                  <li className="mb-5">Tootsie roll</li>
                  <li className="mb-5">Marshmallow lollipop</li>
                  <li className="mb-5">Carrot cake</li>
                  <li className="mb-5">Soufflé cheesecake</li>
                  <li className="mb-5">Muffin cheesecake sesame</li>
                  <li className="mb-5">Sweet sugar plum wafer</li>
                  <li className="mb-5">Jelly beans</li>
                  <li className="mb-5">Marshmallow tootsie</li>
                </ul>
              </Card.Body>
            </Card>
          </Col> */}
        {/* <Col xl="3">
            <Card>
              <Card.Body className="text-xl-center">
                <div className="h-auto sh-xl-8 mb-3 mb-xl-0">
                  <div className="heading text-primary mb-0">Developer</div>
                </div>
                <ul className="list-unstyled mb-n4 mb-xl-n5">
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Cookie bonbon</div>5 Users
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Lemon drops</div>
                    Up to 5 GB
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Tootsie roll</div>2 Cores
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow lollipop</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Carrot cake</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Soufflé cheesecake</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Muffin cheesecake sesame</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Sweet sugar plum wafer</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Jelly beans</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow tootsie</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col> */}
        {/* <Col xl="3">
            <Card>
              <Card.Body className="text-xl-center">
                <div className="h-auto sh-xl-8 mb-3 mb-xl-0">
                  <div className="heading text-primary mb-0">Team</div>
                </div>
                <ul className="list-unstyled mb-n4 mb-xl-n5">
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Cookie bonbon</div>50 Users
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Lemon drops</div>
                    Up to 50 GB
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Tootsie roll</div>8 Cores
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow lollipop</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Carrot cake</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Soufflé cheesecake</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Muffin cheesecake sesame</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Sweet sugar plum wafer</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Jelly beans</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow tootsie</div>
                    <CsLineIcons icon="check-square" className="text-separator" size="15" />
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col> */}
        {/* <Col xl="3">
            <Card>
              <Card.Body className="text-xl-center">
                <div className="h-auto sh-xl-8 mb-3 mb-xl-0">
                  <div className="heading text-primary mb-0">Company</div>
                </div>
                <ul className="list-unstyled mb-n4 mb-xl-n5">
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Cookie bonbon</div>50+ Users
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Lemon drops</div>
                    Unlimited
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Tootsie roll</div>16 Cores
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow lollipop</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Carrot cake</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Soufflé cheesecake</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Muffin cheesecake sesame</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Sweet sugar plum wafer</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Jelly beans</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                  <li className="mb-4 mb-xl-5">
                    <div className="text-muted text-small text-uppercase d-xl-none mb-1">Marshmallow tootsie</div>
                    <CsLineIcons icon="check-square" className="text-alternate" size="15" />
                  </li>
                </ul>
              </Card.Body>
            </Card>
          </Col> */}
        {/* </Row> */}
        {/* Compare End */}
      </Col>
    </>
  );
};

export default Upgrade;

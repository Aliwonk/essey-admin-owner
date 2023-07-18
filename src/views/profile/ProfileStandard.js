import React, { useEffect } from 'react';
import { Button, Row, Col, Card, Form, Tab, NavLink } from 'react-bootstrap';
import { LAYOUT } from 'constants.js';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import useCustomLayout from 'hooks/useCustomLayout';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileOwner } from 'auth/async';
// import ProfileChart from './components/ProfileChart';

const ProfileStandard = () => {
  const dispatch = useDispatch();
  const { currentUser, user } = useSelector((state) => state.auth);
  const title = 'Профиль';
  const description = 'Страница профиля';

  // useEffect(() => {
  //   dispatch(fetchProfileOwner(user.token));
  // }, [user.token, dispatch]);

  useCustomLayout({ layout: LAYOUT.Boxed });

  return (
    <>
      <HtmlHead title={title} description={description} />
      {/* Title and Top Buttons Start */}
      <div className="page-title-container">
        {/* <Row> */}
        {/* Title Start */}
        <Col className="col-auto mb-3 mb-sm-0 me-auto">
          <a className="muted-link pb-1 d-inline-block hidden breadcrumb-back mb-2" href="/">
            <CsLineIcons icon="chevron-left" size="13" />
            <span className="align-middle text-small ms-1">Дашборд</span>
          </a>
          <h1 className="mb-0 pb-0 display-4" id="title">
            {title}
          </h1>
        </Col>
        {/* Title End */}

        {/* Top Buttons Start */}
        {/* <Col md="5" className="d-flex align-items-start justify-content-end">
            <Button variant="outline-primary" className="btn-icon btn-icon-start btn-icon w-100 w-md-auto ms-1">
              <CsLineIcons icon="edit-square" /> <span>Edit</span>
            </Button>
          </Col> */}
        {/* Top Buttons End */}
        {/* </Row> */}
      </div>
      {/* Title and Top Buttons End */}

      <Row className="g-5">
        <Tab.Container id="profileStandard" defaultActiveKey="overview">
          {/* Sidebar Start */}
          <Col xl="4" xxl="3">
            <h2 className="small-title">Профиль</h2>
            <Card className="mb-5">
              <Card.Body>
                <div className="d-flex align-items-center flex-column mb-4">
                  <div className="d-flex align-items-center flex-column">
                    <div className="sw-13 position-relative mb-3">
                      <img src="https://img.icons8.com/bubbles/100/administrator-male.png" className="img-fluid rounded-xl" alt="thumb" />
                    </div>
                    <div className="h5 mb-0">
                      {currentUser.firstName} {currentUser.lastName} {currentUser.patronymic}
                    </div>
                    <div className="text-muted">Владелец</div>
                    {/* <div className="text-muted">
                      <CsLineIcons icon="pin" className="me-1" />
                      <span className="align-middle">Montreal, Canada</span>
                    </div> */}
                  </div>
                </div>
                {/* <Nav className="flex-column" activeKey="overview">
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="overview">
                    <CsLineIcons icon="activity" className="me-2" size="17" />
                    <span className="align-middle">Overview</span>
                  </Nav.Link>
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="projects">
                    <CsLineIcons icon="suitcase" className="me-2" size="17" />
                    <span className="align-middle">Projects</span>
                  </Nav.Link>
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="permissions">
                    <CsLineIcons icon="lock-off" className="me-2" size="17" />
                    <span className="align-middle">Permissions</span>
                  </Nav.Link>
                  <Nav.Link className="px-0 border-bottom border-separator-light cursor-pointer" eventKey="friends">
                    <CsLineIcons icon="heart" className="me-2" size="17" />
                    <span className="align-middle">Friends</span>
                  </Nav.Link>
                  <Nav.Link className="px-0 cursor-pointer" eventKey="about">
                    <CsLineIcons icon="user" className="me-2" size="17" />
                    <span className="align-middle">About</span>
                  </Nav.Link>
                </Nav> */}
              </Card.Body>
            </Card>
          </Col>
          {/* Sidebar End */}

          {/* Content Start */}
          <Col xl="8" xxl="9">
            <Tab.Content>
              <Tab.Pane eventKey="overview">
                {/* Overview Tab Start */}

                {/* Stats Start */}
                <h2 className="small-title">Информация</h2>
                <Row className="g-2 mb-5">
                  <Col sm="6" lg="3">
                    <NavLink style={{ padding: '0 0 0 0', lineHeight: 'inherit' }} href="/subscription">
                      <Card className="hover-border-primary">
                        <Card.Body>
                          <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>Подписка</span>
                            <CsLineIcons icon="check-square" className="text-primary" />
                          </div>
                          <div className="text-small text-muted mb-1">ТИП</div>
                          <div className="cta-1 text-primary">{currentUser.subscription && currentUser.subscription[0].type}</div>
                        </Card.Body>
                      </Card>
                    </NavLink>
                  </Col>
                  <Col sm="6" lg="3">
                    <NavLink style={{ padding: '0 0 0 0', lineHeight: 'inherit' }} href="/company">
                      <Card className="hover-border-primary">
                        <Card.Body>
                          <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                            <span>Компания</span>
                            <CsLineIcons icon="building" className="text-primary" />
                          </div>
                          <div className="text-small text-muted mb-1">НАЗВАНИЕ</div>
                          <div className="cta-1 text-primary">{currentUser.list_shop && currentUser.list_shop[0].name}</div>
                        </Card.Body>
                      </Card>
                    </NavLink>
                  </Col>
                  {/* <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Notes</span>
                          <CsLineIcons icon="file-empty" className="text-primary" />
                        </div>
                        <div className="text-small text-muted mb-1">RECENT</div>
                        <div className="cta-1 text-primary">24</div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col sm="6" lg="3">
                    <Card className="hover-border-primary">
                      <Card.Body>
                        <div className="heading mb-0 d-flex justify-content-between lh-1-25 mb-3">
                          <span>Views</span>
                          <CsLineIcons icon="screen" className="text-primary" />
                        </div>
                        <div className="text-small text-muted mb-1">THIS MONTH</div>
                        <div className="cta-1 text-primary">524</div>
                      </Card.Body>
                    </Card>
                  </Col> */}
                </Row>
                {/* Stats End */}

                {/* Activity Start */}
                {/* <h2 className="small-title">Activity</h2>
                <Card className="mb-5">
                  <Card.Body>
                    <div className="sh-35">
                      <ProfileChart />
                    </div>
                  </Card.Body>
                </Card> */}
                {/* Activity End */}

                {/* Timeline Start */}
                {/* <h2 className="small-title">Timeline</h2>
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
                                Developing Components
                              </Button>
                              <div className="text-alternate">21.12.2021</div>
                              <div className="text-muted mt-1">
                                Jujubes tootsie roll liquorice cake jelly beans pudding gummi bears chocolate cake donut. Jelly-o sugar plum fruitcake bonbon
                                bear claw cake cookie chocolate bar. Tiramisu soufflé apple pie.
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
                                HTML Structure
                              </Button>
                              <div className="text-alternate">14.12.2021</div>
                              <div className="text-muted mt-1">
                                Pudding gummi bears chocolate chocolate apple pie powder tart chupa chups bonbon. Donut biscuit chocolate cake pie topping.
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
                                Sass Structure
                              </Button>
                              <div className="text-alternate">03.11.2021</div>
                              <div className="text-muted mt-1">
                                Jelly-o wafer sesame snaps candy canes. Danish dragée toffee bonbon. Jelly-o marshmallow cake oat cake caramels jujubes.
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
                                Final Design
                              </Button>
                              <div className="text-alternate">15.10.2021</div>
                              <div className="text-muted mt-1">
                                Chocolate apple pie powder tart chupa chups bonbon. Donut biscuit chocolate cake pie topping.{' '}
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
                        <div className="w-100 d-flex h-100 justify-content-center position-relative" />
                      </Col>
                      <Col>
                        <div className="h-100">
                          <div className="d-flex flex-column justify-content-start">
                            <div className="d-flex flex-column">
                              <Button variant="link" className="p-0 pt-1 heading text-start">
                                Wireframe Design
                              </Button>
                              <div className="text-alternate">08.06.2021</div>
                              <div className="text-muted mt-1">
                                Chocolate apple pie powder tart chupa chups bonbon. Donut biscuit chocolate cake pie topping.
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card> */}
                {/* Timeline End */}

                {/* Logs Start */}
                {/* <h2 className="small-title">Logs</h2>
                <Card>
                  <Card.Body className="mb-n2">
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">18:43</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">New user registiration</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">16:25</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="square" className="text-secondary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Product out of stock: Breadstick</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">15:10</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="triangle" className="text-tertiary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">Category page returned an error</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">15:00</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">14 products added</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">14:35</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="circle" className="text-primary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">New sale: Steirer Brot</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row className="g-0 mb-2">
                      <Col xs="auto">
                        <div className="sw-6 d-inline-block d-flex justify-content-start align-items-center h-100 me-2">
                          <div className="text-muted mt-n1 lh-1-25">14:15</div>
                        </div>
                      </Col>
                      <Col xs="auto">
                        <div className="sw-2 d-inline-block d-flex justify-content-start align-items-center h-100">
                          <div className="sh-3">
                            <CsLineIcons icon="hexagon" className="text-quaternary align-top" />
                          </div>
                        </div>
                      </Col>
                      <Col>
                        <div className="d-flex flex-column pt-0 pb-0 ps-3 pe-0 h-100 justify-content-center">
                          <div className="d-flex flex-column">
                            <div className="text-alternate mt-n1 lh-1-25">New sale: Steirer Brot</div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card> */}
                {/* Logs End */}
                {/* Overview Tab End */}

                <Col>
                  {/* Public Info Start */}
                  <h2 className="small-title">Данные</h2>
                  <Card className="mb-5">
                    <Card.Body>
                      <Form>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Фамилия</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="text" defaultValue={currentUser.firstName} />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Имя</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="text" defaultValue={currentUser.lastName} />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Отчество</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="text" defaultValue={currentUser.patronymic} />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Номер телефона</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="text" defaultValue={currentUser.phone} />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Email</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="email" value={currentUser.email} disabled />
                          </Col>
                        </Row>
                        <Row className="mt-5">
                          <Col lg="2" md="3" sm="4" />
                          <Col sm="8" md="9" lg="10">
                            <Button variant="outline-primary" className="mb-1">
                              Обновить
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                  {/* Public Info End */}

                  {/* Contact Start */}
                  {/* <h2 className="small-title">Contact</h2>
                  <Card className="mb-5">
                    <Card.Body>
                      <Form>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Primary Email</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="email" defaultValue="me@lisajackson.com" disabled />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Secondary Email</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="email" defaultValue="lisajackson@gmail.com" />
                          </Col>
                        </Row>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Phone</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Control type="text" defaultValue="+6443884455" />
                          </Col>
                        </Row>
                        <Row className="mt-5">
                          <Col lg="2" md="3" sm="4" />
                          <Col sm="8" md="9" lg="10">
                            <Button variant="outline-primary" className="mb-1">
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card> */}
                  {/* Contact End */}

                  {/* Jobs Start */}
                  {/* <h2 className="small-title">Contact</h2>
                  <Card className="mb-5">
                    <Card.Body>
                      <Form>
                        <Row className="mb-3">
                          <Col lg="2" md="3" sm="4">
                            <Form.Label className="col-form-label">Freelance</Form.Label>
                          </Col>
                          <Col sm="8" md="9" lg="10">
                            <Form.Check type="checkbox" className="mt-2" label="I am available for hire" id="freelanceCheckbox" />
                          </Col>
                        </Row>
                        <Row className="mt-5">
                          <Col lg="2" md="3" sm="4" />
                          <Col sm="8" md="9" lg="10">
                            <Button variant="outline-primary" className="mb-1">
                              Update
                            </Button>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card> */}
                  {/* Jobs End */}
                </Col>
              </Tab.Pane>
            </Tab.Content>
          </Col>
          {/* Content End */}
        </Tab.Container>
      </Row>
    </>
  );
};

export default ProfileStandard;

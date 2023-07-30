import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { useDispatch, useSelector } from 'react-redux';
import { getDate } from 'utils/date';
import Loader from 'components/loader';
import { DEFAUTL_WS_URL } from 'config';
import { fetchOrdersCompany } from '../slice/async';

const socket = io(DEFAUTL_WS_URL);

const OrdersList = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError } = useSelector((state) => state.orders);
  const [shopOrders, setShopOrders] = useState(orders);
  const { currentUser } = useSelector((state) => state.auth);
  const [badgeColoStatusOrders, setBadgeColoStatusOrders] = useState(window.localStorage.getItem('badge-color-status-orders') || 'dark');
  const filterStatus = window.localStorage.getItem('status-orders');
  const [statusOrders, setSatusOrders] = useState(filterStatus !== undefined ? filterStatus : 'Все');
  const title = 'Список заказов';
  const description = 'Страница списка заказов';

  function searchEvent(event) {
    const filterByPhone = orders.filter((order) => order.client.phone.includes(event.target.value));
    setShopOrders(filterByPhone);
  }

  const allItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [selectedItems, setSelectedItems] = useState([]);
  const checkItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((x) => x !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };
  const toggleCheckAll = (allSelect) => {
    if (allSelect) {
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]);
    }
  };

  function changeStatus(status) {
    setSatusOrders(status);
    window.localStorage.setItem('status-orders', status);
    if (Object.keys(currentUser).length > 0) {
      dispatch(fetchOrdersCompany(`${currentUser.list_shop[0].id}?status=${status}`));
    }
    switch (status) {
      case 'В обработке':
        setBadgeColoStatusOrders('warning');
        window.localStorage.setItem('badge-color-status-orders', 'warning');
        break;
      case 'Принят':
        setBadgeColoStatusOrders('secondary');
        window.localStorage.setItem('badge-color-status-orders', 'secondary');
        break;
      case 'Отправлен':
        setBadgeColoStatusOrders('info');
        window.localStorage.setItem('badge-color-status-orders', 'info');
        break;
      case 'Доставлен':
        setBadgeColoStatusOrders('success');
        window.localStorage.setItem('badge-color-status-orders', 'success');
        break;
      case 'Отменен':
        setBadgeColoStatusOrders('danger');
        window.localStorage.setItem('badge-color-status-orders', 'danger');
        break;
      default:
        setBadgeColoStatusOrders('dark');
        window.localStorage.setItem('badge-color-status-orders', 'dark');
        break;
    }
  }

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      socket.on('connect', () => {
        console.log('connect');
      });

      socket.on('new-order', (data) => {
        if (data === true) {
          const player = document.getElementById('audio-notification').play();

          if (player !== undefined) {
            player.then((_) => {}).catch((error) => {});
          }
          if (Object.keys(currentUser).length > 0) {
            dispatch(fetchOrdersCompany(`${currentUser.list_shop[0].id}?status=В обработке`));
            window.localStorage.setItem('status-orders', 'В обработке');
            window.localStorage.setItem('badge-color-status-orders', 'warning');
          }
        }
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(fetchOrdersCompany(`${currentUser.list_shop[0].id}?status=${filterStatus}`));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    setShopOrders(orders);
  }, [orders]);

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Дашборт</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
            <div className="btn-group ms-1 check-all-container">
              <CheckAll
                allItems={allItems}
                selectedItems={selectedItems}
                onToggle={toggleCheckAll}
                inputClassName="form-check"
                className="btn btn-outline-primary btn-custom-control py-0"
              />
              <Dropdown align="end">
                <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
                <Dropdown.Menu>
                  <Dropdown.Item>Двигаться</Dropdown.Item>
                  <Dropdown.Item>Архив</Dropdown.Item>
                  <Dropdown.Item>Удалить</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row className="mb-3">
        <Col md="5" lg="3" xxl="2" className="mb-1">
          {/* Search Start */}
          <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
            <Form.Control type="text" placeholder="Поиск" onChange={(e) => searchEvent(e)} />
            <span className="search-magnifier-icon">
              <CsLineIcons icon="search" />
            </span>
            <span className="search-delete-icon d-none">
              <CsLineIcons icon="close" />
            </span>
          </div>
          {/* Search End */}
        </Col>
        <Col md="7" lg="9" xxl="10" className="mb-1 text-end">
          {/* Print Button Start */}
          {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Распечатать</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger> */}
          {/* Print Button End */}

          {/* Export Dropdown Start */}
          {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Экспорт</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="dropdown-toggle-no-arrow btn btn-icon btn-icon-only shadow">
                <CsLineIcons icon="download" />
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#">Копировать</Dropdown.Item>
              <Dropdown.Item href="#">Excel</Dropdown.Item>
              <Dropdown.Item href="#">Резюме</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
          {/* Export Dropdown End */}

          {/* Status start */}
          <Dropdown style={{ fontSize: '1.2em' }} align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Фильтр по статусу</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-16">
                <Badge bg={badgeColoStatusOrders}>{statusOrders}</Badge>
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item onClick={() => changeStatus('В обработке')}>
                <Badge bg="warning">В обработке</Badge>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus('Принят')}>
                <Badge bg="secondary">Принят</Badge>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus('Отправлен')}>
                <Badge bg="info">Отправлен</Badge>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus('Доставлен')}>
                <Badge bg="success">Доставлен</Badge>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus('Отменен')}>
                <Badge bg="danger">Отменен</Badge>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeStatus('Все')}>
                <Badge bg="dark">Все</Badge>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Status end */}

          {/* Length Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Количество предметов</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-18">
                10 Предметы
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item href="#">5 Предметы</Dropdown.Item>
              <Dropdown.Item href="#">10 Предметы</Dropdown.Item>
              <Dropdown.Item href="#">20 Предметы</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Length End */}
        </Col>
      </Row>

      {/* List Header Start */}
      <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
        <Col md="2" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
          <div className="text-muted text-small cursor-pointer sort">ID</div>
        </Col>
        <Col md="3" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">ИМЯ</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">ПОКУПКА</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">ДАТА</div>
        </Col>
        <Col md="2" className="d-flex flex-column pe-1 justify-content-center">
          <div className="text-muted text-small cursor-pointer sort">СТАТУС</div>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {shopOrders.length === 0 ? (
        <></>
      ) : (
        <>
          {!isLoading && orders.length > 0 ? (
            shopOrders.map((order, index) => {
              let bageCol = 'warning';

              switch (order.status) {
                case 'Принят':
                  bageCol = 'secondary';
                  break;
                case 'Отправлен':
                  bageCol = 'info';
                  break;
                case 'Доставлен':
                  bageCol = 'success';
                  break;
                case 'Отменен':
                  bageCol = 'danger';
                  break;
                default:
                  break;
              }
              // console.log(order.client);
              return (
                <>
                  <Card
                    // ${selectedItems.includes(1) && 'selected'}`
                    className={`mb-2 `}
                    onClick={() => {
                      document.location.href = `/order/${order.id}`;
                    }}
                  >
                    <Card.Body className="pt-0 pb-0 sh-21 sh-md-8">
                      <Row className="g-0 h-100 align-content-center cursor-default" onClick={() => checkItem(1)}>
                        <Col xs="11" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-1 order-md-1 h-md-100 position-relative">
                          <div className="text-muted text-small d-md-none">Id</div>
                          <NavLink to={`/order/${order.id}`} className="text-truncate h-100 d-flex align-items-center">
                            {index + 1}
                          </NavLink>
                        </Col>
                        <Col xs="6" md="3" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-3 order-md-2">
                          <div className="text-muted text-small d-md-none">Клиент</div>
                          <div className="text-alternate">
                            {order.client && order.client.lastName} {order.client && order.client.firstName}
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-4 order-md-3">
                          <div className="text-muted text-small d-md-none">Покупка</div>
                          <div className="text-alternate">
                            <span>
                              {/* <span className="text-small">$</span> */}
                              {order.amount} руб
                            </span>
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-5 order-md-4">
                          <div className="text-muted text-small d-md-none">Дата</div>
                          <div className="text-alternate">
                            {getDate(order.createdDate).date} {getDate(order.createdDate).time}
                          </div>
                        </Col>
                        <Col xs="6" md="2" className="d-flex flex-column justify-content-center mb-2 mb-md-0 order-last order-md-5">
                          <div className="text-muted text-small d-md-none">Статус</div>
                          <div>
                            <Badge bg={bageCol}>{order.status}</Badge>
                          </div>
                        </Col>
                        {/* <Col xs="1" md="1" className="d-flex flex-column justify-content-center align-items-md-end mb-2 mb-md-0 order-2 text-end order-md-last">
                          <Form.Check className="form-check mt-2 ps-5 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => {}} />
                        </Col> */}
                      </Row>
                    </Card.Body>
                  </Card>
                </>
              );
            })
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
        </>
      )}
      {/* List Items End */}

      {/* Pagination Start */}
      {/* <div className="d-flex justify-content-center mt-5">
        <Pagination>
          <Pagination.Prev className="shadow" disabled>
            <CsLineIcons icon="chevron-left" />
          </Pagination.Prev>
          <Pagination.Item className="shadow" active>
            1
          </Pagination.Item>
          <Pagination.Item className="shadow">2</Pagination.Item>
          <Pagination.Item className="shadow">3</Pagination.Item>
          <Pagination.Next className="shadow">
            <CsLineIcons icon="chevron-right" />
          </Pagination.Next>
        </Pagination>
      </div> */}
      {/* Pagination End */}
    </>
  );
};

export default OrdersList;

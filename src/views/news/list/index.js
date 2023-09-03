import HtmlHead from 'components/html-head/HtmlHead';
import Loader from 'components/loader';
import { DEFAUTL_BACKEND_URL } from 'config';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { getDate } from 'utils/date';
import { fetchListNews } from '../slice/async';

const NewsList = () => {
  const dispatch = useDispatch();
  const { isLoading, listNews } = useSelector((state) => state.news);
  const { currentUser, user } = useSelector((state) => state.auth);
  const title = 'Новости';
  const description = 'Страница новости';

  //   function searchEvent(event) {
  //     const filterByPhone = orders.filter((order) => order.client.phone.includes(event.target.value));
  //     setShopOrders(filterByPhone);
  //   }

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

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(
        fetchListNews({
          id: currentUser.list_shop[0].id,
          token: user.token,
        })
      );
    }
  }, [dispatch, currentUser, user.token]);

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle fs-7 mb-1 ms-1">Дашборт</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <a href="/news-add">
              <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Опубликовать новость</span>
              </Button>
            </a>
            <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1 d-inline-block d-lg-none">
              <CsLineIcons icon="sort" />
            </Button>
            {/* <div className="btn-group ms-1 check-all-container">
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
            </div> */}
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row className="mb-3">
        <Col md="5" lg="3" xxl="2" className="mb-1">
          {/* Search Start */}
          <div className="d-inline-block float-md-start me-1 mb-1 search-input-container w-100 shadow bg-foreground">
            <Form.Control type="text" placeholder="Поиск" onChange={(e) => console.log(1)} />
            <span className="search-magnifier-icon">
              <CsLineIcons icon="search" />
            </span>
            <span className="search-delete-icon d-none">
              <CsLineIcons icon="close" />
            </span>
          </div>
          {/* Search End */}
        </Col>
      </Row>
      <Row>
        {listNews.length === 0 ? (
          <></>
        ) : (
          <>
            {!isLoading ? (
              listNews.map((news, index) => {
                return (
                  <Col className="mb-2" xl="3" key={index}>
                    {/* <NavLink to={`/product/${news.id}`}> */}
                    <Card style={{ width: '16rem' }} className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
                      <Card.Img variant="top" src={`${DEFAUTL_BACKEND_URL}/${news.image}`} />
                      <Card.Body style={{ padding: '1rem' }}>
                        <Card.Title>{news.caption}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          {getDate(news.createdDate).date} {getDate(news.createdDate).time}
                        </Card.Subtitle>
                        <Card.Text>{news.description}</Card.Text>
                        {news.name_link ? (
                          <Card.Link style={{ textDecoration: 'underline' }} href={news.link}>
                            {news.name_link}
                          </Card.Link>
                        ) : (
                          <Card.Text className="mb-1">Без ссылки</Card.Text>
                        )}
                      </Card.Body>
                    </Card>
                    {/* </NavLink> */}
                  </Col>
                );
              })
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: 40,
                  marginTop: 20,
                }}
              >
                <Loader
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '35px',
                    height: '30px',
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
      </Row>

      {/* List Header Start */}
      {/* <Row className="g-0 h-100 align-content-center d-none d-lg-flex ps-5 pe-5 mb-2 custom-sort">
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
      </Row> */}
      {/* List Header End */}

      {/* List Items Start */}
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

export default NewsList;

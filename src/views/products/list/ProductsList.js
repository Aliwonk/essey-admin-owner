import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col, Button, Dropdown, Form, Card, Badge, Pagination, Tooltip, OverlayTrigger } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import CheckAll from 'components/check-all/CheckAll';
import { useDispatch, useSelector } from 'react-redux';
import { DEFAUTL_BACKEND_URL } from 'config';
import { getDate } from 'utils/date';
import Loader from 'components/loader';
import { fetchGetListProducts } from '../slice/async';

const ProductsList = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);
  const { currentUser, user } = useSelector((state) => state.auth);
  const title = 'Список продуктов';
  const description = 'Страница списка продуктов';

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
  const [filterItems, setFilterItems] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(
        fetchGetListProducts({
          shopId: currentUser.list_shop[0].id,
          token: user.token,
        })
      );
    }
  }, [currentUser, dispatch, user.token]);

  useEffect(() => {
    console.log(products);
  }, [products]);

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

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            <a href="/product-add">
              <Button variant="outline-primary" className="btn-icon btn-icon-start ms-0 ms-sm-1 w-100 w-md-auto">
                <CsLineIcons icon="plus" /> <span>Добавить новый товар</span>
              </Button>
            </a>
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
            <Form.Control type="text" placeholder="Поиск" />
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
          {/* <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Print</Tooltip>}>
            <Button variant="foreground-alternate" className="btn-icon btn-icon-only shadow">
              <CsLineIcons icon="print" />
            </Button>
          </OverlayTrigger> */}
          {/* Print Button End */}

          {/* Export Dropdown Start */}
          {/* <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Export</Tooltip>}>
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

          {/* Length Start */}
          <Dropdown align={{ xs: 'end' }} className="d-inline-block ms-1">
            <OverlayTrigger delay={{ show: 1000, hide: 0 }} placement="top" overlay={<Tooltip id="tooltip-top">Количество продуктов</Tooltip>}>
              <Dropdown.Toggle variant="foreground-alternate" className="shadow sw-16">
                {filterItems} Продуктов
              </Dropdown.Toggle>
            </OverlayTrigger>
            <Dropdown.Menu className="shadow dropdown-menu-end">
              <Dropdown.Item onClick={() => setFilterItems(5)}>5 Продуктов</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterItems(10)}>10 Продуктов</Dropdown.Item>
              <Dropdown.Item onClick={() => setFilterItems(20)}>20 Продуктов</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          {/* Length End */}
        </Col>
      </Row>

      {/* List Header Start */}
      <Row className="g-0 mb-2 d-none d-lg-flex">
        <Col xs="auto" className="sw-11 d-none d-lg-flex" />
        <Col>
          <Row className="g-0 h-100 align-content-center custom-sort ps-5 pe-4 h-100">
            <Col xs="3" className="d-flex flex-column mb-lg-0 pe-3 d-flex">
              <div className="text-muted text-small cursor-pointer sort">НАЗВАНИЕ</div>
            </Col>
            <Col xs="2" lg="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-small cursor-pointer sort">КАТЕГОРИЯ</div>
            </Col>
            <Col xs="2" lg="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-small cursor-pointer sort">ЦЕНА</div>
            </Col>
            <Col xs="2" lg="3" className="d-flex flex-column pe-1 justify-content-center">
              <div className="text-muted text-small cursor-pointer sort">СОЗДАН</div>
            </Col>
          </Row>
        </Col>
      </Row>
      {/* List Header End */}

      {/* List Items Start */}
      {!isLoading ? (
        products.map((product, index) => {
          return (
            <Card key={index} className={`mb-2 ${selectedItems.includes(1) && 'selected'}`}>
              <Row className="g-0 h-100 sh-lg-9 position-relative">
                <Col xs="auto" className="positio-relative">
                  <NavLink to={`/product/${product.id}`}>
                    <img src={`${DEFAUTL_BACKEND_URL}/${product.goods_images[0].path}`} alt="product" className="card-img card-img-horizontal sw-11 h-100" />
                  </NavLink>
                </Col>
                <Col className="py-4 py-lg-0 ps-5 pe-4 h-100">
                  <Row className="g-0 h-100 align-content-center">
                    <Col xs="11" lg="3" className="d-flex flex-column mb-lg-0 mb-3 pe-3 d-flex order-1 h-lg-100 justify-content-center">
                      <NavLink to={`/product/${product.id}`}>
                        {product.name}
                        <div className="text-small text-muted text-truncate"># {index + 1}</div>
                      </NavLink>
                    </Col>
                    <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-3">
                      <div className="lh-1 text-alternate">{product.category}</div>
                    </Col>
                    <Col lg="3" className="d-flex flex-column pe-1 mb-2 mb-lg-0 justify-content-center order-4">
                      <div className="lh-1 text-alternate">{product.price} руб</div>
                    </Col>
                    <Col lg="2" className="d-flex flex-column pe-1 mb-2 mb-lg-0 align-items-start justify-content-center order-5">
                      <div className="lh-1 text-alternate">{`${getDate(product.createdDate).date} / ${getDate(product.createdDate).time}`}</div>
                    </Col>
                    <Col xs="1" className="d-flex flex-column mb-2 mb-lg-0 align-items-end order-2 order-lg-last justify-content-lg-center">
                      <Form.Check className="form-check mt-2 ps-7 ps-md-2" type="checkbox" checked={selectedItems.includes(1)} onChange={() => checkItem(1)} />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Card>
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

      {/* List Items End */}

      {/* Pagination Start */}
      {products.length > filterItems && !isLoading ? (
        <div className="d-flex justify-content-center mt-5">
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
        </div>
      ) : (
        <></>
      )}
      {/* Pagination End */}
    </>
  );
};

export default ProductsList;

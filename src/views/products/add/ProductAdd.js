import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Select from 'react-select';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.bubble.css';
import Active from 'components/quill/Active';
import { Row, Col, Button, Dropdown, Form, Card, ButtonGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { fetchCompanyInf } from 'views/company/slice/async';
import Loader from 'components/loader';
import DetailImage from '../detail/components/DetailImage';
import { fetchCreateProduct } from '../slice/async';

const ProductAdd = () => {
  const dispatch = useDispatch();
  const { company } = useSelector((state) => state.company);
  const { currentUser, user } = useSelector((state) => state.auth);
  const { isLoading, isCreated } = useSelector((state) => state.products);
  const title = 'Товар';
  const description = 'Страница добавления продукта';

  // Category
  const [infProduct, setInfProduct] = useState({
    name: '',
    price: 0,
    unit: '',
    description: '',
    category: '',
  });

  function handelChange(event) {
    if (event.target.localName === 'option') {
      setInfProduct({
        ...infProduct,
        [event.target.attributes[0].value]: event.target.value,
      });
    } else {
      setInfProduct({
        ...infProduct,
        [event.target.name]: event.target.value,
      });
    }
  }

  function onSubmit() {
    const image = document.getElementsByName('image')[0];
    const data = new FormData();
    Object.keys(infProduct).forEach((key) => {
      data.append(key, infProduct[key]);
    });
    data.append('goods_images', image.files[0]);

    if (!isLoading) {
      dispatch(
        fetchCreateProduct({
          shopId: company.id,
          token: user.token,
          data,
        })
      ).then((result) => {
        if (result.payload && result.payload.statusCode === 201) {
          setInfProduct({
            name: '',
            category: '',
            unit: '',
            price: 0,
            description: '',
          });
          document.location.href = '/products';
        }
      });
    }
  }

  const [categoryGoods, setCategoryGoods] = useState([]);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(fetchCompanyInf(currentUser.list_shop[0].id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (Object.keys(company).length > 0) {
      const goods = company.goods.map((item) => item.category);
      const categories = Array.from(new Set(goods));
      setCategoryGoods(categories);
    }
  }, [company]);

  useEffect(() => {
    console.log(infProduct);
  }, [infProduct]);

  // Editor
  const theme = 'bubble';
  const modules = {
    toolbar: [['bold', 'italic', 'underline', 'strike'], [{ header: [1, 2, 3, 4, 5, 6, false] }], [{ list: 'ordered' }, { list: 'bullet' }], [{ align: [] }]],
    active: {},
  };
  const { quill, quillRef, Quill } = useQuill({ theme, modules });
  useEffect(() => {
    if (quill) {
      quill.on('text-change', () => {});
      quill.clipboard.dangerouslyPasteHTML(`<h6>Candy Muffin</h6>
      <p>
        Marshmallow halvah gummi bears dragée. Pudding tart macaroon jelly beans bonbon. Dessert ice cream sweet powder topping biscuit
        gummies jujubes. Candy muffin croissant. Gummi bears jelly beans tootsie roll powder macaroon. Danish brownie cake bar candy.
      </p>
      <p><br /></p>
      <h6>Fruitcake</h6>
      <p>
        Sugar plum fruitcake cotton candy lemon drops. Carrot cake bear claw fruitcake dragée pie cotton candy sesame snaps lollipop
        croissant. Croissant brownie pie. Candy sweet roll pudding pastry cotton candy donut apple pie cotton candy cookie. Icing cake
        donut. Topping candy canes fruitcake. Brownie danish cake. Marshmallow donut sweet roll. Wafer tootsie roll gingerbread croissant
        ice cream.
      </p>
      <p><br /></p>
      <h6>Gummi Bears</h6>
      <p>
        Dessert ice cream sweet powder topping biscuit gummies jujubes. Candy muffin croissant. Gummi bears jelly beans tootsie roll powder
        macaroon. Danish brownie cake gingerbread tiramisu chocolate bar candy. Jujubes apple pie tootsie roll topping croissant bear claw
        tootsie roll.Pastry cake bear claw marzipan jelly beans pastry lemon drops. Tart powder dragée cotton candy sugar plum jelly beans
        pastry tart sugar plum. Dragée jelly beans halvah chupa chups icing tart cake tootsie roll lemon drops.
      </p>`);
      quill.blur();
    }
  }, [quill]);
  if (Quill && !quill) {
    Quill.debug('error');
    Quill.register('modules/active', Active);
  }

  return (
    <>
      <HtmlHead title={title} description={description} />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/products">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle fs-7 mb-1 ms-1">Список продуктов</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              Новый товар
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            {/* <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1">
              <CsLineIcons icon="save" />
            </Button> */}
            <div className="btn-group ms-1 w-100 w-sm-auto">
              <Button onClick={() => onSubmit()} variant={!isLoading ? 'outline-primary' : 'primary'} className="btn-icon btn-icon-start w-100 w-sm-auto">
                {isLoading ? (
                  <Loader
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '20px',
                      height: '15px',
                    }}
                    styleImg={{
                      width: '250%',
                      height: '250%',
                    }}
                  />
                ) : (
                  <>
                    <CsLineIcons icon="plus" /> <span>Добавить</span>
                  </>
                )}
              </Button>
            </div>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8">
          {/* Product Info Start */}
          <h2 className="small-title">Данные товара</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <div className="mb-3">
                  <Form.Label>Название</Form.Label>
                  <Form.Control placeholder="Введите название" value={infProduct.name} name="name" onChange={(e) => handelChange(e)} type="text" />
                </div>
                <div className="mb-3">
                  <Form.Label>Категория</Form.Label>
                  <Dropdown style={{ width: '100%' }} as={ButtonGroup}>
                    <Form.Control
                      style={{ borderBottomRightRadius: 0, borderTopRightRadius: 0 }}
                      placeholder="Введите или выберите категорию"
                      value={infProduct.category}
                      name="category"
                      onChange={(e) => handelChange(e)}
                    />
                    {categoryGoods.length > 0 && (
                      <>
                        <Dropdown.Toggle split variant="dark" id="dropdown-split-basic" />
                        <Dropdown.Menu>
                          {categoryGoods.map((category, index) => (
                            <Dropdown.Item name="category" value={category} as="option" key={index} onClick={(e) => handelChange(e)}>
                              {category}
                            </Dropdown.Item>
                          ))}
                          {/* <Dropdown.Item>Action</Dropdown.Item>
                      <Dropdown.Item>Another action</Dropdown.Item>
                      <Dropdown.Item>Something else</Dropdown.Item> */}
                        </Dropdown.Menu>
                      </>
                    )}
                  </Dropdown>
                </div>
                <div className="mb-3">
                  <Form.Label>Единица</Form.Label>
                  <Form.Control placeholder="Введите единицу" value={infProduct.unit} name="unit" onChange={(e) => handelChange(e)} type="text" />
                </div>
                {/* <div className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    defaultValue="Dessert gummies soufflé toffee cake. Sesame snaps marzipan sesame snaps gummies oat cake sesame snaps."
                  />
                </div> */}
                <div>
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Введите описание"
                    value={infProduct.description}
                    name="description"
                    onChange={(e) => handelChange(e)}
                    className="sh-25 html-editor html-editor-bubble pe-2"
                  />
                </div>
              </Form>
            </Card.Body>
          </Card>
          {/* Product Info End */}

          {/* Inventory Start */}
          {/* <h2 className="small-title">Inventory</h2> */}
          {/* <Card className="mb-5">
            <Card.Body>
              <Form>
                <div className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control type="text" defaultValue="DB063-0003" />
                </div>
                <div className="mb-3">
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control type="text" defaultValue="038678561125" />
                </div>
                <div className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" defaultValue="228" />
                </div>
                <div className="mb-n1">
                  <Form.Label>Settings</Form.Label>
                  <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" />
                  <Form.Check type="switch" id="quantitySwitch2" label="Notify low stock" defaultChecked />
                  <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" />
                </div>
              </Form>
            </Card.Body>
          </Card> */}
          {/* Inventory End */}

          {/* Shipping Start */}
          {/* <div className="d-flex justify-content-between">
            <h2 className="small-title">Shipping</h2>
            <Button variant="background-alternate" size="xs" className="btn-icon btn-icon-end p-0 text-small">
              <span className="align-bottom">Edit Shipping Methods</span> <CsLineIcons icon="chevron-right" className="align-middle" size="12" />
            </Button>
          </div>
          <Card className="mb-5">
            <Card.Body>
              <Form className="mb-n2">
                <label className="form-check w-100 mb-2">
                  <input type="checkbox" className="form-check-input" defaultChecked />
                  <span className="form-check-label d-block">
                    <span className="mb-1 lh-1-25">Standard Shipping</span>
                    <span className="text-muted d-block text-small mt-0">(Price Based Rate)</span>
                  </span>
                </label>
                <label className="form-check w-100 mb-2">
                  <input type="checkbox" className="form-check-input" defaultChecked />
                  <span className="form-check-label d-block">
                    <span className="mb-1 lh-1-25">Express Shipping</span>
                    <span className="text-muted d-block text-small mt-0">(Price Based Rate)</span>
                  </span>
                </label>
                <label className="form-check w-100 mb-2">
                  <input type="checkbox" className="form-check-input" defaultChecked />
                  <span className="form-check-label d-block">
                    <span className="mb-1 lh-1-25">Priority Shipping</span>
                    <span className="text-muted d-block text-small mt-0">(Price Based Rate)</span>
                  </span>
                </label>
              </Form>
            </Card.Body>
          </Card> */}
          {/* Shipping End */}

          {/* Attributes Start */}
          {/* <h2 className="small-title">Attributes</h2>
          <Card className="mb-5">
            <Card.Body>
              <DetailAttributeItem />
              <div className="text-center">
                <Button variant="foreground" className="btn-icon btn-icon-start hover-outline mt-4">
                  <CsLineIcons icon="plus" /> <span>Add New</span>
                </Button>
              </div>
            </Card.Body>
          </Card> */}
          {/* Attributes End */}
        </Col>

        <Col xl="4">
          {/* Price Start */}
          <h2 className="small-title">Цена</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form className="mb-n3">
                <div className="mb-3">
                  {/* <Form.Label>Tax Excluded</Form.Label> */}
                  <Form.Control type="text" defaultValue="0" value={infProduct.price} name="price" onChange={(e) => handelChange(e)} />
                </div>
                {/* <div className="mb-3">
                  <Form.Label>Tax Included</Form.Label>
                  <Form.Control type="text" defaultValue="20,40" />
                </div> */}
              </Form>
            </Card.Body>
          </Card>
          {/* Price End */}

          {/* History Start */}
          {/* <h2 className="small-title">History</h2>
          <Card className="mb-5">
            <Card.Body className="mb-n3">
              <div className="mb-3">
                <div className="text-small text-muted">STATUS</div>
                <div>Published</div>
              </div>
              <div className="mb-3">
                <div className="text-small text-muted">CREATED BY</div>
                <div>Lisa Jackson</div>
              </div>
              <div className="mb-3">
                <div className="text-small text-muted">CREATE DATE</div>
                <div>12.05.2021 - 13:42</div>
              </div>
              <div className="mb-3">
                <div className="text-small text-muted">URL</div>
                <div>/products/wholewheat/cornbread</div>
              </div>
            </Card.Body>
          </Card> */}
          {/* History End */}

          {/* Image Start */}
          <h2 className="small-title">Рисунок</h2>
          <Card className="mb-5">
            <Form.Control
              style={{ minHeight: 35, paddingLeft: 8, backgroundColor: 'white', border: '1px solid #dddddd' }}
              type="file"
              name="image"
              title="Выберите картинку"
            />
          </Card>
          {/* Image End */}

          {/* Gallery Start */}
          {/* <h2 className="small-title">Gallery</h2>
          <Card className="mb-5">
            <Card.Body>
              <DetailGallery />
            </Card.Body>
          </Card> */}
          {/* Gallery End */}
        </Col>
      </Row>
    </>
  );
};

export default ProductAdd;

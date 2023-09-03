import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.bubble.css';
import Active from 'components/quill/Active';
import { Row, Col, Button, Dropdown, Form, Card, Image } from 'react-bootstrap';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import { DEFAUTL_BACKEND_URL } from 'config';
import Loader from 'components/loader';
import DetailAttributeItem from './components/DetailAttributeItem';
import DetailImage from './components/DetailImage';
import DetailGallery from './components/DetailGallery';
import { fetchDeleteProduct, fetchGetProduct, fetchUpdateProduct } from '../slice/async';

const ProductsDetail = () => {
  const dispatch = useDispatch();
  const { product, isLoading, isLoadingUpdate, isLoadingDelete } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const title = 'Товар';
  const description = 'Страница товара';
  const { id } = useParams();

  // Information product

  const [infProduct, setInfProduct] = useState({
    name: '',
    description: '',
    category: '',
    price: 0,
    unit: '',
    goods_images: [],
  });
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (Object.keys(user).length > 0) {
      dispatch(
        fetchGetProduct({
          productId: id,
          token: user.token,
        })
      );
    }
  }, [user, dispatch, isLoadingUpdate]);

  useEffect(() => {
    if (Object.keys(product).length > 0) {
      setInfProduct(product);
      setImageURL(`${DEFAUTL_BACKEND_URL}/${product.goods_images.length > 0 && product.goods_images[0].path}`);
    }
  }, [product]);

  useEffect(() => {
    console.log(infProduct);
  }, [infProduct]);

  function handleChange(event) {
    setInfProduct({
      ...infProduct,
      [event.target.name]: event.target.value,
    });
  }

  function submit() {
    if (!isLoadingUpdate) {
      const image = document.getElementsByName('image')[0];
      const data = new FormData();
      console.log(image.files);

      Object.keys(infProduct).forEach((key) => {
        data.append(key, infProduct[key]);
      });

      data.append('image', image.files[0]);

      dispatch(
        fetchUpdateProduct({
          productId: id,
          token: user.token,
          data,
        })
      );
    }
  }

  // Category
  const [selectValue, setSelectValue] = useState({ value: 'Sourdough', label: 'Sourdough' });
  const options = [
    { value: 'Whole Wheat', label: 'Whole Wheat' },
    { value: 'Rye', label: 'Rye' },
    { value: 'Sourdough', label: 'Sourdough' },
  ];

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
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          <Col xs="12" sm="auto" className="d-flex align-items-end justify-content-end mb-2 mb-sm-0 order-sm-3">
            {/* <Button variant="outline-primary" className="btn-icon btn-icon-only ms-1">
              <CsLineIcons icon="save" />
            </Button> */}
            <div className="btn-group ms-1 w-100 w-sm-auto">
              <Button onClick={() => submit()} variant="outline-primary" className="btn-icon btn-icon-start w-100 w-sm-auto">
                {isLoadingUpdate ? (
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
                    <CsLineIcons icon="save" /> <span>Обновить</span>
                  </>
                )}
              </Button>
              <Button
                onClick={() => {
                  dispatch(
                    fetchDeleteProduct({
                      productId: id,
                      token: Object.keys(user).length > 0 && user.token,
                    })
                  ).then((result) => {
                    if (result.payload && result.payload.statusCode === 200) {
                      window.location.href = '/products';
                    }
                  });
                }}
                variant="outline-primary"
                className="btn-icon btn-icon-start w-100 w-sm-auto"
              >
                {isLoadingDelete ? (
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
                    <CsLineIcons icon="close" /> <span>Удалить</span>
                  </>
                )}
              </Button>
              {/* <Dropdown>
                <Dropdown.Toggle className="dropdown-toggle dropdown-toggle-split" variant="outline-primary" />
                <Dropdown.Menu>
                  <Dropdown.Item>Move</Dropdown.Item>
                  <Dropdown.Item>Archive</Dropdown.Item>
                  <Dropdown.Item>Delete</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
            </div>
          </Col>
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8">
          {/* Product Info Start */}
          <h2 className="small-title">Данные продукта</h2>
          <Card className="mb-5">
            {!isLoading ? (
              <Card.Body>
                <Form>
                  <div className="mb-3">
                    <Form.Label>Название</Form.Label>
                    <Form.Control type="text" name="name" value={infProduct.name} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className="mb-3">
                    <Form.Label>Категория</Form.Label>
                    <Form.Control
                      name="category"
                      classNamePrefix="react-select"
                      options={options}
                      value={infProduct.category}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className="mb-3">
                    <Form.Label>Описание</Form.Label>
                    <Form.Control name="description" as="textarea" rows={4} value={infProduct.description} onChange={(e) => handleChange(e)} />
                  </div>
                  {/* <div>
                  <Form.Label>Title</Form.Label>
                  <div ref={quillRef} className="sh-25 html-editor html-editor-bubble pe-2" />
                </div> */}
                </Form>
              </Card.Body>
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
          </Card>
          {/* Product Info End */}

          {/* Inventory Start */}
          <h2 className="small-title">Скидка</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <div className="mb-3">
                  <Form.Label>Процент скидки</Form.Label>
                  <Form.Control type="number" defaultValue={0} placeholder="Введите процент скидки" />
                </div>
                <div className="mb-3">
                  <Form.Label>Barcode</Form.Label>
                  <Form.Control type="text" defaultValue="038678561125" />
                </div>
                <div className="mb-3">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="text" defaultValue="228" />
                </div>
                {/* <div className="mb-n1">
                  <Form.Label>Settings</Form.Label>
                  <Form.Check type="switch" id="quantitySwitch1" label="Allow out of stock purchase" />
                  <Form.Check type="switch" id="quantitySwitch2" label="Notify low stock" defaultChecked />
                  <Form.Check type="switch" id="quantitySwitch3" label="Display quantity at storefront" />
                </div> */}
              </Form>
              <Button className="mt-4" style={{ width: 150 }}>
                Добавить
              </Button>
            </Card.Body>
          </Card>
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
            {!isLoading ? (
              <Card.Body>
                <Form className="mb-n3">
                  <div className="mb-3">
                    <Form.Control name="price" type="text" defaultValue="0" value={infProduct.price} onChange={(e) => handleChange(e)} />
                  </div>
                  {/* <div className="mb-3">
                  <Form.Label>Tax Included</Form.Label>
                  <Form.Control type="text" defaultValue="20,40" />
                </div> */}
                </Form>
              </Card.Body>
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
            {!isLoading ? (
              <Card.Body>
                <Card.Img variant="top" src={imageURL} />
                <Button className="mt-4" style={{ position: 'relative' }}>
                  Изменить
                  <input
                    style={{
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      top: '0%',
                      left: '0%',
                      position: 'absolute',
                    }}
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const url = window.URL.createObjectURL(e.target.files[0]);
                      setImageURL(url);
                    }}
                  />
                </Button>
                {/* <DetailImage urlImage={Object.keys(product).length > 0 && `${DEFAUTL_BACKEND_URL}/${product.goods_images[0].path}`} title="Рисунок" /> */}
                {/* <img src={`${DEFAUTL_BACKEND_URL}/${product.goods_images[0].path}`} alt="product" className="card-img card-img-horizontal sw-11 h-100" /> */}
              </Card.Body>
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

export default ProductsDetail;

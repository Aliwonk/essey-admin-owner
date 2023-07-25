import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom/cjs/react-router-dom';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Loader from 'components/loader';
import { fetchCreateNews } from '../slice/async';

const NewsAdd = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.news);
  const { user, currentUser } = useSelector((state) => state.auth);
  const title = 'Опублиоквать новость';
  const description = 'Страница публикации новости';
  const { id } = useParams();
  const [values, setValues] = useState({
    caption: '',
    description: '',
    name_link: '',
    link: '',
  });

  function handleChange(event) {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  }

  function onSubmit() {
    const image = document.getElementsByName('image')[0];
    const data = new FormData();
    Object.keys(values).forEach((key) => {
      data.append(key, values[key]);
    });
    data.append('image', image.files[0]);

    if (!image.files[0]) {
      alert('Отсутсвует рисунок!');
      return;
    }
    if (values.caption === '' && values.description === '') {
      alert('Данные не заполнены');
      return;
    }

    if (!isLoading) {
      if (Object.keys(currentUser).length > 0) {
        dispatch(
          fetchCreateNews({
            shopId: currentUser.list_shop[0].id,
            token: user.token,
            data,
          })
        ).then((result) => {
          if (result.payload && result.payload.statusCode === 201) {
            setValues({
              name: '',
              category: '',
              unit: '',
              price: 0,
              description: '',
            });
            document.location.href = '/news';
          }
        });
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
            <NavLink className="muted-link pb-1 d-inline-block hidden breadcrumb-back" to="/news">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle text-small ms-1">Все новости</span>
            </NavLink>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {title}
            </h1>
          </Col>
          {/* Title End */}

          {/* Top Buttons Start */}
          {/* Top Buttons End */}
        </Row>
      </div>

      <Row>
        <Col xl="8">
          {/* Product Info Start */}
          <h2 className="small-title">Данные</h2>
          <Card className="mb-5">
            <Card.Body>
              <Form>
                <div className="mb-3">
                  <Form.Label>Заголовок</Form.Label>
                  <Form.Control placeholder="Введите заголовок" value={values.caption} name="caption" onChange={(e) => handleChange(e)} type="text" />
                </div>
                <div className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    as="textarea"
                    placeholder="Введите описание"
                    value={values.description}
                    name="description"
                    onChange={(e) => handleChange(e)}
                    className="sh-25 html-editor html-editor-bubble pe-2"
                  />
                </div>
                <Row className="mb-3">
                  <Col xl="5">
                    <Form.Label>Название сслыки</Form.Label>
                    <Form.Control
                      placeholder="Введите название сслыки"
                      value={values.name_link}
                      name="name_link"
                      onChange={(e) => handleChange(e)}
                      type="text"
                    />
                  </Col>
                  <Col xl="7">
                    <Form.Label>Ссылка</Form.Label>
                    <Form.Control placeholder="Введите ссылку" value={values.link} name="link" onChange={(e) => handleChange(e)} type="text" />
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
          {/* Product Info End */}
        </Col>

        <Col xl="4">
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
          <Button onClick={() => onSubmit()}>
            {!isLoading ? (
              <>Опубликовать</>
            ) : (
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
            )}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default NewsAdd;

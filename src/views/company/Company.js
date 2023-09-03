import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, CardGroup, Col, Form, NavLink, Row } from 'react-bootstrap';
import mapboxgl from 'mapbox-gl';
import DetailImage from 'views/products/detail/components/DetailImage';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import { MAPBOX, DEFAUTL_BACKEND_URL } from 'config';
import { useDispatch, useSelector } from 'react-redux';
import Loader from 'components/loader';
import { fetchChangeActiveCompany, fetchChangeActivePlansCompany, fetchCompanyInf, fetchCompanyUpdate } from './slice/async';

const Company = () => {
  const dispatch = useDispatch();
  const { company, isLoading } = useSelector((state) => state.company);
  const { currentUser, user } = useSelector((state) => state.auth);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(94.4424);
  const [lat, setLat] = useState(51.7197);
  const [zoom, setZoom] = useState(16);
  const [hideBlock, setHideBlock] = useState({
    general: false,
    address: true,
    timework: true,
  });
  const [infCompany, setInfCompany] = useState({
    name: '',
    category: '',
    annotation: '',
    description: '',
    address: {
      latitude: lng,
      longitude: lat,
      value: '',
    },
  });
  const [worktimes, setWorkTimes] = useState([
    { day: 0, start: '10:00', end: '00:00' },
    { day: 1, start: '10:00', end: '00:00' },
    { day: 2, start: '10:00', end: '00:00' },
    { day: 3, start: '10:00', end: '00:00' },
    { day: 4, start: '10:00', end: '00:00' },
    { day: 5, start: '10:00', end: '00:00' },
    { day: 6, start: '10:00', end: '00:00' },
  ]);
  const [imageURL, setImageURL] = useState('');
  const [activeCompany, setActiveCompany] = useState(true);
  const [activePlansCompany, setActivePlansCompany] = useState(true);

  function handleChange(event) {
    const { target } = event;
    if (target.type === 'time') {
      const name = target.name.split(':')[0];
      const indexDay = target.name.split(':')[1];

      console.log(indexDay);
      const changeWorktimes = worktimes.map((value) => {
        // eslint-disable-next-line radix
        if (value.day === parseInt(indexDay)) {
          return { ...value, [name]: target.value };
        }
        return value;
      });
      console.log(changeWorktimes);
      setWorkTimes(changeWorktimes);
    } else {
      setInfCompany({ ...infCompany, [target.name]: target.type === 'checkbox' ? !target.checked : target.value });
    }
  }

  mapboxgl.accessToken = MAPBOX.TOKEN;

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      dispatch(fetchCompanyInf(currentUser.list_shop[0].id));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    console.log(company.address);
    setInfCompany({
      name: company.name,
      annotation: company.annotation,
      category: company.category,
      description: company.description,
      address: {
        value: company.address !== undefined && company.address.length > 0 && company.address[0].value,
        latitude: company.address !== undefined && company.address.length > 0 && company.address[0].latitude,
        longitude: company.address !== undefined && company.address.length > 0 && company.address[0].longitude,
      },
    });
    setLat(company.address !== undefined && company.address.length > 0 && company.address[0].latitude);
    setLng(company.address !== undefined && company.address.length > 0 && company.address[0].longitude);
    setActiveCompany(company.active);
    setActivePlansCompany(company.plans_active);
    setImageURL(`${DEFAUTL_BACKEND_URL}/${company.logotype}`);

    if (Object.keys(company).length > 0 && company.worktimes.length > 0) {
      setWorkTimes(company.worktimes);
    }
  }, [company]);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX.STYLE,
      center: [lng, lat],
      zoom,
    });
  });

  function clickNavBtn(block) {
    switch (block) {
      case 'address':
        setHideBlock({
          general: true,
          timework: true,
        });

        break;
      case 'general':
        setHideBlock({
          address: true,
          timework: true,
        });
        break;

      case 'timework':
        setHideBlock({
          address: true,
          general: true,
        });
        break;
      default:
        setHideBlock({
          general: false,
          address: true,
        });
        break;
    }
  }

  function submit() {
    if (!isLoading.update) {
      const image = document.getElementsByName('logotype')[0];
      const data = new FormData();

      Object.keys(infCompany).forEach((key) => {
        data.append(key, infCompany[key]);
      });
      data.append('logotype', image.files[0]);
      data.append('worktimes', JSON.stringify(worktimes));

      dispatch(
        fetchCompanyUpdate({
          shopId: company.id,
          token: user.token,
          data,
        })
      );
    }
  }

  return (
    <>
      <HtmlHead title="Компания" description="Страница компании" />
      <div className="page-title-container">
        <Row className="g-0">
          {/* Title Start */}
          <Col className="col-auto mb-3 mb-sm-0 me-auto">
            <a className="muted-link pb-1 d-inline-block hidden breadcrumb-back" href="/profile">
              <CsLineIcons icon="chevron-left" size="13" />
              <span className="align-middle fs-7 mb-1 ms-1">Профиль</span>
            </a>
            <h1 className="mb-0 pb-0 display-4" id="title">
              {' '}
            </h1>
          </Col>
          {/* Title End */}
        </Row>
      </div>
      <Row>
        <Col xl="3">
          <h2 className="small-title">Логотип</h2>
          <Card className="mb-5">
            {!isLoading.get && !isLoading.update ? (
              <Card.Body>
                <Card.Img variant="top" src={imageURL} />
                <Button className="mt-4" style={{ position: 'relative' }}>
                  Изменить
                  <input
                    name="logotype"
                    type="file"
                    style={{
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      top: '0%',
                      left: '0%',
                      position: 'absolute',
                    }}
                    accept="image/*"
                    onChange={(e) => {
                      const url = window.URL.createObjectURL(e.target.files[0]);
                      setImageURL(url);
                    }}
                  />
                </Button>
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

          <Col>
            <h2 className="small-title">Ссылка компании</h2>
            <Card className="mb-3" style={{ padding: '5px 2px 5px 8px' }}>
              {!isLoading.get && !isLoading.update ? (
                <Card.Text>{company.link}</Card.Text>
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
          </Col>

          <Col>
            <h2 className="small-title">QR-code компании</h2>
            <Card className="mb-3" style={{ width: '15rem', padding: '5px 2px 5px 8px' }}>
              {!isLoading.get && !isLoading.update ? (
                <Card.Img variant="top" src={`https://api.qrserver.com/v1/create-qr-code/?data=${company.link}&amp;size=30x30`} />
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
          </Col>

          <Col xl="20" style={{ marginBottom: 15 }}>
            <h2 className="small-title">Настройки</h2>
            {!isLoading.get && !isLoading.update ? (
              <>
                <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px 2px 10px 10px', marginBottom: 5 }}>
                  <Form.Label style={{ marginBottom: 0 }}>Отключить бонусные программы</Form.Label>
                  {!isLoading.update_active_plans ? (
                    <Form.Check
                      type="switch"
                      name="plans_active"
                      checked={!activePlansCompany}
                      value={!activePlansCompany}
                      onClick={(e) => {
                        setActivePlansCompany(e.target.value);
                        dispatch(
                          fetchChangeActivePlansCompany({
                            shopId: company.id,
                            token: user.token,
                            active: e.target.value,
                          })
                        );
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', width: '15%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                      <Loader
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '12px',
                          height: '14px',
                        }}
                        styleImg={{
                          width: '250%',
                          height: '250%',
                        }}
                      />
                    </div>
                  )}
                </Card>
                <Card style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: '10px 2px 10px 10px', marginBottom: 5 }}>
                  <Form.Label style={{ marginBottom: 0 }}>Не принимать заказы</Form.Label>
                  {!isLoading.update_active ? (
                    <Form.Check
                      type="switch"
                      name="active"
                      checked={!activeCompany}
                      value={!activeCompany}
                      onClick={(e) => {
                        setActiveCompany(!e.target.value);
                        dispatch(
                          fetchChangeActiveCompany({
                            shopId: company.id,
                            token: user.token,
                            active: e.target.value,
                          })
                        );
                      }}
                    />
                  ) : (
                    <div style={{ display: 'flex', width: '15%', height: 'auto', alignItems: 'center', justifyContent: 'center' }}>
                      <Loader
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          width: '12px',
                          height: '14px',
                        }}
                        styleImg={{
                          width: '250%',
                          height: '250%',
                        }}
                      />
                    </div>
                  )}
                </Card>
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
          </Col>
        </Col>
        <Col xl="9">
          <h2 className="small-title">Данные компании</h2>
          {!isLoading.get && !isLoading.update ? (
            <>
              <Row style={{ marginBottom: 20 }}>
                <Col sm="4" lg="3" className="mb-2">
                  <Card className="hover-border-primary" bg={!hideBlock.general && 'primary'} onClick={() => clickNavBtn('general')}>
                    <Card.Body style={{ padding: '1rem 1rem' }}>
                      <div className="heading mb-0 d-flex justify-content-between lh-1-25">
                        <span className={!hideBlock.general ? 'text-light' : 'text-primary'}>Основное</span>
                        <CsLineIcons icon="pen" className={!hideBlock.general ? 'text-light' : 'text-primary'} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm="4" lg="3" className="mb-2">
                  <Card className="hover-border-primary" bg={!hideBlock.address && 'primary'} onClick={() => clickNavBtn('address')}>
                    <Card.Body style={{ padding: '1rem 1rem' }}>
                      <div className="heading mb-0 d-flex justify-content-between lh-1-25">
                        <span className={!hideBlock.address ? 'text-light' : 'text-primary'}>Адрес</span>
                        <CsLineIcons icon="compass" className={!hideBlock.address ? 'text-light' : 'text-primary'} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
                <Col sm="4" lg="3" className="mb-2">
                  <Card className="hover-border-primary" bg={!hideBlock.timework && 'primary'} onClick={() => clickNavBtn('timework')}>
                    <Card.Body style={{ padding: '1rem 1rem' }}>
                      <div className="heading mb-0 d-flex justify-content-between lh-1-25">
                        <span className={!hideBlock.timework ? 'text-light' : 'text-primary'}>Рабочее время</span>
                        <CsLineIcons icon="clock" className={!hideBlock.timework ? 'text-light' : 'text-primary'} />
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              {/* START CARD GENERAL DATA */}
              <Card className="mb-5" hidden={hideBlock.general}>
                <Card.Body>
                  <Form>
                    <div className="mb-3">
                      <Form.Label>Название</Form.Label>
                      <Form.Control name="name" type="text" value={infCompany.name} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="mb-3">
                      <Form.Label>Категория</Form.Label>
                      <Form.Select name="category" defaultValue={infCompany.category} onChange={(e) => handleChange(e)}>
                        <option value={infCompany.category}>{infCompany.category}</option>
                        {infCompany.category !== 'Магазины' && <option value="Магазины">Магазины</option>}
                        {infCompany.category !== 'Рестораны и кафе' && <option value="Рестораны и кафе">Рестораны и кафе</option>}
                      </Form.Select>
                      {/* <Select classNamePrefix="react-select" options={options} value={selectValue} onChange={setSelectValue} placeholder="" /> */}
                    </div>
                    <div className="mb-3">
                      <Form.Label>Аннотация</Form.Label>
                      <Form.Control name="annotation" as="textarea" rows={2} value={infCompany.annotation} onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="mb-3">
                      <Form.Label>Описание</Form.Label>
                      <Form.Control name="description" as="textarea" rows={4} value={infCompany.description} onChange={(e) => handleChange(e)} />
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              {/* END CARD GENERAL DATA */}
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

          {/* START CARD ADDRESS */}
          <Card className="mb-5" hidden={hideBlock.address}>
            <Card.Body>
              <Form>
                <div className="mb-3">
                  <Form.Label>Адрес</Form.Label>
                  <Form.Control type="text" value={infCompany.address.value} />
                </div>
              </Form>
              <div style={{ height: 400 }} ref={mapContainer}>
                {' '}
              </div>
            </Card.Body>
          </Card>
          {/* END CARD ADDRESS */}

          {/* START WORK TIME */}

          <Card className="w-50 p-3 mb-4" hidden={hideBlock.timework}>
            {worktimes.length > 0 &&
              worktimes.map((value) => {
                let day = '';

                switch (value.day) {
                  case 0:
                    day = 'Понедельник';
                    break;
                  case 1:
                    day = 'Вторник';
                    break;
                  case 2:
                    day = 'Среда';
                    break;
                  case 3:
                    day = 'Четверг';
                    break;
                  case 4:
                    day = 'Пятница';
                    break;
                  case 5:
                    day = 'Суббота';
                    break;
                  case 6:
                    day = 'Воскресенье';
                    break;
                  default:
                    break;
                }
                return (
                  <>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                      }}
                      className="mb-0 w-100"
                    >
                      <p className="w-40 mb-0 text-primary">{day}</p>
                      <Row className="w-60">
                        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <p className="mb-1 text-muted">от</p>
                          <Form.Control name={`start:${value.day}`} type="time" value={value.start} onChange={(e) => handleChange(e)} />
                        </Col>
                        <Col style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                          <p className="mb-1 text-muted">до</p>
                          <Form.Control name={`end:${value.day}`} type="time" value={value.end} onChange={(e) => handleChange(e)} />
                        </Col>
                      </Row>
                    </div>
                  </>
                );
              })}
          </Card>
          {/* END WORK TIME */}

          <Button onClick={() => submit()}>
            {!isLoading.update ? (
              <>Сохранить</>
            ) : (
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
            )}
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Company;

/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Accordion, Alert, Button, Card, Form, ListGroup } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { SVGLogo } from 'components/svg-components/SVGcomponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCompanyRegister } from 'auth/async';
import Loader from 'components/loader';
import { MAPBOX, DADATA } from 'config';
import Categories from 'views/storefront/categories/Categories';

const RegisterCompany = () => {
  const dispatch = useDispatch();
  const { isLoading, isConfirmEmail, isError, user, isCreateCompany } = useSelector((state) => state.auth);
  const title = 'Регистрация компании';
  const description = 'Страница регистрации компании';
  const [address, setAddress] = useState('');
  const [variantsAddress, setVariantsAddress] = useState([]);
  const [coordinates, setCoordinates] = useState();
  const [hidden, setHidden] = useState({
    week: false,
    allDay: true,
  });
  const [wortTimes, setWorkTimes] = useState([
    {
      day: 0,
      start: '08:00',
      end: '00:00',
    },
    {
      day: 1,
      start: '08:00',
      end: '00:00',
    },
    {
      day: 2,
      start: '08:00',

      end: '00:00',
    },
    {
      day: 3,
      start: '08:00',
      end: '00:00',
    },
    {
      day: 4,
      start: '08:00',
      end: '00:00',
    },
    {
      day: 5,
      start: '08:00',
      end: '00:00',
    },
    {
      day: 6,
      start: '08:00',
      end: '00:00',
    },
  ]);
  const [valuesInput, setValuesInput] = useState({
    name: '',
    annotation: '',
    phone: '',
    logotype: '',
  });

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(94.4424);
  const [lat, setLat] = useState(51.7197);
  const [zoom, setZoom] = useState(15);

  mapboxgl.accessToken = MAPBOX.TOKEN;

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: MAPBOX.STYLE,
      center: [lng, lat],
      zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', (e) => {
      const coords = {
        latitude: e.lngLat.lat,
        longitude: e.lngLat.lng,
      };
      // `https://api.mapbox.com/geocoding/v5/mapbox.places/Kyzyl.json?access_token=${MAPBOX.TOKEN}`
      // https://api.mapbox.com/geocoding/v5/mapbox.places/${coords.longitude},${coords.latitude}.json?access_token=${MAPBOX.TOKEN}
      fetch(DADATA.URLS.GET_ADDRESS_BY_COORDS, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Token ${DADATA.KEYS.TOKEN}`,
        },
        body: JSON.stringify({ lat: coords.latitude, lon: coords.longitude }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            setAddress(`${data.suggestions[0].unrestricted_value}`);
          } else {
            setAddress(`К сожалению произошла ошибка`);
          }
        });

      setCoordinates(coords);
    });
  }, []);

  useEffect(() => {
    console.log(user);
    if (user === null || user.token === 'undefined') {
      window.location.href = '/login';
    }
    if (!isLoading.createCompany && isCreateCompany) {
      window.location.href = '/';
    }
  }, [isLoading.createCompany, isCreateCompany, user]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Название не заполнен'),
    annotation: Yup.string().required('Аннотация не заполнен'),
    // address: Yup.string().required('Адрес не заполнен'),
    logotype: Yup.string().required('Логотип не выбран'),
    phone: Yup.string().required('Номер телефона не заполнен'),
  });
  const [category, setCategory, DatesOfWork] = useState('');

  const initialValues = { name: '', annotation: '', phone: '', logotype: '' };
  // eslint-disable-next-line consistent-return
  const onSubmit = () => {
    if (!isLoading.createCompany) {
      const logotype = document.getElementsByName('logotype');
      const fileLogotype = logotype[0].files[0];
      const data = new FormData();

      delete valuesInput.logotype;
      if (address === 'К сожалению произошла ошибка') {
        return alert('Невозможно создать. Попробуйте позже');
      }
      if (address === '') {
        return alert('Заполните адрес');
      }
      console.log(valuesInput);
      Object.keys(valuesInput).forEach((key) => {
        data.append(key, valuesInput[key]);
      });
      data.append('logotype', fileLogotype);
      data.append('category', category);
      data.append(
        'address',
        JSON.stringify({
          value: address,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
        })
      );
      data.append('worktimes', JSON.stringify(wortTimes));

      dispatch(fetchCompanyRegister({ data, token: user.token }));
    } else {
      alert('Идет загрузка');
    }
  };

  function changeHandle(event) {
    setValuesInput({
      ...valuesInput,
      [event.target.name]: event.target.value,
    });
  }

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;
  const onChangeSelect = (event) => setCategory(event.target.value);
  const onChangeAddress = (event) => {
    const options = {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Token ${DADATA.KEYS.TOKEN}`,
        // 'X-Secret': DADATA.KEYS.SECRET,
      },
      body: JSON.stringify({ query: event.target.value }),
    };

    fetch(DADATA.URLS.GET_ADDRESS, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.suggestions.length > 5) {
          result.suggestions.length = 5;
          setVariantsAddress(result.suggestions);
        } else {
          setVariantsAddress(result.suggestions);
        }
      })
      .catch((error) => console.log('error', error));
    setAddress(event.target.value);
  };

  const onChangeWorktimes = (event) => {
    const name = event.target.name.split(':')[0];
    const index = event.target.name.split(':')[1];
    const inputValue = event.target.value;

    const changeTimes = wortTimes.map((time) => {
      // eslint-disable-next-line
      if (time.day === parseInt(index)) {
        return { ...time, [name]: inputValue };
      }
      // eslint-disable-next-line
      if (index === 'all') {
        return { ...time, [name]: inputValue };
      }
      return time;
    });

    setWorkTimes(changeTimes);
  };

  const rightSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-50 w-xxl-50">
        <div className="mb-3 filled form-group tooltip-end-top">
          <CsLineIcons icon="compass" />
          <Form.Control
            style={{ backgroundColor: 'white', border: '1px solid #dddddd' }}
            type="text"
            name="address"
            placeholder="Адрес компании"
            value={address}
            onChange={onChangeAddress}
          />
          <ListGroup style={{ position: 'absolute', padding: 5 }}>
            {variantsAddress.length > 0 &&
              variantsAddress.map((variant, index) => {
                // console.log(variant);
                return (
                  <ListGroup.Item
                    key={index}
                    className="cursor-pointer"
                    action
                    onClick={() => {
                      const coords = {
                        latitude: parseFloat(variant.data.geo_lat),
                        longitude: parseFloat(variant.data.geo_lon),
                      };
                      setAddress(variant.unrestricted_value);
                      setCoordinates(coords);
                      map.current.setCenter([coords.longitude, coords.latitude]);
                      map.current.setZoom(18);
                      setVariantsAddress([]);
                    }}
                  >
                    {variant.unrestricted_value}
                  </ListGroup.Item>
                );
              })}
          </ListGroup>
          {/* {address === '' && touched.address && <div className="d-block invalid-tooltip">{errors.address}</div>} */}
        </div>
        <div style={{ marginRight: 5, width: '800px', height: '500px' }} ref={mapContainer}>
          {' '}
        </div>
      </div>
    </div>
  );

  const leftSide = (
    <div className="sw-lg-70 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-50 px-5">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            height: 65,
          }}
        >
          <a href="/" style={{ width: '30%', height: '100%' }}>
            <SVGLogo viewBox="220 190 300 100" preserveAspectRatio="none" height={50} />
          </a>
        </div>
        {/* <div className="mb-5">
          <h2 className="cta-1 mb-0 text-primary">Welcome,</h2>
          <h2 className="cta-1 text-primary">let's get the ball rolling!</h2>
        </div> */}
        {!isConfirmEmail ? (
          <>
            <div className="mb-5">
              <p className="h6">Регистрация компании.</p>
              {/* <p className="h6">
                Уже есть аккаунт ? <NavLink to="/login">Войти</NavLink>.
              </p> */}
            </div>
            <div>
              <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="shop" />
                  <Form.Control type="text" name="name" placeholder="Название компании" value={valuesInput.name} onChange={changeHandle} />
                  {errors.name && touched.name && <div className="d-block invalid-tooltip">{errors.name}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="note" />
                  <Form.Control type="text" name="annotation" placeholder="Аннотация" value={valuesInput.annotation} onChange={changeHandle} />
                  {errors.annotation && touched.annotation && <div className="d-block invalid-tooltip">{errors.annotation}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="phone" />
                  <Form.Control type="text" name="phone" placeholder="Номер телефона" value={valuesInput.phone} onChange={changeHandle} />
                  {errors.phone && touched.phone && <div className="d-block invalid-tooltip">{errors.phone}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <Form.Label>Логотип компании</Form.Label>
                  <Form.Control
                    style={{ minHeight: 35, paddingLeft: 8, marginBottom: 15, backgroundColor: 'white', border: '1px solid #dddddd' }}
                    type="file"
                    name="logotype"
                    title="Выберите логотип"
                    value={valuesInput.logotype}
                    onChange={changeHandle}
                  />
                  {errors.logotype && touched.logotype && <div className="d-block invalid-tooltip">{errors.logotype}</div>}
                </div>
                <Form.Select style={{ marginBottom: 15 }} value={category} type="text" onChange={onChangeSelect}>
                  <option>Выберите категорию</option>
                  <option value="Рестораны и кафе">Рестораны и кафе</option>
                  <option value="Магазины">Магазины</option>
                </Form.Select>
                <Accordion defaultActiveKey="1" style={{ marginBottom: 15 }}>
                  <Accordion.Item style={{ borderRadius: 10 }} eventKey="0">
                    <Accordion.Header style={{ fontSize: '14px' }}>Часы работы</Accordion.Header>
                    <Accordion.Body>
                      <div hidden={hidden.week}>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginLeft: '120px',
                          }}
                        >
                          <div style={{ width: 72.9, display: 'flex', justifyContent: 'center' }}>От</div>
                          <div style={{ width: 72.9, display: 'flex', justifyContent: 'center' }}>До</div>
                        </div>
                        {wortTimes.map((time, index) => {
                          let day = '';

                          switch (time.day) {
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
                            <div
                              key={index}
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                paddingBottom: '5px',
                              }}
                            >
                              <div style={{ width: 110 }}>{day}</div>
                              <input name={`start:${time.day}`} value={time.start} type="time" onChange={(e) => onChangeWorktimes(e)} />
                              <input name={`end:${time.day}`} value={time.end} type="time" onChange={(e) => onChangeWorktimes(e)} />
                            </div>
                          );
                        })}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          paddingBottom: '5px',
                        }}
                      >
                        <div style={{ marginLeft: '10px', paddingRight: '30px' }}>Для всех дней</div>
                        <Form.Check // prettier-ignore
                          type="switch"
                          id="custom-switch"
                          className="switchDays"
                          label=""
                          onClick={(e) => {
                            if (e.target.checked === true) {
                              setHidden({
                                week: true,
                                allDay: false,
                              });
                            } else {
                              setHidden({
                                week: false,
                                allDay: true,
                              });
                            }
                          }}
                        />
                      </div>
                      <div hidden={hidden.allDay} className="everyDayHidden">
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginLeft: '120px',
                            paddingBottom: '5px',
                          }}
                        >
                          <div style={{ width: 72.9, display: 'flex', justifyContent: 'center' }}>От</div>
                          <div style={{ width: 72.9, display: 'flex', justifyContent: 'center' }}>До</div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                            marginLeft: 120,
                            paddingBottom: '5px',
                          }}
                        >
                          <input name="start:all" type="time" onChange={(e) => onChangeWorktimes(e)} />
                          <input name="end:all" type="time" onChange={(e) => onChangeWorktimes(e)} />
                        </div>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
                <Button size="lg" onClick={() => onSubmit()}>
                  {isLoading.createCompany ? (
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
                    <>Создать компанию</>
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <h4>Вам нужно потдвердить почту. Ссылка отправлена в указанную почту.</h4>
        )}
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage
        bg={false}
        paddingLeft={false}
        right={rightSide}
        styleRight={{
          width: '55%',
        }}
        left={leftSide}
      />
    </>
  );
};

export default RegisterCompany;

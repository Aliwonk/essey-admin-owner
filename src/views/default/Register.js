import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { SVGLogo } from 'components/svg-components/SVGcomponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRegisterOwner } from 'auth/async';
import { fetchNotifications } from 'layout/nav/notifications/notificationSlice';
import Loader from 'components/loader';
import Notifications from 'layout/nav/notifications/Notifications';

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, isConfirmEmail, isError } = useSelector((state) => state.auth);
  const title = 'Регистрация';
  const description = 'Страница регистрации аккаунта';

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('Фамилия не заполнен'),
    lastName: Yup.string().required('Имя не заполнен'),
    patronymic: Yup.string().required('Отчество не заполнен'),
    email: Yup.string().email('Неправильный Email').required('Email не заполнен'),
    phone: Yup.string().required('Номер телеофна не заполнен'),
    password: Yup.string().min(6, 'Не меньше 6 символов!').required('Пароль не заполнен'),
    terms: Yup.bool().required().oneOf([true], 'Нужно подтвердить согласие'),
  });
  const initialValues = { firstName: '', lastName: '', patronymic: '', email: '', phone: '', password: '', terms: false };
  const onSubmit = (values) => {
    delete values.terms;
    if (!isLoading.register) {
      dispatch(fetchRegisterOwner(values));
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;

  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Цифровизация с помощью телеграм</h1>
            {/* <h1 className="display-3 text-white">Ready for Your Project</h1> */}
          </div>
          <p className="h5 text-white lh-1-5 mb-5">
            <a href="https://t.me/essey_app_bot">Essey</a> - это инновационный телеграмм бот, который позволяет вашим клиентам взаимодействовать удобным и
            эффективным способом. Essey представляет пользователям новую функцию - браузер внутри бота (web bot). Подробности можете увидеть на официальном
            сайте <a href="https://core.telegram.org/bots/webapps">телеграм</a> или посмотреть пример <a href="https://t.me/durgerkingbot">@DurgerKingBot.</a>
          </p>
          {/* <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );

  const rightSide = (
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
              <p className="h6">Регистрация бизнес аккаунта.</p>
              <p className="h6">
                Уже есть аккаунт ? <NavLink to="/login">Войти</NavLink>.
              </p>
            </div>
            <div>
              <form id="registerForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="user" />
                  <Form.Control type="text" name="firstName" placeholder="Фамилия" value={values.firstName} onChange={handleChange} />
                  {errors.firstName && touched.firstName && <div className="d-block invalid-tooltip">{errors.firstName}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="user" />
                  <Form.Control type="text" name="lastName" placeholder="Имя" value={values.lastName} onChange={handleChange} />
                  {errors.lastName && touched.lastName && <div className="d-block invalid-tooltip">{errors.lastName}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="user" />
                  <Form.Control type="text" name="patronymic" placeholder="Отчество" value={values.patronymic} onChange={handleChange} />
                  {errors.patronymic && touched.patronymic && <div className="d-block invalid-tooltip">{errors.patronymic}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="email" />
                  <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                  {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="phone" />
                  <Form.Control type="text" name="phone" placeholder="Номер телефона" value={values.phone} onChange={handleChange} />
                  {errors.phone && touched.phone && <div className="d-block invalid-tooltip">{errors.phone}</div>}
                </div>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="lock-off" />
                  <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Пароль" />
                  {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
                </div>
                <div className="mb-3 position-relative form-group">
                  <div className="form-check">
                    <input type="checkbox" className="form-check-input" name="terms" onChange={handleChange} value={values.terms} />
                    <label className="form-check-label">
                      Я прочитал(a) и согласен с{' '}
                      <NavLink to="/" target="_blank">
                        политикой конфиденциальности.
                      </NavLink>
                    </label>
                    {errors.terms && touched.terms && <div className="d-block invalid-tooltip">{errors.terms}</div>}
                  </div>
                </div>
                <Button size="lg" type="submit">
                  {isLoading.register ? (
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
                    <>Зарегистрироваться</>
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
      <LayoutFullpage left={leftSide} right={rightSide} />
    </>
  );
};

export default Register;

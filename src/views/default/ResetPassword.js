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
import Loader from 'components/loader';
import { fetchCreateNewPass } from 'auth/async';
import { getParamsUrlFromWindow } from 'utils/getData';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, isCreateNewPass } = useSelector((state) => state.auth);
  const title = 'Создание пароля';
  const description = 'Страница создание пароля';
  const validationSchema = Yup.object().shape({
    password: Yup.string().min(6, 'Не меньше 6 символов!').required('Не зполнен пароль!'),
    passwordConfirm: Yup.string()
      .required('Не заполнен пароль!')
      .oneOf([Yup.ref('password'), null], 'Должен совпадать с паролем!'),
  });
  const params = getParamsUrlFromWindow();

  const initialValues = { password: '', passwordConfirm: '' };
  const onSubmit = (values) => {
    if (!isLoading.createNewPassword) {
      console.log(params.token);
      if (params.token) {
        dispatch(
          fetchCreateNewPass({
            token: params.token,
            password: values.password,
          })
        );
      }
    }
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });
  const { handleSubmit, handleChange, values, touched, errors } = formik;
  const leftSide = (
    <div className="min-h-100 d-flex align-items-center">
      <div className="w-100 w-lg-75 w-xxl-50">
        <div>
          <div className="mb-5">
            <h1 className="display-3 text-white">Multiple Niches</h1>
            <h1 className="display-3 text-white">Ready for Your Project</h1>
          </div>
          <p className="h6 text-white lh-1-5 mb-5">
            Dynamically target high-payoff intellectual capital for customized technologies. Objectively integrate emerging core competencies before
            process-centric communities...
          </p>
          <div className="mb-5">
            <Button size="lg" variant="outline-white" href="/">
              Learn More
            </Button>
          </div>
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
        {!isCreateNewPass ? (
          <>
            <div className="mb-5">
              <h2 className="cta-1 text-primary">Создайте новый пароль!</h2>
            </div>
            <div className="mb-5">
              {/* <p className="h6">Please use below form to reset your password.</p> */}
              <p className="h6">
                Вспомнили пароль? <NavLink to="/login">Войти</NavLink>.
              </p>
            </div>
            <div>
              <form id="resetForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                <div className="mb-3 filled">
                  <CsLineIcons icon="lock-off" />
                  <Form.Control type="password" name="password" onChange={handleChange} value={values.password} placeholder="Пароль" />
                  {errors.password && touched.password && <div className="d-block invalid-tooltip">{errors.password}</div>}
                </div>
                <div className="mb-3 filled">
                  <CsLineIcons icon="lock-on" />
                  <Form.Control type="password" name="passwordConfirm" onChange={handleChange} value={values.passwordConfirm} placeholder="Повторите пароль" />
                  {errors.passwordConfirm && touched.passwordConfirm && <div className="d-block invalid-tooltip">{errors.passwordConfirm}</div>}
                </div>
                <Button size="lg" type="submit">
                  {isLoading.createNewPassword ? (
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
                    <>Восстановить</>
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="mb-5">
              <h2 className="cta-1 text-primary">Пароль обновлен</h2>
            </div>
            <Button size="lg">
              <a href="/login" style={{ color: 'white' }}>
                Войти
              </a>
            </Button>
          </>
        )}
      </div>
    </div>
  );

  return (
    <>
      <HtmlHead title={title} description={description} />
      <LayoutFullpage right={rightSide} />
    </>
  );
};

export default ResetPassword;

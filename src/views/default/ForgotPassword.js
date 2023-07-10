import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { SVGLogo } from 'components/svg-components/SVGcomponents';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResetPass } from 'auth/async';
import Loader from 'components/loader';

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const { isSendForgotPass, isLoading } = useSelector((state) => state.auth);
  const title = 'Восстановаление пароля';
  const description = 'Страница восстановление пароля';

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Неправильный Email').required('Не заполнен Email'),
  });
  const initialValues = { email: '' };
  const onSubmit = (values) => {
    if (!isLoading.resetPassword) {
      dispatch(fetchResetPass(values));
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

        {!isSendForgotPass ? (
          <>
            <div className="mb-5">
              <h2 className="cta-1 mb-0 text-primary">Забыли пароль?</h2>
              {/* <h2 className="cta-1 text-primary">Восстановите!</h2> */}
            </div>
            <div className="mb-5">
              <p className="h6">На вашу почту придет ссылка для восстановаления пароля.</p>
              <p className="h6">
                Вспомнили пароль? <NavLink to="/login">Войти</NavLink>.
              </p>
            </div>
            <div>
              <form id="forgotPasswordForm" className="tooltip-end-bottom" onSubmit={handleSubmit}>
                <div className="mb-3 filled form-group tooltip-end-top">
                  <CsLineIcons icon="email" />
                  <Form.Control type="text" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                  {errors.email && touched.email && <div className="d-block invalid-tooltip">{errors.email}</div>}
                </div>
                <Button size="lg" type="submit">
                  {isLoading.resetPassword ? (
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
                    <>Получить ссылку на почту</>
                  )}
                </Button>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className="mb-5">
              <h2 className="cta-1 mb-0 text-primary">Ссылка отправлена</h2>
            </div>
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

export default ForgotPassword;

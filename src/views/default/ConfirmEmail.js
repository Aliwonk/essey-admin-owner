import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { SVGLogo } from 'components/svg-components/SVGcomponents';
import { getParamsUrlFromWindow } from 'utils/getData';
import { useDispatch, useSelector } from 'react-redux';
import { fetchConfirmEmail } from 'auth/async';
import { saveUser } from 'auth/authSlice';

const InvalidAccess = () => {
  const dispatch = useDispatch();
  const { isConfirmEmail, isError, currentUser } = useSelector((state) => state.auth);
  const title = 'Потдвержедние почты';
  const description = 'Invalid Access Page';

  const params = getParamsUrlFromWindow();

  useEffect(() => {
    if (params.token) {
      dispatch(fetchConfirmEmail(params.token));
    } else {
      window.location.href = '/login';
    }
  }, [dispatch, params.token]);

  useEffect(() => {
    if (isConfirmEmail) {
      dispatch(saveUser(currentUser));
    }
  }, [isError, currentUser, dispatch]);

  const rightSide = (
    <div className="sw-lg-80 min-h-100 bg-foreground d-flex justify-content-center align-items-center shadow-deep py-5 full-page-content-right-border">
      <div className="sw-lg-60 px-5">
        {/* <div
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
        </div> */}
        {!isError.confirmEmail ? (
          <>
            <div className="mb-5">
              {/* <h2 className="cta-1 mb-0 text-primary">Ooops, it looks like an error!</h2> */}
              <h2 className="display-2 text-primary">Почта потдверждена!</h2>
            </div>
            <div className="mb-5">
              <p className="h6">Для вас доступна месяц бесплатного использования сервиса.</p>
              {/* <p className="h6">
            If you think that is a mistake, please <NavLink to="/">contact</NavLink> us.
          </p> */}
            </div>
            <div>
              <NavLink to="/" className="btn btn-icon btn-icon-start btn-primary">
                <CsLineIcons icon="arrow-left" /> <span>Вернуться</span>
              </NavLink>
            </div>
          </>
        ) : (
          <>
            <div className="mb-5">
              <h2 className="display-2 text-primary">Ошибка потдверждения почты. Свяжитесь с нами</h2>
            </div>
            <div>
              <a href="/" className="btn btn-icon btn-icon-start btn-primary">
                <CsLineIcons icon="arrow-left" /> <span>Продолжить</span>
              </a>
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

export default InvalidAccess;

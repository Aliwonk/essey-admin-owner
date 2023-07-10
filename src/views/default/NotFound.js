import React from 'react';
import { NavLink } from 'react-router-dom';
import LayoutFullpage from 'layout/LayoutFullpage';
import CsLineIcons from 'cs-line-icons/CsLineIcons';
import HtmlHead from 'components/html-head/HtmlHead';
import { SVGLogo } from 'components/svg-components/SVGcomponents';

const NotFound = () => {
  const title = '404 Not Found';
  const description = '404 Not Found Page';

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
        <div className="mb-5">
          {/* <h2 className="cta-1 mb-0 text-primary">Ooops, it looks like an error!</h2> */}
          <h2 className="display-2 text-primary">404 Страница не найден</h2>
        </div>
        {/* <div className="mb-5">
          <p className="h6">It looks like the page you are looking for is not available.</p>
          <p className="h6">
            If you think that is a mistake, please <NavLink to="/">contact</NavLink> us.
          </p>
        </div> */}
        <div>
          <NavLink to="/" className="btn btn-icon btn-icon-start btn-primary">
            <CsLineIcons icon="arrow-left" /> <span>Вернуться на главную</span>
          </NavLink>
        </div>
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

export default NotFound;

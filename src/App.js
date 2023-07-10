import React, { useEffect, useMemo } from 'react';

// import redux for auth guard
import { useDispatch, useSelector } from 'react-redux';

// import layout
import Layout from 'layout/Layout';

// import routing modules
import RouteIdentifier from 'routing/components/RouteIdentifier';
import { getRoutes } from 'routing/helper';
import routesAndMenuItems from 'routes.js';
import Loading from 'components/loading/Loading';
import { fetchProfileOwner } from 'auth/async';

const App = () => {
  const dispatch = useDispatch();
  const { currentUser, user, isProfile } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user.token) {
      window.location.href = '/register';
    } else {
      dispatch(fetchProfileOwner(user.token));
    }
  }, [dispatch, user.token]);

  useEffect(() => {
    if (Object.keys(currentUser).length > 0) {
      if (currentUser.list_shop.length === 0) {
        window.location.href = 'register-company';
      }
    }
  }, [currentUser, isProfile]);

  const routes = useMemo(() => getRoutes({ data: routesAndMenuItems, isLogin: user, userRole: currentUser.role }), [currentUser.role, user]);
  if (routes) {
    return (
      <Layout>
        <RouteIdentifier routes={routes} fallback={<Loading />} />
      </Layout>
    );
  }
  return <></>;
};

export default App;

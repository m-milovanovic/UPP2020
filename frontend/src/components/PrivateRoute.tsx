import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  user: any;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  return props.user ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  );
};

export default PrivateRoute;

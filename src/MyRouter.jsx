import React from "react";
import { getComponentName } from "./shared/lib/utils";

const routerContext = React.createContext({});
routerContext.displayName = "RouterContext";

export const Router = ({ children }) => {
  const [path, setPath] = React.useState(window.location.path);

  const changePath = (path) => {
    setPath(path);
    window.history.pushState({ path }, "", path);
  };

  const handlePopstate = (event) => {
    const nextPath = event.state && event.state.path;
    if (!nextPath) return;
    setPath(nextPath);
  };

  return (
    <routerContext.Provider value={{ path, changePath }}>
      {children}
    </routerContext.Provider>
  );
};

export const Routes = ({ children }) => {
  const { path } = React.useContext(routerContext);

  let selectedRoute = null;
  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type === React.Fragment) return;
    if (!child.props.path || !child.props.element) return;
    if (child.props.path !== path.replace(/\?.*$/, "")) return;

    selectedRoute = child.props.element;
  });

  return selectedRoute;
};

export const Route = () => null;

export const Link = ({ to, ...rest }) => {
  const { path, changePath } = React.useContext(routerContext);

  const handleClick = (e) => {
    e.preventDefault();
    if (to != path) changePath(to);
  };
  return <a {...rest} href={to} onClick={handleClick} />;
};

export const useNavigate = () => {
  const { path, changePath } = React.useContext(routerContext);
  const navigate = (nextPath) => {
    if (path != nextPath) changePath(nextPath);
  };
  return navigate;
};

export const useMatch = () => {
  const { path } = React.useContext(routerContext);
  const match = (comparedPath) => path === comparedPath;
  return match;
};

export const useParams = () => {
  // TODO: useMemo 사용해야
  const params = new URLSearchParams(window.location.search);
  const paramObject = {};
  for (const [key, value] of params) {
    paramObject[key] = value;
  }
  return paramObject;
};

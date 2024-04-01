import { mount } from 'auth/AuthApp';
import React, { useRef, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';
import cookies from 'js-cookie';
import { useStore } from '../store';
import { crossLoginToSubApp } from '../helpers/login';

export default () => {
  const ref = useRef(null);

  const history = useHistory();

  const { setUserInfo } = useStore();

  useLayoutEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          // get update path from sub-project
          history.push(nextPathname);
        }
      },
    });

    // Update path to sub-project
    history.listen(onParentNavigate);
    // Push on mount
    onParentNavigate(history.location);


    // Listener login event from auth app
    const listenerLoginEvent = ({ detail }) => {
      const { token } = detail || {};
      cookies.set('token', token);
      setUserInfo(detail);
      crossLoginToSubApp(detail);
      history.push('/');
    }

    window.addEventListener('LOGIN_TO_SHELL_APP', listenerLoginEvent)

    return () => {
      window.removeEventListener('LOGIN_TO_SHELL_APP', listenerLoginEvent);
    }
  }, []);

  return <div ref={ref}> </div>
}
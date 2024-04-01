import { mount } from 'marketing/MarketingApp';
import React, { useRef, useLayoutEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useLayoutEffect(() => {
    const { onParentNavigate } = mount(ref.current, {
      onNavigate: ({ pathname: nextPathname }) => {
        const { pathname } = history.location;

        if (pathname !== nextPathname) {
          // get update path from sub-project
          history.push(nextPathname);
        }
      }
    });

    // Update path to sub-project
    history.listen(onParentNavigate);
    // Push on mount
    onParentNavigate(history.location)
  }, []);

  return <div ref={ref}> </div>
}
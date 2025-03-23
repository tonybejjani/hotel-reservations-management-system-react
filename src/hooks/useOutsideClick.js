/** @format */

import { useEffect, useRef } from 'react';

function useOutsideClick(handler, eventCapturingStatus = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClick, eventCapturingStatus);

      return () =>
        document.removeEventListener(
          'click',
          handleClick,
          eventCapturingStatus
        );
    },
    [handler, eventCapturingStatus]
  );

  return ref;
}

export default useOutsideClick;

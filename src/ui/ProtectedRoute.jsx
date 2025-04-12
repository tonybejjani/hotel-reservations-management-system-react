/** @format */

import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticated user
  const { user, isLoading, isAuthenticated, fetchStatus } = useUser();

  //2. If there is NO autenthicated user, redirect to the /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching')
        navigate('/login');
    },
    [isAuthenticated, isLoading, navigate, fetchStatus]
  );

  //3. While loading, show spinned
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  //4. If there is a user, render the app on the dashboard
  if (isAuthenticated) return children;
}

export default ProtectedRoute;

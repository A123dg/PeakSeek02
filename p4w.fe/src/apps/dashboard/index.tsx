import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ADMIN_REVIEWS_ROUTE } from '@apps/admin/constants';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate({ to: ADMIN_REVIEWS_ROUTE, replace: true });
  }, [navigate]);

  return null;
}


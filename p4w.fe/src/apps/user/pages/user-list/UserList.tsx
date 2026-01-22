import { Link, useNavigate } from '@tanstack/react-router';
import { USER_DETAIL_ROUTE } from '@apps/user/constants';
import { Button } from 'antd';

export const UserList = () => {
  const navigate = useNavigate();
  return (
    <div>
      <span>USER LIST</span>

      <Link
        to={USER_DETAIL_ROUTE}
        params={{ userID: 12 }}
        style={{display: 'block'}}
      >
        User 12
      </Link>

      <Link
        to={USER_DETAIL_ROUTE}
        params={{ userID: 13 }}
        style={{display: 'block'}}
      >
        User 13
      </Link>

      <Link
        to={USER_DETAIL_ROUTE}
        params={{ userID: 51 }}
        style={{display: 'block'}}
      >
        User 51
      </Link>

      <Button 
        onClick={() => navigate({to: '/nguoi-dung/100', search: {page:2}})}
      >
        <span> User 100</span>
      </Button>
    </div>
  )
} 
export default UserList
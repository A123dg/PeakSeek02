import {
  Link
} from '@tanstack/react-router'

const Nav = () => {
  
  return (
    <div className="p-2 flex gap-2 text-lg border-b">
      <Link
        to="/"
        activeProps={{
          className: 'font-bold',
        }}
        activeOptions={{ exact: true }}
        style={{marginRight: 10}}
      >
        Home
      </Link>{' '}
      <Link
        to="/nguoi-dung"
        activeProps={{
          className: 'font-bold',
        }}
        style={{marginRight: 10}}
      >
        Users
      </Link>{' '}
      <Link
        to="/dang-nhap"
        activeProps={{
          className: 'font-bold',
        }}
        style={{marginRight: 10}}
      >
        Login
      </Link>{' '}
      <Link
        to="/this-route-does-not-exist"
        activeProps={{
          className: 'font-bold',
        }}
        style={{marginRight: 10}}
      >
        Not Exist
      </Link>
    </div>
  )
}
export default Nav;
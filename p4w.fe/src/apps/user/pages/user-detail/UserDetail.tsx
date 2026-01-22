
import userDetailRoute from '@apps/user/pages/user-detail/Route'

export const UserDetail = () => {
  const params = userDetailRoute.useParams()
  return (
    <div>
      <span>USER DETAIL: {params?.userID}</span>
    </div>
  )
}
export default UserDetail ;
import Nav from "@/shared/components/nav";
import { Button } from "antd";
import useCheckLogin from "@/shared/hooks/useCheckLogin";
import useHandleLogOut from "@apps/dashboard/hooks/useHandleLogOut";

const Dashboard = () => {
  const { isLogin } = useCheckLogin();
  const { handleLogOut } = useHandleLogOut();

  return ( 
    <>
      <Nav />
      <div className="p-2">
        <h3>Welcome Dashboard!</h3>

        <div style={{marginTop: 100}}/>
        {
          isLogin &&
          <Button onClick={handleLogOut}>Log Out</Button>
        }

      </div>
    </>
  )
}

export default Dashboard;
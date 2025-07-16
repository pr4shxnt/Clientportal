import SteeperComponent from "./components/SteeperWrapper";
import NavigationMiddleware from "./lib/NavigationMiddleware";

export default function Login() {
  return (
    <div className="h-screen">
      <NavigationMiddleware/>
      <SteeperComponent/>
    </div>
  );
}

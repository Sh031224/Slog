import axios from "axios";
import { Button } from "ui";

export default function Web() {
  const fc = () =>
    axios.post(
      "http://localhost:3006/auth/login",
      {
        accessToken:
          "EAApNbuH6ih8BAEK1HJWOTz2SEm1QxtNdkeZBmkCPXJdzH1K0ZCjZCZBBk9oxaL4I6NISC0hdyLBxRi4PQNQeuAsHSfjCaux8y8uL5MZA4CmmvhNvZAMrpZBLO2bPSus62LO8J3f4vSdXz1GGulU0BGqaBNxHR3KDHf42kKg0OS79kxeds77ZAQrQTPGwezByZCgpl5u1ZCFIsokdZA5bDQY4t5Q"
      },
      { withCredentials: true }
    );

  return (
    <div>
      <h1 onClick={() => fc()}>Web</h1>
      <Button />
    </div>
  );
}

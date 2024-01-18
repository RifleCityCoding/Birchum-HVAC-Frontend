import Link from "next/link";
import DataService from "@/services/data.service";
import { useEffect, useState } from "react";
import { useGlobalState } from "@/context/GlobalState";

export default function DashboardPage() {
  const [localState, setLocalState] = useState({});
  const [globalState, dispatchEvent] = useGlobalState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get Data and set State
        const resp1 = await DataService.getData({
          data: "hello",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + globalState.user.user_id,
          },
        });

        if (resp1 !== undefined) {
          setLocalState(resp1);
          await dispatchEvent({
            type: "GET_DATA",
            payload: resp1,
          });
        }

        // Send Data and set State
        const resp2 = await DataService.sendData({
          data: "something",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + globalState.user.user_id,
          },
        });

        if (resp2 !== undefined) {
          setLocalState(resp2);
          await dispatchEvent({
            type: "SET_DATA_COMPLETED",
            payload: resp2,
          });
        }
      } catch (error) {
        // Handle the error here
        console.error("An error occurred:", error);
      } finally {
        // Code to run regardless of success or failure
        console.log("Data requests completed");
      }
    };

    fetchData();
  }, [dispatchEvent, globalState.user.user_id]);

  return (
    <div>
      <h1>Dashboard</h1>
      {localState}
    </div>
  );
}

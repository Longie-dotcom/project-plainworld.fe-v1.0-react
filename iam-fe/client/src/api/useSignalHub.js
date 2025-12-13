import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { jwtDecode } from "jwt-decode";

export const useSignalHub = () => {
  const signalrUrl = import.meta.env.VITE_SIGNALR_URL;

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const decoded = jwtDecode(token);

    // email can be in two different claim formats
    const email =
      decoded.email ||
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ];

    if (!email) {
      console.error("❌ No email found in token");
      return;
    }

    const groupName = email; // ⭐ your group name

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(signalrUrl)
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        await connection.start();
        console.log("✅ SignalR connected");

        await connection.invoke("JoinGroup", groupName);
        console.log(`📡 Joined group: ${groupName}`);
      } catch (err) {
        console.error("❌ SignalR connection failed:", err);
      }
    };

    // normal events
    connection.on("Mode-change", (msg) => console.log("📨 Mode-change:", msg));
    connection.on("ReceiveDelete", (msg) => console.log("📨 Delete:", msg));

    // ⭐ LOGOUT (auto delete + redirect)
    connection.on("logout", () => {
      console.log("📨 Logout via SignalR");

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login";
    });

    startConnection();

    return () => connection.stop();
  }, []);
};

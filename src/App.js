import React, { useState } from "react";
import CoverPhoto from "./CoverPhoto";
import ftp from "ftp";

const App = () => {

    const [ftpClient, setFtpClient] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState("");

    const handleConnect = () => {

        const client = new ftp();
        client.on("ready", () => {
            setConnectionStatus("Connected to FTP server");
            setFtpClient(client);
        });
        
        client.on("error", (err) => {
            setConnectionStatus(`Error: ${err.message}`);
        });
        
        client.connect({
            user: "eic9so_qtalbums",
            password: "yeiHeiT5akoh5467h",
        });
    };

    const handleDisconnect = () => {
        if (ftpClient) {
            ftpClient.end();
            setFtpClient(null);
            setConnectionStatus("Disconnected");
        }
    };

    return (
    <div>
        <CoverPhoto
            handleConnect = {handleConnect}
            handleDisconnect = {handleDisconnect}
            ftpClient={ftpClient}
            connectionStatus={connectionStatus}
            setConnectionStatus={setConnectionStatus}
        />
    </div>
);
};

export default App;

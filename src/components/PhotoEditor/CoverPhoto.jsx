import React, { useState } from "react";

const CoverPhoto = ({handleConnect, handleDisconnect, connectionStatus}) => {

    const [showFrame, setShowFrame] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [croppedFile, setCroppedFile] = useState(null);
    const [printSize, setPrintSize] = useState("horizontal");
    const [printWithFrame, setPrintWithFrame] = useState(false);

    
    const handleShowFrame = () => {
        setShowFrame(true);
    };

    const handleHideFrame = () => {
        setShowFrame(false);
    };

    const handleWindowSizeChange = (size) => {
        setPrintSize(size);
    };

    const handleFileUpload = (event) => {

        const file = event.target.files[0];

        if (file && file.type === "image/jpeg" && file.size <= 5 * 1024 * 1024) {
            setUploadedFile(file);
            setCroppedFile(null);
        } else {
            console.error("Invalid file format or size...");
        }
    };

    const getPhotoUrlWithFrame = () => {
        if (!croppedFile) {
            return "";
        }
        const photoUrl = `https://qtalbums.dfirma.pl/Artem/${croppedFile}`;
        return photoUrl;
    };

    const photoUrlWithFrame = getPhotoUrlWithFrame();

    const handleCropFile = () => {

        let cropWidth = 0;
        let cropHeight = 0;
        const dpi = 300;

        if (printSize === "horizontal") {
            cropWidth = 6 * dpi;
            cropHeight = 4 * dpi;
        } else if (printSize === "square") {
            cropWidth = 5 * dpi;
            cropHeight = 5 * dpi;
        } else if (printSize === "vertical") {
            cropWidth = 4 * dpi;
            cropHeight = 6 * dpi;
        }
        
        if (printWithFrame) {
            cropWidth -= 5 * dpi;
            cropHeight -= 5 * dpi;
        }
        
        if(!uploadedFile){
            //...
        }

        setCroppedFile(croppedFile);
    };

    return (
        <div>
            <button onClick={handleConnect}>Connect</button>
            <button onClick={handleDisconnect}>Disconnect</button>
            <div>
                <label>
                <input type="file" accept="image/jpeg" onChange={handleFileUpload} />
                    Upload Photo (JPG, max 5MB)
                </label>
            </div>
            {connectionStatus && <p>{connectionStatus}</p>}
            <div>
                <label>
                    <input
                        type="radio"
                        name="windowSize"
                        value="horizontal"
                        checked={printSize === "horizontal"}
                        onChange={() => handleWindowSizeChange("horizontal")}
                    />
                    Horizontal (6x4cm)
                </label>
                <label>
                    <input
                        type="radio"
                        name="windowSize"
                        value="square"
                        checked={printSize === "square"}
                        onChange={() => handleWindowSizeChange("square")}
                    />
                    Square (5x5cm)
                </label>
                <label>
                    <input
                        type="radio"
                        name="windowSize"
                        value="vertical"
                        checked={printSize === "vertical"}
                        onChange={() => handleWindowSizeChange("vertical")}
                    />
                    Vertical (4x6cm)
                </label>
            </div>
            <div>
                <label>
                <input
                    type="checkbox"
                    checked={showFrame}
                    onChange={showFrame ? handleHideFrame : handleShowFrame}
                />
                {showFrame ? "Hide Frame" : "Show Frame"}
                </label>
            </div>
            {uploadedFile && (
                <div>
                    <img src={URL.createObjectURL(uploadedFile)} alt="Uploaded" />
                    <button onClick={handleCropFile}>Crop File</button>
                </div>
            )}
            {croppedFile && (
                <div>
                    <img
                        src={photoUrlWithFrame}
                        alt="Cropped"
                        style={{ border: showFrame ? "5mm solid yellow" : "none" }}
                    />
                </div>
            )}
        </div>);
};



export default CoverPhoto;
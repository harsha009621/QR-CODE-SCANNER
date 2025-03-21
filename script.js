function onScanSuccess(decodedText, decodedResult) {
    document.getElementById("result").innerText = `Scanned Result: ${decodedText}`;
}

function onScanFailure(error) {
    console.warn(`QR Code scan failed: ${error}`);
}

// Initialize QR Scanner with back camera preference
let html5QrCode = new Html5Qrcode("my-qr-reader");
Html5Qrcode.getCameras().then(devices => {
    if (devices && devices.length) {
        let backCameraId = devices[0].id; // Default to first camera

        // Look for a camera labeled as "back" or "environment"
        devices.forEach(device => {
            if (device.label.toLowerCase().includes("back") || device.label.toLowerCase().includes("environment")) {
                backCameraId = device.id;
            }
        });

        html5QrCode.start(
            backCameraId,
            {
                fps: 10,
                qrbox: 250
            },
            onScanSuccess,
            onScanFailure
        );
    }
}).catch(err => console.log("Camera access error: ", err));

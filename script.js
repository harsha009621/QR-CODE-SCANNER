// script.js file

function domReady(fn) {
    if (
        document.readyState === "complete" ||
        document.readyState === "interactive"
    ) {
        setTimeout(fn, 1000);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

domReady(function () {
    let isScanned = false; // To ensure scanning happens only once

    // If QR code is found
    function onScanSuccess(decodeText, decodeResult) {
        const resultElement = document.getElementById("result");

        // Check if the decoded text is a valid URL
        if (decodeText.startsWith("http://") || decodeText.startsWith("https://")) {
            // Update the result element with the URL
            resultElement.innerHTML = "Redirecting to: <a href='" + decodeText + "' target='_blank' id='qrLink'>" + decodeText + "</a>";

            // Allow the user to click the link to go directly to the URL
            const qrLink = document.getElementById('qrLink');
            qrLink.onclick = function(event) {
                event.preventDefault(); // Prevent default anchor behavior
                window.location.href = decodeText; // Redirect immediately on click
                // Optional: Stop scanning
                // htmlscanner.clear(); // Uncomment if you want to stop scanning
            };

            // Set isScanned to true to prevent further scans for this QR code
            isScanned = true; 
        } else {
            // Handle non-URL decoded text by displaying it as a clickable link
            resultElement.innerHTML = "Your QR code is: <a href='http://" + decodeText + "' target='_blank'>" + decodeText + "</a>"; // Making it a clickable link
        }
    }
    function onScanSuccess(decodeText, decodeResult) {
        const resultElement = document.getElementById("result");
    
        // Check if the decoded text is a valid URL
        if (decodeText.startsWith("http://") || decodeText.startsWith("https://")) {
            // Update the result element with the URL
            resultElement.innerHTML = `
                Redirecting to: <a href='${decodeText}' target='_blank' id='qrLink'>${decodeText}</a>
                <button id="copy-link-btn">Copy Link</button>
                <button id="share-link-btn">Share Link</button>
            `;
    
            // Allow the user to click the link to go directly to the URL
            const qrLink = document.getElementById('qrLink');
            qrLink.onclick = function(event) {
                event.preventDefault(); // Prevent default anchor behavior
                window.location.href = decodeText; // Redirect immediately on click
                // Optional: Stop scanning
                // htmlscanner.clear(); // Uncomment if you want to stop scanning
            };
    
            // Add event listeners for the copy link and share link buttons
            const copyLinkBtn = document.getElementById('copy-link-btn');
            copyLinkBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(decodeText);
                alert('Link copied to clipboard!');
            });
    
            const shareLinkBtn = document.getElementById('share-link-btn');
            shareLinkBtn.addEventListener('click', () => {
                if (navigator.share) {
                    navigator.share({
                        title: 'QR Code Link',
                        text: decodeText,
                        url: decodeText,
                    });
                } else {
                    alert('Sharing not supported on this device.');
                }
            });
    
            // Set isScanned to true to prevent further scans for this QR code
            isScanned = true; 
        } else {
            // Handle non-URL decoded text by displaying it as a clickable link
            resultElement.innerHTML = "Your QR code is: <a href='http://" + decodeText + "' target='_blank'>" + decodeText + "</a>"; // Making it a clickable link
        }
    }
    let htmlscanner = new Html5QrcodeScanner(
        "my-qr-reader",
        { fps: 10, qrbox: 250 }
    );
    htmlscanner.render(onScanSuccess);
});

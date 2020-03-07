"use strict";

function blobToUint8Array(blob) {
    return new Promise((resolve, reject) => {
        var fr = new FileReader();
        fr.onload = function() {
            var arraybuffer = this.result;
            var uint8array = new Uint8Array(arraybuffer);
            resolve(uint8array);
        };
        fr.readAsArrayBuffer(blob);
    });
}

window.addEventListener('pdfjs-ready', () => {
    console.log("Loading chicken.pdf");
    fetch('/web/chicken.pdf')
        .then((response) => {
            response.blob().then(b => {
                blobToUint8Array(b)
                    .then(arr => {
                        PDFViewerApplication.open(arr, 0)
                        .then(() => {

                            console.log("done");
                            });
                    });
            });
    });
});
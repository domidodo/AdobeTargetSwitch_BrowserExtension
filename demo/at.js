
// Ändere den Text der Katze
document.addEventListener("DOMContentLoaded", function() {
    // Ändere den Textabschnitt der Katze
    const catText = document.querySelector('.content:nth-of-type(1) .text p');
    if (catText) {
        catText.textContent = 'Luna ist eine abenteuerlustige Katze, die gerne neue Dinge entdeckt. Eines Tages fand sie eine alte Schatzkiste im Garten. Als sie sie öffnete, fand sie viele interessante Dinge darin. Luna verbrachte den ganzen Tag damit, die Schätze zu erkunden und war überglücklich. Von da an ist die Kiste ihr neuer Lieblingsort.';
    }

    // Ändere das Bild des Hundes
    const dogImage = document.querySelector('.content:nth-of-type(2) .image img');
    if (dogImage) {
        dogImage.src = 'https://cdn.pixabay.com/photo/2016/11/19/15/20/dog-1839808_960_720.jpg'; // Neues Bild für den Hund
        dogImage.alt = 'Dog'; // Ändere das Alt-Attribut entsprechend
    }
});


window.adobe = {};
window.adobe.target = {
    VERSION: '2.1-Mock',
    getOffers: () => new Promise((resolve) => {
        resolve({
            execute: {
                pageLoad: {
                    metrics: [],
                    options: [
                        {
                            content: [
                              {
                                type: "setHtml",
                                selector: ".content:nth-of-type(1) .text p",
                                cssSelector: ".content:nth-of-type(1) .text p",
                                content: "Luna ist eine abenteuerlustige Katze, die gerne neue Dinge entdeckt. Eines Tages fand sie eine alte Schatzkiste im Garten. Als sie sie öffnete, fand sie viele interessante Dinge darin. Luna verbrachte den ganzen Tag damit, die Schätze zu erkunden und war überglücklich. Von da an ist die Kiste ihr neuer Lieblingsort."
                              }
                            ],
                            type: "actions",
                            responseTokens: {},
                            sourceType: "target"
                        },{
                            content: [
                              {
                                type: "setHtml",
                                selector: ".content:nth-of-type(2) .image img",
                                cssSelector: ".content:nth-of-type(2) .image img",
                                content: "https://cdn.pixabay.com/photo/2016/11/19/15/20/dog-1839808_960_720.jpg"
                              }
                            ],
                            type: "actions",
                            responseTokens: {},
                            sourceType: "target"
                        }
                    ]
                }
            },
            meta: {
                decisioningMethod: "server-side"
            }
        });
    })
}
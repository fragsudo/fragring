function initRing() {
    let dat = "fragring_dat.json"
    console.log("start init");
    try {
        
        let ringId = document.getElementById("fragRingId");
        let currUrl = window.location.href;

        fetch(dat)
            .then(res => {
                if (!res.ok) { 
                    throw new Error(`ERROR: failed to fetch fragring data.`);
                }
                return res.json();
            })
            .then(x => {
                console.log(`x: ${x}`);
                console.log("is able to get into the fetch")

                // clear ringId html
                ringId.innerHTML = ``

                // find curr index & name
                let currIndex = x.findIndex(y => y.url === currUrl);
                // check if curr url is in webring
                if (currIndex === -1) {
                    throw new Error(`ERROR: current url ${currUrl} not found in ring data.`);
                }
                let currObj = x[currIndex];
                let currName = currObj.name;

                // check if there is prev value, if yes then populate
                if (typeof x[currIndex-1] !== 'undefined') {
                    const prevIndex = (currIndex - 1 + x.length) % x.length
                    const prevObj = x[prevIndex];
                    const prevName = prevObj.name;
                    const prevUrl = prevObj.url;
                    ringId.innerHTML += `<a href="${prevUrl}">${prevName}</a>`;
                }

                ringId.innerHTML += `<a href="${currUrl}">${currName}</a>`;

                // check if there is next value, if yes then populate
                if (typeof x[currIndex+1] !== 'undefined') {
                    const nextIndex = (currIndex + 1) % x.length;
                    const nextObj = x[nextIndex];
                    const nextName = nextObj.name;
                    const nextUrl = nextObj.url;
                    ringId.innerHTML += `<a href="${nextUrl}">${nextName}</a>`
                }
        }).catch(err => console.log(`ERROR ${err}: Error fetching fragring data.`))
    } catch (err) {
        console.error(`ERROR ${err}: Error initializing fragring.`);
    }
}

window.addEventListener("load", () => {
    initRing();
});
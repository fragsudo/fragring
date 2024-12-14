function initWeb() {
    let dat = "fragring_dat.json"
    try {
        let webId = document.getElementById("fragWebId");
        fetch(dat)
            .then(res => {
                if (!res.ok) { 
                    throw new Error(`ERROR: failed to fetch fragring data.`);
                }
                return res.json();
            })
            .then(x => {
                // clear webId html
                webId.innerHTML = ``
                
                // populate the page with badges
                x.forEach(e => {
                    if (e.badgeUrl) {
                        webId.innerHTML += `<a href="${e.url}" target="_blank"><img width="88" height="31" padding="10px" align="center" src="${e.badgeUrl}" title="${e.name}"></a>`
                    } else {
                        webId.innerHTML += `<a href="${e.url}" target="_blank"><img width="88" height="31" padding="10px" align="center"  src="https://user-images.githubusercontent.com/20684618/31289519-9ebdbe1a-aae6-11e7-8f82-bf794fdd9d1a.png" title="${e.name}"></a>`
                    }
                });
                
        }).catch(err => console.log(`ERROR ${err}: Error fetching fragweb data.`))
    } catch (err) {
        console.error(`ERROR ${err}: Error initializing fragweb.`);
    }
}

window.addEventListener("load", () => {
    initWeb();
});
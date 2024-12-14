function initRing() {
    let dat = "https://fragsudo.github.io/fragring/fragring_dat.json"
    try {
        
        let ringId = document.getElementById("fragRingId");
        let queryId = ringId.innerHTML;
        let ringUrl = `https://fragsudo.github.io/fragring/`;

        fetch(dat)
            .then(res => {
                if (!res.ok) { 
                    throw new Error(`ERROR: failed to fetch fragring data.`);
                }
                return res.json();
            })
            .then(x => {
                // console.log(`x: ${x}`);
                // console.log("is able to get into the fetch")

                // clear ringId html
                ringId.innerHTML = ``

                // find curr obj
                let normalizedQueryId = parseInt(queryId.toLowerCase().replace(/\s/g, ''));
                let currIndex = x.findIndex(y => y.queryId === normalizedQueryId);
                
                // check if curr url is in webring
                if (currIndex === -1) {
                    throw new Error(`ERROR: current queryId ${queryId} not found in ring data.`);
                }

                // assign currObj stuff
                let currObj = x[currIndex];
                let currName = currObj.name;

                // check if there is prev value
                // if no prev value (currIndex is 0, beginning of data), prev is now end of data
                let prevIndex = (typeof x[currIndex-1] === 'undefined') ? currIndex - 1 + x.length : (currIndex - 1 + x.length) % x.length;
                let prevObj = x[prevIndex];
                ringId.innerHTML += `<a href="${prevObj.url}"><- ${prevObj.name} </a>`;
                
                ringId.innerHTML += `\t\t<a href="${ringUrl}">FRAGRING</a>\t\t`;

                // check if there is next value
                // if no next value (currIndex is end of dat), next is now beginning of data
                let nextIndex = (typeof x[currIndex-1] === 'undefined') ? (currIndex - 1 + x.length) % x.length : currIndex - 1 + x.length;
                let nextObj = x[nextIndex];
                ringId.innerHTML += `<a href="${nextObj.url}">${nextObj.name} -></a>`;
        }).catch(err => console.log(`ERROR ${err}: Error fetching fragring data.`))
    } catch (err) {
        console.error(`ERROR ${err}: Error initializing fragring.`);
    }
}

window.addEventListener("load", () => {
    initRing();
});
function initRing() {
    try {
        let dat = "fragring_dat.json"
        let ringId = document.getElementById("fragRingId");
        let currUrl = window.location.href;

        fetch(dat).then(res => res.json()).then(x => {
            // find curr index & name
            const currIndex = x.findIndex(y => y.url === currUrl);
            const currName = x[currIndex].name; 

            // populating the ring w/ prev
            const prevIndex = x[(currIndex - 1 + x.length) % x.length];
            const prevName = x[prevIndex].name;
            const prevUrl = x[prevIndex].url;

            // populating the ring w/ next
            const nextIndex = x[[(currIndex + 1) % x.length]];
            const nextName = x[nextIndex].name;
            const nextUrl = x[nextIndex].url;

            ringId.innerHTML = `<a href="${prevUrl}>${prevName}</a> FRAGRING <a href="${nextUrl}>${nextName}</a>`
        })
    } catch (err) {
        console.error("ERROR ${err}: Error initializing fragring.");
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initWebring);
} else {
    initWebring();
}
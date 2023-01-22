// const key = 'myKey';
// const value = { name: 'my value' };

// chrome.storage.local.set({key: value}, () => {
//   console.log('Stored name: ' + value.name);
// });

    // chrome.storage.sync.set({ "data": data });
    // chrome.storage.sync.get(["data"]).then((result) => {
    //     console.log(`Value is currently ${result["data"]}`);
    //     console.log(printData(result["data"]));
    //     console.log(typeof result["data"][0]);

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
            `Storage key "${key}" in namespace "${namespace}" changed.`,
            `Old value was "${oldValue}", new value is "${newValue}".`
        );
    }
});
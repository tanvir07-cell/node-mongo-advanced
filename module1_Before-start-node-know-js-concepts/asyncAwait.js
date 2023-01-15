const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("success");
  }, 1000);
});

// ami ei promise theke data gula consume korte chaile age .then and .catch likha laagto

// kintu async await ar ta laage nah:

// this is the iife function:
(async () => {
  await promise;
})();

// react e amra jeivabe data fetch kortam .then diye ta chilo ekti promise:

fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));

// async-await fetch:
async function fetchFunc(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

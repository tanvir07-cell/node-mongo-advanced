/**
 * promise has 3 steps
 * 1. pending
 * 2.resolved(when we successfully get the data)
 * 3. rejected(when we failed to get the data)
 
 */

const promise = new Promise((resolve, reject) => {
  const user = null;
  if (!user) {
    reject("Failed to get the data");
  } else {
    setTimeout(() => {
      resolve("Get the data successfully");
    }, 1000);
  }
});

// ekhon ei promise theke jei data gula asbe seigula ami consume korbo then ar catch block e

promise.then((res) => console.log(res)).catch((err) => console.log(err));

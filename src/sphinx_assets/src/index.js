import { sphinx } from "../../declarations/sphinx";

window.addEventListener("load", async function () {
  // console.log("Finished loading");
  update();
});

document.querySelector("form").addEventListener("submit", async function (event) {
  event.preventDefault();
  // console.log("Submitted.");

  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const outputAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  button.setAttribute("disabled", true);

  if (document.getElementById("input-amount").value.length != 0) {
    await sphinx.topUp(inputAmount);
  }

  if (document.getElementById("withdrawal-amount").value.length != 0) {
    await sphinx.withdrawl(outputAmount);
  }

  await sphinx.compound();

  update()

  document.getElementById("input-amount").value = "";
  document.getElementById("withdrawal-amount").value = "";

  button.removeAttribute("disabled");

});

async function update() {
  const currentAmount = await sphinx.checkBalance();
  document.getElementById("value").innerText = Math.round(currentAmount * 100) / 100;
};

//--------------------------------------------------------------


const loginWithEth = async () => {
  if (window.web3) {
    try {
      const selectedAccount = await window.ethereum
        .request({
          method: "eth_requestAccounts",
        })
        .then((accounts) => accounts[0])
        .catch(() => {
          throw Error("Please select an account");
        });

      window.userWalletAddress = selectedAccount;

      window.localStorage.setItem("userWalletAddress", selectedAccount);

      showUserDashboard();

    } catch (error) {
      alert(error);
    }
  } else {
    alert("No wallet was found");
  }
};

document.querySelector(".login-btn").addEventListener("click", loginWithEth);


const showUserDashboard = async () => {

  if (!window.userWalletAddress) {

    document.title = "Web3 Login";

    document.querySelector(".login-section").style.display = "flex";

    document.querySelector(".dashboard-section").style.display = "none";

    return false;
  }

  document.title = "Web3 Dashboard 🤝";

  document.querySelector(".login-section").style.display = "none";

  document.querySelector(".dashboard-section").style.display = "flex";

};

const logout = () => {
  window.userWalletAddress = null;

  window.localStorage.removeItem("userWalletAddress");

  showUserDashboard();
};

document.querySelector(".sign-out").addEventListener("click", logout);
import { createClient, LiveList } from "@liveblocks/client";

const client = createClient({
  publicApiKey:
    "pk_dev_pnJaKdxeugMeZuvpPb_h1OCfSqoVvXmAN_WBhCdpDqNWq6tlgJlEonP-BhFarNG2",
});

async function run() {
  const usersContainer = document.getElementById("users-container");
  const checkIn = document.getElementById("check-in");
  const nameInput = document.getElementById("name-input");
  const alarmModal = document.getElementById("alarm-reminder-modal");
  const alarmModalConfirm = document.getElementById("confirm");
  const alarmModalCancel = document.getElementById("cancel");

  alarmModalConfirm.addEventListener("click", () => {
    alarmModal.close();
  })

  const { room, leave } = client.enterRoom("Century", {
    initialStorage: {
      users: new LiveList([]),
    },
  });

  const { root } = await room.getStorage();
  const users = root.get("users");

  let name = "";

  checkIn.addEventListener("click", () => {
    name = nameInput.value;
    users.push(name);
  });

  room.subscribe(users, () => {
    renderUsers();
  });

  function renderUsers() {
    usersContainer.innerHTML = "";

    users.forEach((u, i) => {
      const userContainer = document.createElement("div");
      userContainer.classList.add("user")

      userContainer.innerHTML += u;
      const checkoutButton = createCheckoutButton();
      checkoutButton.addEventListener("click", () => {
        if (users.length === 1) {
          alarmModal.showModal();
        }
        users.delete(i);
      });
      userContainer.appendChild(checkoutButton);
      usersContainer.appendChild(userContainer);
    });
  }

  renderUsers();
}

run();

function createCheckoutButton() {
  const elem = document.createElement("span");
  elem.innerText = "X";
  return elem;
}

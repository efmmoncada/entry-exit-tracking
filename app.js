import { createClient, LiveList } from "@liveblocks/client";

const client = createClient({
  publicApiKey:
    "pk_dev_pnJaKdxeugMeZuvpPb_h1OCfSqoVvXmAN_WBhCdpDqNWq6tlgJlEonP-BhFarNG2",
});

async function run() {
  const { room, leave } = client.enterRoom("Century", {
    initialStorage: {
      users: new LiveList([]),
    },
  });

  const { root } = await room.getStorage();
  const users = root.get("users");

  const userList = document.getElementById("present-users");
  const checkIn = document.getElementById("check-in");
  const checkOut = document.getElementById("check-out");
  const nameInput = document.getElementById("name-input");
  let name = "";

  checkIn.addEventListener("click", () => {
    name = nameInput.value;
    users.push(name);
  });

  room.subscribe(users, () => {
    renderUsers()
  });

  function renderUsers() {
    userList.innerHTML = "";

    users.forEach((u) => {
      const userItem = document.createElement("li");
      userItem.innerHTML = u;
      userList.appendChild(userItem);
    });
  }

  renderUsers();
}

run();

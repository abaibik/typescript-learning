import { renderBlock } from "./lib";

function getData(key: string, defaultValue: unknown): string {
  const value = localStorage.getItem(key);
  if (value) return value;
  switch (typeof defaultValue) {
    case "number":
      return `${defaultValue}`;
    case "object":
      return JSON.stringify(defaultValue);
    default:
      throw new Error("Unsupported type");
  }
}

interface UserData {
  username: string;
  avatarUrl: string;
}

function getUserData(): UserData {
  const user = JSON.parse(
    getData("user", {
      username: "Wade Warren",
      avatarUrl: "/img/avatar.png",
    })
  );
  return user;
}

function getFavoritesAmount(): number {
  const favoritesAmount = parseInt(getData("favoritesAmount", 0));
  return favoritesAmount;
}

export function renderUserBlock() {
  const favoriteItemsAmount = getFavoritesAmount();

  const { username, avatarUrl } = getUserData();

  const favoritesCaption = favoriteItemsAmount
    ? favoriteItemsAmount
    : "ничего нет";
  const hasFavoriteItems = favoriteItemsAmount ? true : false;

  renderBlock(
    "user-block",
    `
    <div class="header-container">
      <img class="avatar" src="${avatarUrl}" alt="${username}" />
      <div class="info">
          <p class="name">${username}</p>
          <p class="fav">
            <i class="heart-icon${
              hasFavoriteItems ? " active" : ""
            }"></i>${favoritesCaption}
          </p>
      </div>
    </div>
    `
  );
}

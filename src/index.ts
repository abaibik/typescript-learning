import { renderSearchFormBlock } from "./search-form";
import { renderSearchStubBlock } from "./search-results";
import { renderUserBlock } from "./user";
import { renderToast } from "./lib";
import * as moment from "moment";

window.addEventListener("DOMContentLoaded", () => {
  renderUserBlock();
  renderSearchFormBlock(
    moment().add(1, "days").toDate(),
    moment().add(3, "days").toDate()
  );
  renderSearchStubBlock();
  renderToast(
    {
      text: "Это пример уведомления. Используйте его при необходимости",
      type: "success",
    },
    {
      messageText: null,
      name: "Понял",
      handler: () => {
        console.log("Уведомление закрыто");
      },
    }
  );
});

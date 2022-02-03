import { renderBlock } from "./lib";
import moment from "moment";

interface SearchFormData {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  maxPrice: number;
}

function handleSearch(form: HTMLFormElement) {
  const cityEl = form.querySelector<HTMLInputElement>("#city");
  const city = cityEl ? cityEl.value : "unknown";
  const checkInEl = form.querySelector<HTMLInputElement>("#check-in-date");
  const checkInDate = new Date(checkInEl ? checkInEl.value : "");
  const checkOutEl = form.querySelector<HTMLInputElement>("#check-out-date");
  const checkOutDate = new Date(checkOutEl ? checkOutEl.value : "");
  const maxPriceEl = form.querySelector<HTMLInputElement>("#max-price");
  const maxPrice = maxPriceEl ? parseInt(maxPriceEl.value) : 1000;

  const searchFormData = { city, checkInDate, checkOutDate, maxPrice };

  search(searchFormData, (value) => {
    console.log(value);
  });
}

interface Place {
  city: string;
}

type SearchCallBack = (value: Place[] | Error) => void;

function search(searchFormData: SearchFormData, cb: SearchCallBack) {
  setTimeout(() => {
    if (Math.random() < 0.5) {
      cb(new Error("Error"));
    } else {
      cb([]);
    }
  }, 2000);

  console.log(searchFormData);
}

export function renderSearchFormBlock(checkInDate: Date, checkOutDate: Date) {
  const checkIn = moment(checkInDate);
  const checkOut = moment(checkOutDate);

  const today = moment();
  const lastDay = moment().add(1, "M").endOf("month");

  const formatDate = (value: moment.Moment) => value.format("YYYY-MM-DD");

  const hanleSubmit = (event: Event | undefined = undefined) => {
    if (event) {
      event.preventDefault();
      handleSearch(event.target as HTMLFormElement);
    }
  };
  hanleSubmit();

  renderBlock(
    "search-form-block",
    `
    <form> 
      <fieldset class="search-filedset">
        <div class="row">
          <div>
            <label for="city">Город</label>
            <input id="city" type="text" disabled value="Санкт-Петербург" />
            <input type="hidden" disabled value="59.9386,30.3141" />
          </div>
          <!--<div class="providers">
            <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
            <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
          </div>--!>
        </div>
        <div class="row">
          <div>
            <label for="check-in-date">Дата заезда</label>
            <input id="check-in-date" type="date" value="${formatDate(
              checkIn
            )}" min="${formatDate(today)}" max="${formatDate(
      lastDay
    )}" name="checkin" />
          </div>
          <div>
            <label for="check-out-date">Дата выезда</label>
            <input id="check-out-date" type="date" value="${formatDate(
              checkOut
            )}" min="${formatDate(today)}" max="${formatDate(
      lastDay
    )}" name="checkout" />
          </div>
          <div>
            <label for="max-price">Макс. цена суток</label>
            <input id="max-price" type="text" value="" name="price" class="max-price" />
          </div>
          <div>
            <div><button>Найти</button></div>
          </div>
        </div>
      </fieldset>
    </form>
    `
  );
}

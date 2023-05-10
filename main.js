const info = document.querySelector(".info");
const btn = document.querySelector(".btn");

btn.addEventListener("click", renderLocation);

async function renderLocation() {
  const res = await fetch("https://api.ipify.org/?format=json");
  const { ip } = await res.json();
  const restwo = await fetch(
    `http://ip-api.com/json/${ip}?fields=continent,country,region,city,district`
  );
  const data = await restwo.json();
  createLocation(data);
}

function createLocation(data) {
  const { continent, country, region, city, district } = data;
  const elements = [continent, country, region, city, district];
  const namesElements = ["Континент", "Країна", "Регіон", "Місто", "Район"];

  elements.forEach((value, el) => {
    if (value !== "") {
      info.innerHTML += `<p>${namesElements[el]}: ${value}</p>`;
    } else {
      info.innerHTML += `<p>${namesElements[el]}:  не знайдено`;
    }
  });
}

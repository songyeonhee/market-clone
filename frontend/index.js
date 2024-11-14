const calcTime = (timestamp = Date.now()) => {
  const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
  const time = new Date(curTime - timestamp);
  const hour = time.getHours();
  const minute = time.getMinutes();
  const second = time.getSeconds();

  if (hour > 0) return `${hour}시간 전`;
  else if (minute > 0) return `${minute}분 전`;
  else if (second >= 0) return `${second}초 전`;
  else return "방금 전";
};

const renderData = (data) => {
  const main = document.querySelector("main");
  //Array에서만 사용 가능한 구문. 배열 각각의 항목을 돌면서 해당 값을 실행
  data
    .sort((a, b) => a)
    .forEach(async (obj) => {
      const div = document.createElement("div");
      div.className = "item-list";

      const imgDiv = document.createElement("div");
      imgDiv.className = "item-list__img";

      const img = document.createElement("img");
      const res = await fetch(`/images/${obj.id}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      img.src = url;

      const infoDiv = document.createElement("div");
      infoDiv.className = "item-list__info";

      const infoTitleDiv = document.createElement("div");
      infoTitleDiv.className = "item-list__info-title";
      infoTitleDiv.innerText = obj.title;

      const infoMetaDiv = document.createElement("div");
      infoMetaDiv.className = "item-list__info-meta";
      infoMetaDiv.innerText = obj.place + "  " + calcTime(obj.insertAt);

      const infoPriceDiv = document.createElement("div");
      infoPriceDiv.className = "item-list__info-price";
      infoPriceDiv.innerText = obj.price;

      imgDiv.appendChild(img);
      infoDiv.appendChild(infoTitleDiv);
      infoDiv.appendChild(infoMetaDiv);
      infoDiv.appendChild(infoPriceDiv);
      div.appendChild(imgDiv);
      div.appendChild(infoDiv);
      main.appendChild(div);
    });
};

const fetchList = async () => {
  const accessToken = window.localStorage.getItem("token");
  const res = await fetch("/items", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (res.status === 401) {
    alert("로그인이 필요합니다.");
    window.location.pathname = "/login.html";
    return;
  }
  const data = await res.json();
  renderData(data);
};

fetchList();

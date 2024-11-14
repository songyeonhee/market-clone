const form = document.querySelector("#login-form");

const handleSubmit = async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const sha256Password = sha256(formData.get("password"));
  formData.set("password", sha256Password);

  const res = await fetch("/login", {
    method: "POST",
    body: formData,
  });
  const data = await res.json();
  const accessToken = data.access_token;
  window.localStorage.setItem("token", accessToken);
  alert("로그인에 성공하였습니다.");

  window.location.pathname = "/";

  // const btn = document.createElement("button");
  // btn.innerText = "게시물 가져오기";
  // btn.addEventListener("click", async () => {
  //   const res = await fetch("/items", {
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   });
  //   const data = await res.json();
  //   console.log(data);
  // });
  // infoDiv.appendChild(btn);

  // if (res.status === 200) {
  //   alert("로그인에 성공하였습니다.");
  //   window.location.pathname = "/";
  // } else if (res.status === 401) {
  //   alert("ID 또는 password가 일치하지 않습니다.");
  // }
};

form.addEventListener("submit", handleSubmit);

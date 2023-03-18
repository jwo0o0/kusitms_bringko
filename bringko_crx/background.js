//docker에 있는 서버로 요청해 tag에 알맞은 답변을 받아옴
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const requestData = { tags: request.tag };
  fetch("http://127.0.0.1:5001/model", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      sendResponse({ answer: data });
    })
    .catch((err) => {
      sendResponse({ answer: "알맞은 답변을 찾을 수 없습니다." });
    });
  return true;
});

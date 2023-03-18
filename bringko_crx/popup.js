const tagInput = document.querySelector("input#tag");
const generateBtn = document.querySelector("button.generate");
const answerBox = document.querySelector("div.answer");
const fillBtn = document.querySelector("button.fill");
const copyBtn = document.querySelector("button.copy");

//답변생성 버튼 클릭시 답변 생성 후 보여줌
generateBtn.addEventListener("click", () => {
  if (tagInput.value) {
    generateAnswer(tagInput.value);
  }
});

//답변 생성
const generateAnswer = async (tag) => {
  const answer = (tag) => {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ tag: tag }, (response) => {
        resolve(response.answer);
      });
    });
  };

  answer(tag)
    .then((res) => {
      answerBox.innerHTML = res;
    })
    .catch(() => {
      answerBox.innerHTML = "";
    });
};

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(answerBox.innerHTML);
});

//답장입력 버튼 클릭시 Zendesk answer 답변에 내용 입력
// fillBtn.addEventListener("click", async () => {
//   let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//   await chrome.scripting.executeScript({
//     target: {
//       tabId: tab.id,
//     },
//     func: () => {
//       document.querySelector(
//         "#editor-view > span > div > div > div > div.zendesk-editor--rich-text-container.sc-1j8a31a-0.dsFzEz > div.q5rfsr-0.depXzB > div > p"
//       ).innerHTML = "답변";
//     },
//   });
// });

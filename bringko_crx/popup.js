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

//SentenceTransformer 모델 호출 -> 답변 생성
//-> 익스텐션의 창에 보여줌
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

//복사하기 버튼 클릭시 클립보드에 답변 내용 복사
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(answerBox.innerHTML);
});

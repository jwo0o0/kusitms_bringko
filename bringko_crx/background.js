chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // let spawn = require("child_process").spawn;
  // let result = spawn("py", ["/model/model.py", request.tag]);

  // let answer = "";
  // result.stdout.on("data", function (data) {
  //   answer = "111" + data.toString();
  // });
  // result.stderr.on("data", function (data) {
  //   answer = "222" + data.toString();
  // });
  // sendResponse({ answer });
  sendResponse({ answer: request.tag + "에 대해 생성된 답변" });
});

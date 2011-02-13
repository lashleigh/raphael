var paper, btn, cd;

$(function () {
  paper = Raphael("canvas", 640, 480);
  btn = document.getElementById("run");
  cd = document.getElementById("code");
  $("#code").val(localStorage.getItem('code'));

  setCanvas();
  $("#run").live("click", function() {
    setCanvas();
    localStorage.setItem('code', $(cd).val());
  });
 
});

function setCanvas() {
  paper.clear();
  paper.rect(0, 0, 640, 480, 10).attr({fill: "#fff", stroke: "none"});
  try {
    (new Function("paper", "window", "document", $("#code").val())).call(paper, paper);
  } catch (e) {
    alert(e.message || e);
  }
}

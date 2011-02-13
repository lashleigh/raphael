var paper, btn, cd;

$(function () {
  paper = Raphael("canvas", 640, 480);
  btn = document.getElementById("run");
  cd = document.getElementById("code");
  if( localStorage.getItem('code')) {
    $("#code").val(localStorage.getItem("code"));
  } else {
    $("#code").val('paper.circle(420, 340, 60).animate({fill: "blue", stroke: "#000", "stroke-width": 40, "stroke-opacity": 0.5}, 2000); ');
  }

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

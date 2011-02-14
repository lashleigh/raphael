var paper, btn, cd;

$(function () {
  paper = Raphael("canvas", 640, 480);
  btn = document.getElementById("run");
  cd = document.getElementById("code");
  if( localStorage.getItem('code')) {
    $("#code").val(localStorage.getItem("code"));
  } else {
    $("#code").val('var p = paper.circle(420, 240, 60).animate({fill: "blue", stroke: "#000", "stroke-width": 40, "stroke-opacity": 0.5}, 2000);\n'+ 
'var st = paper.set(); \n'+
'st.push( \n'+
'  paper.rect(200, 400, 50, 50, 10),\n '+
'  paper.circle(70, 400, 50) \n'+
'); \n'+
'st.animate({fill: "green", stroke: "#000", "stroke-width": 40, "stroke-opacity": 0.5}, 1000);');
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
    (new Function("paper", "window", "document", $("#code").val() ) ).call(paper, paper);
  } catch (e) {
    alert(e.message || e);
  }
}

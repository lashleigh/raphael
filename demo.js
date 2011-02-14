var paper;
var canvas_width;
var canvas_height;

$(function () {
  set_dimensions();

  if( localStorage.getItem('code')) {
    $("#code").val(localStorage.getItem("code"));
  } else {
    $("#code").val( 'paper.circle(320, 240, 60).animate({fill: "#223fa3", stroke: "#000", "stroke-width": 80, "stroke-opacity": 0.5}, 2000);\n'+ 
                    'var st = paper.set(); \n'+
                    'st.push( \n'+
                    '  paper.rect(800, 300, 50, 50, 10), \n'+
                    '  paper.circle(670, 100, 60) \n'+
                    ');\n\n'+
                    'st.animate({fill: "red", stroke: "#000", "stroke-width": 30, "stroke-opacity": 0.5}, 1000);');
  }

  setCanvas();
  $("#run").live("click", function() {
    setCanvas();
    localStorage.setItem('code', $("#code").val());
  });
 
});

function setCanvas() {
  paper.clear();
  paper.rect(0, 0, canvas_width, canvas_height, 10).attr({fill: "#fff", stroke: "none"});
  try {
    (new Function("paper", "window", "document", $("#code").val() ) ).call(paper, paper);
  } catch (e) {
    alert(e.message || e);
  }
}

function set_dimensions() {
  canvas_width = .9*screen.width;
  canvas_height = .6*screen.height;
  paper = Raphael("canvas", canvas_width, canvas_height);
  $("#canvas").css("width", canvas_width+"px");
  $("#canvas").css("height", canvas_height+"px");
  $("#code").css("width", canvas_width+"px");
  $("#code").css("height", .5*canvas_height+"px");
}

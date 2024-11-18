//List of questions element
var questions = document.getElementsByClassName("question");

//Applies the dropdown function to all questions element
for (var i = 0; i < questions.length; i++){
  questions[i].addEventListener("click", function(){
      this.classList.toggle("open");
      var answer = this.nextElementSibling;
      if (answer.style.maxHeight == 0){
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else{
        answer.style.maxHeight = null;
      }
  });
}
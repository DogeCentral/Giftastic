
 var bands = ["Pierce the veil", "Linkin Park", "Dance Gavin Dance", "Sleeping with Sirens", "A Day to Remember", "The Black Keys", "The beatles"];   
 function renderButtons() {
 
 $("#buttons-view").empty();

 for (var i = 0; i < bands.length; i++) {

 var a = $("<button>");

 a.addClass("band");

 a.attr("data-name", bands[i]);

 a.text(bands[i]);

 $("#buttons-view").append(a);
 }
}

  
 $('#add-gif').on('click', function(event){
 event.preventDefault();
 userInput = $('#gif-input').val().trim();
 console.log(userInput);
 bands.push(userInput);
 console.log(bands);
 renderButtons();
 })
 $(document).on('click', ".band", function(){
  var x = $(this).data("name");
  console.log(x);


     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +x+
     "&api_key=kqiKKvJG2sEYdrlq3DGOTos6nyNHFnNG&limit=10";
     
 
     $.ajax({
      url: queryURL,method: "GET"})
 
     .done(function(response) {
      console.log(queryURL);
      console.log(response);

  

 for(var i=0; i<response.data.length;i++){

      var bandDiv = $("<div>");

      var p = $("<p>").text("Rating: " + response.data[i].rating);  


      var bandImage = $("<img>");
      bandImage.attr('src',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
             bandImage.attr('data-still',response.data[i].images.fixed_height_still.url.replace(/^http:\/\//i, 'https://'));
             bandImage.attr('data-animate',response.data[i].images.fixed_height.url.replace(/^http:\/\//i, 'https://'));
             bandImage.attr('data-state',"still");
               bandImage.addClass("gif");
                bandDiv.append(p);
      bandDiv.append(bandImage);

      
      $("#gifs-appear-here").prepend(bandDiv);


          
      } //end of the for loop
      $(document).on("click", "img", function() {

var state = $(this).attr("data-state");


if (state === "still") {
 $(this).attr("src", $(this).attr("data-animate"));
 $(this).attr("data-state", "animate");
} else {
 $(this).attr("src", $(this).attr("data-still"));
 $(this).attr("data-state", "still");
}
})
  })
}) 	
renderButtons();
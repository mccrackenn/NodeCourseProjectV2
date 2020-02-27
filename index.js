let userArray = [];
let tripArray = [];
let selectDiff='not selected';
let chosenPlayer = {
  name: ""
}

let newUser = function(pPlayerID, pName, pAge) {
  this.PlayerID = pPlayerID;
  this.Name = pName;
  this.Age = pAge;
}

let newTrip = function(pMountain, pTrail, pDifficulty, pDistance, pElevation){
  this.trailID=tripArray.length+1;
  this.Mountain = pMountain;
  this.Trail = pTrail;
  this.Difficulty = pDifficulty;
  this.Distance = pDistance;
  this.Elevation = pElevation;
}
tripArray.push(new newTrip("Mt. Rainer", "Paradise", "Green Circle", 50, 3000));
tripArray.push(new newTrip("Mt. Hood", "TrailA", "Green Circle", 20, 2000));
tripArray.push(new newTrip("Stevens", "TrailB", "Green Circle", 70, 1000));
document.addEventListener("DOMContentLoaded", function () {

  //user object constructor
document.getElementById('addUserBtn').addEventListener("click", function(){
  userArray.push(new newUser(userArray.length, 
    document.getElementById("name").value, 
    document.getElementById("age").value));
});

//trip object constructor
document.getElementById("addTripBtn").addEventListener("click", function(){
  tripArray.push(new newTrip(document.getElementById("where").value, 
  document.getElementById("trail").value, 
  document.getElementById("select-difficulty").value,
  document.getElementById("distance").value, 
  document.getElementById("elevation").value));
  clearUserInput();
});

//clear input fields
document.getElementById("clearBtn").addEventListener("click", function () {
  clearUserInput();
});

// custom user header page3
$(document).on("pagebeforeshow", "#page3", function(event) {
  let currentUser = document.getElementById("name").value;
  chosenPlayer.name = currentUser;
  document.getElementById("userNameHeader").innerHTML = "Welcome " +chosenPlayer.name;
});
// $(document).on("pagebeforeshow", "#page2", function (event) {   // have to use jQuery 
//  // document.getElementById("IDparmHere").innerHTML = "";
//   createList();
// });

$(document).on("change", "#select-difficulty", function (event, ui) {
  selectedDiff = $('#select-difficulty').val();
});
// clears fields so input doesn't remain after leaving and then returning to page 3
 $(document).on("pagebeforeshow", "#page3", function (Event) {
  clearUserInput();
 });

 function clearUserInput() {
  document.getElementById("where").value = "";
  document.getElementById("trail").value = "";
  document.getElementById("select-difficulty").value = "Green Circle";
  document.getElementById("distance").value = "";
  document.getElementById("elevation").value = "";
 };

 $(document).on("pagebeforeshow", "#page4", function(event) {
  let currentUser = document.getElementById("name").value;
  chosenPlayer.name = currentUser;
  document.getElementById("userNameHeaderPage4").innerHTML = chosenPlayer.name + ", here are your recorded rides";
  createList();

});

$(document).on("pagebeforeshow", "#page5", function (event) {   // have to use jQuery 
  let localID =  document.getElementById("IDparmHere").innerHTML;
  document.getElementById("aWhere").innerHTML = "The region is: " + tripArray[localID-1].Mountain;
  document.getElementById("aTrail").innerHTML = "The trail is: " + tripArray[localID - 1].Trail;
  document.getElementById("aDifficulty").innerHTML = "Difficulty level is: " + tripArray[localID - 1].Difficulty;
  document.getElementById("aDistance").innerHTML = "The distance was: " + tripArray[localID - 1].Distance;
  document.getElementById("aElevation").innerHTML = "The elevation was: " + tripArray[localID - 1].Elevation;
 });

document.getElementById('distanceButton').addEventListener("click", function(){
    tripArray.sort(function(a,b){
      let milesA=a.Distance;
      let milesB=b.Distance;
      if(milesA < milesB){
        return 1;
      }else{
        return -1;
      }
    })
    createList();
})
document.getElementById('totalMileageButton').addEventListener("click", function(){
  myDistanceTotal=0;
  myDistanceTotal=0;
  myDistanceTotal=tripArray.reduce(function(a,b) {
       return  Number(a)+Number(b.Distance);
},myDistanceTotal);
  myElevationTotal=tripArray.reduce(function(a,b){
      return Number(a)+Number(b.Elevation);
  },0);
 console.log(myDistanceTotal);
 console.log(myElevationTotal);
 totalMileage=document.querySelector('#totalMileage');
 totalMileage.style.value='block';
 totalMileage.innerHTML=`Distance Total: ${myDistanceTotal}---------Elevation Total:${myElevationTotal}`;
})

// $(document).on("pagebeforeshow", "#page4", function(event) {
//   if (tripArray = null) {
//     document.getElementById("userTripList").innerHTML = "No trips recorced";
//   }
// });


// To Do List
// 1. when fields are empty, have statements that say so.
// 2. create list on page 4

});

function createList()
{
  // clear prior data
  var userTripList = document.getElementById("userTripList");
  while (userTripList.firstChild) {    // remove any old data so don't get duplicates
      userTripList.removeChild(userTripList.firstChild);
  };

  var ul = document.createElement('ul');  
  tripArray.forEach(function (element,) {   // use handy array forEach method
    var li = document.createElement('li');
    li.innerHTML = `<a data-transition='pop' class='oneTrip' data-parm="${element.trailID}
      "href='#page5'>Go To Trip Details </a> Trail:${element.Trail} Distance: ${element.Distance}`
    ul.appendChild(li);
  });
  userTripList.appendChild(ul)

    // set up an event for each new li item, if user clicks any, it writes >>that<< items data-parm into the hidden html 
    var classname = document.getElementsByClassName("oneTrip");
    Array.from(classname).forEach(function (element) {
        element.addEventListener('click', function(){
            var parm = this.getAttribute("data-parm");  // passing in the record.Id
            console.log(parm);
            //do something here with parameter on  pickbet page
            document.getElementById("IDparmHere").innerHTML = parm;
            document.location.href = "index.html#page5";
        });
    });
  } ;





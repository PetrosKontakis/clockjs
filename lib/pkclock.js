
(function(){
    //Vars 
    this.domElement;
    this.errMessage = "Clock.js err: Please check again your settings in pkClock variable / variable = "
    this.flag = 1;
    this.flagMinutes; 
    this.perimeter;

    //Timer loop 
    this.timeLoop = function(){
      var clockObject = this;
      this.calcTime();

      setTimeout(function () { clockObject.timeLoop();  }, 1000);
    };
    // Constructor 
    this.DOMconstructor = function (){
      // Variable to check if the settings is correct 
      var settings = true;
      var textTimer = false;
      if(this.className && this.size){
        this.domElement = document.getElementsByClassName(this.className)[0];
        this.perimeter = this.culcPerimeter(this.size/2);
      }else{
        settings = false;
        console.log(this.errMessage);
      }
     
      if(settings){
        this.svgConstructor();
      }

    };

    //functions 
    this.culcPerimeter = function (radius){
        var perimeter = 0;
        perimeter = 2 * radius * 3.14;
        return perimeter; 
    }
    this.svgConstructor = function(){
        this.domElement.innerHTML = "<svg width='"+ this.size*2 +"' height='"+ this.size*2 +"' > <title>Clock</title> <desc>SVG clock</desc><circle style='  stroke-dasharray: "+this.perimeter+"; stroke-dashoffset: 0;' class='outer-clock' cx='"+ this.size +"' cy='"+ this.size +"' r='"+ (this.size/2) +"'/> <circle style='  stroke-dasharray: "+this.perimeter+"; stroke-dashoffset: 0;' class='outer outer-seconds' cx='"+ this.size +"' cy='"+ this.size +"' r='"+ (this.size/2) +"' transform='rotate(-90,"+ this.size +", "+ this.size +")' /><line class='outer outer-minutes' x1='"+ (this.size) +"' y1='"+ (this.size) +"' x2='"+ (this.size) +"' y2='"+(this.size/2)+"' /> <line class='outer outer-hours' x1='"+ (this.size) +"' y1='"+ (this.size) +"' x2='"+ (this.size) +"' y2='"+(this.size/1.35)+"' /> </svg></div>";
    }
   
    this.twenTotwo = function (hours){
        if (hours > 12 ){
            hours = hours -12;
        }
        return hours;
    }
    this.circleAction = function (s){
        var per_s =  - (this.perimeter * this.flag )-( this.perimeter / 60 * s);
        object = this.domElement.getElementsByClassName("outer")[0];
        object.setAttribute("style", "stroke-dasharray: " +this.perimeter+"; stroke-dashoffset: "+ per_s +";");
    }
    this.MinutesAction = function (time){
        var size = this.size;
        object = this.domElement.getElementsByClassName("outer")[1];
        var per_time =   360 / 60 * time;
        object.setAttribute("transform", "rotate("+(per_time)+","+ size +", "+ size+")");
    }   
    this.hourAction = function(time){
        var size = this.size;
        object = this.domElement.getElementsByClassName("outer")[2];
        var per_time =   360 / 12 * time;
        //console.log(per_time);
        object.setAttribute("transform", "rotate("+(per_time)+","+ size +", "+ size+")");
    } 
    this.calcTime = function (){
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();

        if (this.flagMinutes != m ){
            this.flagMinutes = m;
            this.flag ++;
        }
        this.circleAction(s);
        this.MinutesAction(m);
        this.hourAction(this.twenTotwo(h));
    }



    //Constructor the Dom
    this.DOMconstructor();
    //Get Alive the mechanism
    this.timeLoop();


}).apply(pkClock);




(function(){
    //Vars 
    this.domElement;
    this.errMessage = "Clock.js err: Please check again your settings in pkTxtClock variable / variable = "
    this.flag = 1;
    this.flagMinutes; 
    this.perimeter;

    //Timer loop 
    this.timeLoop = function(){
      var clockObject = this;
      this.calcTextTimeHMSDR();

      setTimeout(function () { clockObject.timeLoop();  }, 1000);
    };
    // Constructor 
    this.DOMconstructor = function (){
      // Variable to check if the settings is correct 
      var settings = true;
      var textTimer = false;
      if(this.className && this.TextTime && this.region){
        this.domElement = document.getElementsByClassName(this.className)[0];
       
      }else{
        settings = false;
        console.log(this.errMessage);
      }


     
      if(settings){
        this.textTimeConstructor();
        //Get Alive the mechanism
        this.timeLoop();
      }

    };

    this.textTimeConstructor = function(){
       var newDom = "<div><p class='time'><span id='text-hours'>04</span> : <span id='text-minutes'>24</span> <span id='text-ampm'>PM</span></p> <p class='date'><span id='text-date'>Monday</span>, <span id='text-month'>Apr</span> <span id='text-month-date'>04</span>, <span id='text-year'>04</span></p> <p class='region'><span id='text-region'>24</span></p></div>";
       this.domElement.innerHTML = newDom;
        
        var region = document.getElementById("text-region");
        region.innerHTML = "Time in " + this.region;
    }

    this.calcTextTimeHMSDR = function (){
       var today = new Date();
       var hour = document.getElementById("text-hours");
       hour.innerHTML = this.toTwelveHours(today.getHours());
       var minutes = document.getElementById("text-minutes");
       minutes.innerHTML = today.getMinutes();
       var ampm = document.getElementById("text-ampm");
       ampm.innerHTML = this.getAmPm(today.getHours());

       var date = document.getElementById("text-date");
       date.innerHTML = this.getDayOfWeek(today.getDay());    
       var month = document.getElementById("text-month");
       month.innerHTML = this.getMonthName(today.getMonth());
       var day = document.getElementById("text-month-date");
       day.innerHTML = today.getDate();
       var year = document.getElementById("text-year");
       year.innerHTML = today.getFullYear();
    }
    this.getDayOfWeek = function(day){   
      return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][ day ];
    };
    this.getMonthName = function(month){   
      return ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][ month ];
    };
    this.toTwelveHours = function (hours){
      if (hours > 12){ return hours-12;}
      else{ return hours;}
    }
    this.getAmPm = function(hours){
      if (hours > 12) { return 'PM';}
      else {return 'AM';}
    };

    //Constructor the Dom
    this.DOMconstructor();


}).apply(pkTxtClock);

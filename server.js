// server.js
// where your node app starts

// init project
const express = require('express');
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/",(req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello",(req, res) => {
  res.json({greeting: 'hello API'});
});

app.get("/api",(req,res) =>  {
  const newDate= new Date();
  const utcDate= newDate.toUTCString();
  console.log(newDate.valueOf());
  res.json({unix:newDate.valueOf(),utc:utcDate});
});

app.get("/api/:date",(req,res) =>  {
  const input=req.params.date;  //the date input by the user in the :date placeholder
  console.log(input);
  if (isNaN(input)===false)  {
    const newDate= new Date(parseInt(input));
    if (newDate=="Invalid Date")  {
      res.json({error:"Invalid Date"});
    }
    const utcString= newDate.toUTCString();
    console.log("new unix date: "+newDate);
    res.json({unix:parseInt(input),utc:utcString});
  }else{
    const newDate= new Date(input);
    if (newDate=="Invalid Date")  {
      res.json({error:"Invalid Date"});
    }
    const utcString= newDate.toUTCString();
    console.log("new utc date: "+newDate);
    res.json({unix:newDate.getTime(),utc:utcString});
  }


  // console.log("This is the query key: "+req.params.date);
  // const inputArray=[];  //new array to put date into and break apart
  // const discardArray=[];  //array to discard date items
  // const monthArray=[];
  // const dayArray=[];
  
  // input.toString();
  // inputArray.push(input.split(""));
  // console.log("date test: "+new Date("fnjksdnbkhga"));
  // const ia2= inputArray[0][2];
  // const ia3= inputArray[0][3];
  // const ia4= inputArray[0][4];
  // const ia5= inputArray[0][5];
  // const ia6= inputArray[0][6];
  // const ia7= inputArray[0][7];
  // if (isNaN(input)===true)  {  //if at first input is not only numbers
  //   if (ia4.toString()==="-"&&ia7.toString()==="-")  {  // yyyy-mm-dd
  //     discardArray[0]=inputArray[0].splice(4,1);  //pull out the hyphens
  //     discardArray[0]=inputArray[0].splice(6,1);
  //     inputArray[0]=inputArray[0].join("");
  //     console.log("the input array: "+inputArray[0]);
  //     if (isNaN(inputArray[0])===true)  {  //check if the remainder is not a number
  //       if (inputArray[0].toString()==="thisisnot-a-date")  {  //testing to see if this is allowed, not sure why it would be
  //         const dateReturn= new Date(input);
  //         const utcString= dateReturn.toUTCString();
  //         inputArray[0]=inputArray[0].split("");
  //       }else if (inputArray[0][8]===" "&&inputArray[0][11]===":"&&inputArray[0][14]===":")  {  //check if time is included in the input
  //         const dateReturn= new Date(input);
  //         const utcString= dateReturn.toUTCString();
  //         res.json({unix:dateReturn.getTime(),utc:utcString});  //return the json
  //       }else{
  //         console.log("not a number!");
  //         res.json({error:"Invalid Date"});
  //       }
  //     }
  //     monthArray[0]=inputArray[0].slice(4,6);
  //     dayArray[0]=inputArray[0].slice(6,8);
  //     if (monthArray>0&&monthArray<13)  {  //check if the month numbers between 1 and 12
  //       console.log("months check out");
  //       if (dayArray>0&&dayArray<32)  {  //check if the days number between 1 and 31
  //         console.log("days check out");
  //         const dateReturn= new Date(input);
  //         const utcString= dateReturn.toUTCString();
  //         res.json({unix:dateReturn.getTime(),utc:utcString});  //return the json
  //       }
  //     }
  //     // console.log("monthArray: "+monthArray+" "+"dayArray: "+dayArray);
  //   }else if (ia3.toString()===" "&&ia6.toString()===" ")  {  // mmm(ex. jan) dd yyyy
  //     discardArray[0]=inputArray[0].splice(0,4);  //remove the month and spaces
  //     discardArray[0]=inputArray[0].splice(2,1);
  //     console.log(inputArray);
  //     inputArray[0]=inputArray[0].join("");  //join all indexes together
  //     if (isNaN(inputArray[0])===true)  {  //if the remainder is not a number
  //       res.json({error:"Invalid Date"});
  //     }
  //     dayArray[0]=inputArray[0].slice(0,2);
  //     if (dayArray>0&&dayArray<32)  {  //if the days are more than 0 and less than 32
  //       const dateReturn= new Date(input);
  //       const utcString= dateReturn.toUTCString();
  //       res.json({unix:dateReturn.getTime(),utc:utcString});
  //     }
  //   }else if (ia2.toString()===" "&&ia6.toString()===" ")  {  // dd mmm(ex. jan) yyyy
  //     discardArray[0]=inputArray[0].splice(2,5);  //remove the month and all spaces
  //     console.log(inputArray);
  //     inputArray[0]=inputArray[0].join("");
  //     if (isNaN(inputArray[0])===true)  {
  //       res.json({error:"Invalid Date"});
  //     }
  //     dayArray[0]=inputArray[0].slice(0,2);
  //     if (dayArray>0&&dayArray<32)  {
  //       const dateReturn= new Date(input);
  //       const utcString= dateReturn.toUTCString();
  //       res.json({unix:dateReturn.getTime(),utc:utcString});
  //     }
  //   }else{  //if the validation continues
  //     inputArray[0]=inputArray[0].join("");
  //     console.log(inputArray[0]);
  //     if (inputArray[0].indexOf("january")!==-1||inputArray.indexOf("february")!==-1||inputArray.indexOf("march")!==-1||inputArray.indexOf("april")!==-1||inputArray.indexOf("may")!==-1||inputArray.indexOf("june")!==-1||inputArray.indexOf("july")!==-1||inputArray.indexOf("august")!==-1||inputArray.indexOf("september")!==-1||inputArray.indexOf("october")!==-1||inputArray.indexOf("november")!==-1||inputArray.indexOf("december")!==-1)  {
  //       console.log("month confirmed");  //if one of the months are listed in the input
  //       const dateReturn= new Date(input);
  //       const utcString= dateReturn.toUTCString();
  //       res.json({unix:dateReturn.getTime(),utc:utcString});
  //     }else{
  //       res.json({error:"Invalid Date"});
  //     }
  //   }
  // }else{  //if input is only numbers in the form of milliseconds
  //   const dateReturn= new Date(parseInt(input));
  //   const utcString= dateReturn.toUTCString();
  //   console.log("return from unix: "+dateReturn);
  //   res.json({unix:parseInt(input),utc:utcString});
  // }
  // // const myURL= new URL(url);
 
  // // console.log("This is the unix: "+dateReturn.getTime());
  
});

// listen for requests :)
const listener = app.listen(process.env.PORT,() => {
  console.log('Your app is listening on port ' + listener.address().port);
});

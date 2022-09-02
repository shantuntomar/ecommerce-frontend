// react communicate with node js 
var axios = require('axios');
var ServerURL="http://localhost:5000"

const getData = async(url)=>{
    try{
        var response = await fetch(`${ServerURL}/${url}` , {

            method:'GET',
            headers: {

                "authorization" : localStorage.getItem('token'),
                "Content-Type": "application/json;charset=utf-8"
            },

        })
        const result = await response.json();
        return result;

    }
    catch(e){
        console.log(e);
        return null;
    }
}

// for cities
const postData = async(url,body)=>{
    try{
        const response = await fetch(`${ServerURL}/${url}`,{
            method:"POST",
            mode: "cors",
            headers: { 

                "Authorization" : localStorage.getItem('token'),
                "Content-Type": "application/json;charset=utf-8"
            },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        return result;
    }
    catch(e){
        return null;
    }
}

// for images 
const postDataAndImage = async(url,formData,config)=>{
    try{
        const response = await axios.post(`${ServerURL}/${url}`, formData,config )
        const result = await response.data
        return result;
    }
    catch(e){
        return null;
    }
}


export {getData,postData,postDataAndImage,ServerURL}
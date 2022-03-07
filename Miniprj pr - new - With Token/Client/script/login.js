$(document).ready(()=>{
    $("#send").click((event)=>{
        event.preventDefault();
        $.post("http://localhost:8080/fetch/authUser",
        {
            "uname":document.getElementById("uname").value,
            "upwd" : document.getElementById("upwd").value,            
        },
        (data,status)=>{
            console.log("Data: " + JSON.stringify(data) + "\nStatus: " + status);          
            if(data.auth == "success")
            {
                window.localStorage.setItem('token',data.token)  
                window.localStorage.setItem('login',data.user)  
                
                window.open("mainpage.html","parent")                
            }
        })
    })
})
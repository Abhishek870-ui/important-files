let total = 0
let img = ""
let refData = []
let user = window.localStorage.getItem('login')
let token = window.localStorage.getItem('token')
let cartData = ""
document.getElementById("greeting").innerHTML = "Welcome " + user
function updateCart() {
    let x = "", i;
    x = '<div class = "row">'
    $.post("http://localhost:8080/fetch/fetchCart", { uname: user, token : token },
        (newdata, status) => {
            cartData = newdata
            console.log("updateCart data:- ", newdata, "\n Status:- ", status)
            for (i = 0; i < newdata.length; i++) {
                if (newdata[i].qty > 0 && newdata[i].byed == 0) {
                    console.log(" ref data ", refData, " new data ", newdata[i])
                    tempData = refData.filter((element, index) => {
                        return element.p_id === newdata[i].p_id
                    })
                    total += tempData[0].p_cost * newdata[i].qty
                    img = tempData[0].pic
                    x = x +
                        `<div class="card m-1 col-2" >
                                <img src=${img} class="card-img-top">
                                <div class="card-body">
                                    <div class="h2 card-title">${newdata[i].p_id}</div>                        
                                    <div class="card-text">Quantity:- ${newdata[i].qty}</div>
                                    <button onclick="lessToCart('${newdata[i].p_id}','${newdata[i].qty}')" class="btn btn-outline-success btn-block btn-sm">Reduce from Cart</button>                                                
                                </div>
                                <div class = "card-footer">
                                <div class="h4 card-title">${tempData[0].p_cost}</div>                        
                                <div class="h4 card-title">${tempData[0].p_cost * newdata[i].qty}</div>                        
                                </div>
                                </div>`

                }
            }
            //x = x + "</div>"        
            document.getElementById("myCart").innerHTML = x;
            console.log("Total:- ", total)
            document.getElementById("ttl").innerHTML = 'Total Amount = ' + total;
            total = 0
        })
}


function lessToCart(arg, newQty) {
    let locurl = ""
    console.log("New data p_id ", arg)
    console.log("Less to cart Quantity ", newQty)
    newQty -= 1
    console.log("Less to cart Quantity ", newQty)
    if (newQty == 0) {
        locurl = "http://localhost:8080/delete/deletefromCart"
    }
    else {
        locurl = "http://localhost:8080/update/updateCart"
    }
    $.post(locurl,
        {
            "p_id": arg,
            "uname": user,
            "qty": newQty,
            "byed": 0
        },
        function (data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus:  " + status);
        })
    updateCart()
}

function LOAD() {
    $.get("http://localhost:8080/fetch",
        (data) => { refData = data })
}
function final() {
    console.log("in final ", cartData)
    if (cartData.length == 0)
        alert("Please select atleast one product")
    else {

        for (let i = 0; i < cartData.length; i++)
            $.post("http://localhost:8080/update/finalBuy",
                {
                    "p_id": cartData[i].p_id,
                    "uname": cartData[i].uname,
                    "qty": cartData[i].qty,
                    "byed": 1
                },
                function (data, status) {
                    console.log("Data: " + JSON.stringify(data) + "\nStatus:  " + status);
                })
    }
    document.getElementById("myCart").innerHTML = ""
}

function logout() {
    alert("Thank u for shopping with us, \n visit again")
    window.localStorage.removeItem('login')
    window.localStorage.removeItem('token')
    window.open("login.html", "parent")
    $.post("http://localhost:8080/delete/logout",
        {
            "token" : token
        },
        function (data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus:  " + status);
        })
}

LOAD()
updateCart()
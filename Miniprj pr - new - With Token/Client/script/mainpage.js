let gdata = ""
let user = ""
let token = ""
function LOAD() {
    user = window.localStorage.getItem('login')
    token = window.localStorage.getItem('token')
    document.getElementById("greeting").innerHTML = "Welcome "+user
    console.log("User details:- ", user, " Token :",token)
    if (window.localStorage.getItem('login') != null) {
        //window.localStorage.removeItem('login')
        $.get("http://localhost:8080/fetch",
            (data) => {
                gdata = data
                console.log(data)
                //var name = data[0].name

                var x = "", i;
                x = '<div class = "row">'
                for (i = 0; i < data.length; i++) {
                    gdata[i].p_qty = 0
                    x = x +
                        `<div class="card col-4 m-1" >
                        <img src=${data[i].pic} class="card-img-top">
                        <div class="card-body">
                            <div class="h2 card-title">${data[i].p_name}</div>                        
                            <div class="card-text">${data[i].p_cost}</div>
                        </div>
                    <div class="card-footer">
                        <button onclick="myfun('${i}')" class="btn btn-outline-info btn-block btn-sm">Learn More</button>
                        <button onclick="addToCart('${i}')" class="btn btn-outline-success btn-block btn-sm">Add to Cart</button>
                        <button onclick="buyNow('${i}')" class="btn btn-outline-success btn-block btn-sm">Buy Now</button>
                    </div>
                </div>`
                }
                //x = x + "</div>"        
                document.getElementById("demo").innerHTML = x;
            });
        updateCart()
    }
    else {
        alert('unauthorised user')
    }
}
LOAD()
function myfun(arg) {
    alert('Hi ' + gdata[arg].p_desc)
}
function buyNow(arg) {
    addToCart(arg)    
    window.open("buynow.html","parent")
}
function addToCart(arg) {
    let setQty = 1
    $.post("http://localhost:8080/fetch/fetchCart", { uname: user, token : token },
        (newdata, status) => {
            console.log("addToCart data:- ", newdata, "\n Status:- ", status)
            let index = newdata.findIndex((element, index) => {
                return element.p_id === gdata[arg].p_id
            })
            console.log("index of element is:-", index)
            let locurl = ""
            gdata[arg].p_qty += 1
            //console.log("Quantity ", newdata[index].qty)
            if (index == -1) {
                locurl = "http://localhost:8080/insert/addtoCart"
            }
            else {
                locurl = "http://localhost:8080/update/updateCart"
                setQty = newdata[index].qty + 1
            }
            $.post(locurl,
                {
                    "p_id": gdata[arg].p_id,
                    "uname": user,
                    "qty": setQty,
                    "byed": 0
                },
                function (data, status) {
                    console.log("Add to cart Data: " + JSON.stringify(data) + "\nStatus: " + status);
                })
            updateCart()
        })
}

function lessToCart(arg, newQty) {
    let locurl = ""
    console.log("New data p_id ", arg)
    console.log("Less to cart Quantity ", newQty)
    let index = gdata.findIndex((element, index) => { return element.p_id == arg })
    console.log("Less to cart index of product:- ", index, " current product quantity:- ", gdata)
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
            "p_id": gdata[index].p_id,
            "uname": user,
            "qty": newQty,
            "byed": 0
        },
        function (data, status) {
            console.log("Data: " + JSON.stringify(data) + "\nStatus:  " + status);
        })
    updateCart()
}
function updateCart() {
    let x = "", i;
    x = '<div class = "">'
    $.post("http://localhost:8080/fetch/fetchCart", { uname: user, token : token },
        (newdata, status) => {
            //newdata = data
            console.log("updateCart data:- ", newdata, "\n Status:- ", status)
            for (i = 0; i < newdata.length; i++) {
                if (newdata[i].qty > 0 && newdata[i].byed == 0) {
                    x = x +
                        `<div class="card m-1" >                
                <div class="card-body">
                    <div class="h2 card-title">${newdata[i].p_id}</div>                        
                    <div class="card-text">Quantity:- ${newdata[i].qty}</div>
                    <button onclick="lessToCart('${newdata[i].p_id}','${newdata[i].qty}')" class="btn btn-outline-success btn-block btn-sm">Reduce from Cart</button>
                </div>
                
            </div>`
                }
            }
            //x = x + "</div>"        
            document.getElementById("myCart").innerHTML = x;
        })
}


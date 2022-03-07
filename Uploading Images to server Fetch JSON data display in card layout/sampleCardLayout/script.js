function LOAD()
{
    $.get("https://restcountries.com/v2/all",(data)=>{
        //console.log(data)
        let x = "", i
        x = '<div class = "row row-cols-4">'
            for(i = 0; i < data.length; i++)
            {
                x = x +
                `<div class = "col card m-1">
                    <img src = ${data[i].flags.png} class = "card-img-top">
                    <div class = "card-body">
                        <div class="h2 card-title">${data[i].name}</div>
                        <div class="h4 card-subtitle text-muted">${data[i].capital}</div>
                    </div>
                    <div class = "card-footer">
                        <button onclick = "myfun('${data[i].nativeName}')" class="btn btn-outline-success btn-block btn-sm">Learn More</button>
                        <a href="#" class="btn btn-outline-success btn-block btn-sm">Add to Cart</a>
                        <a href="#" class="btn btn-outline-success btn-block btn-sm">Buy Now</a>
                    </div>
                </div>`
            }            
            x = x + "</div>"
        document.getElementById("demo").innerHTML = x;
        console.log(x)
    })
}
function myfun(arg)
{
    alert('hi '+arg)
}

LOAD()
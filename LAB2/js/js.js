let checkList = document.getElementById("todolist");

checkList.addEventListener("click",function(){
    let element = document.getElementsByTagName("input");
    let check = document.getElementsByTagName("span");
    for (var i=0; i<element.length; i++){
        if (element[i].checked == true){
            check[i].classList.add("done");
        } else{
            check[i].classList.remove("done");
        }
    }
});

document.body.addEventListener("keyup", function(event){

    event.preventDefault();

    if (event.keyCode === 13){

        var text = document.getElementById('newitem');

        if (text.value === ""){
            alert("Ingrese nombre de elemento");
        } else{
            var ul = document.getElementById('todolist');
            var li = document.createElement('li');
            var span = document.createElement("span");
            let length = document.getElementsByTagName("li").length;
            

            var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "todo";
                checkbox.value = length+1;

            
            span.appendChild(document.createTextNode(text.value));
            li.appendChild(checkbox);
            li.appendChild(span);
            ul.appendChild(li);
            text.value="";
        }
    }
});

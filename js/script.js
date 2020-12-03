let txtnewtask= document.getElementById("txtnewtask");
let numberItems= document.getElementById("numberItems");
let numberItems1= document.getElementById("numberItems1");
let lst_content= document.getElementById("lst_content");
let btnfilter_all= document.getElementById("btnfilter_all");
let btnfilter_active= document.getElementById("btnfilter_active");
let btnfilter_complete= document.getElementById("btnfilter_complete");
let btnChangeTheme= document.getElementById("btnChangeTheme");
txtnewtask.focus();

let list=[];
list=[{
        id:1,
        title:"Complete online JavaScript course",
        complete:true
    },
    {
        id:2,
        title:"Job around the park 3x",
        complete:false
    },
    {
        id:3,
        title:"10 minutes meditation",
        complete:false
    },
    {
        id:4,
        title:"Read for 1 hour",
        complete:false
    },
    {
        id:5,
        title:"Pick up groceries",
        complete:false
    },
    {
        id:6,
        title:"Complete Todo App on Frontend Mentor",
        complete:false
    },
];
const addnewtask=txtnewtask.addEventListener("keypress",(event)=>{
    if (event.which == 13){
        if(txtnewtask.value.trim()!=""){
            let idlast=1;
            if(list.length>0){
                idlast=list[list.length-1].id;
            }
            list.push({
                id:idlast+1,
                title:txtnewtask.value,
                complete:false
            });
            txtnewtask.value="";
            renderList();
        }
    }
}) 
document.querySelectorAll(".btnclearCompleted").forEach((ev1)=>{
    ev1.addEventListener("click",(ev)=>{
        let newlist=[];
        let delete1=list.filter((item)=>{
            if(!item.complete){
                return item;
            }
        })
        newlist=delete1;
        list=newlist;
        renderList();
    })
})

btnChangeTheme.addEventListener("click",(ev)=>{
    if(document.querySelector("body").classList.contains("theme_dark")){
        document.querySelector("body").classList.remove("theme_dark");
        document.querySelector("body").classList.add("theme_light");
    }else{
        document.querySelector("body").classList.remove("theme_light");
        document.querySelector("body").classList.add("theme_dark");
    }
});
document.querySelectorAll(".actions_simples a").forEach((ev)=>{
    ev.addEventListener("click",(even)=>{
        even.target.closest(".actions_simples").querySelectorAll("a").forEach((ev1)=>{
            ev1.classList.remove("active");
        })
        even.target.classList.toggle("active");
        renderList();
    })
})
const renderList=()=>{
    let content="";
    numberItems.innerHTML=`${list.length} items left`;
    numberItems1.innerHTML=`${list.length} items left`;
    let typefilter="";
    document.querySelectorAll(".actions_simples a").forEach((ev1)=>{
        if(ev1.classList.contains("active")){
            typefilter = ev1.getAttribute("data-filter"); 
        }
    })
    
    list.forEach((item)=>{
        switch(typefilter){
            case "all":
                break;
            case "active":
                break;
            case "complete":
                break;
        }
        let showitem=false;
        if(typefilter=="all"){
            showitem=true;
        }
        if(typefilter=="active" && !item.complete){
            showitem=true;
        }
        if(typefilter=="complete" && item.complete){
            showitem=true;
        }
        if(showitem){
            content+=`
            <div class="list_item bloque ${(item.complete)?'complete':''}" data-id="${item.id}">
                <figure class="opt_checkbox ${(item.complete)?'checked':''}">
                <img src="images/icon-check.svg">
                <div></div>
                </figure>
                <label class="title-item ${(item.complete)?'txtformat2':'txtformat4'}">
                ${item.title}
                </label>
                <div class="list_item_btndelete txtformat3">
                <img src="images/icon-cross.svg">
                </div>
            </div>
            `;
        }
    })
    lst_content.innerHTML=content;
    lst_content.querySelectorAll(".opt_checkbox").forEach((item)=>{
        item.addEventListener("click",(event)=>{
            let dataId=event.target.closest(".list_item").getAttribute("data-id");
                
            list.find((item_each)=>{
                if(item_each.id==dataId){
                    item_each.complete=(event.target.classList.contains("checked"))?false:true;
                    return item_each;
                }
            });
            renderList();
            //event.target.classList.toggle("checked");
        })
    })
    lst_content.querySelectorAll(".list_item").forEach((item)=>{
        item.addEventListener("mouseover",(event)=>{
            event.target.querySelectorAll(".list_item_btndelete>img").forEach((im)=>{
                im.classList.toggle("show");
            })
        })
        item.addEventListener("mouseout",(event)=>{
            event.target.querySelectorAll(".list_item_btndelete>img").forEach((im)=>{
                im.classList.toggle("show");
            })
        })
    })
    lst_content.querySelectorAll(".list_item_btndelete>img").forEach((item)=>{
        item.addEventListener("mouseover",(event)=>{
            event.target.classList.toggle("show");
        })
        item.addEventListener("mouseout",(event)=>{
            event.target.classList.toggle("show");
        })
        item.addEventListener("click",(event)=>{
            let dataId=event.target.closest(".list_item").getAttribute("data-id");
            let filerlist=list.filter((item_each)=>{
                if(item_each.id!=dataId){
                    return item_each;
                }
            });
            list=filerlist;
            renderList();
        })
    })
    lst_content.querySelectorAll(".title-item").forEach((item)=>{
        item.addEventListener("mouseover",(event)=>{
            event.target.closest(".list_item").querySelector(".list_item_btndelete>img").classList.toggle("show");
        })
        item.addEventListener("mouseout",(event)=>{
            event.target.closest(".list_item").querySelector(".list_item_btndelete>img").classList.toggle("show");
        })
        item.addEventListener("click",(event)=>{
            let dataId=event.target.closest(".list_item").getAttribute("data-id");
                
            list.find((item_each)=>{
                if(item_each.id==dataId){
                    item_each.complete=(item_each.complete)?false:true;
                    return item_each;
                }
            });
            renderList();
        })
    })
}
renderList();
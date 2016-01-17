//module data pattern..
/*
initialize model
declare events and callbacks for corresponding events
declare controllers

call init method to bind the events.
*/
var current =(function(){
    return{
         //initialize the currentViews eventhandling..
         // we can extend this future to automate any new requiremnts in future 
         init:function(){
             bigC.eventBinding.call(this);
         },
         //store information about books in this map
         //I used map, to prevent duplicate entries..
         model:{
             books:{},
         },
         //list of events for the current view,
         //for easy maintainability , I clubbed all events ,corresponding callbacks ..
         events:[
             {
                 selector:"#menuopenclose",
                 type:"click",
                 callback:function(ev){
                      current.Menu(ev);
                 }
             },
             {
                 selector:".compopenclose",
                 type:"click",
                 callback:function(ev){
                      current.openCloseComp(ev);
                 }
             },
             {
                 selector:"#submitdata",
                 type:"click",
                 callback:function(ev){
                      current.addNew(ev);
                 }
             }
         ],
         //hide or show top nav Menu
         //getting data from data-* attribute and adding/removing class based on ternary checking..
         //setting the data-* attribute with new value
         //result : this will change the icon on top and show/hide the navigation menu below header..
         Menu:function(ev){
            $(ev.currentTarget).removeClass($(ev.currentTarget).data("but"));
            var but = $(ev.currentTarget).data("but") == "close" ? "menu" :"close";
            $(ev.currentTarget).addClass(but);
            but == "menu" ? $(".nav").addClass("hidden") : $(".nav").removeClass("hidden") ;
            $(ev.currentTarget).data("but",but);
        },
        // Hide/show form based on user selection.
        openCloseComp:function(ev){
           $("#formComp")[$(ev.currentTarget).data("comp")](); 
        },
        /*
            replacers are the one's which will be replaced with values from the form.
            EX: form has 3 inputs with id -> IMG , TITLE , NAME
                -get values from inputs
                -load template
                -replace values in template with values from form
                -display/append template to current view
                
            NOTE:both view and template should have same name for replacers
            EX: In view , I have form with ID's IMG,TITLE,NAME
                so  I maintained same names (IMG,TITLE,NAME) in template.html also, 
                so that the values in template are replaced with real values..
                
            -check for required fields entered or not , else pop error
            -check for duplicated/else pop error
            -store the value into books map
            -call renderUI method to load the content from template to View
        */
        addNew:function(ev){
            var tempObj = {};
            var replacers = ["IMG","TITLE","NAME"];
            var duplicate = this.model.books.hasOwnProperty($("#TITLE").val().split(" ").join("_"));
            if($("#TITLE").val().trim()!="" && !duplicate){
                    replacers.forEach(function(val,indx){
                        tempObj[val] = $("#"+val).val();
                    });
                    this.model.books[$("#TITLE").val().split(" ").join("_")] = tempObj;
                    bigC.renderUI({
                        template:"template.html",
                        el:".left",
                        injector:"append",
                        model:tempObj
                    });
                   ev.preventDefault(); 
            }else if(duplicate){
                   alert("Title exists");
                   ev.preventDefault(); 
            }
           
        },
    }
})();
current.init();
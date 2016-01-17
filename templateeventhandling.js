var bigC = (function(){
    return{
        //Since get is having deffered by default, 
        //we request for promise in return upon success/failure
        getNew:function(templateURL){
            return $.get(templateURL).promise();
        },
        //this will replace the 'replacers' with real values from model
        //and append the html to current view from template.
        renderUI:function(params){
            var promise = this.getNew(params.template);
            promise.then(function(response){
                for(var i in params.model){
                      response = response.replace(i,params.model[i]);
                }
                $(params.el)[params.injector]($(response));
            });
        },
        //binds the events in current view.
        eventBinding:function(){
                var ref = this;
    			var eventsList = ref["events"] || [];
    			eventsList.forEach(function(val) {
                   $("body").on(val.type,val.selector,val.callback.bind(ref));
    			});
	    }, 
    }
})();
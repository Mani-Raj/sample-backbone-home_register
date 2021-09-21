    var model = Backbone.Model.extend({
        url: '/submit',
        defaults:{
            name: null,
            email: null,
            phone: null,
            password: null
        }
    });

    var modelobj = new model();

    var home = $("#divhome") ;
    var login= $("#divlogin");
    var register = $("#divregister");
    
    $("#btnregregister").click(function(){
            modelobj.set({
                name: $("#name").val(),
                email: $("#email").val(),
                phone: $("#phone").val(),
                password: $("#password").val(),
            });

            var data = modelobj.toJSON();
            alert(JSON.stringify(data));
            modelobj.save(data,{ success: function(modelobj,res){ alert(res + '--->') }, error: function(modelobj, err) { alert(err + "--->er")}, wait: true })

        //     async function db(){
        //         await new Promise(function(resolve, reject){
        //             setTimeout(()=> resolve() , 300) })
        //             .then(function(resolve){ console.log("you done "+ resolve)}).then(function(){ console.log("Registreation successfull") })
        //             .then(function(){ $("#divregister").load(location.href + " #divregister") })
        //             .catch(function(){ alert("error")})
        // }

        $("#divregister").load(location.href + " #divregister")
    });

    var  homeview  = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            login.hide();
            register.hide();
        }
    });

    var  loginview  = Backbone.View.extend({
        initialize: function(){
            this.render();
        },
        render: function(){
            register.hide();
            login.show();
        }        });

    var  registerview  = Backbone.View.extend({
        model: modelobj,
        events: {
            "click #btnregregister": "registerAction"
        },

        registerAction: function(){
            // alert("you clicked register under events");
            // this.model.set({
            //     name: $("#name").val(),
            //     email: $("#email").val(),
            //     phone: $("#phone").val(),
            //     password: $("#password").val(),
            // });
            
            // var data = this.model.toJSON();
            // var string = JSON.stringify(data);
            //     return $.ajax({
            //         url:"/submit",
            //         contentType: 'application/json',
            //         method: "POST",
            //         data: string})
            //         .done(function(msg){ 
            //             alert("Registreation successfull..! Our system  " + msg);
            //             // var subview = new submitview();
            //         })
            //         .fail(function(){alert("ajax req res failed...!")});
        },
        initialize: function(){
            this.render();
        },

        render: function(){
            login.hide();
            register.show();
        }

    });

    var routeclass = Backbone.Router.extend({
        model:modelobj,
        routes: {
            "": "homepage",
            "register": "registerpage",
            "login" : "loginpage",
            "login(/:name)": "homepage",
            "register/submit" : "submitpage"
        },
        homepage: function(){
            var home = new homeview();
            
        },
        registerpage: function(){
            var register = new registerview(); 
            
        },
        loginpage: function(){
            var login = new loginview();
        },
        submitpage: function(){
            var register = new registerview(); 
            // console.log("below model from route")
            // console.log(this.model);
            // console.log('registration done.. notifi from route');
        }
    });

    var router = new routeclass();

    Backbone.history.start();
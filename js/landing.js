window.onload = function () {
    document.getElementById("button-email").onclick = function (e) {
        e.preventDefault();
        let data = {};
        data.name = document.getElementById("name-email").value;
        data.phone = document.getElementById("phone-email").value;
        data.email = document.getElementById("e-mail-email").value;
        data.coment = document.getElementById("coment-email").value;
        //console.log(data);
        $.ajax({
            type: "POST",
            //url: "main/server/endpoint/get_AJAX/email.php",
            url: "src/main/ajax/email.php",
            data:  {json: JSON.stringify(data)},
        }).done(function (result) {
            alert("Сообщение успешно отправленно!");
            console.log(result);
        });
    };

    /*document.getElementById("button-register").onclick = function (e) {
        e.preventDefault();*/
        /*$('fr').submit(function(e) {
            var $form = $(this);
            $.ajax({
                type: $form.attr('method'),
                url: $form.attr('action'),
                data: $form.serialize()
            }).done(function() {
                console.log('success');
            }).fail(function() {
                console.log('fail');
            });
            //отмена действия по умолчанию для кнопки submit
            e.preventDefault(); 
        });*/
        /*let data = {};
        data.status = (document.getElementById("student").checked) ? "student" : "teacher";
        data.name = document.getElementById("user-name1").value;
        //data.surname = document.getElementById("user-surname").value;
        data.email = document.getElementById("e-mail1").value;
        data.password = document.getElementById("password1").value;
        data.password2 = document.getElementById("password2").value;*/
        // if (password !== password2) {
        //     alert("Пароли не совпдают");
        //     console.log("Пароли не совпдают");
        // }
        /*console.log(data.json);
        console.log(data);
        console.log(data.email);*/
        //console.log("name = " + name + " surname = " + surname + " email = " + email + "password = " + password);
        /*$.ajax({
            type: "POST",*/
            /*url: "main/server/endpoint/get_AJAX/users/registration.php",
            url: "src/main/ajax/user/registration.php",*/
            /*url: "https://echo.htmlacademy.ru",
            data: {json: JSON.stringify(data)},
        }).done(function (result) {
            console.log(result);
        });*/

  //};
  var forma = document.querySelector("#fr");
  function formDataToJSON(formElement) {    
    var formData = new FormData(formElement),
    convertedJSON = {};

    formData.forEach(function(value, key) { 
        convertedJSON[key] = value;
    });
    console.log(convertedJSON);
    return convertedJSON;
    }
   forma.addEventListener('submit', function(e){
        e.preventDefault();
        //var fd = formDataToJSON(forma)
        //var fd = new FormData(forma);
        var url = "https://echo.htmlacademy.ru";
        $.ajax({
            type: "POST",
            /*url: "main/server/endpoint/get_AJAX/users/registration.php",
            url: "src/main/ajax/user/registration.php",*/
            url: "https://echo.htmlacademy.ru",
            data: {json:formDataToJSON(forma)},
        }).done(function (result) {
            console.log(result);
        });
        /*window.upload(fd, url, function (response) {
            var serialObj = JSON.stringify(response); //сериализуем его
            localStorage.setItem("userSesion", serialObj);
        })*/
   })
   /*document.getElementById("button-register").onclick = function (e) {
    
   }
    document.getElementById("login").onclick = function () {
        e.preventDefault();
        /*let data = {};
        data.login = document.getElementById("e-mail-login").value;
        data.password = document.getElementById("password-login").value;
        $.ajax({
            type: "POST",
            //url: "main/server/endpoint/get_AJAX/users/login.php",
            url: "src/main/ajax/user/login.php",
            data: {json: JSON.stringify(data)},
        }).done(function (result) {
            console.log(result);
        });*/
        
    //};

    document.getElementById("close-register").onclick = function () {
        document.getElementById("overlay").classList.remove("show");
        document.getElementById("registration-form").classList.remove("show");
    };
    document.getElementById("user-register").onclick = function (e) {
        e.preventDefault();
        document.getElementById("overlay").classList.add("show");
        document.getElementById("registration-form").classList.add("show");
    };
    document.getElementById("close-login").onclick = function () {
        document.getElementById("overlay").classList.remove("show");
        document.getElementById("login-form").classList.remove("show");
    };
    document.getElementById("user-login").onclick = function (e) {
        e.preventDefault();
        document.getElementById("overlay").classList.add("show");
        document.getElementById("login-form").classList.add("show");
    };
};
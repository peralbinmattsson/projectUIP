/*Initialize i18n if a language has be already selected*/
        
        if (localStorage.getItem("language")) {

            var options = {
                lng: window.localStorage.getItem("language"),
                resGetPath: '../locales/__lng__/translation.json'
            };

            i18n.init(options, function (t) {
                $('#username-input').i18n();
                $('#password-input').i18n();
                $('.search').i18n();
                $('.Part1').i18n();
                $('#total').i18n();
                $('#credit').i18n();
                $('#confirm_text').i18n();

                if (options.lng == "en") {
                    $('#login-btn').text($.t('Login'));
                    $('#payButton').text($.t('PAY'));
                    
                    $("#add.button").text($.t('Add to cart'));
                    $('#changeTheme').text($.t('Change Theme'));
                    $('#showBeer').text($.t('Beer'));
                    $('#showWine').text($.t('Wine'));
                    $("#edit_btn.button").text($.t('Edit'));
                    
                    $('#finalCost').html('<b>Total : </b>'+ localStorage.getItem("total"));
                    $('#credit').html('<b>Credit : </b>'+ localStorage.getItem("assets"));

                    $('#cancelButton').text($.t('Cancel'));
                    $('#PaymentButton').text($.t('Pay Now'));
                    $('#cancel').text($.t('Cancel'));
                    $('#CancelButton').text($.t('Cancel'));
                    
                    $('#stock_btn').text($.t('Stock'));
                    $('#user_btn').text($.t('User'));
                    
                    $('#loginas').html('<b>User : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Credit : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Logout'));
                    $('#confirm_btn').text($.t('Ok'));
                    $('#cancel_btn').text($.t('Cancel'));
                    
                }

                if (options.lng == "sw") {
                    $('#login-btn').text($.t('Logga in'));
                    $('#payButton').text($.t('Betala'));

                    $("#add.button").text($.t('L\xE4gg i varukorgen'));
                    $('#changeTheme').text($.t('\xC4ndra tema'));
                    $('#showBeer').text($.t('\xD6l'));
                    $('#showWine').text($.t('Vin'));
                    $("#edit_btn.button").text($.t('Redigera'));
                    
                    $('#finalCost').html('<b>Summa : </b>'+ localStorage.getItem("total"));
                    $('#credit').html('<b>Kredit : </b>'+ localStorage.getItem("assets"));
                    $('#cancelButton').text($.t('Avboka'));
                    $('#PaymentButton').text($.t('Betala'));
                    $('#cancel').text($.t('Avbryt'));
                    $('#CancelButton').text($.t('Avbryt'));
                    
                    $('#stock_btn').text($.t('Lager'));
                    $('#user_btn').text($.t('Användare'));
                    
                    $('#loginas').html('<b>Anv\xE4ndare : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Kredit : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Logga ut'));
                    $('#confirm_btn').text($.t('Ok'));
                    $('#cancel_btn').text($.t('Avbryt'));
                    
                }
            });

        }
/*function to select english*/        
    function changeE() {
          var options ={
           lng: "en",
           resGetPath: '../locales/__lng__/translation.json'
        };

        i18n.init(options, function(t) {
                   $('#username-input').i18n();
                   $('#password-input').i18n();
                   $('#login-btn').text($.t('Login'));
                   
                   $('.search').i18n();
                   $('#payButton').text($.t('PAY'));
                   $("#add.button").text($.t('Add to cart'));

                   $('#changeTheme').text($.t('Change Theme'));
                   $('#showBeer').text($.t('Beer'));
                   $('#showWine').text($.t('Wine'));
                   $("#edit_btn.button").text($.t('Edit'));


                   $('.Part1').i18n();
                   $('#finalCost').html('<b>Total : </b>'+ localStorage.getItem("total"));
                   $('#credit').html('<b>Credit : </b>'+ localStorage.getItem("assets"));

                   $('#CancelButton').text($.t('Cancel'));
                   $('#PaymentButton').text($.t('Pay Now'));
                   $('#cancel').text($.t('Cancel'));
                   $('#confirm_text').i18n();
                   
                   $('#stock_btn').text($.t('Stock'));
                   $('#user_btn').text($.t('User'));

                    $('#loginas').html('<b>User : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Credit : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Logout'));
                    $('#confirm_btn').text($.t('Ok'));
                    $('#cancel_btn').text($.t('Cancel'));
                   
        });
    /*Store english as a selected language*/     
        window.localStorage.setItem("language", "en");
    }


/*function to select swedish*/  
    function changeS() {
          var options ={
           lng: "sw",
           resGetPath: '../locales/__lng__/translation.json'
        };

        i18n.init(options, function(t) {
                   $('#drag_flag').i18n();
                   $('#click_flag').i18n();
                   $('#username-input').i18n();
                   $('#password-input').i18n();
                   $('#login-btn').text($.t('Logga in'));
                    
                   $('.search').i18n();
                   $('#payButton').text($.t('Betala'));
                    $("#add.button").text($.t('L\xE4gg i varukorg'));

                   $('#changeTheme').text($.t('\xC4ndra Tema'));
                    $('#showBeer').text($.t('\xD6l'));
                    $('#showWine').text($.t('Vin'));
                    $("#edit_btn.button").text($.t('Redigera'));




                   $('.Part1').i18n();
                   $('#finalCost').html('<b>Totalsumma : </b>'+ localStorage.getItem("total"));
                   $('#credit').html('<b>Kredit : </b>'+ localStorage.getItem("assets"));

                   $('#cancel').text($.t('Avbryt'));
                   $('#PaymentButton').text($.t('Betala'));
                   $('#confirm_text').i18n();
                   
                   $('#stock_btn').text($.t('Lager'));
                   $('#user_btn').text($.t('Anv\xE4ndare'));

                    $('#loginas').html('<b>Anv\xE4ndare : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Kredit : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Logga ut'));
                    $('#confirm_btn').text($.t('Ok'));
                    $('#cancel_btn').text($.t('Avbryt'));
        });
    /*Store swedish as a selected language*/   
        window.localStorage.setItem("language", "sw");
     }

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

                if (options.lng == "en") {
                    $('#login-btn').text($.t('Login'));
                    $('#payButton').text($.t('PAY'));
                    
                    $("#add.button").text($.t('Add to cart'));
                    $('#changeTheme').text($.t('Change Theme'));
                    $('#showBeer').text($.t('Beer'));
                    $('#showWine').text($.t('Wine'));
                    $("#edit_btn.button").text($.t('Edit'));
                    
                    $('#finalCost').text($.t('Total:'));
                    $('#credit').text($.t('Credit:'));
                    $('#cancelButton').text($.t('Cancel'));
                    $('#PaymentButton').text($.t('Pay Now'));
                    $('#cancel').text($.t('Cancel'));
                    $('#CancelButton').text($.t('Cancel'));
                    
                    $('#stock_btn').text($.t('Stock'));
                    $('#user_btn').text($.t('User'));
                    
                    $('#loginas').html('<b>Logged in as : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Credit : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Logout'));
                }

                if (options.lng == "sw") {
                    $('#login-btn').text($.t('Logga in'));
                    $('#payButton').text($.t('Betala'));

                    $("#add.button").text($.t('L\344gg i varukorgen'));
                    $('#changeTheme').text($.t('\344ndra tema'));
                    $('#showBeer').text($.t('\366l'));
                    $('#showWine').text($.t('vin'));
                    $("#edit_btn.button").text($.t('Redigera'));
                    
                    $('#finalCost').text($.t('Totalsumma:'));
                    $('#credit').text($.t('Kredit:'));
                    $('#cancelButton').text($.t('Avboka'));
                    $('#PaymentButton').text($.t('Betala'));
                    $('#cancel').text($.t('Avbryt'));
                    $('#CancelButton').text($.t('Avbryt'));
                    
                    $('#stock_btn').text($.t('Lager'));
                    $('#user_btn').text($.t('Anv\344ndaren'));
                    
                    $('#loginas').html('<b>Inloggad som  : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Kredit : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Loggar ut'));
                    
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
                   $('#finalCost').text($.t('Total:'));
                   $('#credit').text($.t('Credit:'));
                   $('#CancelButton').text($.t('Cancel'));
                   $('#PaymentButton').text($.t('Pay Now'));
                   $('#cancel').text($.t('Cancel'));
                   
                   $('#stock_btn').text($.t('Stock'));
                   $('#user_btn').text($.t('User'));

                    $('#loginas').html('<b>Login as : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Assets : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Logout'));
                   
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
                    $("#add.button").text($.t('l\344gg i varukorg'));

                   $('#changeTheme').text($.t('\344ndra tema'));
                    $('#showBeer').text($.t('\366l'));
                    $('#showWine').text($.t('Vin'));
                    $("#edit_btn.button").text($.t('Redigera'));




                   $('.Part1').i18n();
                   $('#finalCost').text($.t('Summa:'));
                   $('#credit').text($.t('Kredit:'));
                   $('#cancel').text($.t('Avbryt'));
                   $('#PaymentButton').text($.t('Betala'));
                   
                   $('#stock_btn').text($.t('Lager'));
                   $('#user_btn').text($.t('Anv\344ndaren'));

                    $('#loginas').html('<b>Inloggad som  : </b>'+ localStorage.getItem("user"));
                    $('#assets').html('<b>Kredit : </b>'+ localStorage.getItem("assets"));
                    $('#logout-btn').text($.t('Loggar ut'));
        });
    /*Store swedish as a selected language*/   
        window.localStorage.setItem("language", "sw");
     }

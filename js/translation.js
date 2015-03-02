        if (localStorage.getItem("language")){
            
            var options = {
             lng:  window.localStorage.getItem("language"),
             resGetPath: '../locales/__lng__/translation.json'
        };

        i18n.init(options, function(t) {
                   $('#username-input').i18n();
                   $('#password-input').i18n();
                   $('.search').i18n();
                   $('.Part1').i18n();
                   $('#total').i18n();
                   $('#credit').i18n();
                   
                   if (lng = "en"){
                     $('#login-btn').text($.t('Login'));
                     $('#payButton').text($.t('PAY'));
                     $('#CancelButton').text($.t('Cancel'));
                     $('#PaymentButton').text($.t('Pay Now'));
                     $('#stock_btn').text($.t('Stock'));
                     $('#user_btn').text($.t('User'));
                   }
                   
                   if (lng = "sw"){
                     $('#login-btn').text($.t('Logga in'));
                     $('#payButton').text($.t('Betala'));
                     $('#CancelButton').text($.t('Avboka'));
                     $('#PaymentButton').text($.t('Betala nu'));
                     $('#stock_btn').text($.t('Lager'));
                     $('#user_btn').text($.t('Användaren'));
                   }
        });
        
        }
        
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
                   
                   $('.Part1').i18n();
                   $('#total').i18n();
                   $('#credit').i18n();
                   $('#CancelButton').text($.t('Cancel'));
                   $('#PaymentButton').text($.t('Pay Now'));
                   
                   $('#stock_btn').text($.t('Stock'));
                   $('#user_btn').text($.t('User'));
                   
        });
        
        window.localStorage.setItem("language", "en");
    }

    function changeS() {
          var options ={
           lng: "sw",
           resGetPath: '../locales/__lng__/translation.json'
        };

        i18n.init(options, function(t) {
                   $('#username-input').i18n();
                   $('#password-input').i18n();
                   $('#login-btn').text($.t('Logga in'));
                    
                   $('.search').i18n();
                   $('#payButton').text($.t('Betala'));
                   
                   $('.Part1').i18n();
                   $('#total').i18n();
                   $('#credit').i18n();
                   $('#CancelButton').text($.t('Avboka'));
                   $('#PaymentButton').text($.t('Betala nu'));
                   
                   $('#stock_btn').text($.t('Lager'));
                   $('#user_btn').text($.t('Användaren'));
                   
        });
        
        window.localStorage.setItem("language", "sw");
     }

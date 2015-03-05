/*Initialize i18n if a language has be already selected*/
        /*
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
                     $('#drag_flag').i18n();
                     $('#click_flag').i18n();
                     
                     if (options.lng == "en"){
                       $('#login-btn').text($.t('Login'));
                       $('#payButton').text($.t('PAY'));
                       $('#CancelButton').text($.t('Cancel'));
                       $('#PaymentButton').text($.t('Pay Now'));
                       $('#stock_btn').text($.t('Stock'));
                       $('#user_btn').text($.t('User'));
                     }
                     
                     if (options.lng == "sw"){
                       $('#login-btn').text($.t('Logga in'));
                       $('#payButton').text($.t('Betala'));
                       $('#CancelButton').text($.t('Avboka'));
                       $('#PaymentButton').text($.t('Betala nu'));
                       $('#stock_btn').text($.t('Lager'));
                       $('#user_btn').text($.t('Användaren'));
                     }
            });
          
        }
        */
/*function to select english*/        
    function changeE() {
          var options ={
           lng: "en",
           resGetPath: '../locales/en/translation.json'
        };

        i18n.init(options, function(t) {
                   $('#username-input').i18n();
                   $('#password-input').i18n();
                   $('#login-btn').text($.t('Login'));
                   $('#drag_flag').i18n();
                   $('#click_flag').i18n();
                   
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
    /*Store english as a selected language*/     
        window.localStorage.setItem("language", "en");
    }


/*function to select swedish*/  
    function changeS() {
          var options ={
           lng: "sw",
           resGetPath: '../locales/sw/translation.json'
        };

        i18n.init(options, function(t) {
                   $('#drag_flag').i18n();
                   $('#click_flag').i18n();
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
    /*Store swedish as a selected language*/   
        window.localStorage.setItem("language", "sw");
     }

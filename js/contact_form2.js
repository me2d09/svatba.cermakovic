(function ($) {
    $(document).ready(function () {
        $('#submit-form').click(function (e) {

            
            e.preventDefault();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var name = $('#form_name').val(),
				email = $('#form_email').val(),
				ucast = $('#form_ucast').val(),
				noha = $('#form_noha').val(),
				message = $('#form_message').val(),
				data_html,
				success = $('#success');

            success.html("");
            if (name == "")
                $('#form_name').val('Prosím, vyplňte jméno.');

            if (noha == "0")
                success.html('<div class="alert alert-error">Musíš vyplnit velikost své nohy!</div>');

            if (email == "") {
                $('#form_email').val('Je třeba vyplnit email.');
            } else if (reg.test(email) == false) {
                $('#form_email').val('Neplatná emailová adresa.');
            }


            if (noha != "0" && name != "" && reg.test(email) != false) {
                data_html = "type=rozlucka&name=" + name + "&email=" + email + "&message=" + message + "&noha=" + noha + "&ucast=" + ucast;

                //alert(data_html);
                $.ajax({
                    type: 'POST',
                    url: 'register.ashx',
                    data: data_html,
                    success: function (msg) {

                        if (msg == 'sent') {
                            success.html('<div class="alert alert-success">Přihláška <strong>v pořádku</strong> odeslána. Díky!</div>');
                            $('#form_name').val('');
                            $('#form_adult').val('');
                            $('#form_email').val('');
                            $('#form_children').val('');
                            $('#form_message').val('');
                        } else {
                            success.html('<div class="alert alert-error">Nastala <b>chyba</b> při zpracování požadavku, kontaktujte ženicha!</div>');
                        }
                    },
                    error: function () {
                        success.html('<div class="alert alert-error">Nastala <b>chyba</b> při odesílání požadavku, kontaktujte ženicha!</div>');
                    }
                });

            }
            return false;
        });
    });
})(jQuery);
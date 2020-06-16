(function ($) {
    $(document).ready(function () {
        $('#submit-form').click(function (e) {

            e.preventDefault();
            var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
            var name = $('#form_name').val(),
				email = $('#form_email').val(),
				adult = $('#form_adult').val(),
				children = $('#form_children').val(),
				message = $('#form_message').val(),
                ucast = $('#form_ucast').val(),
				data_html,
				success = $('#success');

            if (ucast == "0")
                success.html('<div class="alert alert-error">Musíte zadat jestli dorazíte!</div>');

            if (name == "")
                $('#form_name').val('Prosím, vyplňte jméno.');

            if (adult == "")
                $('#form_adult').val('Prosím, vyplňte počet dospělých.');

            if (email == "") {
                $('#form_email').val('Je třeba vyplnit email.');
            } else if (reg.test(email) == false) {
                $('#form_email').val('Neplatná emailová adresa.');
            }


            if (ucast != "0" && adult != "" && name != "" && reg.test(email) != false) {
                data_html = "type=svatba&name=" + name + "&email=" + email + "&message=" + message + "&adult=" + adult + "&ucast=" + ucast + "&children=" + children;
                $("#submit-form").val("...čekejte, odesílám přihlášku...");
                //alert(data_html);
                $.ajax({
                    type: 'POST',
                    url: 'register.ashx',
                    data: data_html,
                    success: function (msg) {

                        if (msg == 'sent') {
                            success.html('<div class="alert alert-success">Přihláška <strong>v pořádku</strong> odeslána. Děkujeme!</div>');
                            $('#form_name').val('');
                            $('#form_adult').val('');
                            $('#form_email').val('');
                            $('#form_children').val('');
                            $('#form_message').val('');
                            $("#submit-form").val("Odesláno");
                        } else {
                            success.html('<div class="alert alert-error">Nastala <b>chyba</b> při zpracování požadavku, kontaktujte ženicha!</div>');
                            $("#submit-form").val("Odeslat znovu");
                        }
                    },
                    error: function () {
                        success.html('<div class="alert alert-error">Nastala <b>chyba</b> při odesílání požadavku, kontaktujte ženicha!</div>');
                        $("#submit-form").val("Odeslat znovu");
                    }
                });

            }
            return false;
        });
    });
})(jQuery);
$("#contact-form").on('submit', function (e) {
   //ajax call here

   //stop form submission
   e.preventDefault();
   submitContactForm(e)
});

var lock = false

function submitContactForm(e) {

    if(lock === true){
        return
    }
    lock = true

    var URL = "https://elpobb08d4.execute-api.us-east-1.amazonaws.com/dev/contact-us";

    var name = $("#name").val();
    var phone = $("#tel").val();
    var email = $("#email").val();
    var message = $("#message").val();

    var errors = [];

    if (name.length < 2) {
        errors.push('● Name is required and should be at least 2 characters');
    }

    if (phone.length < 6) {
        errors.push("● Phone is required and should be at least 7 digits");
    }

    var reeamil = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
    if (email === "") {
        errors.push("● Email is required");
    }else if (!reeamil.test(email)) {
        errors.push("● Please enter valid email address");
    }

    if(errors.length > 0){
        var errorMessage = 'Please fix the follow error(s) to submit the form:\n';
        errorMessage += errors.join('\n');
        alert(errorMessage);
        lock = false
        return
    }

    var data = {
        name: name,
        phone: phone,
        email: email,
        desc: message
    };

    $.ajax({
        type: "POST",
        url: URL,
        dataType: "json",
        crossDomain: "true",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(data),
        success: function () {
            // clear form and show a success message
            alert("Thank you! Your form has been submitted");
            document.getElementById("contact-form").reset();
            //location.reload();
            lock = false
        },
        error: function (e) {
            console.error(e)
            // show an error message
            alert("We're sorry! A problem occured during form submission.\nPlease try again later.");
            lock = false
        }
    });
}
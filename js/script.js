document.getElementById("ghostForm").addEventListener("submit", function(event) {

    event.preventDefault();

    if (validateForm()) {
        calculateTotal();
    }

});

function validateForm() {

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var ghostType = document.getElementById("ghostType").value;
    var quantity = document.getElementById("quantity").value;
    var visit = document.querySelector('input[name="visit"]:checked');

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        alert("Invalid input, please enter your name.");
        return false;
    }

    if (!emailPattern.test(email)) {
        alert("Invalid input, please enter a valid email address.");
        return false;
    }

    if (ghostType === "") {
        alert("Invalid input, please select a ghost type.");
        return false;
    }

    if (
        quantity === "" ||
        isNaN(quantity) ||
        Number(quantity) < 1 ||
        Number(quantity) > 50 ||
        !Number.isInteger(Number(quantity))
    ) {
        alert("Invalid input, number of ghosts must be a whole number from 1 to 50.");
        return false;
    }

    if (visit === null) {
        alert("Invalid input, please choose a visit time.");
        return false;
    }

    return true;
}

function calculateTotal() {

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();

    var select = document.getElementById("ghostType");
    var ghostName = select.options[select.selectedIndex].text;

    var price = Number(select.value);
    var quantity = Number(document.getElementById("quantity").value);

    var visitFee = Number(document.querySelector('input[name="visit"]:checked').value);

    var extrasTotal = 0;

    var extras = document.querySelectorAll('input[name="extra"]:checked');

    for (var i = 0; i < extras.length; i++) {
        extrasTotal += Number(extras[i].value);
    }

    var discountRate = 0;

    if (quantity >= 11) {
        discountRate = 20;
    } else if (quantity >= 6) {
        discountRate = 15;
    } else if (quantity >= 3) {
        discountRate = 10;
    } else {
        discountRate = 5;
    }

    var subtotal = price * quantity;

    var discountAmount = subtotal * (discountRate / 100);

    var afterDiscount = subtotal - discountAmount;

    var finalTotal = afterDiscount + extrasTotal + visitFee;

    var visitText = visitFee === 50 ? "Night Visit" : "Day Visit";

    var html = "<h2>Your Ghost Removal Summary</h2>" +

        "<table>" +

        "<tr><td>Customer</td><td>" + name + "</td></tr>" +

        "<tr><td>Email</td><td>" + email + "</td></tr>" +

        "<tr><td>Ghost Type</td><td>" + ghostName + "</td></tr>" +

        "<tr><td>Number of Ghosts</td><td>" + quantity + "</td></tr>" +

        "<tr><td>Visit Time</td><td>" + visitText +
        " (RM " + visitFee.toFixed(2) + ")</td></tr>" +

        "<tr><td>Subtotal</td><td>RM " + subtotal.toFixed(2) + "</td></tr>" +

        "<tr><td>Group Discount (" + discountRate +
        "%)</td><td>- RM " + discountAmount.toFixed(2) + "</td></tr>" +

        "<tr><td>After Discount</td><td>RM " +
        afterDiscount.toFixed(2) + "</td></tr>" +

        "<tr><td>Extras</td><td>RM " +
        extrasTotal.toFixed(2) + "</td></tr>" +

        "<tr><td class='total'>FINAL TOTAL</td><td class='total'>RM " +
        finalTotal.toFixed(2) + "</td></tr>" +

        "</table>" +

        "<p class='note'>Rule used: " + quantity +
        " ghost(s) = " + discountRate + "% discount.</p>";

    var resultBox = document.getElementById("result");

    resultBox.innerHTML = html;

    resultBox.classList.remove("hidden");

    resultBox.scrollIntoView({
        behavior: "smooth"
    });

    alert("Calculation complete!");

    showBoo();
}

function showBoo() {

    var popup = document.getElementById("popGhost");

    popup.classList.add("show");

    setTimeout(function() {
        popup.classList.remove("show");
    }, 2500);

}
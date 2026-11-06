
document.getElementById("discountForm").addEventListener("submit", function(event) {

    event.preventDefault();

    // Get customer information
    let customerName = document.getElementById("customerName").value;
    let customerEmail = document.getElementById("customerEmail").value;
    let totalCustomers = Number(document.getElementById("totalCustomers").value);

    // Validate customer information
    if (customerName.trim() === "" || customerEmail.trim() === "" || totalCustomers < 1) {
        alert("Please enter valid information.");
        return;
    }

    // Calculate original price
    let pricePerCustomer = 100;
    let originalPrice = totalCustomers * pricePerCustomer;

    // Determine discount rate
    let discountRate = 0;

    if (totalCustomers >= 11) {
        discountRate = 0.20;
    } else if (totalCustomers >= 6) {
        discountRate = 0.15;
    } else if (totalCustomers >= 3) {
        discountRate = 0.10;
    }

    // Calculate discount and final price
    let discountAmount = originalPrice * discountRate;
    let finalPrice = originalPrice - discountAmount;

    // Display result
    document.getElementById("result").innerHTML =
        "<h3>Calculation Result</h3>" +
        "<p>Customer Name: " + customerName + "</p>" +
        "<p>Email Address: " + customerEmail + "</p>" +
        "<p>Total Customers: " + totalCustomers + "</p>" +
        "<p>Original Price: RM" + originalPrice.toFixed(2) + "</p>" +
        "<p>Discount: " + (discountRate * 100) + "%</p>" +
        "<p>Discount Amount: RM" + discountAmount.toFixed(2) + "</p>" +
        "<h3>Final Price: RM" + finalPrice.toFixed(2) + "</h3>";

    alert("Calculation complete!");

});

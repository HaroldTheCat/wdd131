document.addEventListener("DOMContentLoaded", function() {
    var selectElement = document.getElementById("dark_light");
    var bodyElement = document.body; // Access the body element
    var imageElement = document.getElementById("logo")

    selectElement.addEventListener("change", function() {
        var selectedValue = this.value;
        console.log("You selected: ", selectedValue);

        // Remove existing classes
        bodyElement.classList.remove("option1", "option2");

        // Add new class based on the selected option
        if (selectedValue === "Dark") {
            bodyElement.classList.add("dark");
            imageElement.src= "byui-logo_white.png"
            console.log("Body class changed to 'Dark'");
        } else if (selectedValue === "Light") {
            bodyElement.classList.remove("dark");
            imageElement.src="byui-logo_blue.webp"
            console.log("Body class changed to Light");
        }
    });
});

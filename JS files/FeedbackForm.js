
document.addEventListener("DOMContentLoaded", function () {

    // word count
    document.getElementById("comments").addEventListener("input",function() {
		let maxLength = 250;
		let remaining = maxLength - this.value.length;
		document.getElementById("charCount").textContent = remaining + " characters remaining";
	});


    // Get references to the form and submit button
    const form = document.getElementById("feedbackForm");
    const submitBtn = document.getElementById("submit");

    // Submit button click event handler
    submitBtn.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default form submission
        if (form.checkValidity()) {
            previewFeedback();
        } else {
            form.reportValidity(); // Show validation errors if the form is invalid
        }
    });

    // Function to preview the feedback before submission
    function previewFeedback() {

        const improveSuggestions = Array.from(document.getElementById("improve").selectedOptions)
            .map(option => option.value)
            .join(", ");//for scrooling list multiple selections

        // Retrieve form data
        const fullName = document.getElementById("name").value;
        const contactEmail = document.getElementById("email").value;
        const phoneNumber = document.getElementById("telNo").value;
        const address = document.getElementById("address").value;
        const additionalComments = document.getElementById("comments").value;
        const feedbackType = document.getElementById("feedbackType").value;
        const experienceRating = document.querySelector('input[name="rate"]:checked')?.value || "Not Rated";
        const recommendService = document.querySelector('input[name="recommend"]:checked')?.value || "No selection";


        let experienceRatingEmoji = "";
        switch (experienceRating) {
            case "1":
                experienceRatingEmoji = "😠 Very Poor"; 
                break;
            case "2":
                experienceRatingEmoji = "☹️ Poor"; 
                break;
            case "3":
                experienceRatingEmoji = "😐 Neutral"; 
                break;
            case "4":
                experienceRatingEmoji = "🙂 Good"; 
                break;
            case "5":
                experienceRatingEmoji = "😁 Excellent"; 
                break;
            default:
                experienceRatingEmoji = "Not Rated";
        }

        // Construct preview HTML
        const previewHTML = `
            <h2>Feedback Preview</h2>
            <p><strong>Full Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${contactEmail}</p>
            <p><strong>Telephone No:</strong> ${phoneNumber}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Additional Comments:</strong> ${additionalComments}</p>
            <p><strong>Feedback Type:</strong> ${feedbackType}</p>
            <p><strong>Would You Recommend:</strong> ${recommendService}</p>
            <p><strong>Improvement Suggestions:</strong> ${improveSuggestions}</p>
            <p><strong>Experience Rating:</strong> ${experienceRatingEmoji}</p>
            <button id="editBtn" class="btn">Edit</button>
            <button id="confirmBtn" class="btn">Confirm</button>
        `;

        // Display preview and hide form
        document.getElementById("Preview").innerHTML = previewHTML;
        document.getElementById("Preview").style.display = "block";
        form.style.display = "none";

        // Add event listeners for edit and confirm buttons
        document.getElementById("editBtn").addEventListener("click", function () {
            document.getElementById("Preview").style.display = "none";
            form.style.display = "block";
        });

        document.getElementById("confirmBtn").addEventListener("click", function () {
            submitFeedback(); // Proceed with actual form submission
        });
    }

    // Function to handle actual form submission
    function submitFeedback() {
        
        document.getElementById("Preview").style.display = "none";
        document.getElementById("message").style.display = "block";
    }
});

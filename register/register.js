import { participantTemplate, successTemplate } from './templates.js';

document.addEventListener('DOMContentLoaded', () => {
    let participantCount = 1;

    // Add event listener for "Add Participant" button
    document.getElementById('add').addEventListener('click', () => {
        participantCount++;
        const participantSection = participantTemplate(participantCount);
        document.querySelector('.participants').insertAdjacentHTML('beforeend', participantSection);
    });

    // Add event listener for form submission
    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();

        const totalFees = [...document.querySelectorAll("[id^=fee]")].reduce((total, feeInput) => {
            return total + (parseFloat(feeInput.value) || 0);
        }, 0);

        const adultName = document.getElementById('adult_name').value;

        document.querySelector('form').style.display = 'none';
        document.getElementById('summary').innerHTML = successTemplate({
            adultName: adultName,
            participantCount: participantCount,
            totalFees: totalFees
        });
    });
});
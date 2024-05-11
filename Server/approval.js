
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your_email@gmail.com',
        pass: 'your_password'
    }
});

const sendApprovalEmail = async (facultyMail, eventDetails) => {
    try {
        const mailOptions = {
            from: 'your_email@gmail.com',
            to: facultyMail,
            subject: 'Event Approval Notification',
            text: `Dear Faculty Coordinator,\n\nYour event "${eventDetails.eventName}" has been approved. Please review the event details:\n\nEvent Name: ${eventDetails.eventName}\nEvent Desc: ${eventDetails.eventDesc}\nEvent Date: ${eventDetails.eventDate}\nCompetitions: ${eventDetails.competitions}\nDepartment: ${eventDetails.department}\nHall: ${eventDetails.hall}\nFaculty Coordinators: ${eventDetails.facultyCoordinators}\nFaculty Mail: ${eventDetails.facultyMail}\n\nThank you.\n`
        };

        await transporter.sendMail(mailOptions);
        console.log('Approval email sent successfully');
    } catch (error) {
        console.error('Error sending approval email:', error);
        throw new Error('Error sending approval email');
    }
};

module.exports = sendApprovalEmail;

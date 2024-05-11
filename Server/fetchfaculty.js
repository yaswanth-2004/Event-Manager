const fetchFacultyEmail = async (eventId) => {
    try {
        const event = await eventDetail.findById(eventId);
        if (!event) {
            throw new Error('Event not found');
        }
        return event.facultyMail;
    } catch (error) {
        console.error('Error fetching faculty email:', error);
        throw new Error('Error fetching faculty email');
    }
};

module.exports = fetchFacultyEmail;
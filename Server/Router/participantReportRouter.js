const express = require('express');
const router = express.Router(); 


router.get('/generate-pdf', async (req, res) => {
    try {
        const participantReport = await ParticipantDetail.aggregate([
            {
                $group: {
                    _id: '$name', // Group by participant name
                    totalCompetitions: { $sum: 1 }, // Count the number of documents (competitions) for each participant
                    events: { $addToSet: '$eventName' } // Collect the unique event names for each participant
                }
            }
        ]);

        const doc = new PDFDocument();
        doc.fontSize(18).text('Participant Report', { align: 'center' }).moveDown();
        participantReport.forEach((participant, index) => {
            doc.fontSize(14).text(`${index + 1}. Participant: ${participant._id}`, { continued: true });
            doc.fontSize(12).text(`Total Competitions: ${participant.totalCompetitions}`);
            doc.fontSize(12).text('Competitions:');
            participant.events.forEach((eventName, eventIndex) => {
                doc.fontSize(10).text(`${eventIndex + 1}. ${eventName}`);
            });
            doc.moveDown();
        });

        const filePath = 'participant_report.pdf';
        doc.pipe(fs.createWriteStream(filePath));
        doc.end();

        res.sendFile(filePath, { root: '.' });
    } catch (error) {
        console.error('Error generating participant report:', error);
        res.status(500).json({ error: 'Error generating participant report' });
    }
});
module.exports=router
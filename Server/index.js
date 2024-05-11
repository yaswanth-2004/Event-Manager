const eventDetail=require('./Model/EventDetail')
const sendApprovalEmail = require('./approval');

const fetchFacultyEmail = require('./fetchfaculty');

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Admin = require('./Model/admin');
const ParticipantDetail=require('./Model/ParticipantDetail')
const { hashPassword, comparePassword } = require("./helpers/auth")
const jwt = require('jsonwebtoken')
const cookieParser = require("cookie-parser")
const approvedEvents=require('./Model/approvedEvent')
const PORT = 8000

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

mongoose.connect('mongodb://localhost:27017')
    .then(() =>{ 
        console.log("Connected to database")
        return eventDetail.createIndexes({"eventDate":1},{ expireAfterSeconds: 0 })
})
    .catch((err) => console.log("Error Occured: ", err))


app.post('/register', async (req, res) => {

    try {
        const { username, password, role } = req.body;
        const hashedPassword = await hashPassword(password)
        const newAdmin = await Admin.create({
            username,
            password: hashedPassword,
            role
        });
        console.log(req.body)
        console.log("password:", hashedPassword)
        res.json(newAdmin)
    } catch (err) {
        console.log("error", err);
        return res.status(500).json({ error: err });
    }
})

app.post('/login', async (req, res) => {
    const JWT_SECRET = "secret";

    try {
        const { username, password } = req.body;

        const user = await Admin.findOne({ username });
        if (!user) {
            return res.status(404).json({
                error: "No user exists with that username."
            });
        }

        const match = await comparePassword(password, user.password);
        if (match) {
            const token = jwt.sign({ username: user.username, id: user._id, role: user.role }, JWT_SECRET);

            res.cookie('token', token, { httpOnly: true }).json({
                message: "Login successful.",
                user: user
            });
        } else {
            res.status(401).json({
                error: "Password doesn't match."
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: "Internal server error."
        });
    }
});



app.post('/participants', async (req, res) => {
    try {
      const { name, eventName, department, section, phoneNumber } = req.body;
      const newParticipant = await ParticipantDetail.create({
        name,
        eventName,
        department,
        section,
        phoneNumber,
      });
      res.json(newParticipant)
      console.log(req.body);
    } catch (error) {
      res.status(500).json({ message: 'Error saving participant details', error: error.message });
    }
  });
  

app.get('/participants', async (req, res) => {
    try {
      const participants = await ParticipantDetail.find();
      res.json(participants);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  });

app.post('/eventdetails',async(req,res)=>{
    try{
        const {eventName,eventDesc,eventDate,competitions,hall,facultyCoordinators,department,facultyMail,ApproveStatus}=req.body;
        const newEvent = eventDetail.create({
            eventName,
            eventDesc,
            eventDate,
            competitions,
            hall,
            facultyCoordinators,
            department,
            facultyMail,
            ApproveStatus

        });
        res.json(newEvent)
        console.log(req.body);
    }
    catch (error) {
        res.status(500).json({ message: 'Error saving event details', error: error.message });
      }
})
app.get('/eventdetails',async(req,res)=>{
    try{
        const eventDetails= await eventDetail.find();
        res.json(eventDetails)
    }
    catch(error){
        console.error('Error fetching event details',error);
    }
})
app.post('/eventdetails', async (req, res) => {
    try {
        const { eventName, eventDesc, eventDate, competitions, hall, facultyCoordinators, department, facultyMail } = req.body;

        const newEvent = await eventDetail.create({
            eventName,
            eventDesc,
            eventDate,
            competitions,
            hall,
            facultyCoordinators,
            department,
            facultyMail,
            ApproveStatus: false
        });

        res.json(newEvent);

    } catch (error) {
        res.status(500).json({ message: 'Error saving event details', error: error.message });
    }
});

app.put('/approve-event/:eventId', async (req, res) => {
    try {
        const eventId = req.params.eventId;

        const updatedEvent = await eventDetail.findByIdAndUpdate(eventId, { ApproveStatus: true }, { new: true });

        if (!updatedEvent) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.json(updatedEvent);

    } catch (error) {
        res.status(500).json({ message: 'Error updating event approval status', error: error.message });
    }
});

const PDFDocument = require('pdfkit');
const fs = require('fs');


const generateParticipantReportPDF = async () => {
    try {
        const participantReport = await ParticipantDetail.aggregate([
            {
                $group: {
                    _id: '$name',
                    totalCompetitions: { $sum: 1 },
                    competitions: { $addToSet: '$eventName' } 
                }
            }
        ]);

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('participant_report.pdf'));

        doc.fontSize(18).text('Participant Report', { align: 'center' }).moveDown();
        participantReport.forEach((participant, index) => {
            doc.fontSize(14).text(`${index + 1}. Participant: ${participant._id}`, { continued: true });
            doc.fontSize(12).text(`Total Competitions: ${participant.totalCompetitions}`).moveDown();
            doc.fontSize(12).text('Competitions:');
            participant.competitions.forEach((competition, competitionIndex) => {
                doc.fontSize(10).text(`${competitionIndex + 1}. ${competition}`);
            });
            doc.moveDown();
        });

        doc.end();

        console.log('Participant report generated successfully.');
    } catch (error) {
        console.error('Error generating participant report: ', error);
    }
};

generateParticipantReportPDF(); 

  app.listen(PORT, () => {
    console.log("Listening...")
})
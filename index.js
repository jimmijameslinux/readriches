const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://readrichesdb:readrichesdb@readriches.npmuuhx.mongodb.net/?retryWrites=true&w=majority");
  // await mongoose.connect("mongodb://localhost:27017/readrichesdb");
  console.log("Connected to DB")

}


const cardSchema = new mongoose.Schema({
    company_name: String,
    title: String,
    category: String,
    logoimage: String,
    mainimage: String,
    first_color: String,
    second_color: String,
  });

const Card = mongoose.model('Card', cardSchema);

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.resolve(__dirname, 'src', 'components', 'uploads')));

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

const storage = multer.diskStorage({
    destination: './src/components/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });
  
  app.post('/dashboard', upload.fields([{ name: 'logoimage', minCount: 1 }, { name: 'mainimage', minCount: 1 }]), async (req, res) => {
    let card = new Card();
    card.company_name = req.body.company_name;
    card.title = req.body.title;
    card.category = req.body.category;
    card.logoimage = 'uploads/'+req.files['logoimage'][0].filename; // Store the filename in the database
    card.mainimage = 'uploads/'+req.files['mainimage'][0].filename;
    card.first_color = req.body.first_color;    
    card.second_color = req.body.second_color;
  
    const doc = await card.save();
  
    console.log(doc);
    console.log(doc.logoimage)
    res.json(doc);
});

app.get('/dashboard', async(req, res) => {
    const docs = await Card.find({});
    res.json(docs);
});

app.delete('/dashboard/:id', async(req, res) => {
    const doc = await Card.findByIdAndDelete(req.params.id);
    res.json(doc);
});
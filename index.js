const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcrypt');

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
    // 
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
  
    // console.log(doc);
    // console.log(doc.logoimage)
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

app.put('/dashboard/:id', upload.fields([{ name: 'logoimage', minCount: 1 }, { name: 'mainimage', minCount: 1 }]), async (req, res) => {
  try {
      const updateFields = {
          ...(req.body.company_name && { company_name: req.body.company_name }),
          ...(req.body.title && { title: req.body.title }),
          ...(req.body.category && { category: req.body.category }),
          ...(req.files && req.files['logoimage'] && { logoimage: 'uploads/' + req.files['logoimage'][0].filename }),
          ...(req.files && req.files['mainimage'] && { mainimage: 'uploads/' + req.files['mainimage'][0].filename }),
          ...(req.body.first_color && { first_color: req.body.first_color }),
          ...(req.body.second_color && { second_color: req.body.second_color }),
      };

      const doc = await Card.findByIdAndUpdate(req.params.id, { $set: updateFields }, { new: true });

      if (!doc) {
          // Card not found
          return res.status(404).json({ error: 'Card not found.' });
      }

      // Successfully updated
      res.json(doc);
  } catch (error) {
      // Handle other errors
      console.error('Error updating card:', error);
      res.status(500).json({ error: 'Internal server error.' });
  }
});

// signup
const userSchema = new mongoose.Schema({
  email: String,
  password: String || undefined,
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  try {
    // Validate input
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists.' });
    }

    // Create a new User instance
    let user = new User();

    // Set the email and hash the password
    user.email = req.body.email;
    user.password = await bcrypt.hash(req.body.password, 10);

    // Save the user to the database
    const doc = await user.save();

    // Send the saved user document as a JSON response
    res.json(doc);
  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// login
app.post('/login', async (req, res) => {
  try {
    // Validate input
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // Find the user by email
    const user = await User.findOne({ email: req.body.email });

    // If the user is not found, return a 404 Not Found response
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Compare the input password with the hashed password
    const passwordMatch = await bcrypt.compare(req.body.password, user.password);

    // If the passwords don't match, return a 401 Unauthorized response
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Incorrect password.' });
    }

    // Send a 200 OK response
    res.json({ message: 'Login successful!' });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// signup or login with google
app.post('/google', async (req, res) => {
  try {
    // Validate input
    if (!req.body.email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      // If the user doesn't exist, create a new User instance
      let newUser = new User();

      // Set the email (you might want to set other fields based on Google data)
      newUser.email = req.body.email;

      // Save the new user to the database
      const doc = await newUser.save();

      // Send the saved user document as a JSON response for signup
      return res.json(doc);
    }

    // If the user already exists, log them in
    // You might want to perform additional login logic here if needed

    // Send a 200 OK response for login
    res.json({ message: 'Login successful!' });

  } catch (error) {
    // Handle errors, for example, send a 500 Internal Server Error response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



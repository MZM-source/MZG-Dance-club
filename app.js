const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser")

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/contactdance', {useNewUrlParser: true});
}
const port = 80;

// Define mongoose schema
const contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const contact = mongoose.model('contact', contactschema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // For serving static files..
app.use(express.urlencoded())
// PUG SPECIFIC STUFF/CONFIGURATION
app.set('view engine', 'pug'); // set the template engine as pug..
app.set('views',path.join(__dirname, 'views')); // set the views derictory..

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
});
app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
});
app.post('/contact', (req, res)=>{
    var mydata = new contact(req.body);
    mydata.save().then(()=>{
      res.send("This item has been saved to the database")
    }).catch(()=>{
      res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
});

// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});


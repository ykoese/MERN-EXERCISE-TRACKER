
const express = require("express");

const router = express.Router();

let Exercise = require('../models/exercise.model');



router.get("/", async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/add", async (req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);
  const exercise = new Exercise({
    username,
    description,
    duration,
    date

  });
  try {
    const savedExercise = await exercise.save();
    res.json(savedExercise);
  } catch (err) {
    res.json({ message: err });
  }
});

// ! parameter id olusturma 
router.get('/:id', async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    res.json(exercise);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

//! DELETE A SPECIFIC POST 

router.delete('/:id', async (req, res) => {
  try {
    const removedExercise = await Exercise.findByIdAndDelete(req.params.id)
    res.json(removedExercise);
  } catch (err) {
    res.status(400).json({ message: err });
  }
});

router.post('/update/:id', (req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json({ message: err }));
    })
    .catch(err => res.status(400).json({ message: err }));
});

/* router.patch('/update/:id', async (req, res)=>{
  try{
    const updatedExercise= await Exercise.updateOne(
      {_id:req.params.id},
      {
        $set:{
          title:req.body.title, 
          username : req.body.username, 
          description : req.body.description, 
          duration : Number(req.body.duration), 
          date : Date.parse(req.body.date) 
        }
      }
      );
    res.json(updatedExercise);
  }catch (err) {
    res.json({ message: err });
  }

}); 
 */


module.exports = router;
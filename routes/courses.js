const express = required('express')
const courses = [

    {id: 1, name: 'Geomorphology'},
    {id: 2, name: 'Climatology'},
    {id:3, name: 'Regional Geography'}
  ];
  
  app.get('/', (req, res) => {
    
      res.render('index', {title: 'My Express App', message: 'Hello Seun'});
  
  
  });
  
  app.get('/api/courses' , (req, res) => {
  
      res.send(courses);
  });
  
  app.get('/api/posts/:year/:month' , (req, res) => {
  
    res.send(req.query);
  })
  app.get('/api/courses/:id' , (req, res) => {
  
    const course= courses.find(c=> c.id=== parseInt(req.params.id));
    if(!course) 
    return res.status(404).send('The course with the given ID was not found ')
  
    res.send(course);
  });
  
  app.post('/api/courses' , (req, res) => {
  
    const {error} = validateCourse(req.body); // same as result.error
  
  
    if (error)  // destructured from result.error
    return  res.status(400).send(error.details[0].message); // error destructured from result.error
  
      
  
  
  
    
  
    const courseAdding = {
  
      id: courses.length + 1,
      name: req.body.name
    };
  
    courses.push(courseAdding);
    res.send(courseAdding);
  });
  
  app.put('/api/courses/:id', (req,res) =>{
    //Logic : Look up course
    //if course does not exist,return server error message of 404
    const course= courses.find(c=> c.id=== parseInt(req.params.id));
    if(!course) 
    return  res.status(404).send('The course with the given ID was not found ')
  
      
    
    
  
  
    //Validate: if it exists, check if the course is in the right format,hence return 400 if format is bad (bad request)
    const result = validateCourse(req.body);
  
    const {error} = validateCourse(req.body); // same as result.error
  
  
    if (error) // destructured from result.error
   return   res.status(400).send(error.details[0].message); // error destructured from result.error
  
      
  
    
     
    // update course: 
    
    course.name = req.body.name;
  
    res.send(course);
    // return updated course
  
  
    
  
  });
  
  app.delete('/api/courses/:id', (req, res) =>{
  
    // Look up course and return 404 error
  
    const course= courses.find(c=> c.id=== parseInt(req.params.id));
    if(!course) 
    return res.status(404).send('The course with the given ID was not found ')
  
    // Delete: Find index of course in courses array
  
    const index = courses.indexOf(course);
    courses.splice(index, 1)
    res.send(course);
  
  })
  
  function validateCourse(course)
   {
    const schema = {
      name: Joi.string().min(3).required()
    };
  
    return Joi.validate(course, schema);
  
   }
  
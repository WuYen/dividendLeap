// app.get('/articles', (req, res) => {
//     const articles = [];
//     // code to retrieve an article...
//     res.json(articles);
//   });

//   app.post('/articles', (req, res) => {
//     // code to add a new article...
//     res.json(req.body);
//   });

//   app.put('/articles/:id', (req, res) => {
//     const { id } = req.params;
//     // code to update an article...
//     res.json(req.body);
//   });

//   app.delete('/articles/:id', (req, res) => {
//     const { id } = req.params;
//     // code to delete an article...
//     res.json({ deleted: id });
//   });

// app.post('/users', (req, res) => {
//     const { email } = req.body;
//     const userExists = users.find(u => u.email === email);
//     if (userExists) {
//       return res.status(400).json({ error: 'User already exists' })
//     }
//     res.json(req.body);
//   });

// {
//     "success": false,
//     "message": "Invalid mobile number.",
//     "error_code": 1306,
//     "data": {}
//  }

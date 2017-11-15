'use strict';

module.exports = function(router, Idea, flash, session) {

  router.get('/', (req, res) => {

    Idea.find({})
        .sort({ date: 'descending' })
        .then(ideas => {
      res.render('ideas/index', { ideas: ideas });
    });

  });

  router.get('/add', (req, res) => {
    res.render('ideas/idea_form', { title: "Video Idea", action: "/ideas" });
  });

  router.get('/edit/:id', (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(idea => { 
          res.render(
            'ideas/idea_form', 
            { 
              idea: idea, 
              title: "", 
              action: "/ideas/" + req.params.id + "?_method=PUT" 
            }
          ) 
        });
  });

  router.post('/', (req, res) => {
    let errors = [];

    if (!req.body.title) {
      errors.push({ text: 'Field Title is required' });
    }

    if (!req.body.details) {
      errors.push({ text: 'Field Details is required' });
    }

    if (errors.length > 0) {
      res.render(
        'ideas/add',
        {
          errors: errors,
          title: req.body.title,
          details: req.body.details
        }
      );
    } else {
      new Idea(req.body)
        .save()
        .then(idea => {
          res.flash('info_msg', 'Idea was saved!');

          res.redirect('/ideas');
        });
    }
  });

  router.put('/:id', (req, res) => {
    Idea.findOne({ _id: req.params.id })
        .then(idea => {
          idea.title = req.body.title;
          idea.details = req.body.details;

          idea.save()
              .then(idea => {
                res.flash('info_msg', 'Idea was saved!');

                res.redirect('/ideas');
              });
        });
  });

  router.delete('/:id', (req, res) => {
    Idea.remove({ _id: req.params.id })
        .then(() => {
          res.flash('info_msg', 'Idea was deleted!');

          res.redirect('/ideas')
        });
  });

  return router;
}

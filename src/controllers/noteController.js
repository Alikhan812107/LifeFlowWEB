const Note = require('../models/Note');

class NoteController {
  constructor(noteService) {
    this.noteService = noteService;
  }

  create = async (req, res) => {
    try {
      const note = new Note({...req.body, user_id: req.user.id});
      const result = await this.noteService.create(note);
      res.json(result);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  getAll = async (req, res) => {
    try {
      const notes = await this.noteService.getAll(req.user.id);
      res.json(notes);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  viewHTML = async (req, res) => {
    try {
      const notes = await this.noteService.getAll(req.user.id);
      res.render('notes', notes);
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  createFromHTML = async (req, res) => {
    try {
      const note = new Note({
        title: req.body.title,
        description: req.body.description,
        user_id: req.user.id
      });
      await this.noteService.create(note);
      res.redirect('/notes');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  updateFromHTML = async (req, res) => {
    try {
      const note = new Note({
        title: req.body.title,
        description: req.body.description,
        user_id: req.user.id
      });
      await this.noteService.update(req.body.id, note, req.user.id);
      res.redirect('/notes');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  deleteFromHTML = async (req, res) => {
    try {
      await this.noteService.delete(req.query.id, req.user.id);
      res.redirect('/notes');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
}

module.exports = NoteController;

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

  getById = async (req, res) => {
    try {
      const id = req.params.id || req.query.id;
      const note = await this.noteService.getById(id, req.user.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(note);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  update = async (req, res) => {
    try {
      const id = req.params.id || req.query.id;
      const note = new Note({...req.body, user_id: req.user.id});
      const result = await this.noteService.update(id, note, req.user.id);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  delete = async (req, res) => {
    try {
      const id = req.params.id || req.query.id;
      await this.noteService.delete(id, req.user.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = NoteController;

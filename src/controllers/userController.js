class UserController {
  constructor(taskService, noteService, userService) {
    this.taskService = taskService;
    this.noteService = noteService;
    this.userService = userService;
  }

  viewProfile = async (req, res) => {
    try {
      const tasks = await this.taskService.getAll();
      const notes = await this.noteService.getAll();

      const completedTasks = tasks.filter(task => task.done).length;

      const user = await this.userService.getById('user1');
      if (user) {
        user.tasks_num = tasks.length;
        user.notes_num = notes.length;
      }

      res.render('profile', {
        user: user || { name: 'John Student', email: 'john@student.com' },
        completedTasks,
        activeTasks: tasks.length - completedTasks
      });
    } catch (err) {
      res.status(500).send(err.message);
    }
  };

  uploadAvatar = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send('no file uploaded');
      }

      const base64Image = req.file.buffer.toString('base64');
      await this.userService.updateAvatar('user1', base64Image);
      res.redirect('/profile');
    } catch (err) {
      res.status(500).send(err.message);
    }
  };
}

module.exports = UserController;

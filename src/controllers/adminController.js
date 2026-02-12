class AdminController {
  constructor(userService, taskService, noteService) {
    this.userService = userService;
    this.taskService = taskService;
    this.noteService = noteService;
  }

  getAllUsers = async (req, res) => {
    try {
      const users = await this.userService.getAllUsers();
      const usersWithoutAvatar = users.map(user => {
        const { avatar, ...userWithoutAvatar } = user;
        if (avatar) {
          userWithoutAvatar.hasAvatar = true;
          userWithoutAvatar.avatarPreview = avatar.substring(0, 50) + '...';
        }
        return userWithoutAvatar;
      });
      res.json(usersWithoutAvatar);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  updateUserRole = async (req, res) => {
    try {
      const { userId, role } = req.body;
      const validRoles = ['user', 'premium', 'moderator', 'admin'];
      
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }

      await this.userService.updateRole(userId, role);
      res.json({ message: 'Role updated successfully' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  deleteAnyTask = async (req, res) => {
    try {
      await this.taskService.delete(req.query.id, null);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  deleteAnyNote = async (req, res) => {
    try {
      await this.noteService.delete(req.query.id, null);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
}

module.exports = AdminController;

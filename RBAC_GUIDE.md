# RBAC и Email Service - Руководство

## Email Service (SMTP через Mailtrap)

### Настройка
Email уже настроен в `.env`:
```
MAILTRAP_TOKEN=244869bfeab89b7a909db87c9c224a67
MAILTRAP_SENDER_EMAIL=hello@demomailtrap.com
MAILTRAP_SENDER_NAME=LifeFlow
```

### Автоматическая отправка
- При регистрации нового пользователя автоматически отправляется welcome email
- Проверить письма можно на https://mailtrap.io/inboxes

### Тестирование
1. Зарегистрируй нового пользователя: POST /api/auth/register
2. Зайди на Mailtrap и увидишь письмо в inbox

---

## RBAC (Role-Based Access Control)

### Роли
- **user** - обычный пользователь (по умолчанию)
- **premium** - премиум пользователь
- **moderator** - модератор  
- **admin** - администратор

### Права доступа
- **user**: может управлять только своими данными
- **admin**: может удалять любые tasks/notes, управлять ролями пользователей

---

## Как сделать себя админом

### Способ 1: Через MongoDB
1. Открой MongoDB Atlas или Compass
2. Найди свою базу данных `LifeFlowWeb`
3. Открой коллекцию `users`
4. Найди своего пользователя по email
5. Измени поле `role` на `"admin"`

### Способ 2: Через API (если уже есть админ)
```bash
PUT /api/admin/users/role
Headers: 
  Authorization: Bearer <admin-token>
  Content-Type: application/json

Body:
{
  "userId": "698d5e54cc071bbb6e849a2e",
  "role": "admin"
}
```

---

## Admin API Endpoints

### 1. Получить всех пользователей
```bash
GET /api/admin/users
Headers: Authorization: Bearer <admin-token>

Response:
[
  {
    "_id": "698d5e54cc071bbb6e849a2e",
    "username": "John",
    "email": "john@example.com",
    "role": "user"
  }
]
```

### 2. Изменить роль пользователя
```bash
PUT /api/admin/users/role
Headers: 
  Authorization: Bearer <admin-token>
  Content-Type: application/json

Body:
{
  "userId": "698d5e54cc071bbb6e849a2e",
  "role": "premium"
}

Доступные роли: "user", "premium", "moderator", "admin"
```

### 3. Удалить любую задачу
```bash
DELETE /api/admin/tasks?id=<task_id>
Headers: Authorization: Bearer <admin-token>
```

### 4. Удалить любую заметку
```bash
DELETE /api/admin/notes?id=<note_id>
Headers: Authorization: Bearer <admin-token>
```

---

## Тестирование RBAC

### Шаг 1: Создай двух пользователей
```bash
# User 1
POST /api/auth/register
{
  "username": "user1",
  "email": "user1@test.com",
  "password": "123456"
}

# User 2
POST /api/auth/register
{
  "username": "user2",
  "email": "user2@test.com",
  "password": "123456"
}
```

### Шаг 2: Сделай user1 админом
Через MongoDB измени role на "admin"

### Шаг 3: Войди как user1 (admin)
```bash
POST /api/auth/login
{
  "email": "user1@test.com",
  "password": "123456"
}

Response: { "token": "..." }
```

### Шаг 4: Проверь admin права
```bash
# Получи всех пользователей
GET /api/admin/users
Headers: Authorization: Bearer <token-from-step3>

# Измени роль user2
PUT /api/admin/users/role
Headers: Authorization: Bearer <token-from-step3>
Body: { "userId": "<user2-id>", "role": "premium" }
```

### Шаг 5: Проверь что обычный user не может
```bash
# Войди как user2
POST /api/auth/login
{
  "email": "user2@test.com",
  "password": "123456"
}

# Попробуй получить список пользователей (должна быть ошибка 403)
GET /api/admin/users
Headers: Authorization: Bearer <user2-token>

Response: 
{
  "status": "error",
  "statusCode": 403,
  "message": "Access denied - Required roles: admin"
}
```

---

## Примеры использования

### Пример 1: Admin удаляет чужую задачу
```bash
# User создает задачу
POST /development/html
Body: { "title": "My Task", "body": "Description" }

# Admin удаляет эту задачу
DELETE /development/delete?id=<task_id>
# Успешно удалено, даже если задача не его
```

### Пример 2: User пытается удалить чужую задачу
```bash
# User пытается удалить чужую задачу
DELETE /development/delete?id=<other-user-task-id>
# Ошибка: not found (потому что фильтр по user_id)
```

---

## Проверка Email

1. Зарегистрируй нового пользователя
2. Зайди на https://mailtrap.io
3. Войди в свой аккаунт
4. Открой Inbox
5. Увидишь письмо "Welcome to LifeFlow!"

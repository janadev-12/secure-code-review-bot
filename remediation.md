# Remediation Guide - Multi-Language Secure Code Review Bot

This document provides secure coding remediation steps for vulnerabilities detected by the Secure Code Review Bot.

---

## Supported Languages

- JavaScript / Node.js
- Python
- Java
- PHP
- C / C++

---

# 1. Avoid Hardcoded Secrets

## Problem

Secrets such as passwords, tokens, JWT secrets, and API keys should not be written directly in source code.

## Secure Practice

Use environment variables or secret managers.

### JavaScript

```js
const secret = process.env.JWT_SECRET;
```

### Python

```python
import os
secret = os.environ.get("JWT_SECRET")
```

### Java

```java
String secret = System.getenv("JWT_SECRET");
```

### PHP

```php
$secret = getenv("JWT_SECRET");
```

### C / C++

Load secrets from protected configuration or environment variables instead of source code.

---

# 2. Hash Passwords Securely

## Problem

Plain text passwords expose users if the database is leaked.

## Secure Practice

Use strong password hashing.

### JavaScript

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

### Python

```python
hashed = bcrypt.hashpw(password.encode(), bcrypt.gensalt())
```

### Java

```java
String hashed = BCrypt.hashpw(password, BCrypt.gensalt());
```

### PHP

```php
$hash = password_hash($password, PASSWORD_BCRYPT);
```

---

# 3. Avoid eval() and exec()

## Problem

`eval()` and `exec()` can execute attacker-controlled code.

## Bad Example

```js
eval(userInput);
```

## Good Example

```js
const allowedActions = {
  start: startFunction,
  stop: stopFunction
};

allowedActions[action]?.();
```

## Recommendation

Avoid dynamic code execution. Use predefined functions, safe parsing, or allowlisted actions.

---

# 4. Prevent SQL Injection

## Problem

Building SQL queries using string concatenation allows attackers to modify queries.

## Secure Practice

Use parameterized queries or prepared statements.

### Python

```python
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

### Java

```java
PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
ps.setString(1, userId);
```

### PHP

```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
```

---

# 5. Prevent NoSQL Injection

## Problem

Passing request body directly into MongoDB queries can allow query manipulation.

## Bad Example

```js
User.findOne(req.body);
```

## Good Example

```js
const email = sanitize(req.body.email);
User.findOne({ email });
```

---

# 6. Secure JWT Secrets

## Problem

Weak or hardcoded JWT secrets can allow token forgery.

## Secure Practice

Use strong environment-based secrets.

```js
jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
```

---

# 7. Disable Debug Mode in Production

## Problem

Debug mode can expose stack traces and sensitive information.

## Python Flask Secure Example

```python
app.run(debug=False)
```

Use environment-based configuration for production.

---

# 8. Avoid subprocess shell=True

## Problem

`shell=True` can allow command injection.

## Bad Example

```python
subprocess.run(user_input, shell=True)
```

## Good Example

```python
subprocess.run(["ls", "-la"], shell=False)
```

---

# 9. Avoid Unsafe Deserialization

## Problem

Unsafe deserialization can lead to remote code execution.

## Python

Avoid `pickle` for untrusted input.

```python
json.loads(data)
```

## Java

Avoid `ObjectInputStream` for untrusted input. Use JSON with schema validation.

---

# 10. Prevent XSS

## Problem

Printing user input directly into HTML can allow script injection.

## PHP Bad Example

```php
echo $_GET["name"];
```

## PHP Good Example

```php
echo htmlspecialchars($_GET["name"], ENT_QUOTES, "UTF-8");
```

---

# 11. Secure C / C++ Memory Handling

## Problem

Unsafe functions can cause buffer overflows.

## Avoid

```c
gets(buffer);
strcpy(dest, src);
strcat(dest, src);
sprintf(buffer, "%s", input);
```

## Prefer

```c
fgets(buffer, sizeof(buffer), stdin);
strncpy(dest, src, sizeof(dest) - 1);
snprintf(buffer, sizeof(buffer), "%s", input);
```

---

# 12. Avoid system() with User Input

## Problem

`system()` can execute attacker-controlled OS commands.

## Bad Example

```cpp
system(userInput);
```

## Good Practice

Use safe library functions instead of shell commands.

---

# 13. Use Secure Random

## Problem

Weak random functions are predictable.

## Java

```java
SecureRandom random = new SecureRandom();
```

## C / C++

Avoid using `rand()` for security-sensitive tokens or keys.

---

# 14. Add Security Headers

## JavaScript / Express

```js
const helmet = require("helmet");
app.use(helmet());
```

---

# 15. Add Rate Limiting

## JavaScript / Express

```js
const rateLimit = require("express-rate-limit");

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);
```

---

# 16. Validate User Input

## Problem

Unvalidated input can lead to injection, XSS, authentication bypass, and application errors.

### JavaScript

```js
body("email").isEmail().normalizeEmail();
```

### Python

Use Pydantic, Marshmallow, or explicit validation.

### Java

Use Bean Validation or allowlist validation.

### PHP

```php
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
```

### C / C++

Validate input size before storing it in buffers.

---

# 17. Do Not Log Sensitive Data

## Problem

Logging passwords, tokens, or secrets can expose sensitive data.

## Bad Example

```js
console.log("password:", password);
```

## Good Example

```js
console.log("Login attempt recorded");
```

---

# Secure Coding Checklist

- Do not hardcode secrets
- Hash passwords before saving
- Avoid eval and exec
- Use parameterized queries
- Validate all user inputs
- Sanitize all outputs
- Avoid unsafe file inclusion
- Disable debug mode in production
- Avoid unsafe deserialization
- Use security headers
- Add rate limiting
- Avoid unsafe C/C++ functions
- Use secure random generators
- Do not log sensitive data
- Avoid command execution with user input

---

# Conclusion

Applying these remediation steps reduces the risk of injection, broken authentication, sensitive data exposure, insecure design, and security misconfiguration across multiple programming languages.
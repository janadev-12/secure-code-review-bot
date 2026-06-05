# Findings - Multi-Language Secure Code Review Bot

This document summarizes the security vulnerabilities detected by the Secure Code Review Bot.

---

## Supported Languages

- JavaScript / Node.js
- Python
- Java
- PHP
- C / C++

---

# JavaScript / Node.js Findings

## JS-001: Hardcoded Secret or API Key

**Severity:** High  
**OWASP:** A02 Cryptographic Failures

Hardcoded secrets such as API keys, JWT secrets, passwords, and tokens were detected.

**Impact:**  
Attackers may misuse exposed secrets if the source code is leaked.

**Recommendation:**  
Use environment variables.

```js
const jwtSecret = process.env.JWT_SECRET;
```

---

## JS-002: Plain Text Password Storage

**Severity:** High  
**OWASP:** A07 Identification and Authentication Failures

Password is stored directly from request body without hashing.

**Impact:**  
If the database is compromised, user passwords can be exposed.

**Recommendation:**

```js
const hashedPassword = await bcrypt.hash(req.body.password, 10);
```

---

## JS-003: Dangerous eval() Usage

**Severity:** High  
**OWASP:** A03 Injection

`eval()` executes dynamic JavaScript code and can allow code injection.

**Impact:**  
Attackers may execute malicious JavaScript code.

**Recommendation:**  
Avoid `eval()` and use safe parsing or predefined logic.

---

## JS-004: Sensitive Data Logged in Console

**Severity:** Medium  
**OWASP:** A09 Security Logging and Monitoring Failures

Sensitive values such as passwords, tokens, or secrets are logged.

**Impact:**  
Sensitive information may be exposed in application logs.

**Recommendation:**

```js
console.log("Login attempt recorded");
```

---

## JS-005: Weak or Hardcoded JWT Secret

**Severity:** High  
**OWASP:** A02 Cryptographic Failures

JWT secret is hardcoded or weak.

**Impact:**  
Attackers may forge tokens if the secret is discovered.

**Recommendation:**

```js
jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
```

---

## JS-006: Possible NoSQL Injection

**Severity:** High  
**OWASP:** A03 Injection

User-controlled request body is directly passed into database queries.

**Impact:**  
Attackers may manipulate query objects and bypass authentication.

**Recommendation:**

```js
User.findOne({ email: sanitizedEmail });
```

---

## JS-007: Insecure Wildcard CORS

**Severity:** Medium  
**OWASP:** A05 Security Misconfiguration

CORS allows all origins.

**Impact:**  
Untrusted websites may interact with your API.

**Recommendation:**

```js
cors({ origin: process.env.CLIENT_URL });
```

---

## JS-008: Missing bcrypt Password Hashing

**Severity:** High  
**OWASP:** A07 Identification and Authentication Failures

Password handling is found, but bcrypt or argon2 is missing.

**Impact:**  
Weak password handling can expose user credentials.

**Recommendation:**

```js
const hashedPassword = await bcrypt.hash(password, 10);
```

---

## JS-009: Missing Helmet Security Headers

**Severity:** Medium  
**OWASP:** A05 Security Misconfiguration

Express application is found, but Helmet middleware is missing.

**Impact:**  
Missing security headers may increase browser-based attack risks.

**Recommendation:**

```js
const helmet = require("helmet");
app.use(helmet());
```

---

## JS-010: Missing Rate Limiting

**Severity:** Medium  
**OWASP:** A07 Identification and Authentication Failures

Authentication route is found, but rate limiting is missing.

**Impact:**  
Attackers may perform brute-force login attempts.

**Recommendation:**

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

## JS-011: Missing Input Validation

**Severity:** Medium  
**OWASP:** A03 Injection

User input is used without validation or sanitization.

**Impact:**  
Attackers may send malicious or unexpected input.

**Recommendation:**

```js
body("email").isEmail().normalizeEmail();
```

---

# Python Findings

## PY-001: Hardcoded Secret or API Key

**Severity:** High  
**OWASP:** A02 Cryptographic Failures

Sensitive secrets are hardcoded in Python code.

**Recommendation:**

```python
import os
secret = os.environ.get("JWT_SECRET")
```

---

## PY-002: Dangerous eval() Usage

**Severity:** High  
**OWASP:** A03 Injection

`eval()` may execute malicious Python code.

**Recommendation:**  
Avoid `eval()` and use safer alternatives such as controlled logic or `ast.literal_eval()` for safe literal parsing.

---

## PY-003: Dangerous exec() Usage

**Severity:** High  
**OWASP:** A03 Injection

`exec()` executes dynamic Python statements.

**Recommendation:**  
Avoid `exec()` completely for user-controlled data.

---

## PY-004: Command Injection Risk with shell=True

**Severity:** High  
**OWASP:** A03 Injection

`subprocess` with `shell=True` can allow OS command injection.

**Recommendation:**

```python
subprocess.run(["ls", "-la"], shell=False)
```

---

## PY-005: Unsafe Pickle Deserialization

**Severity:** High  
**OWASP:** A08 Software and Data Integrity Failures

`pickle.loads()` can execute malicious code with untrusted input.

**Recommendation:**

```python
import json
data = json.loads(input_data)
```

---

## PY-006: Flask Debug Mode Enabled

**Severity:** High  
**OWASP:** A05 Security Misconfiguration

Debug mode can expose sensitive information and stack traces.

**Recommendation:**

```python
app.run(debug=False)
```

---

## PY-007: Weak Hashing Algorithm

**Severity:** Medium  
**OWASP:** A02 Cryptographic Failures

MD5 or SHA1 is weak for security-sensitive data.

**Recommendation:**  
Use bcrypt, Argon2, or SHA-256/HMAC depending on the use case.

---

## PY-008: Possible SQL Injection

**Severity:** High  
**OWASP:** A03 Injection

SQL query is built using string formatting or concatenation.

**Recommendation:**

```python
cursor.execute("SELECT * FROM users WHERE id = %s", (user_id,))
```

---

## PY-009: Sensitive Data Printed

**Severity:** Medium  
**OWASP:** A09 Security Logging and Monitoring Failures

Sensitive data is printed to console.

**Recommendation:**

```python
print("Login attempt recorded")
```

---

## PY-010: Missing Input Validation

**Severity:** Medium  
**OWASP:** A03 Injection

User input is used without validation.

**Recommendation:**  
Use Pydantic, Marshmallow, Cerberus, or explicit validation checks.

---

# Java Findings

## JAVA-001: Hardcoded Password or Secret

**Severity:** High  
**OWASP:** A02 Cryptographic Failures

Secrets are hardcoded in Java code.

**Recommendation:**

```java
String secret = System.getenv("JWT_SECRET");
```

---

## JAVA-002: Possible SQL Injection

**Severity:** High  
**OWASP:** A03 Injection

SQL query is built using string concatenation.

**Recommendation:**

```java
PreparedStatement ps = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
ps.setString(1, userId);
```

---

## JAVA-003: Command Injection Risk

**Severity:** High  
**OWASP:** A03 Injection

`Runtime.exec()` or `ProcessBuilder` is used.

**Impact:**  
If user input reaches command execution, attackers may run OS commands.

**Recommendation:**  
Avoid command execution with user input. Validate and whitelist allowed commands.

---

## JAVA-004: Weak Hashing Algorithm

**Severity:** Medium  
**OWASP:** A02 Cryptographic Failures

MD5 or SHA-1 hashing is used.

**Recommendation:**  
Use BCrypt, Argon2, PBKDF2, or strong cryptographic hashing based on the use case.

---

## JAVA-005: Insecure Random Usage

**Severity:** Medium  
**OWASP:** A02 Cryptographic Failures

`java.util.Random` is used for security-sensitive randomness.

**Recommendation:**

```java
SecureRandom random = new SecureRandom();
```

---

## JAVA-006: Possible Insecure Deserialization

**Severity:** High  
**OWASP:** A08 Software and Data Integrity Failures

`ObjectInputStream` is used with possible untrusted data.

**Recommendation:**  
Avoid Java native deserialization for untrusted input. Use JSON with strict schema validation.

---

## JAVA-007: Sensitive Data Printed

**Severity:** Medium  
**OWASP:** A09 Security Logging and Monitoring Failures

Sensitive information is printed using `System.out.println`.

**Recommendation:**

```java
logger.info("Login attempt recorded");
```

---

## JAVA-008: Missing Input Validation

**Severity:** Medium  
**OWASP:** A03 Injection

User input is detected without validation.

**Recommendation:**  
Use Bean Validation, regex validation, or allowlist checks.

---

# PHP Findings

## PHP-001: Hardcoded Secret or Password

**Severity:** High  
**OWASP:** A02 Cryptographic Failures

Secrets are hardcoded in PHP variables.

**Recommendation:**

```php
$secret = getenv("JWT_SECRET");
```

---

## PHP-002: Dangerous eval() Usage

**Severity:** High  
**OWASP:** A03 Injection

`eval()` executes dynamic PHP code.

**Recommendation:**  
Avoid `eval()` completely.

---

## PHP-003: Possible SQL Injection

**Severity:** High  
**OWASP:** A03 Injection

SQL query uses direct user input.

**Recommendation:**

```php
$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");
$stmt->execute([$id]);
```

---

## PHP-004: User Input Included as File

**Severity:** High  
**OWASP:** A03 Injection

`include` or `require` uses user input.

**Impact:**  
Attackers may perform local or remote file inclusion.

**Recommendation:**  
Use an allowlist of safe file names.

---

## PHP-005: Weak MD5 Password Hashing

**Severity:** High  
**OWASP:** A07 Identification and Authentication Failures

MD5 is used for password hashing.

**Recommendation:**

```php
$hash = password_hash($password, PASSWORD_BCRYPT);
```

---

## PHP-006: Possible XSS with Raw echo

**Severity:** Medium  
**OWASP:** A03 Injection

User input is echoed without escaping.

**Recommendation:**

```php
echo htmlspecialchars($_GET["name"], ENT_QUOTES, "UTF-8");
```

---

## PHP-007: Direct Superglobal Usage

**Severity:** Medium  
**OWASP:** A03 Injection

`$_GET`, `$_POST`, or `$_REQUEST` is used directly.

**Recommendation:**

```php
$email = filter_input(INPUT_POST, "email", FILTER_VALIDATE_EMAIL);
```

---

## PHP-008: Sensitive Data Printed

**Severity:** Medium  
**OWASP:** A09 Security Logging and Monitoring Failures

Sensitive values may be printed.

**Recommendation:**  
Do not print passwords, tokens, API keys, or secrets.

---

# C / C++ Findings

## CPP-001: Unsafe gets() Usage

**Severity:** High  
**OWASP:** A03 Injection

`gets()` can cause buffer overflow.

**Recommendation:**

```c
fgets(buffer, sizeof(buffer), stdin);
```

---

## CPP-002: Unsafe strcpy() Usage

**Severity:** High  
**OWASP:** A03 Injection

`strcpy()` does not check buffer size.

**Recommendation:**

```c
strncpy(dest, src, sizeof(dest) - 1);
```

---

## CPP-003: Unsafe strcat() Usage

**Severity:** High  
**OWASP:** A03 Injection

`strcat()` can overflow destination buffer.

**Recommendation:**

```c
strncat(dest, src, sizeof(dest) - strlen(dest) - 1);
```

---

## CPP-004: Unsafe sprintf() Usage

**Severity:** High  
**OWASP:** A03 Injection

`sprintf()` can write beyond buffer boundaries.

**Recommendation:**

```c
snprintf(buffer, sizeof(buffer), "%s", input);
```

---

## CPP-005: Command Injection Risk with system()

**Severity:** High  
**OWASP:** A03 Injection

`system()` executes OS commands.

**Recommendation:**  
Avoid `system()` with user input. Use safe library APIs instead.

---

## CPP-006: Hardcoded Secret or Password

**Severity:** High  
**OWASP:** A02 Cryptographic Failures

Secrets are hardcoded in C/C++ code.

**Recommendation:**  
Load secrets from protected configuration or secret manager.

---

## CPP-007: Weak Random Usage

**Severity:** Medium  
**OWASP:** A02 Cryptographic Failures

`rand()` is predictable and not secure for cryptographic use.

**Recommendation:**  
Avoid `rand()` for security-sensitive tokens or keys.

---

## CPP-008: Possible Format String Vulnerability

**Severity:** High  
**OWASP:** A03 Injection

`printf()` uses variable directly as format string.

**Recommendation:**

```c
printf("%s", userInput);
```

---

## CPP-009: Missing Input Bounds Check

**Severity:** Medium  
**OWASP:** A03 Injection

Input is read without proper bounds checking.

**Recommendation:**  
Use `fgets()`, `std::string`, or bounds-checked input handling.

---

# Summary

The Secure Code Review Bot detects security issues across five programming language categories and provides severity-based findings, OWASP mapping, and secure coding recommendations.
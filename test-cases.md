# Test Cases - Multi-Language Secure Code Review Bot

This document contains test cases used to verify the Secure Code Review Bot across multiple programming languages.

---

## Supported Languages Tested

- JavaScript / Node.js
- Python
- Java
- PHP
- C / C++

---

# 1. JavaScript / Node.js Test Case

## Test Code

```js
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

const secret = "mysecretkey";
const password = "admin123";

app.post("/login", async (req, res) => {
  console.log("User password:", req.body.password);

  const user = await User.findOne(req.body);

  const newUser = {
    email: req.body.email,
    password: req.body.password
  };

  const token = jwt.sign({ id: newUser.email }, "weaksecret");

  eval(req.body.code);

  res.json({
    message: "Login success",
    token
  });
});

app.listen(5000);
```

## Expected Findings

- Hardcoded secret
- Plain text password storage
- Dangerous eval() usage
- Sensitive data logging
- Weak JWT secret
- Possible NoSQL injection
- Insecure wildcard CORS
- Missing bcrypt
- Missing Helmet
- Missing rate limiting
- Missing input validation

## Expected Risk

```text
Risk Level: High
Risk Score: 100/100
```

## Status

```text
Passed
```

---

# 2. Python Test Case

## Test Code

```python
import subprocess
import pickle
import hashlib
from flask import Flask, request

app = Flask(__name__)

secret = "mysecretkey"
password = "admin123"

@app.route("/run")
def run():
    user_input = request.args.get("cmd")

    print("password:", password)

    eval(user_input)
    exec(user_input)

    subprocess.run(user_input, shell=True)

    pickle.loads(request.args.get("data"))

    hashlib.md5(password.encode()).hexdigest()

    cursor.execute("SELECT * FROM users WHERE id=" + user_input)

    return "done"

app.run(debug=True)
```

## Expected Findings

- Hardcoded secret
- Dangerous eval() usage
- Dangerous exec() usage
- Command injection using shell=True
- Unsafe pickle deserialization
- Flask debug mode enabled
- Weak MD5 hashing
- Possible SQL injection
- Sensitive data printed
- Missing input validation

## Expected Risk

```text
Risk Level: High
Risk Score: 100/100
```

## Status

```text
Passed
```

---

# 3. Java Test Case

## Test Code

```java
import java.sql.*;
import java.util.Random;
import java.security.MessageDigest;
import java.io.ObjectInputStream;
import java.io.FileInputStream;

public class VulnerableApp {
    public static void main(String[] args) throws Exception {
        String password = "admin123";
        String secret = "mysecretkey";
        String userId = args[0];

        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost/db");
        Statement stmt = conn.createStatement();

        ResultSet rs = stmt.executeQuery("SELECT * FROM users WHERE id=" + userId);

        Runtime.getRuntime().exec(args[1]);

        MessageDigest md = MessageDigest.getInstance("MD5");

        Random random = new Random();

        ObjectInputStream ois = new ObjectInputStream(new FileInputStream("data.ser"));
        Object obj = ois.readObject();

        System.out.println("password: " + password);
    }
}
```

## Expected Findings

- Hardcoded password or secret
- SQL injection
- Runtime.exec command injection
- Weak MD5 hashing
- Insecure Random usage
- Insecure deserialization
- Sensitive data printing
- Missing input validation

## Expected Risk

```text
Risk Level: High
Risk Score: 100/100
```

## Status

```text
Passed
```

---

# 4. PHP Test Case

## Test Code

```php
<?php
$password = "admin123";
$secret = "mysecretkey";

$id = $_GET['id'];
$name = $_GET['name'];

$query = "SELECT * FROM users WHERE id=" . $_GET['id'];
mysqli_query($conn, $query);

eval($_POST['code']);

include($_GET['page']);

echo $_GET['name'];

$hash = md5($password);

var_dump($secret);
?>
```

## Expected Findings

- Hardcoded secret or password
- Dangerous eval() usage
- Possible SQL injection
- User input included as file
- Weak MD5 password hashing
- Possible XSS with raw echo
- Direct superglobal usage
- Sensitive data printed

## Expected Risk

```text
Risk Level: High
Risk Score: 100/100
```

## Status

```text
Passed
```

---

# 5. C / C++ Test Case

## Test Code

```cpp
#include <iostream>
#include <cstring>
#include <cstdio>
#include <cstdlib>
using namespace std;

int main() {
    char buffer[10];
    char password[] = "admin123";
    string secret = "mysecretkey";

    gets(buffer);

    strcpy(buffer, "verylonginput");

    strcat(buffer, "moredata");

    sprintf(buffer, "%s", "test");

    system(buffer);

    int token = rand();

    printf(buffer);

    cin >> buffer;

    return 0;
}
```

## Expected Findings

- Unsafe gets() usage
- Unsafe strcpy() usage
- Unsafe strcat() usage
- Unsafe sprintf() usage
- Command injection risk with system()
- Hardcoded secret or password
- Weak rand() usage
- Possible format string vulnerability
- Missing input bounds check

## Expected Risk

```text
Risk Level: High
Risk Score: 100/100
```

## Status

```text
Passed
```

---

# Final Testing Summary

| Language | Status | Expected Risk |
|---|---|---|
| JavaScript / Node.js | Passed | High |
| Python | Passed | High |
| Java | Passed | High |
| PHP | Passed | High |
| C / C++ | Passed | High |

---

# Conclusion

All supported language scanners successfully detected vulnerable patterns and generated severity-based findings with OWASP mapping, line number detection, risk score, and remediation suggestions.
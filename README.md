# Multi-Language Secure Code Review Bot

A cybersecurity-focused Secure Code Review Bot that scans source code and detects common security vulnerabilities using static rule-based analysis.

This project supports multiple programming languages and provides OWASP mapping, severity classification, risk scoring, line number detection, vulnerable code snippets, remediation steps, and exportable reports.

---

## Supported Languages

- JavaScript / Node.js
- Python
- Java
- PHP
- C / C++

---

## Features

- Multi-language code scanning
- Static rule-based vulnerability detection
- OWASP Top 10 category mapping
- High / Medium / Low severity classification
- Risk score calculation
- Risk level identification
- Line number detection
- Vulnerable code snippet display
- Secure coding recommendations
- Exportable markdown security report
- Scan history
- Severity filter
- Cybersecurity dashboard UI

---

## Vulnerabilities Detected

### JavaScript / Node.js

- Hardcoded secrets and API keys
- Plain text password storage
- Dangerous `eval()` usage
- Sensitive data logging
- Weak or hardcoded JWT secret
- Possible NoSQL injection
- Insecure wildcard CORS
- Missing bcrypt password hashing
- Missing Helmet security headers
- Missing rate limiting
- Missing input validation

### Python

- Hardcoded secrets
- `eval()` usage
- `exec()` usage
- `subprocess` with `shell=True`
- Unsafe pickle deserialization
- Flask debug mode enabled
- Weak hashing using MD5 / SHA1
- Possible SQL injection
- Sensitive data printing
- Missing input validation

### Java

- Hardcoded passwords or secrets
- SQL injection through string concatenation
- `Runtime.exec()` command injection
- Weak hashing using MD5 / SHA-1
- Insecure `Random` usage
- Insecure deserialization
- Sensitive data printing
- Missing input validation

### PHP

- Hardcoded secrets
- `eval()` usage
- SQL injection
- File inclusion using user input
- Weak MD5 password hashing
- Raw echo XSS risk
- Direct superglobal usage
- Sensitive data printing

### C / C++

- `gets()` unsafe usage
- `strcpy()` buffer overflow risk
- `strcat()` buffer overflow risk
- `sprintf()` buffer overflow risk
- `system()` command injection risk
- Hardcoded secrets
- Weak `rand()` usage
- Format string vulnerability
- Missing input bounds check

---

## Tech Stack

### Frontend

- React.js
- JavaScript
- HTML
- CSS
- Vite

### Backend

- Node.js
- Express.js
- JavaScript
- REST API

### Security Concepts

- OWASP Top 10
- Static Application Security Testing
- Secure Coding
- Risk Scoring
- Vulnerability Classification

---

## Project Structure

```text
secure-code-review-bot/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   │   └── sampleCode.js
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── CodeEditor.jsx
│   │   │   ├── ScanButton.jsx
│   │   │   ├── SummaryCards.jsx
│   │   │   ├── RiskScore.jsx
│   │   │   ├── ResultCard.jsx
│   │   │   ├── SeverityFilter.jsx
│   │   │   ├── ScanHistory.jsx
│   │   │   ├── ExportReport.jsx
│   │   │   └── LanguageSelector.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── services/
│   │   │   └── scanService.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── utils/
│   │   │   └── severityUtils.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/
│   ├── controllers/
│   │   └── scanController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── scanRoutes.js
│   ├── scanner/
│   │   ├── rules/
│   │   │   ├── javascriptRules.js
│   │   │   ├── pythonRules.js
│   │   │   ├── javaRules.js
│   │   │   ├── phpRules.js
│   │   │   └── cppRules.js
│   │   ├── codeScanner.js
│   │   ├── riskScoring.js
│   │   ├── reportBuilder.js
│   │   └── owaspMapper.js
│   ├── utils/
│   │   ├── lineFinder.js
│   │   ├── responseFormatter.js
│   │   └── validators.js
│   ├── sample/
│   │   └── vulnerableSample.js
│   ├── .env
│   ├── .env.example
│   ├── server.js
│   └── package.json
│
├── reports/
│   ├── findings.md
│   ├── remediation.md
│   ├── secure-coding-review-report.md
│   └── test-cases.md
│
├── screenshots/
│   ├── home-page.png
│   ├── javascript-scan-result.png
│   ├── python-scan-result.png
│   ├── java-scan-result.png
│   ├── php-scan-result.png
│   └── cpp-scan-result.png
│
├── README.md
└── .gitignore
```

---

## How to Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/janadev-12/secure-code-review-bot.git
cd secure-code-review-bot
```

---

### 2. Run Backend

```bash
cd server
npm install
npm start
```

Backend will run on:

```text
http://localhost:5000
```

To check backend status, open:

```text
http://localhost:5000
```

Expected output:

```json
{
  "success": true,
  "message": "Secure Code Review Bot API is running",
  "version": "1.0.0"
}
```

---

### 3. Run Frontend

Open another terminal:

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## API Endpoint

### Scan Code

```http
POST /api/scan
```

### Request Body

```json
{
  "code": "paste your code here",
  "language": "javascript",
  "fileName": "pasted-code.js"
}
```

### Supported Language Values

```text
javascript
python
java
php
cpp
```

### Example Response

```json
{
  "success": true,
  "message": "Code scan completed successfully",
  "data": {
    "fileName": "pasted-code.js",
    "language": "JavaScript / Node.js",
    "summary": {
      "totalIssues": 10,
      "high": 5,
      "medium": 5,
      "low": 0,
      "riskScore": 100,
      "riskLevel": "High"
    },
    "issues": []
  }
}
```

---

## How It Works

```text
User selects language
        ↓
User pastes source code
        ↓
Frontend sends code + language to backend
        ↓
Backend selects matching security rules
        ↓
Scanner checks vulnerable patterns
        ↓
Risk score and severity are calculated
        ↓
Results are displayed in dashboard
        ↓
User can filter findings and export report
```

---

## Risk Score Logic

The scanner calculates risk score based on vulnerability severity.

```text
High issue   = 25 points
Medium issue = 12 points
Low issue    = 5 points
```

Maximum score is capped at 100.

```text
0       = Safe
1 - 34  = Low
35 - 69 = Medium
70 -100 = High
```

---

## Output Generated

For every scan, the tool displays:

- Selected language
- File name
- Total lines scanned
- Total vulnerabilities
- High / Medium / Low issue count
- Risk score
- Risk level
- Vulnerability title
- OWASP category
- Line number
- Vulnerable code snippet
- Description
- Impact
- Recommendation
- Secure coding example

---

## Output Screenshots

### Home Page

![Home Page](./screenshots/home-page.png)

### JavaScript Scan Result

![JavaScript Result](./screenshots/javascript-scan-result.png)

### Python Scan Result

![Python Result](./screenshots/python-scan-result.png)

### Java Scan Result

![Java Result](./screenshots/java-scan-result.png)

### PHP Scan Result

![PHP Result](./screenshots/php-scan-result.png)

### C / C++ Scan Result

![C/C++ Result](./screenshots/cpp-scan-result.png)

---

## Sample Test Codes

### JavaScript / Node.js

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

Expected result:

```text
Risk Level: High
Risk Score: 100/100
```

---

### Python

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

Expected result:

```text
Risk Level: High
Risk Score: 100/100
```

---

### Java

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

Expected result:

```text
Risk Level: High
Risk Score: 100/100
```

---

### PHP

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

Expected result:

```text
Risk Level: High
Risk Score: 100/100
```

---

### C / C++

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

Expected result:

```text
Risk Level: High
Risk Score: 100/100
```

---

## Reports

This project includes documentation reports inside the `reports/` folder.

```text
reports/
├── findings.md
├── remediation.md
├── secure-coding-review-report.md
└── test-cases.md
```

### `findings.md`

Contains vulnerability findings for all supported languages.

### `remediation.md`

Contains secure coding fixes and recommendations.

### `secure-coding-review-report.md`

Contains full project-level security review report.

### `test-cases.md`

Contains test cases for JavaScript, Python, Java, PHP, and C / C++.

---

## Learning Outcome

This project helped me understand:

- Secure coding practices
- Static Application Security Testing basics
- OWASP Top 10 vulnerability categories
- Multi-language vulnerability pattern detection
- Risk scoring logic
- React frontend integration with Node.js backend
- Building cybersecurity portfolio projects
- How security tools detect insecure code patterns

---

## Limitations

- This scanner uses static rule-based regex detection.
- It does not execute code.
- It does not perform deep AST-based analysis.
- It may produce false positives or miss complex vulnerabilities.
- It is designed for learning, portfolio, and basic secure coding review demonstration.

---

## Future Enhancements

- Add SQL language support
- Add AI-based code explanation
- Add PDF report export
- Add user authentication
- Add database scan history
- Add GitHub repository scanning
- Add file upload scanning
- Add advanced AST-based scanner
- Add severity customization
- Add downloadable vulnerability report

---

## Resume Highlight

```text
Built a Multi-Language Secure Code Review Bot supporting JavaScript/Node.js, Python, Java, PHP, and C/C++ with OWASP mapping, risk scoring, severity classification, line number detection, and remediation reporting.
```

---

## LinkedIn Project Summary

```text
I built a Multi-Language Secure Code Review Bot that scans JavaScript/Node.js, Python, Java, PHP, and C/C++ code for common security vulnerabilities using static rule-based analysis.

The tool provides OWASP mapping, severity classification, risk scoring, line number detection, vulnerable code snippets, remediation recommendations, and exportable reports.
```

---

## Author

**JANAVANTH R**

- Cybersecurity Enthusiast
- AI & ML Student
- Interested in Secure Coding, Ethical Hacking, and AI-based Security Tools

---

## Repository

```text
https://github.com/janadev-12/secure-code-review-bot
```

---

## License

This project is created for educational and portfolio purposes.
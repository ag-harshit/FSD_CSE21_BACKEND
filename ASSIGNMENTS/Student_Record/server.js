const http = require("http");
const fs = require("fs");

const PORT = 3000;
const STUDENT_FILE = "students.json";

// Create students.json if it does not exist
if (!fs.existsSync(STUDENT_FILE)) {
    fs.writeFileSync(STUDENT_FILE, "[]");
}


// Function to read students
function getStudents() {
    try {
        const data = fs.readFileSync(STUDENT_FILE, "utf8");

        if (data.trim() === "") {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}


// Function to save students
function saveStudents(students) {
    fs.writeFileSync(
        STUDENT_FILE,
        JSON.stringify(students, null, 2)
    );
}


// Create HTTP server
const server = http.createServer((req, res) => {

    // =================================
    // HOME PAGE
    // =================================

    if (req.method === "GET" && req.url === "/") {

        fs.readFile("index.html", "utf8", (err, data) => {

            if (err) {
                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error loading index.html");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });
    }


    // =================================
    // ADD STUDENT
    // =================================

    else if (req.method === "POST" && req.url === "/add") {

        let body = "";

        // Receive data from form
        req.on("data", (chunk) => {
            body += chunk.toString();
        });


        req.on("end", () => {

            // Convert form data
            const params = new URLSearchParams(body);


            // Create student object
            const student = {
                name: params.get("name"),
                roll: params.get("roll"),
                course: params.get("course"),
                email: params.get("email")
            };


            // Read existing students
            const students = getStudents();


            // Add new student
            students.push(student);


            // Save students
            saveStudents(students);


            // Redirect to students page
            res.writeHead(302, {
                Location: "/students"
            });

            res.end();
        });
    }


    // =================================
    // STUDENTS PAGE
    // =================================

    else if (req.method === "GET" && req.url === "/students") {

        // Get students from JSON
        const students = getStudents();

        let rows = "";


        // If no students
        if (students.length === 0) {

            rows = `
                <tr>
                    <td colspan="5">
                        No student records found.
                    </td>
                </tr>
            `;

        }

        // If students exist
        else {

            students.forEach((student, index) => {

                rows += `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${student.name}</td>
                        <td>${student.roll}</td>
                        <td>${student.course}</td>
                        <td>${student.email}</td>
                    </tr>
                `;

            });
        }


        // Read students.html
        fs.readFile("students.html", "utf8", (err, data) => {

            if (err) {

                res.writeHead(500, {
                    "Content-Type": "text/plain"
                });

                res.end("Error loading students.html");

                return;
            }


            // Replace placeholder
            const html = data.replace(
                "{{STUDENTS}}",
                rows
            );


            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(html);
        });
    }


    // =================================
    // 404 ERROR
    // =================================

    else {

        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("404 - Page Not Found");
    }

});

server.listen(PORT, () => {

    console.log(
        `Server running at http://localhost:${PORT}`
    );

});
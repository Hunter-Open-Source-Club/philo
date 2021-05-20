import os
import json

script = """
function populate()
{
	let details = document.getElementsByTagName("details");
	[...details].forEach(element => {
		let title = element.firstChild.textContent;
		let code = title.split(":")[0];
		if (code in COURSES)
		{
			let ul = document.createElement("ul");
			COURSES[code].forEach(course => {
				let li = document.createElement("li");
				let a = document.createElement("a");
				a.text = prettify(course.split(".pdf")[0]);
				a.href = "syllabi/" + code.replace(" ","_") + "/" + course;
				a.target = "_blank";
				a.className = "syllabusNode";
				li.appendChild(a);
				ul.appendChild(li);
			});
			element.appendChild(ul);
		}
	});
}

/* assumes syllabus is of the form: ..._professor_syllabus_semester,
 where ... can be anything */
function prettify(syllabus)
{
	if(syllabus == null) return;

	let words = syllabus.split('_');
	if(words.length < 3) {
		console.log("Invalid filename.");
		return syllabus;
	}

	let semester = words[words.length - 1];
	let professor = words[words.length - 1 - 2];

	return professor + " (" + semester.toUpperCase() + ")";
}

populate();
"""

def path_to_dict(path):
	courses = {}
	for course in os.listdir(path):
		syllabi = []
		for syllabus in os.listdir(path + "/" + course):
			syllabi.append(syllabus)
		course = course.replace("_"," ")
		if syllabi: courses[course] = syllabi
	return courses

courses = json.dumps(path_to_dict("syllabi"))
script = "const COURSES = " + courses + ";" + script
with open("scripts.js", "w") as f:
	f.write(script)

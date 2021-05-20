const COURSES = {"PHILO 103": ["PHILO103_Harris_syllabus_f13.pdf"], "PHILO 364": ["PHILO364_Harris_syllabus_f20.pdf"], "PHILO 275": ["PHILO275_Harris_syllabus_f17.pdf", "PHILO275_Addison_syllabus_s20.pdf"], "PHILO 250": ["PHILO250_Harris_syllabus_f17.pdf"], "PHILO 268": ["PHILO268_Harris_syllabus_s21.pdf"], "PHILO 360": ["PHILO360_Harris_syllabus_s20.pdf"], "PHILO 101": ["PHILO101_Harris_syllabus_f19.pdf"], "PHILO 38081": ["PHILO38081_Harris_syllabus_s17.pdf"], "PHILO 201": ["PHILO201_Harris_syllabus_f14.pdf"], "PHILO 372": ["PHILO372_Shankar_syllabus_f20.pdf"]};
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
